<template>
  <view class="login">
    <view class="">
      <view class=""></view>
      <view class="forget" @click="$goBack(2, '../forgotPassword/index')"
        >忘记密码</view
      >
    </view>
    <view class="content">
      <view class="title">密码登录</view>

      <input
        type="text"
        class="input"
        placeholder="请输入手机号/邮箱/账号"
        v-model="dataFrom.userName"
      />

      <input
        type="password"
        class="input"
        placeholder="请输入密码"
        v-model="dataFrom.password"
      />
      <label class="checkbox" @click="checkboxChange">
        <checkbox :checked="check" />
        <text class="">已阅读并同意<text style="color: skyblue" @click="$goBack(2, '../../pages/license/license')" >《用户协议》</text>及<text style="color: skyblue" @click="$goBack(2, '../../pages/privacy/privacy')" >《隐私政策》</text></text>
      </label>
      <button class="btn" @click="toLogin">登录</button>
      <view class="register" @click="$goBack(2, '../register/index')">
        注册账号
      </view>
    </view>
  </view>
</template>

<script>
import { _login, user_info, query,updateUserAction,user_action } from '@/common/request.js'
export default {
  name: 'login',
  data() {
    return {
      dataFrom: {
        userName: '',
        password: '',
        // codeValue: '',
        // codeValue: '',
      },
      check: true,
			flag:'',
			userId:''
    }
  },
  methods: {
    async sendCode() {},
    async toLogin() {
      if (!this.check) {
        return uni.showToast({
          title: '请先同意协议',
          icon: 'none',
        })
      }
      if (!this.dataFrom.userName || !this.dataFrom.password) {
        return uni.showToast({
          title: '请填写账号密码',
          icon: 'none',
        })
      }

      // const upkeyFrom = this.encryptFrom()
      const parmas = {
        // ...upkeyFrom,
        phone: this.dataFrom.userName,
        password: this.dataFrom.password,
        codeKey: this.dataFrom.codeKey,
        // codeValue: this.dataFrom.codeValue,
      }
      var isLogin = await _login(parmas)
			console.log(isLogin);
      if (isLogin) {
        this.$store.commit('login', parmas)
        query.queryObject.$and = []
        // setTimeout(() => {
          query.contains('phone', this.dataFrom.userName)
          user_info
            .setQuery(query)
            .limit(10)
            .find()
            .then(
              (res) => {
								console.log(res);
								this.flag = res.data.objects[0].isAnswer
								this.userId = res.data.objects[0].id
								uni.setStorageSync('id', res.data.objects[0].id)
              },
              (err) => {
                console.log('error')
              }
            )
        // }, 500)
				updateUserAction('count_login',1)
				// setTimeout(this.updateU(),1500)
				console.log(111222);
        uni.showToast({
          title: '登录成功',
          // 勾号消失
          icon: 'none',
          success: () => {
						if(this.flag=='1')
            uni.switchTab({
              url: '/pages/index/index',
            })
						else{
							uni.redirectTo({
							  url: '/pageCity/questionnaire/index',
							})
						}
          },
        })
      }
      // Api.login.login(parmas).then((res) => {
      //   if (res.code !== 1) return
      //   this.$store.dispatch('getToken', res.data.token)
      //   this.$store.dispatch('getUserInfo', res.data)

      //   uni.setStorage({
      //     key: 'userInfo',
      //     data: res.data,
      //   })
    },
    checkboxChange() {
      this.check = !this.check
    },
    // 回退到四个tabbar中的我的页面,使用uni.switchTab
    goBack() {
      uni.switchTab({
        url: '../myfile/myfile',
      })
    },
    // 忘记密码
    forget() {
      console.log('忘记密码')
    },
  },
  watch: {},
	onShow() {
		
	},
  // 页面周期函数--监听页面加载
  onLoad() {},
  mounted() {},
}
</script>

<style scoped lang="scss">
.login {
  .forget {
    color: #999;
    position: absolute;
    right: 20rpx;
    top: 20rpx;
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
      margin: 30rpx 0;
    }
    .checkbox {
      margin-top: 50rpx;
    }
    .btn {
      width: 600rpx;
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
    .register {
      text-align: center;
    }
  }
}
</style>
