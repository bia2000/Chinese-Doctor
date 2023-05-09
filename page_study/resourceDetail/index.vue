<template>
  <view class="resourceDetail">
    <view class="" v-if="type == 0">
      <view class="txt">
        改革开放以来.我国的医疗教育事业迅速崛起， 吸引了众多海外学子来华学习。21
        世纪以来,申请到 我国学习的临床专业留学生人数逐年递增。本科临 床医学(
        Bachelor of Medicine and Bachelor of Surgery, MBBS
        )是我国为来华学习临床医学的留学生新开设
        的一个专业。其中,大部分留学生在我国各大高校的
        基础医学院完成理论课学习后,需要在中国相关院校
        的附属医院进行见习和实习,从而获得医学学士学
        位。我国的官方语言是汉语,除了掌握基础汉语知识
        以满足日常生活外,他们还需要掌握医学汉语以便在
        临床实习过程中能够与病患进行沟通。鉴于此，除了
        开设基础汉语相关课程外，各大高校也相继开设了
        医学汉语课程。在这些年的医学汉语教学过程中,一
        些问题逐渐凸现出来，本文对此针对性地进行分析 探讨。
      </view>
    </view>
    <view class="" v-if="type == 1">
      <video :src="path" controls class="video"></video>
    </view>
  </view>
</template>

<script>
	import {  query,points,user_actions,getPoints,updateUserAction } from '@/common/request.js'
export default {
  components: {},
  data() {
    return {
      path: '',
      type: '',
    }
  },
  computed: {},
  methods: {},
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(e) {
    this.path = e.path
    this.type = e.type
    uni.setNavigationBarTitle({
      title: e.title,
    })
  },
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {
		// let point1={}
		updateUserAction('count_video',1)
		updateUserAction('num_video',1)
		getPoints('isvideo',6)
		
		// console.log(isvideo);
	},
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

<style scoped lang="scss">
.txt {
  padding: 20rpx;
  text-indent: 2em;
}
.video {
  width: 100%;
}
</style>
