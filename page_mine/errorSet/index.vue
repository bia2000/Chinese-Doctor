<template>
  <view class="errorSet">
    <answerPage :paper="paper" :type="4"></answerPage>
  </view>
</template>

<script>
import answerPage from 'components/answerPage'

import { question_bank, query } from '@/common/request'
export default {
  components: { answerPage },
  data() {
    return { paper: [] }
  },
  computed: {},
  methods: {},
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {
		let userId = uni.getStorageSync('id')
    query.queryObject.$and = []
    query.in('user_id', [userId])
    question_bank
      .setQuery(query)
      .limit(100)
      .find()
      .then(
        (res) => {
          console.log(res.data.objects)
          // this.bank[this.title.title[i1]] = res.data.objects
          res.data.objects.forEach((e) => {
            this.paper.push(e)
          })
        },
        (err) => {
          console.log('error')
        }
      )
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
