<template>
  <view class="userInfo">
    <!-- <u-cell-group class="group">
      <u-cell title="头像" :isLink="true"></u-cell>
      <u-cell title="用户名" :isLink="true" value="爱吃花椒酱"></u-cell>
      <u-cell title="实名认证" :isLink="true"></u-cell>
      <u-cell title="修改密码" :isLink="true" value="******"></u-cell>
    </u-cell-group> -->
    <u-form labelPosition="left" :model="userInfo" ref="form1">
      <view class="content">
        <u-form-item label="用户名" labelWidth="60"  borderBottom ref="item1">
          <u-input border="none" v-model="userInfo.name" placeholder="姓名,只能为中文"></u-input>
        </u-form-item>
        <u-form-item label="性别" borderBottom ref="item2">
          <u-radio-group v-model="userInfo.gender">
            <u-radio
              :customStyle="{ marginRight: '16px' }"
              v-for="(item, index) in genderlist"
              :key="index"
              :label="item.name"
              :name="item.name"
            >
            </u-radio>
          </u-radio-group>
        </u-form-item>
        <u-form-item
          prop="userInfo.birthday"
          borderBottom
          label="生日"
          @click="
            showBirthday = true
          "
          ref="item1"
        >
          <u-input
            v-model="userInfo.birthday"
            disabled
            disabledColor="#ffffff"
            placeholder="请选择生日"
            border="none"
          ></u-input>
          <u-icon slot="right" name="arrow-right"></u-icon>
        </u-form-item>
      </view>
    </u-form>
    <u-datetime-picker
      :show="showBirthday"
      :value="birthday"
      mode="date"
			min-date="196011"
      closeOnClickOverlay
      @confirm="birthdayConfirm"
      @cancel="birthdayClose"
      @close="birthdayClose"
    ></u-datetime-picker>
    <view class="btn">
      <button type="primary" @click="saveData()">保存数据</button>
      <button type="warn" @click="loginOut">退出登录</button>
    </view>
  </view>
</template>

<script>
import { getUserInfo, query,user_info } from '@/common/request'

export default {
  name: 'userInfo',
  components: {},
  props: {},
  data() {
    return {
      userInfo: {},
      showBirthday: false,
      birthday: Number(new Date()),
      genderlist: [
        {
          name: '男',
          disabled: false,
        },
        {
          name: '女',
          disabled: false,
        },]
			
    }
  },
  computed: {},
  methods: {
    onChangeNickName() {
      this.editInfoDisabled = this.userData.nickname == this.userInfo.nickname
    },
    birthdayClose() {
      this.showBirthday = false
      this.$refs.form1.validateField('userInfo.birthday')
    },
    birthdayConfirm(e) {
      this.showBirthday = false
      this.userInfo.birthday = uni.$u.timeFormat(e.value, 'yyyy-mm-dd')
      this.$refs.form1.validateField('userInfo.birthday')
    },
		saveData(){
			let product = user_info.getWithoutData(this.userInfo.id)
			product.set({
				name:this.userInfo.name,
				gender:this.userInfo.gender,
				birthday:this.userInfo.birthday
			})
			product.update()
			uni.showToast({
				title: '保存成功'
			})
		},
    loginOut() {
      this.$store.commit('logout')
      uni.reLaunch({
        url: '/pageCity/login/index',
      })
      // uni.clearStorage()
    },
  },
  watch: {},
		
  // 页面周期函数--监听页面加载
  onLoad() {
		let userId = uni.getStorageSync('id')
    let user = getUserInfo(userId)
    user.then((res) => {
      this.userInfo = res
    })
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

<style scoped lang="scss">
.content {
	background-color: #fff;
  padding: 20rpx;
}
.btn {
  margin: 50rpx auto;
  width: 500rpx;
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  font-weight: bold;
  button {
    margin: 30rpx 0;
  }
}
</style>
