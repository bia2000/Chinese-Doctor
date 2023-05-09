<template>
	<view class="articleDetail">
		<view class="title">
			{{news.title}}
		</view>
		<view class="time">
			<view v-if="news.author">{{news.author}}
<!-- 			 <text class="follow" @click="toFollow">{{ follow ?'已关注':'关注'}}
				</text> -->
				 </view>
			<view>{{getTime(news.created_at)}}</view>
		</view>
		<image class="img" v-if="news.img_url" mode="aspectFit" :src="news.img_url">
			</img>
			<view class="text">
				<text>
					{{news.content}}
				</text>
			</view>
			<view class="comment">
				<view class="title">
					评论
				</view>
				<view class="comment-item" v-for="item in commentList" :key="item.id">
					{{item.name}}: {{item.content}}
				</view>
			</view>
			<view class="bottom">
				<input type="text" v-model="commentText"></u-input>
				<text @click="toComment">发送</text>
				<u-icon :name="news.isCollected > 0 ? 'star-fill' : 'star'" color="#297999" size="20"
					@click="toCollect"></u-icon>
				<!-- <u-icon :name="item.isCollected > 0 ? 'star-fill' : 'star'" color="#297999" size="20"
									@click="toCollect(item)"></u-icon> -->
			</view>
	</view>
</template>

<script>
	import {
		news,
		query,
		chat_circle,
		updateUserAction,
		getUserInfo,
		getPoints,
		user_comment,
		user_info
	} from '@/common/request'
	import {
		TimestampToDate
	} from '@/common/utils'
	export default {
		data() {
			return {
				news: {},
				commentText: '',
				userInfo: {},
				userId: '',
				type:'',
				// follow:false,
				message: {},
				commentList: []
			}
		},
		computed: {
			// follow() {
			// 	if(Object.keys(this.userInfo).length>0)
			// 	return this.userInfo.followed.indexOf(this.news.userId)
			// }
		},
		methods: {
			getTime(e) {
				return TimestampToDate(e * 1000)
			},
			toCollect() {
				if (this.news.isCollected == null) {
					this.news.isCollected = '1'
					updateUserAction('count_collect', 1)
					getPoints('iscollect', 2)
				} else this.news.isCollected = null
				console.log(this.news);
				if(this.type == 1){
					let product = news.getWithoutData(this.news.id)
					product.set('isCollected', this.news.isCollected)
					product.update()
				}
				else{
					let product = chat_circle.getWithoutData(this.news.id)
					product.set('isCollected', this.news.isCollected)
					product.update()
				}
			},
			// toFollow() {
			// 	this.follow = !this.follow
			// 	let followList = this.userInfo.followed
			// 	let index = followList.indexOf(this.news.userId)
			// 	console.log(index);
			// 	if (index > -1) {
			// 		followList.splice(index, 1)
			// 	} else {
			// 		followList.push(this.news.userId)
			// 	}
			// 	let user = user_info.getWithoutData(this.userId)
			// 	user.set({
			// 		followed: followList
			// 	})
			// 	user.update()
			// },
			toComment() {
				let record = user_comment.create()
				updateUserAction('count_comment', 1)
				getPoints('isComment', 2)
				record.set({
					'userid': this.userId,
					'textId': this.news.id,
					'name': this.userInfo.name,
					'content': this.commentText
				})
				record.save()
				this.commentText = ''
				uni.showToast({
					title: '发送成功',
					success: (res) => {
						uni.redirectTo({
							url: '/pageCity/articleDetial/index?id=' + this.message.id + '&type=' +
								this.message.type
						})
					}
				})

				// user_comment.find().then(res=>{

				// })
			}
		},
		async onShow() {
			updateUserAction('count_resource', 1)
			this.userId = await uni.getStorageSync('id')
			let user = getUserInfo(this.userId)
			user.then((res) => {
				this.userInfo = res
			})

		},
		onLoad(e) {
			this.message = e
			// console.log(e);
			this.type =e.type
			let newsId = e.id
			query.queryObject.$and = []
			query.contains('textId', newsId)
			user_comment.setQuery(query).find().then(res => {
				this.commentList = res.data.objects
			})
			if (e.type == 1)
				news.get(newsId).then(res => {
					// console.log(res);
					this.news = res.data
				})
			else {
				chat_circle.get(newsId).then(res => {
					// console.log(res);
					this.news = res.data
				})
			}
		},
	}
</script>

<style scoped lang="scss">
	page {
		height: 100%;
	}

	.articleDetail {
		text-align: center;
		height: 100%;

		.title {
			font-size: 40rpx;
			font-weight: bold;
			margin: 60rpx;
		}

		.time {
			display: flex;
			justify-content: space-around;
			margin: 20rpx;
			font-size: 24rpx;
			color: #999;
		}

		.img {
			// margin: 40rpx auto;
			// margin: 0 auto;

		}

		.text {
			text-indent: 2em;
			text-align: left;
			padding: 40rpx;
		}

		.comment {
			margin-top: 100rpx;

			.comment-item {
				margin: 20rpx 80rpx;
				background-color: #fff;
				padding: 20rpx;
				border-radius: 20rpx;
				text-align: left;
			}

			.title {
				padding: 10rpx 20rpx;
				font-weight: bold;
				text-align: left;
				border-left: 8rpx solid #30533e;
			}
		}

		.follow {
			margin-left: 10rpx;
			padding: 6rpx 12rpx;
			border-radius: 6rpx;
			background-color: skyblue;
		}

		.bottom {
			display: flex;
			position: sticky;
			justify-content: space-around;
			bottom: 0;
			background-color: #e7f4f2;
			padding: 20rpx;

			input {
				padding: 10rpx;
				height: 40rpx;
				border-radius: 10rpx;
				background-color: #fff;
			}

			text {
				padding: 15rpx;
				margin: 0 40rpx;
				font-size: 24rpx;
				color: #fff;
				background-color: orange;
				border-radius: 10rpx;
			}
		}
	}
</style>
