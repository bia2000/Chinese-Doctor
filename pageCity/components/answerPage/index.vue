<template>
  <view class="answerPage" v-if="paper.length > 0">
    <view class="top">
      <view class="percentage" v-if="type == 3 && !isPaperSubmit">{{ percent }} </view>
      <view class="">
        <view class="time" v-if="type == 3 && !isPaperSubmit">
          <u-icon name="hourglass-half-fill"></u-icon>{{ time }}
        </view>
        <view class="" v-if="type != 2">
          题量：{{ paper.length || 10 }} | 满分：{{ totalScore || 10 }}
        </view>

        <view class="" v-if="type == 2"> 最高纪录：{{ 10 }} | 已答对：{{ num_question }} </view>
      </view>
      <view class="" v-if="isPaperSubmit"> 试卷得分： {{ score }} </view>
      <view class="btn" v-if="type == 3 && !isPaperSubmit" @click="submit">提交试卷</view>
      <!-- <view class="btn" v-if="type == 3 && !isPaperSubmit">保存答案 </view> -->
      <view class="btn" v-if="type == 4" @click="deleteError(currentPage - 1)">删除 </view>
    </view>
    <view class="content">
      <view class="top-tips" v-if="isSubmit"> 答对{{ score }}题 获得积分{{ score }}分 </view>
      <view class="title2"
        >{{ currentPage }}.{{ paper[currentPage - 1].secondary_ques_type }}
        <!-- ({{ scoreList[currentPage - 1] }}分) -->
      </view>
      <view class="que">
        <view class="question"> {{ paper[currentPage - 1].question }} </view>
        <view class="" v-if="paper[currentPage - 1].question_content.length > 20"
          >{{ paper[currentPage - 1].question_content }}
        </view>
        <view
          class=""
          v-if="
            paper[currentPage - 1].question_content.length > 10 &&
            paper[currentPage - 1].question_content.length < 20
          "
        >
          <image :src="getFile(paper[currentPage - 1].question_content)" alt="" />
        </view>

        <view v-if="paper[currentPage - 1].question_content.length < 10">
          <audioView :audioUrl="getFile(paper[currentPage - 1].question_content)"></audioView>
        </view>
      </view>

      <view class="options" v-if="paper[currentPage - 1].options">
        <u-radio-group
          placement="column"
          v-model="paper[currentPage - 1].check"
          @change="radioGroupChange"
        >
          <u-radio
            v-for="item in options"
            :name="item.index"
            :label="item.content"
            :key="item.id"
            :active-color="showError ? 'red' : ''"
            class="options-item"
          ></u-radio>
        </u-radio-group>
      </view>
      <view class="" v-if="!paper[currentPage - 1].options">
        <textarea maxlength="600" placeholder="请输入"></textarea>
      </view>
      <view class="analysis" v-if="isWrong || isSubmit || isPaperSubmit">
        <view class="tt"> 解析</view>
        <view class="">
          {{ paper[currentPage - 1].analysis }}
        </view>
        <view class=""> 正确答案：{{ paper[currentPage - 1].answer }} </view>
        <view class=""> 题目等级：{{ paper[currentPage - 1].grade_standard }} </view>
        <view class=""> </view>
      </view>
    </view>
    <view class="bu" v-if="!isWrong">
      <button class="" type="primary" :disabled="currentPage == 1" @click="toPrev">上一题</button>
      <button
        class=""
        type="primary"
        :disabled="currentPage == paper.length && (isSubmit || type == 3 || type == 4)"
        @click="toNext"
      >
        {{ currentPage == paper.length ? '提交' : '下一题' }}
      </button>
    </view>
    <u-modal :show="isShow" :content="content" @confirm="() => (isShow = false)"></u-modal>
  </view>
</template>

<script>
import { trimAll } from '@/common/utils'
import {
  getUserPaper,
  user,
  question_bank,
  getUserInfo,
  updateuserInfo,
  query,
} from '@/common/request'

import audioView from '@/components/audioView'
export default {
  name: 'answerPage',
  props: ['paper', 'type', 'scoreList'],
  components: { audioView },
  data() {
    return {
      // paper: [],
      userId: '',
      currentPage: 1,
      isWrong: false,
      isSubmit: false,
      isPaperSubmit: false,
      isShow: false,
      answerList: [],
      userInfo: [],
      num_question: 0,
      score: 0,
      t: {
        flag: null,
        s1: '00',
        f1: '00',
        m1: '00',
        s2: 0,
        f2: 0,
        m2: 0,
      },
    }
  },
  computed: {
    time() {
      return this.t.s1 + ':' + this.t.f1 + ':' + this.t.m1
    },
    percent() {
      if (this.paper.length > 0) var p1 = this.currentPage / this.paper.length
      var p2 = Math.ceil(p1 * 100) + '%'
      return p2
    },
    content() {
      return '您答对了' + this.num_question + '题'
    },
    // groupby() {
    //   let arr = this.paper
    //   let dataInfo = {}
    //   arr.forEach((item) => {
    //     let { primary_ques_type } = item
    //     if (!dataInfo[primary_ques_type]) {
    //       dataInfo[primary_ques_type] = {
    //         primary_ques_type,
    //         child: [],
    //       }
    //     }
    //     dataInfo[primary_ques_type].child.push(item)
    //   })
    //   let list = Object.values(dataInfo) // list 转换成功的数据
    //   let score1=0
    //   list[1].child.forEach((e)=>{
    //     if (e.check == e.answer)
    //         score1 += this.scoreList[i] * 1
    //   })
    //   console.log(list[1])
    // },
    options() {
      if (this.paper.length > 0) {
        var str3 = {}
        var str4 = []
        var str2 = this.paper[this.currentPage - 1].options
        if (this.paper.length > 0) {
          var str1 = trimAll(str2)
          if (str1) {
            str3['content'] = str1.match(/(?<=(content":")).*?(?=("))/g)
            str3['index'] = str1.match(/(?<=(index":")).*?(?=("))/g)
          }
          // console.log(str3)
          for (let i = 0; i < str3.content.length; i++) {
            str4.push({ content: str3.content[i], index: str3.index[i] })
          }
        }
        return str4
      }
    },
    showError() {
      return (
        this.paper[this.currentPage - 1].check != this.paper[this.currentPage - 1].answer &&
        (this.isWrong || this.isSubmit || this.isPaperSubmit)
      )
    },
    totalScore() {
      // console.log(this.paper);
      let tt = 0
      if (this.scoreList) {
        this.scoreList.map((e) => {
          tt += e * 1
        })
        return tt
      }
    },
  },
  methods: {
    toNext() {
      this.isWrong = false
      if (this.type == 2) {
        if (this.paper[this.currentPage - 1].check != this.paper[this.currentPage - 1].answer) {
          let userList = this.paper[this.currentPage - 1].user_id
          let product = question_bank.getWithoutData(this.paper[this.currentPage - 1].id)
          if (userList.indexOf(this.userId) == -1) {
            userList.push(this.userId)
          }
          console.log(userList)
          product.set('user_id', userList)
          product.update()
          this.isWrong = true
          this.isShow = true
          this.$emit('toMatch', this.num_question)
        } else {
          this.currentPage++
          this.num_question++
        }
      } else {
        this.currentPage++
      }
      // console.log(this.currentPage)
      if (this.currentPage == 11 && this.type == 1) {
        this.currentPage--
        this.getGreat()
        this.isSubmit = true
        uni.showToast({
          title: '恭喜您答对了' + this.score + '题',
          // 勾号消失
          icon: 'none',
        })
      }
    },
    toPrev() {
      this.currentPage--
    },
    radioGroupChange(e) {
      this.paper[this.currentPage - 1].check = e
      // console.log(this.paper[this.currentPage - 1])
    },
    // 算成绩
    getGreat() {
      if (this.type == 1) {
        for (let i = 0; i < this.paper.length; i++) {
          let product1 = question_bank.getWithoutData(this.paper[i].id)
          let userList1 = this.paper[i].userlist
          if (userList1.indexOf(this.userId) == -1) {
            userList1.push(this.userId)
          }
          product1.set('userlist', userList1)
          product1.update()
          if (this.paper[i].check == this.paper[i].answer) {
            this.score += 1
          } else {
            let userList = this.paper[i].user_id
            let product = question_bank.getWithoutData(this.paper[i].id)
            if (userList.indexOf(this.userId) == -1) {
              userList.push(this.userId)
            }
            product.set('user_id', userList)
            product.update()
          }
        }
      } else if (this.type == 3) {
        for (let i = 0; i < this.paper.length; i++) {
          this.answerList.push(this.paper[i].check)
          if (this.paper[i].check == this.paper[i].answer) {
            this.score += this.scoreList[i] * 1
          } else {
            let userList = this.paper[i].user_id
            let product = question_bank.getWithoutData(this.paper[i].id)
            if (userList.indexOf(this.userId) == -1) {
              userList.push(this.userId)
            }
            product.set('user_id', userList)
            product.update()
          }
        }
      }
    },
    getFile(url) {
      return 'https://cloud-minapp-45998.cloud.ifanrusercontent.com/' + url
    },
    submit() {
      // console.log(this.t)
      this.getGreat()
      this.isPaperSubmit = true
      uni.showToast({
        title: '提交成功',
        // 勾号消失
        icon: 'none',
      })
      this.$emit('toPaperSubmit', this.score, this.answerList, this.time)
    },
    deleteError(e) {
      let userList = this.paper[e].user_id
      let product = question_bank.getWithoutData(this.paper[e].id)
      let index = userList.indexOf(this.userId)
      if (index != -1) {
        this.paper.splice(index, 1)
        userList.splice(index, 1)
      }
      console.log(this.paper)
      // console.log(userList)
      product.set('user_id', userList)
      product.update()
    },
    // 开始计时
    startHandler() {
      this.t.flag = setInterval(() => {
        if (this.t.m1 === 60 || this.t.m1 === '60') {
          this.t.m1 = '00'
          this.t.m2 = 0
          if (this.t.f1 === 60 || this.t.f1 === '60') {
            this.t.f1 = '00'
            this.t.f2 = 0
            if (this.t.s2 + 1 <= 9) {
              this.t.s2++
              this.t.s1 = '0' + this.t.s2
            } else {
              this.t.s2++
              this.t.s1 = this.t.s2
            }
          } else {
            if (this.t.f2 + 1 <= 9) {
              this.t.f2++
              this.t.f1 = '0' + this.t.f2
            } else {
              this.t.f2++
              this.t.f1 = this.t.f2
            }
          }
        } else {
          if (this.t.m2 + 1 <= 9) {
            this.t.m2++
            this.t.m1 = '0' + this.t.m2
          } else {
            this.t.m2++
            this.t.m1 = this.t.m2
          }
        }
      }, 1000)
    },
    // 暂停计时
    endHandler() {
      this.flag = clearInterval(this.flag)
    },
  },
  watch: {},

  mounted() {
    this.userId = localStorage.getItem('id')
    console.log(this.userId)
    this.startHandler()
    if (this.type == 4) {
      this.isPaperSubmit = true
    }
    let user = getUserInfo(this.userId)
    user.then((res) => {
      this.userInfo = res
    })
    console.log(this.userInfo)
    let p1 = '2'
    // updateuserInfo(this.userId, 'papers', p1)
  },
}
</script>

<style scoped lang="scss">
page {
  width: 100%;
  height: 100%;
}
.answerPage {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .top {
    position: fixed;
    display: flex;
    top: 85rpx;
    padding: 50rpx 40rpx;
    width: calc(100% - 80rpx);
    justify-content: space-around;
    align-items: center;
    background-color: #e7f4f2;
    font-size: 26rpx;
    z-index: 99;
    .percentage {
      width: 70rpx;
      height: 70rpx;
      line-height: 70rpx;
      text-align: center;
      border-radius: 35rpx;
      border: 2rpx dotted #53a5d9;
    }
    .time {
      display: flex;
    }
    .btn {
      padding: 10rpx;
      border-radius: 10rpx;
      height: 40rpx;
      color: #fff;
      background-color: #53a5d9;
    }
  }
  .content {
    margin-top: 160rpx;
    padding: 30rpx;
    padding-bottom: 200rpx;
    .top-tips {
      position: relative;
      width: 350rpx;
      padding: 10rpx;
      top: -10rpx;
      text-align: center;
      font-weight: bold;
      border-radius: 30rpx;
      color: #fff;
      background-color: #53a5d9;
    }
    .title1 {
      font-weight: bold;
      font-size: 46rpx;
    }
    .title2 {
      font-weight: bold;
      font-size: 32rpx;
      margin: 20rpx 0;
    }
    .que {
      // display: flex;
    }
    .question {
      padding: 10rpx;
    }
    .options {
      margin-top: 20rpx;
      .options-item {
        padding: 10rpx;
      }
    }
  }
  .analysis {
    margin: 80rpx 0;
    border-top: 2rpx solid;
    .tt {
      color: #e6a00a;
      padding: 20rpx 0;
    }
  }
  textarea {
    margin: 20rpx;
    border: 2rpx solid #53a5d9;
    height: 400rpx;
  }
  .bu {
    position: fixed;
    display: flex;
    bottom: 0;
    // margin: 10rpx;
    width: 100%;
    button {
      width: 100%;
    }
  }
}
</style>
