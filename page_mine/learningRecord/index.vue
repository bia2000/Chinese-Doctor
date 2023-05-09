<template>
	<view class="learningRecord">
		<view class="" v-if="type==1">
			<view class="boxItem">
				<view class="">
					<view class="title"> 错题集 </view>
					<!-- <view class="title"> 今日题组 </view>
        <view class="box-bom">
          <view class="time"> 正确率 </view>
        </view> -->
				</view>
				<view class="right">
					<view class="btn" @click="$goBack(2, '/page_mine/errorSet/index')"> 去复习 </view>
				</view>
			</view>
			<view class="" v-for="item in paperList" :key="item.id">
				<view class="boxItem" v-if="item.flag">
					<view class="">
						<view class="title">
							{{ item.name }}
						</view>
						<view class="box-bom">
							<view class="time"> {{ time(item.updated_at * 1000) }} </view>
						</view>
					</view>

					<view class="right">
						<view class=""> {{ item.score_paper }}分 </view>
						<view class="btn" @click="$goBack(2, '/page_pratice/paper/index?list=' + item.question_set)">
							去复习
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="" v-if="type==2">
			<view class="" v-for="item in paperList" :key="item.id">
					<view class="boxItem" v-if="item.flag">
						<view class="">
							<view class="title">
								{{ item.name }}
							</view>
							<view class="box-bom">
								<view class="time"> {{ time(item.updated_at * 1000) }} </view>
							</view>
						</view>
			
						<view class="right">
							<view class=""> {{ item.score_paper }}分 </view>
							<view class="btn" @click="$goBack(2, '/page_pratice/paper/index?list=' + item.question_set)">
								去复习
							</view>
						</view>
					</view>
				</view>
		</view>
	</view>
</template>

<script>
	import {
		TimestampToDate
	} from '@/common/utils'
	import {
		paper_user,
		query,
		getUserPaper,
		updateUserAction
	} from '@/common/request'
	export default {
		components: {},
		data() {
			return {
				paperList: [],
				type: ''
			}
		},
		computed: {},
		methods: {
			time(e) {
				// console.log(e)
				return TimestampToDate(e)
			},
		},
		watch: {},
		mounted() {
			let userId = uni.getStorageSync('id')
			query.queryObject.$and = []
			query.contains('user_id', userId)
			let papers = getUserPaper(query)
			papers.then((res) => {
				// console.log(res)
				this.paperList = res
			})
		},
		// 页面周期函数--监听页面加载
		onLoad(e) {
			this.type = e.type
		},
		// 页面周期函数--监听页面初次渲染完成
		onReady() {},
		// 页面周期函数--监听页面显示(not-nvue)
		onShow() {
			updateUserAction('count_record',1)
		},
		// 页面周期函数--监听页面隐藏
	}
</script>

<style scoped lang="scss">
	.learningRecord {
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
				width: 400rpx;
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
