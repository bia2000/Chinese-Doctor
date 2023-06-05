<template>
  <view class="answerPage" v-if="paper.length > 0||papers">
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
			<view class="btn" v-if="isWrong || isSubmit || isPaperSubmit" @click="quit()">
				退出
			</view>
      <view class="btn" v-if="type == 3 && !isPaperSubmit" @click="submit">提交试卷</view>
      <!-- <view class="btn" v-if="type == 3 && !isPaperSubmit">保存答案 </view> -->
      <view class="btn" v-if="type == 4" @click="deleteError(currentPage - 1)">删除 </view>
			<view class="btn" v-if="type == 5" @click="$emit('comfirmCopy')">
				确认添加
			</view>
    </view>
    <view class="content">
      <view class="top-tips" v-if="isSubmit"> 答对{{ nums }}题 获得积分{{ nums }}分 </view>
      <view class="title2"
        >{{ currentPage }}.{{ paper[currentPage - 1].secondary_ques_type }}
        <!-- ({{ scoreList[currentPage - 1] }}分) -->
      </view>
      <view class="que">
        <view class="" v-if="paper[currentPage - 1].question_content.length > 20"
          ><text>{{ paper[currentPage - 1].question_content }}</text>
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
				<view class="question" v-if="paper[currentPage - 1].question!=null"> {{ paper[currentPage - 1].question }} </view>
      </view>
<!-- 			<view v-if="">

			</view> -->
      <view class="options" v-if="paper[currentPage - 1].options">
        <u-radio-group
          placement="column"
          v-model="check[currentPage - 1]"
          @change="radioGroupChange"
        >
          <u-radio
            v-for="(item,index) in options"
            :name="item.index"
            :label="item.index+'. '+item.content"
            :key="index"
            :active-color="showError ? 'red' : ''"
            class="options-item"
          ></u-radio>
        </u-radio-group>
      </view>
      <view class="" v-if="!paper[currentPage - 1].options">
        <textarea maxlength="600" placeholder="请输入" v-model="check[currentPage - 1]"></textarea>
      </view>
      <view class="analysis" v-if="isWrong || isSubmit || isPaperSubmit">
        <view class="tt"> 解析</view>
        <view class="">
          {{ paper[currentPage - 1].analysis }}
        </view>
        <view class=""> 正确答案：{{ paper[currentPage - 1].answer }} </view>
        <view class=""> 题目等级：{{ paper[currentPage - 1].grade_standard }} </view>
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
import { trimAll,similar } from '@/common/utils'
import {
  getUserPaper,
  user,
  question_bank,
  getUserInfo,
  updateuserInfo,
  query,
	getPoints,
	updateUserAction,
} from '@/common/request'

import audioView from 'components/audioView'
import { createLogger } from 'vuex'
export default {
  name: 'answerPage',
  props: ['paper', 'type', 'scoreList'],
  components: { audioView },
  data() {
    return {
      userId: '',
      currentPage: 1,
			check:[],
			nums:0,
      isWrong: false,
      isSubmit: false,
      isPaperSubmit: false,
      isShow: false,
			num_actions:{
				h:0,
				r:0,
				w:0
			},
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
	watch: {
		check(newValue, oldValue) {
		}
	},
  computed: {
		papers(){
			let list = []
			// this.paper.map(e=>{
			// 	if(e.secondary_ques_type=='选择正确的词语填空')
			// })
		},
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

    options() {
      if (this.paper.length > 0) {
        var str3 = {}
        var str4 = []
        var str2 = this.paper[this.currentPage - 1].options
        if (this.paper.length > 0) {
          var str1 = trimAll(str2)
          if (str1) {
            let r1 = new RegExp('content":"([^"]+)','g')
            let r11 = new RegExp('content":"([^"]+)')
            let r2 = new RegExp('index":"([^"]+)','g')
            let r22 = new RegExp('index":"([^"]+)')
            let str11 = str1.match(r1)
            str3['content'] = str11.map(e=>{
              return e.match(r11)[1]
            })
            let str22 = str1.match(r2)
            str3['index'] = str22.map(e=>{
              return e.match(r22)[1]
            })
            // str3['content'] = str1.match(/(?<=(content":")).*?(?=("))/g)
            // str3['index'] = str1.match(/(?<=(index":")).*?(?=("))/g)
          }
          console.log(str3);
					if(str1)
          for (let i = 0; i < str3.content.length; i++) {
            str4.push({ content: str3.content[i], index: str3.index[i] })
          }
        }
        return str4
      }
    },
    showError() {
      return (
        this.check[this.currentPage - 1] != this.paper[this.currentPage - 1].answer &&
        (this.isWrong || this.isSubmit || this.isPaperSubmit)
      )
    },
    totalScore() {
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
		quit(){
			uni.reLaunch({
				url:'/pages/pratice/pratice'
			})
		},
    toNext() {
			this._audioContext.stop()
			console.log(this.paper);
			this.groupby()
      this.isWrong = false
      if (this.type == 2) {
        if (this.check[this.currentPage - 1] != this.paper[this.currentPage - 1].answer) {
          let userList = this.paper[this.currentPage - 1].user_id
          let product = question_bank.getWithoutData(this.paper[this.currentPage - 1].id)
          if (userList.indexOf(this.userId) == -1) {
            userList.push(this.userId)
          }
          product.set('user_id', userList)
          product.update()
          this.isWrong = true
          this.isShow = true
          this.$emit('toMatch', this.num_question)
        } else {
					updateUserAction('count_ma_h',1)
					updateUserAction('count_ma_r',1)
					updateUserAction('count_ma_w',1)
					getPoints('ismatch',20)
          this.currentPage++
          this.num_question++
        }
      } else {
        this.currentPage++
      }
      if (this.currentPage == 11 && this.type == 1) {
        this.currentPage--
        this.getGreat()
        this.isSubmit = true
				updateUserAction('count_sp_h',this.num_actions.h)
				updateUserAction('count_sp_r',this.num_actions.r)
				updateUserAction('count_sp_w',this.num_actions.w)
				let rate_sp=this.nums/this.paper.length
				updateUserAction('rate_sp_w',rate_sp)
				updateUserAction('rate_sp_h',rate_sp)
				updateUserAction('rate_sp_r',rate_sp)
        uni.showToast({
          title: '恭喜您答对了' + this.nums + '题',
          // 勾号消失
          icon: 'none',
        })
      }
    },
    toPrev() {
			this._audioContext.stop()
      this.currentPage--
			this.num_question--
    },
    radioGroupChange(e) {
      this.paper[this.currentPage - 1].check = e
			this.check[this.currentPage - 1] = e
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
          if (this.check[i] == this.paper[i].answer) {
						getPoints('isspecial',20)
            this.nums += 1
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
          this.answerList.push(this.check[i])
					// console.log(this.answerList);
					if(this.check[i].length<5){
          if (this.check[i] == this.paper[i].answer) {
						getPoints('isanswer',20)
						this.nums += 1
            this.score += this.scoreList[i] * 1
          } else {
            let userList = this.paper[i].user_id
            let product = question_bank.getWithoutData(this.paper[i].id)
            if (userList.indexOf(this.userId) == -1) {
              userList.push(this.userId)
            }
            product.set('user_id', userList)
            product.update()
          }}else{
						let scale = similar(this.check[i],this.paper[i].answer)
						getPoints('isanswer',20)
						this.score += Math.ceil(this.scoreList[i] * scale)
						createLogger(this.score)
					}
        }
      }
    },
    getFile(url) {
			this._audioContext =
			  (this.audioContext =
			  	uni.createInnerAudioContext())
			this._audioContext.stop()
      return 'https://cloud-minapp-45998.cloud.ifanrusercontent.com/' + url
    },
    submit() {
			if(this.check.length!=this.paper.length){
				uni.showToast({
					icon:'none',
					title:'您还有试题未填写'
				})

			}else{
      this.getGreat()
      this.isPaperSubmit = true
			updateUserAction('count_pp_h',this.num_actions.h)
			updateUserAction('count_pp_r',this.num_actions.r)
			updateUserAction('count_pp_w',this.num_actions.w)
			let rate_pp=this.nums/this.paper.length
			updateUserAction('rate_pp_w',rate_pp)
			updateUserAction('rate_pp_h',rate_pp)
			updateUserAction('rate_pp_r',rate_pp)
      uni.showToast({
        title: '提交成功',
        // 勾号消失
        icon: 'none',
      })
      this.$emit('toPaperSubmit', this.score, this.answerList, this.time)			}
    },
    deleteError(e) {
      let userList = this.paper[e].user_id
      let product = question_bank.getWithoutData(this.paper[e].id)
      let index = userList.indexOf(this.userId)
      if (index != -1) {
        this.paper.splice(index, 1)
        userList.splice(index, 1)
      }
      product.set('user_id', userList)
      product.update()
    },
		groupby() {
		  let arr = this.paper
		  let dataInfo = {}
		  arr.forEach((item) => {
		    let { primary_ques_type } = item
		    if (!dataInfo[primary_ques_type]) {
		      dataInfo[primary_ques_type] = {
		        primary_ques_type,
		        child: [],
		      }
		    }
		    dataInfo[primary_ques_type].child.push(item)
		  })
			if(dataInfo['听力'])
			this.num_actions.h = dataInfo['听力'].child.length
			if(dataInfo['阅读'])
			this.num_actions.r = dataInfo['阅读'].child.length
			if(dataInfo['写作'])
			this.num_actions.w = dataInfo['写作'].child.length
		  // let list = Object.values(dataInfo) // list 转换成功的数据
		  // let score1=0
		  // list[1].child.forEach((e)=>{
		  //   if (e.check == e.answer)
		  //       score1 += this.scoreList[i] * 1
		  // })
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
	onShow() {
		// this.getPoints('')
	},

  async mounted() {
		this._audioContext =
		  (this.audioContext =
		  	uni.createInnerAudioContext())
		this.userId = uni.getStorageSync('id')
    this.startHandler()
    if (this.type == 4) {
      this.isPaperSubmit = true
    }
    this.userInfo = await getUserInfo(this.userId)
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
    top: 0rpx;
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
			margin-top: 10rpx;
			font-weight: bold;
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
