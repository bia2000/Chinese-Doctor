<template>
	<view class="chat">
		<button class="login" type="primary" size="default" @click="$goBack(2, '/pageCity/login/index')" v-if="!userId">
			点击登录
		</button>
		<view class="" v-if="userId">
			<view class="">
				<articleList :detail="chatList" :type='2'></articleList>
			</view>
			<view class="fabu" @click="show = true">
				<u-icon name="plus" color="#53A5D9" size="60"></u-icon>
			</view>
			<u-popup :show="show" height='900rpx' mode="bottom" closeable @close="show = false">
				<view class="form">
					<u-form :model="form" ref="uForm">
						<u-form-item class="">
							<u-input type="text" v-model="form.title" border="surround" placeholder="请输入标题" />
						</u-form-item>
						<u-form-item class="">
							<u-textarea type="textarea" v-model="form.content" height='50' border="surround"
								placeholder="尽情表达你的想法"></u-textarea>
						</u-form-item>
						<u-form-item label="添加附件" label-width="120" prop="attached" label-position="top">
							<!-- 上传附件 -->
							<u-upload :fileList="fileList1" name="1" @afterRead="afterRead" @delete="deletePic"
								width="80" height="80" :maxCount="1">
							</u-upload>
						</u-form-item>
					</u-form>
					<button type="submit" @click="submit">发布</button>
				</view>
			</u-popup>
		</view>
	</view>
</template>

<script>
	import articleList from 'c/articleList'
	import {
		chat_circle,
		getUserInfo
	} from '@/common/request'
	export default {
		components: {
			articleList
		},
		data() {
			return {
				show: false,
				list1: ['推荐', '关注'],
				current: 0,
				chatList: [],
				fileList1: [],
				userId: '',
				userInfo: {},
				form: {
					title: '',
					content: '',
				}
			}
		},
		computed: {
			followList() {
				let followList = this.chatList.filter(e => {
					let index = this.userInfo.followed.indexOf(e.userId)
					console.log(index);
					return index > -1
				})
				return followList
			}
		},
		methods: {
			submit() {
				// console.log(this.fileList1);
				updateUserAction('count_discuss',1)
				let chat = chat_circle.create()
				chat.set({
					title: this.form.title,
					content: this.form.content,
					userId: this.userInfo.id,
					author: this.userInfo.name
				})
				if (this.fileList1.length > 0)
					chat.set({
						img_url: this.fileList1[0].thumb,
					})
				chat.save()
				this.show = false
				this.form = {}
				this.fileList1 = []
				setTimeout(() => {
					uni.redirectTo({
						url: '/pages/chat/chat'
					})
				}, 1000)
			},
			changeIndex(index) {
				this.current = index
			},
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
			},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: 'http://www.example.com/upload', // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'file',
						formData: {
							user: 'test'
						},
						success: (res) => {
							setTimeout(() => {
								resolve(res.data.data)
							}, 1000)
						}
					});
				})
			},
		},
		onShow() {
			chat_circle.find().then(res => {
				this.chatList = res.data.objects
			})

		},
		mounted() {
			let userId = uni.getStorageSync('id')
			this.userId = userId
			let user = getUserInfo(userId)
			user.then((res) => {
				this.userInfo = res
			})
		}
	}
</script>

<style lang="scss" scoped>
	.chat {
		height: 100vh;
		width: 100vw;
	}

	.login {
		position: absolute;
		width: 200rpx;
		height: 100rpx;
		top: 50%;
		left: 50%;
		margin-top: -50rpx;
		margin-left: -100rpx;
	}

	.fabu {
		position: sticky;
		width: 120rpx;
		height: 120rpx;
		top: 800rpx;
		left: 600rpx // right: 40rpx;
			// bottom: 100rpx;
			// margin-left: 100rpx;
	}

	.form {
		margin: 40rpx;
	}
</style>
