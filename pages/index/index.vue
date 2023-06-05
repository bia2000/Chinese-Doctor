<template>
	<view class="">
		<button class="login" type="primary" size="default" @click="$goBack(2, '/pageCity/login/index')" v-if="!userId">
			点击登录
		</button>
		<view class="content" v-if="userId">
			<!-- <u-search :show-action="false"></u-search> -->
			<u-swiper :list="list1" @click="click" height='320rpx'></u-swiper>
			<view class="main-box">
				<view class="circle" @click="$goBack(3, '/pages/study/study')"><text>学习</text><img src="@/static/images/study.png" alt="" /></view>
				<view class="circle" @click="$goBack(3, '/pages/pratice/pratice')"><text>练习</text><img src="@/static/images/zuopin-h.png" alt="" /></view>
				<view class="circle" @click="$goBack(4, '/pages/study/study?current=2')"><text>MCT考试</text><img
						src="@/static/images/mct.png" alt="" /></view>
			</view>
			<view class="message">
				<view class="message-title">最新资讯</view>
				<scroll-view scroll-y="true" class="scroll-Y" style="height: 30%">
					<article-list :detail="news" :type='1' class="articleList"></article-list>
				</scroll-view>
				<u-loading-icon
				:show="flag"
				    :vertical="true"
				    text="加载中"
				></u-loading-icon>
			</view>
		</view>
	</view>
</template>

<script>
	import articleList from 'c/articleList'
	import {
		points,
		query,
		user_actions,
		news,
		getPoints
	} from '@/common/request'
	import {
		TimestampToDate
	} from '@/common/utils'
	export default {
		components: {
			articleList
		},
		data() {
			return {
				seconds: 0,
				userId: '',
				flag:false,

				list1: [
					'https://cloud-minapp-45998.cloud.ifanrusercontent.com/1pioNu7h1DnkJn5l.png',
					// 'https://cdn.uviewui.com/uview/swiper/swiper2.png',
					// 'https://cdn.uviewui.com/uview/swiper/swiper3.png',
				],
				news: [],
				// detail: [{
				// 		pic: 'https://cdn.uviewui.com/uview/swiper/swiper1.png',
				// 		title: '标题1',
				// 	},
				// 	{
				// 		pic: 'https://cdn.uviewui.com/uview/swiper/swiper2.png',
				// 		title: '标题2',
				// 	},
				// 	{
				// 		pic: 'https://cdn.uviewui.com/uview/swiper/swiper3.png',
				// 		title: '标题3',
				// 	},
				// ],
			}
		},
		computed: {},
		onLoad() {

		},
		methods: {
			refresh() {
				// this.flag = true
				this.$store.state.hasLogin = true
				uni.redirectTo({
					url: '/pages/index/index'
				});
			},
		},
		async onShow() {
			this.userId = uni.getStorageSync('id')
			let usera = []
			let userp = []
			let todays = new Date(new Date(new Date().toLocaleDateString()).getTime())
			query.queryObject.$and = []
			query.contains('userId', this.userId)
			usera = await user_actions.setQuery(query).find().then((res) => {
				return res.data.objects
			})
			if (usera.length < 1) {
				let user_action = user_actions.create()
				user_action.set('userId', this.userId)
				user_action.save()
			}
			query.compare('created_at', '>', todays / 1000)
			userp = await points.setQuery(query).find().then((res) => {
				return res.data.objects
			})
			if (userp.length < 1) {
				let point = points.create()
				point.set('userId', this.userId)
				point.save()
			}

		},
		async mounted() {
			this.flag=true
			news.find().then(res => {
				// console.log(1);
				this.news = res.data.objects
				this.flag=false
			})
			getPoints('issign',0)
			// console.log(this.news);
		},
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
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

	.content {
		width: 100%;
		height: 100%;
	}

	.main-box {
		margin-bottom: 5%;
		display: flex;
		justify-content: space-around;
		/* height: */
	}

	.circle {
		height: 130rpx;
		width: 130rpx;
		background-color: #eaead7;
		border: 30rpx #e7f4f2 solid;
		border-radius: 90rpx;
		margin: 30rpx 0;
		text-align: center;
		color: #61aad9;
		font-size: 24rpx;
	}

	img {
		width: 100rpx;
		height: 120rpx;
	}
	.message{
		/* position: absolute; */
		width: 100%;
		/* bottom: 0; */
	}
	.message-title {
		margin: 0 auto;
		text-align: center;
		padding: 10rpx 10rpx;
		border-radius: 30rpx;
		height: 10%;
		width: 60%;
		font-size: 34rpx;
		font-weight: 600;
		color: #5ca5da;
		background-color: #e0eff8;
	}


	.articleList {
		background-color: #e0eff8;
	}
</style>
