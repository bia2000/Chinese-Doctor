<template>
  <view class="paper">
    <view class="" v-for="(item, index) in paper" :key="item.id">
      <view class="" v-for="t1 in title1.len" :key="t1.id">
        <view class="title1" v-if="index == t1">
          {{ item.primary_ques_type }}
        </view>
      </view>
      <view class="" v-for="t2 in title2.len" :key="t2.id">
        <view class="title2" v-if="index == t2">
          {{ item.secondary_ques_type }}
        </view>
      </view>
      <view class="question_content" v-if="item.question_content.length > 20">
        {{ item.question_content }}
      </view>
      <!-- <view class="question_content" v-if="index == 13">
        {{ item.question_content }}
      </view> -->
      <view v-if="item.question_content.length < 10">
        <audioView
          :audioUrl="getFile(item.question_content)"
          :type="1"
        ></audioView>
      </view>
      <view
        class="img"
        v-if="
          item.question_content.length > 10 && item.question_content.length < 20
        "
      >
        <image :src="getFile(item.question_content)" alt="" />
      </view>
      <view class="question"  v-if="paper[currentPage - 1].question!=null">
        {{ index + 1 + '.' + item.question }}
      </view>
      <view class="options" v-if="options.length>1">
        <u-radio-group placement="column">
          <u-radio
            v-for="(item,index1) in options[index]"
            :name="options[index][index1]"
            :label="options[index][index1]"
            :key="item.id"
            class="options-item"
          > </u-radio
        ></u-radio-group>
      </view>
      <view class="" v-if="item.analysis">
        <view class="analysis">
          查看答案和解析<u-switch v-model="item.flag"></u-switch>
        </view>
        <view class="" v-if="item.flag">
          <view class=""> 答案：{{ item.answer }} </view>
          <view class=""> 解析：{{ item.analysis }} </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import audioView from 'components/audioView'
import {
  trimAll,
} from '@/common/utils'
import {
  test_paper,
  MyFile,
  query,
  question_bank,
} from '@/common/request'
export default {
  name: 'paper',
  components: { audioView },
  props: {},
  data() {
    return {
      paper: [],
      option: [],
      f1: false,
      f2: false,
    }
  },
  computed: {
    title1() {
      const groupedBy = {}
      for (const item of this.paper) {
        if (groupedBy[item.primary_ques_type]) {
          groupedBy[item.primary_ques_type].push(item)
        } else {
          groupedBy[item.primary_ques_type] = [item]
        }
      }
      const t1 = { title: [], len: [0] }
      t1['title'] = Object.keys(groupedBy)
      if (t1['title'].length > 0)
        for (let i of t1.title) {
          t1['len'].push(groupedBy[i].length)
        }
      t1.len.pop()
      for (let j = 1; j < t1.len.length; j++) {
        t1.len[j] = t1.len[j] + t1.len[j - 1]
      }
      return t1
    },
    title2() {
      const groupedBy = {}

      for (const item of this.paper) {
        if (groupedBy[item.secondary_ques_type]) {
          groupedBy[item.secondary_ques_type].push(item)
        } else {
          groupedBy[item.secondary_ques_type] = [item]
        }
      }
      const t1 = { title: [], len: [0] }
      t1['title'] = Object.keys(groupedBy)
      if (t1['title'].length > 0)
        for (let i of t1.title) {
          t1['len'].push(groupedBy[i].length)
        }
      t1.len.pop()
      for (let j = 1; j < t1.len.length; j++) {
        t1.len[j] = t1.len[j] + t1.len[j - 1]
      }
      return t1
    },
    options() {
      var str3 = []
      var str = this.option
      if (this.paper.length > 0) {
        str3 = str.map((e) => {
          var str1 = trimAll(e)
          if (str1) var code1 = str1.match(/(?<=(content":")).*?(?=("))/g)
          return code1
        })
      }
      return str3
    },
  },
  methods: {
    getFile(url) {
      return 'https://cloud-minapp-45998.cloud.ifanrusercontent.com/' + url
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(e) {
    let list = e.list.split(',')
    // console.log(list)
    list.map((e) => {
      question_bank.get(e).then((res) => {
        this.option.push(res.data.options)
        this.paper.push(res.data)
        // console.log(res.option)
      })
    })
    // uni.setNavigationBarTitle({
    //         title: this.paper[0].paper_title,
    //       })
  },
  // 页面周期函数--监听页面初次渲染完成
  mounted() {
    // test_paper
    //   .limit(30)
    //   .find()
    //   .then(
    //     (res) => {
    //       res.data.objects.forEach((e) => {
    //         this.paper.push(e)
    //         this.option.push(e.options)
    //       })
    //       uni.setNavigationBarTitle({
    //         title: this.paper[0].paper_title,
    //       })
    //       // console.log(this.paper)
    //     },
    //     (err) => {
    //       console.log('error')
    //     }
    //   )
  },
  onShow() {},
  // 页面周期函数--监听页面隐藏
  onHide() {},
  // 页面周期函数--监听页面卸载
  onUnload() {},
  // 页面处理函数--监听用户下拉动作
}
</script>

<style lang="scss" scoped>
.paper {
  font-size: 27rpx;
}
.title1 {
  font-size: 40rpx;
  font-weight: bold;
  text-align: center;
  padding: 20rpx;
}
.title2 {
  font-size: 34rpx;
  text-align: center;
  padding: 10rpx;
  font-weight: bold;
}
.question {
  margin: 10rpx 20rpx;
}
.question_content {
  margin: 10rpx;
}
.img {
  text-align: center;
}
.options {
  margin-top: 20rpx;
  .options-item {
    padding: 10rpx;
  }
}
.analysis {
  margin: 20rpx;
}
// .audio {
//   width: 140rpx;
//   height: 40rpx;
// }
</style>
