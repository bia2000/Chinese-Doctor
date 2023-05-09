<template>
  <view class="forgotPassword">
    <view class="" v-if="current == 0">
      <view class="box1" @click="toPhone"> 通过手机找回 </view>
      <view class="box1" @click="toEmail"> 通过邮箱找回 </view>
    </view>
    <view class="content" v-if="current == 1">
      <view class="title">重置密码</view>
      <u-input
        type="number"
        border="bottom"
        placeholder="请输入手机号"
        v-model="username"
      />

      <u-input placeholder="请输入验证码" border="bottom" type="number">
        <template slot="suffix">
          <u-code
            ref="uCode"
            @change="codeChange"
            seconds="20"
            changeText="X秒重新获取哈哈哈"
          ></u-code>
          <u-button @tap="getCode" :text="tips" type="success" size="mini"
            >获取验证码</u-button
          >
        </template>
      </u-input>
      <view class="btn" @click="toNext"> 下一步 </view></view
    >
    <view class="content" v-if="current == 2">
      <view class="title">重置密码</view>
      <u-input border="bottom" placeholder="请输入手机号" v-model="username" />

      <u-input placeholder="请输入验证码" border="bottom">
        <template slot="suffix">
          <u-code
            ref="uCode"
            @change="codeChange"
            seconds="20"
            changeText="X秒重新获取哈哈哈"
          ></u-code>
          <u-button @tap="getCode" :text="tips" type="success" size="mini"
            >获取验证码</u-button
          >
        </template>
      </u-input>
      <view class="btn" @click="toNext"> 下一步 </view>
    </view>
    <view class="content" v-if="current == 3">
      <view class="content">
        <view class="title">重置密码</view>

        <input
          type="text"
          class="input"
          placeholder="请输入6位以上的数字或字母"
          v-model="username"
        />

        <input
          type="password"
          class="input"
          placeholder="请再次输入密码"
          v-model="password"
        />
        <view class="btn" @click="submit"> 重置密码 </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'forgotPassword',
  components: {},
  props: {},
  data() {
    return {
      current: 0,
    }
  },
  computed: {},
  methods: {
    toPhone() {
      this.current = 1
    },
    toEmail() {
      this.current = 2
    },
    toNext() {
      this.current = 3
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
.box1 {
  width: 400rpx;
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  border-radius: 10rpx;
  margin: 0 auto;
  margin-top: 100rpx;
  background-color: #e7f4f2;
}
.content {
  margin: 40rpx;
  .title {
    padding: 100rpx 0;
    font-size: 60rpx;
  }
  .input {
    height: 80rpx;
    line-height: 80rpx;
    border-bottom: 2rpx solid #999;
  }
  .btn {
    width: 400rpx;
    height: 80rpx;
    line-height: 80rpx;
    margin: 50rpx auto;
    color: #fff;
    background-color: #53a5d9;
    font-size: 30rpx;
    font-weight: bold;
    border-radius: 8rpx;
    text-align: center;
  }
}
</style>
