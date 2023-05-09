<template>
  <view class="resultDetail">
    <view class="">
      <view class=""> 得分：{{ paper.user_score }}/{{ paper.score_paper }} </view>
      <view class=""> 做题时间：{{ paper.time }} </view>
    </view>
    <view class="">{{ score_type }} </view>
  </view>
</template>

<script>
import { paper_user, question_bank, groupBy } from '@/common/utils'
export default {
  data() {
    return {
      paper: {},
      paperlist: [],
    }
  },
  computed: {
    score_type() {
      if (this.paperlist.length > 4) {
        let list = groupBy(this.paperlist, 'primary_ques_type')
        let list1 = []
        console.log(list)
        for (let i in list)
          list[i].map((e, index) => {
            // if (e == this.paper.question_set_answer[index]) console.log(1)
          })
        console.log(list1)
        // console.log(list)
        // list1.map((e, index) => {})
      }
    },
  },
  methods: {},
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(e) {
    console.log(e)
    paper_user.get(e.id).then((res) => {
      this.paper = res.data
    })
    let list = []
    setTimeout(() => {
      list = this.paper.question_set
      if (list) {
        list.map((e) => {
          question_bank.get(e).then((res) => {
            this.paperlist.push(res.data)
          })
        })
      }
    }, 500)
  },
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {},
  // 页面周期函数--监听页面隐藏
  onHide() {},
  // 页面周期函数--监听页面卸载
  onUnload() {},
  // 页面处理函数--监听用户下拉动作
  // onPullDownRefresh() { uni.stopPullDownRefresh(); },
  // 页面处理函数--监听用户上拉触底
  // onReachBottom() {},
  // 页面处理函数--监听页面滚动(not-nvue)
  // onPageScroll(event) {},
  // 页面处理函数--用户点击右上角分享
  // onShareAppMessage(options) {},
}
</script>

<style scoped></style>
