<template>
	<view class="register">
		<view class="box">
			<text class="name"> 中文名 </text>
			<u-input placeholder="请输入中文名" border="bottom" v-model="userName"></u-input>
		</view>
	<!-- 	<view class="box">
			<text class="name"> 邮箱 </text>
			<u-input placeholder="请输入邮箱地址" border="bottom" v-model="email"></u-input>
		</view> -->
		<view class="box">
			<text class="name"> 手机号 </text>
			<u-input placeholder="请输入手机号码" border="bottom" v-model="phone"></u-input>
		</view>
		<!--    <view class="box">
      <text class="name"> 验证码 </text>
      <u-input
        placeholder="请输入验证码"
        border="bottom"
        type="number"
        v-model="codeKey"
      > -->
		<!-- <template slot="suffix">
          <u-code
            ref="uCode"
            @change="codeChange"
            seconds="20"
            changeText="X秒重新获取哈哈哈"
          ></u-code>
          <u-button @tap="getCode" type="success" size="mini"
            >获取验证码</u-button
          >
        </template> -->
		<!-- </u-input> -->
		<!-- </view> -->
		<view class="box">
			<text class="name"> 设置密码 </text>
			<u-input placeholder="请输入6位以上的数字或字母" border="bottom" v-model="newPassword"></u-input>
		</view>
		<view class="box">
			<text class="name"> 确认密码 </text>
			<u-input placeholder="请再次输入密码" border="bottom" v-model="confirmPassword"></u-input>
		</view>
		<label class="checkbox" @click="checkboxChange">
		  <checkbox :checked="check" />
		  <text class="">已阅读并同意<text style="color: skyblue" @click="$goBack(2, '../../pages/license/license')" >《用户协议》</text>及<text style="color: skyblue" @click="$goBack(2, '../../pages/privacy/privacy')" >《隐私政策》</text></text>
		</label>
		<view class="btn" @click="toRegister"> 完成注册 </view>
		<u-alert
		    :description="description"
				:show-icon="true"
		    type="warning"
		></u-alert>
	</view>
</template>

<script>
	import {
		user_info,
		BaaS
	} from '@/common/request'
	export default {
		name: 'register',
		data() {
			return {
				userName: '',
				phone: null,
				email: '',
				check:false,
				newPassword: '',
				confirmPassword: '',
				description:'中文名，手机号等信息仅在登录及核对得分用，不做其他用途',
				userlist: [],
				rules: {
					userName: [{
						rule: /[\u4E00-\u9FA5]/,
						msg: '中文名只能是汉字',
					}, ],
					phone: [{
						rule: /^[1][3,4,5,7,8][0-9]{9}$/,
						msg: '请输入正确的手机号码',
					}, ],
					// email: [{
					// 	rule: /^([0-9a-zA-Z_\.\-\u4e00-\u9fa5])+\@([0-9a-zA-Z_\.\-\])+\.([a-zA-Z]{2,8})$/,
					// 	msg: '请输入正确的邮箱',
					// }, ],
					newPassword: [{
						rule: /^.{6,20}$/,
						msg: '密码长度必须为6-20个字符',
					}, ],
				},
			}
		},
		computed: {},
		methods: {
			checkboxChange() {
			  this.check = !this.check
			},
			// 实现注册
			toRegister() {
				
				if (!this.validate('userName')) return
				// if (!this.validate('email')) return
				if (!this.validate('phone')) return
				if (!this.validate('newPassword')) return
				if (!this.validate('confirmPassword')) return
				if (!this.check) {
				  return uni.showToast({
				    title: '请先同意协议',
				    icon: 'none',
				  })
				}
				let add_user_info = user_info.create()
				add_user_info.set({
					name: this.userName,
					phone: this.phone+'',
					password: this.newPassword+'',
				})
				console.log(3);
				add_user_info.save().then(
					(res) => {
						console.log(4);
						uni.showToast({
							icon: 'none',
							title: '注册成功'
						})
						console.log(5);
						// success
						setTimeout(() => {
							uni.redirectTo({
								url: '../login/index',
							})
						}, 1000)
					},
					(err) => {
						// HError 对象
						console.log(err);
					}
				)
				// BaaS.auth
				//   .register({ username: this.phone, password: this.newPassword })
				//   .then((user) => {
				//     console.log(user)
				//   })

			},
			validate(key) {
				var check = true
				if (key == 'phone') {
					if (this.userlist.indexOf(this[key]) != -1) {
						uni.showToast({
							title: '该手机号已注册过',
							// 勾号消失
							icon: 'none',
						})
						return (check = false)
					}
				} else if (key != 'confirmPassword')
					this.rules[key].forEach((v) => {
						// uni-app 判断输入是否符合要求
						if (!v.rule.test(this[key])) {
							uni.showToast({
								title: v.msg,
								// 勾号消失
								icon: 'none',
							})
							return (check = false)
						}
					})
				else if (this[key] != this.newPassword) {
					uni.showToast({
						title: '密码不一致',
						// 勾号消失
						icon: 'none',
					})
					return (check = false)
				}
				return check
			},
		},
		watch: {},

		// 页面周期函数--监听页面加载
		onLoad() {
			user_info.find().then(res => {
				res.data.objects.forEach(e => {
					this.userlist.push(e.phone)
				})
			})
		},
		// 页面周期函数--监听页面初次渲染完成
		onReady() {},
		// 页面周期函数--监听页面显示(not-nvue)
		onShow() {},
		// 页面周期函数--监听页面隐藏
	}
</script>

<style scoped lang="scss">
	.register {
		padding-top: 80rpx;

		.box {
			margin-top: 20rpx;

			.name {
				margin: 0 20rpx;
				font-weight: bold;
				color: #555;
			}
		}

		.btn {
			width: 400rpx;
			height: 80rpx;
			line-height: 80rpx;
			margin: 80rpx auto;
			color: #fff;
			background-color: #53a5d9;
			font-size: 30rpx;
			font-weight: bold;
			border-radius: 8rpx;
			text-align: center;
		}
	}
		.checkbox {
		  margin-top: 50rpx;
		}
</style>
