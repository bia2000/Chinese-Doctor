<template>
	<view class="favorites">
		<u-subsection :list="list" mode="button" :current="current" @change="change" activeColor="#53A5D9">
		</u-subsection>
		<view class="" v-if="current == 0">
			<view class="boxItem" v-for="item in paperList" :key="item.id">
				<view class="">
					<view class="title">
						{{ item.name }}
					</view>
					<!-- <view class="time">  </view> -->
				</view>
				<view class="right" v-if="!item.flag">
					<!-- <view class=""> {{ item.score_paper }}分 </view> -->
					<view class="btn" @click="
			        $goBack(
			          2,
			          '/page_pratice/answerPaper/index?list=' +
			            item.question_set +
			            '&question_set_score=' +
			            item.question_set_score +
			            '&id=' +
			            item.id
			        )
			      ">
						去答题
					</view>
				</view>
				<view class="right" v-if="item.flag">
					<view class=""> {{ item.user_score }}分 </view>
					<view class="btn" @click="$goBack(2, '/page_pratice/paper/index?list=' + item.question_set)">去复习</view>
				</view>
			</view>
		</view>
		<view class="" v-if="current == 1">
			<articleList :detail="articlelist" :type='2'></articleList>
		</view>
	</view>
</template>

<script>
		import articleList from 'c/articleList'
	import {
		getUserPaper,
		query,
		paper_public,
		news,
		chat_circle
	} from '@/common/request'
	export default {
		components: {
			articleList
		},
		data() {
			return {
				list: ['试卷', '文章'],
				current: 0,
				paperList: [],
				articlelist:[]
			}
		},
		computed: {},
		methods: {
			change(index) {
				this.current = index
			},
		},
		watch: {},

		onShow() {
			let userId = uni.getStorageSync('id')
			// let flag = 'true'
			query.queryObject.$and = []
			query.contains('user_id', userId)
			query.contains('isCollected', '1')
			let papers = getUserPaper(query)
			papers.then((res) => {
				this.paperList = res
			})
			query.queryObject.$and = []
			query.contains('isCollected', '1')
			paper_public
				.setQuery(query)
				.limit(100)
				.find()
				.then(
					(res) => {
						res.data.objects.map(e => {
							this.paperList.push(e)
						})
					}
				)
			news
				.setQuery(query)
				.limit(100)
				.find()
				.then(
					(res) => {
						res.data.objects.map(e => {
							this.articlelist.push(e)
						})
					}
				)
			chat_circle
				.setQuery(query)
				.limit(100)
				.find()
				.then(
					(res) => {
						res.data.objects.map(e => {
							this.articlelist.push(e)
						})
					}
				)
		},
		// 页面周期函数--监听页面隐藏
		onHide() {},
	}
</script>

<style scoped lang="scss">
	.favorites {
		margin: 20rpx;

		.boxItem {
			border: #ccc 2rpx solid;
			border-radius: 20rpx;
			display: flex;
			margin: 20rpx 0;
			padding: 10rpx;
			height: 100rpx;
			background-color: #fff;
			justify-content: space-between;
			align-items: center;

			.title {
				width: 460rpx;
				font-size: 38rpx;
				font-weight: bold;
				padding: 10rpx;
			}

			.box-bom {
				display: flex;
				font-size: 26rpx;
				color: #53a5d9;

				.time {
					margin: 0 20rpx;
					color: #666;
				}
			}

			.right {
				display: flex;
				align-items: center;
			}

			.btn {
				color: #fff;
				background-color: #53a5d9;
				height: 40rpx;
				margin: 10rpx;
				padding: 10rpx;
				border-radius: 15rpx;
			}
		}
	}
</style>
