<template>
  <view class="guide">
    <swiper class="swiper" :indicator-dots="true" @change="changeTab">
      <swiper-item
        class="item"
        v-for="(item, index) in guidelList"
        :key="index"
      >
        <image :src="item.img" mode="aspectFill"></image>

        <view
          class="btn"
          v-if="tabIndex == 3"
          @click="$goBack(4, '/pages/login/index')"
        >
          开启留学生活
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
export default {
  name: 'guide',
  components: {},
  props: {},
  data() {
    return {
      tabIndex: 0,
      guidelList: [
        {
          img: '/static/images/ddoctor.jpg',
          text: '医生-医生',
        },
        {
          img: '/static/images/dpatient.jpg',
          text: '医生-患者',
        },
        {
          img: '/static/images/dnurse.jpg',
          text: '医生-护士',
        },
        {
          img: '/static/images/pnurse.jpg',
          text: '患者-护士',
        },
      ],
    }
  },
  computed: {},
  methods: {
    changeTab(index) {
      this.tabIndex = index.detail.current
      console.log(this.tabIndex)
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {},
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

<style lang="scss" scoped>
page {
  // width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
.guide {
  width: 100%;
  height: 100%;
  background-color: red;
  text-align: center;
  .swiper {
    height: 100%;
  }
  .btn {
    position: absolute;
    bottom: 150rpx;
    margin: auto;
    left: 0;
    right: 0;
    background-color: #51b3b1;
    color: #fff;
    font-weight: bold;
    width: 600rpx;
    height: 80rpx;
    line-height: 70rpx;
    text-align: center;
    border-radius: 10rpx;
  }
}
</style>
