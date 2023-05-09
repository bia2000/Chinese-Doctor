<template>
	<view class="">
		<button class="login" type="primary" size="default" @click="$goBack(2, '/pageCity/login/index')" v-if="!userId">
			点击登录
		</button>
		<view v-if="userId">
			<u-subsection :list="list" mode="button" :current="current" @change="change" activeColor="#53A5D9">
			</u-subsection>
			<view class="box" v-if="current == '0'">
				<view class="boxItem" v-for="item in title.title" :key="item.id">
					<view class="title"> 主题：{{ item }} </view>
					<view class="btn"
						@click="$goBack(2, '/page_pratice/specialAnswers/index?title=' + item+'&key='+key)">
						去答题
					</view>
				</view>
			</view>
			<view class="" v-if="current == '1'">
				<view class="tiaozhan">
					<view class="img">
						<img src="@/static/images/tiaozhan.png" />
					</view>
					<view class="text">答错离场，答对继续 </view>
					<view class="btn" @click="
              $goBack(
                2,
                '/page_pratice/matchPaper/index?list=' + JSON.stringify(randomList) + '&num=' + userInfo.num
              )
            ">开始答题
					</view>
				</view>
				<view class="rank">
					<view class=""> 我的纪录：{{ userInfo1.num }}题 </view>
					<view class=""> 我的排名： {{ userInfo1.rank }}名</view>
					<view class="">
						<view class="title"> 排行榜 </view>
						<view class="">
							<view class="rank-item" v-for="(user, index) in userList" :key="user.id">
								<view class="left">
									<view class="">
										{{ index + 1 }}
									</view>
									<view class="">
										{{ user.name }}
									</view>
								</view>
								<view class="right"> {{ user.num }}题 </view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="" v-if="current == '2'">
				<zujuan :paper="paper" :keyword="key"></zujuan>
			</view>
			<view v-if="current == '3' && paperList.length > 0">
				<u-subsection :list="list2" mode="button" :current="current2" @change="change2" activeColor="#53A5D9">
				</u-subsection>
				<view class="box" v-if="current2 == 0">
					<view class="boxItem" v-for="item in publicList" :key="item.id">
						<view class="">
							<view class="title">
								{{ item.name }}
							</view>
							<view class="icon">
								<u-icon :name="item.isCollected > 0 ? 'star-fill' : 'star'" color="#297999" size="20"
									@click="toCollect(item)"></u-icon>
								<u-icon name="share" color="#299999" size="20"></u-icon>
							</view>
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
                      item.id+
											'&type=4'
                  )
                ">
								去答题
							</view>
						</view>
						<view class="right" v-if="item.flag">
							<view class=""> {{ item.user_score }}分 </view>
							<view class="btn"
								@click="$goBack(2, '/page_pratice/paper/index?list=' + item.question_set)">去复习</view>
						</view>
					</view>
				</view>
				<view class="box" v-if="current2 == 1">
					<view class="boxItem" v-for="item in paperList" :key="item.id">
						<view class="">
							<view class="title">
								{{ item.name }}
							</view>
							<!-- <view class="time">  </view> -->
							<view class="icon">
								<u-icon :name="item.isCollected > 0 ? 'star-fill' : 'star'" color="#297999" size="20"
									@click="toCollect(item)"></u-icon>
								<u-icon name="share" color="#299999" size="20"></u-icon>
							</view>
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
                      item.id+'&type=3'
                  )
                ">
								去答题
							</view>
						</view>
						<view class="right" v-if="item.flag">
							<view class=""> {{ item.user_score }}分 </view>
							<view class="btn"
								@click="$goBack(2, '/page_pratice/paper/index?list=' + item.question_set)">去复习</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getRandomArrayElements,
		TimestampToDate,
	} from 'pageCity/common/utils'
	import {
		getUserPaper,
		query,
		user_info,
		question_bank,
		paper_user,
		getPoints,
		paper_public,
		updateUserAction
	} from 'pageCity/common/request'
	import zujuan from 'components/zujuan/index.vue'
	import {
		getkeyword
	} from '@/common/recommend'
	export default {
		components: {
			zujuan
		},
		data() {
			return {
				list: ['专项答题', '挑战答题', '自由组卷', '试卷答题'],
				list2: ['模拟真题', '试卷库'],
				deleteOpt: [{
					text: '删除',
					style: {
						backgroundColor: '#dd524d',
					},
				}, ],
				randomList: [],
				userList: [],
				userInfo: {
					num: 0,
					rank: 1,
				},
				userId: '',
				key: '',
				current: 0,
				current2: 0,
				idSet: [],
				paper: [],
				paperList: [],
				publicList: [],
				scoreList: [],
			}
		},
		computed: {
			userInfo1() {
				return this.userInfo
			},
			title() {
				const groupedBy = {}
				for (const item of this.paper) {
					if (groupedBy[item.topic]) {
						groupedBy[item.topic].push(item)
					} else {
						groupedBy[item.topic] = [item]
					}
				}
				const t1 = {
					title: [],
					len: [0]
				}
				t1['title'] = Object.keys(groupedBy)
				if (t1['title'].length > 0)
					for (let i of t1.title) {
						t1['len'].push(groupedBy[i].length)
					}
				t1.len.pop()
				for (let j = 1; j < t1.len.length; j++) {
					t1.len[j] = t1.len[j] + t1.len[j - 1]
				}
				// console.log(t1)
				return t1
			},
			papers() {
				let t1 = {
					title: null,
					time: [],
					score: []
				}
				const groupedBy = {}

				for (const item of this.paper) {
					if (groupedBy[item.paper_title]) {
						groupedBy[item.paper_title].push(item)
					} else {
						groupedBy[item.paper_title] = [item]
					}
				}
				t1.title = Object.keys(groupedBy)
				let value = Object.values(groupedBy)
				for (let i in t1.title) {
					t1.score.push(value[i][0].points)
					t1.time.push(value[i][0].time_created)
				}
				return t1
			},
		},
		methods: {
			time(e) {
				return TimestampToDate(e)
			},
			change(index) {
				this.current = index
				this.getPaperlist()
			},
			change2(index) {
				this.current2 = index
			},
			toCollect(item) {
				// item.isCollected = !item.isCollected
				if (item.isCollected == null) {
					item.isCollected = '1'
					updateUserAction('count_collect', 1)
					getPoints('iscollect', 2)
				} else item.isCollected = null
				console.log(item);
				if(this.current2 == '0'){
					let product = paper_public.getWithoutData(item.id)
					product.set('isCollected', item.isCollected)
					product.update()
				}
				else{
					let product = paper_user.getWithoutData(item.id)
					product.set('isCollected', item.isCollected)
					product.update()
				} 		

			},
			getPaperlist() {
				query.queryObject.$and = []
				query.contains('user_id', this.userId)
				let papers = getUserPaper(query)
				papers.then((res) => {
					this.paperList = res
				})
				let count = 0
				console.log(this.paperList.length)
				// if (this.paperList.length > 0) {
				// 	let productU = user_info.getWithoutData(this.userId)
				// 	productU.set('papered', this.paperList.length)
				// 	productU.update()
				// }
			},
		},
		async mounted() {
			this.userId = uni.getStorageSync('id')
			let total,
				batchTimes,
				tasks = []
			query.queryObject.$and = []
			query.isNotNull('topic')
			total = await question_bank
				.setQuery(query)
				.count()
				.then(
					(res) => {
						return res
					},
					(err) => {
						console.log('error')
					}
				)

			if (total) {
				batchTimes = Math.ceil(total / 1000)
			}
			for (let i = 0; i < batchTimes; i++) {
				tasks = await question_bank
					.limit(1000)
					.offset(i * 1000)
					.find()
					.then(
						(res) => {
							res.data.objects.forEach((e) => {
								this.paper.push(e)
								tasks.push(e.id)
							})
							return tasks
						},
						(err) => {
							console.log('error')
						}
					)
			}
			this.idSet = tasks
			getkeyword().then(res => {
				this.key = res
			})
		},
		async onShow() {
			// this.getPaperlist
			let key = this.userId
			this.userInfo.num = await user_info.get(key).then((res) => {
				return res.data.num_question
			})
			paper_public.find().then(res => {
				this.publicList = res.data.objects
				// console.log(res);
			})
			query.queryObject.$and = []
			user_info
				.limit(10)
				.orderBy('-num_question')
				.find()
				.then(
					(res) => {
						this.userList = []
						this.userInfo.rank = 1
						res.data.objects.forEach((e) => {
							if (this.userInfo.num < e.num_question) this.userInfo.rank++
							this.userList.push({
								name: e.name,
								num: e.num_question
							})
						})
						// this.userInfo = res.data.objects[0]
					},
					(err) => {
						console.log('error')
					}
				)

			setTimeout(() => {
				this.randomList = getRandomArrayElements(this.idSet, 10)
			}, 500)
		},
	}
</script>

<style lang="scss" scoped>
	.login {
		position: absolute;
		width: 200rpx;
		height: 100rpx;
		top: 50%;
		left: 50%;
		margin-top: -50rpx;
		margin-left: -100rpx;
	}

	.box {
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
		}
	}

	.tiaozhan {
		width: 100%;
		height: 100%;
		padding: 30rpx 0;
		background-color: #fff;
		text-align: center;

		.img {
			margin: 0 auto;
		}

		.text {
			font-size: 34rpx;
			font-weight: bold;
			color: #fbaf3c;
		}

		.btn {
			margin: 40rpx auto;
			padding: 10rpx;
			width: 300rpx;
			height: 50rpx;
			font-size: 34rpx;
			font-weight: bold;
			background-color: #fbaf3c;
		}
	}

	.rank {
		background-color: #f3f9f8;
		padding: 20rpx;
		font-weight: bold;

		.title {
			margin: 0 auto;
			font-size: 46rpx;
			text-align: center;
			color: #fbaf3c;
		}

		.rank-item {
			display: flex;
			justify-content: space-between;
			background-color: #fff;
			text-align: center;
			margin: 20rpx;
			padding: 10rpx 0;
			border-radius: 20rpx;

			.left {
				display: flex;
				font-size: 40rpx;

				view {
					padding: 10rpx 30rpx;
				}
			}

			.right {
				padding: 10rpx 30rpx;
				color: red;
			}
		}
	}

	.icon {
		display: flex;
		width: 150rpx;
		justify-content: space-around;
	}

	.time {
		font-size: 26rpx;
		color: #666;
	}

	.title {
		width: 460rpx;
		font-size: 38rpx;
		font-weight: bold;
		padding: 10rpx;
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
		padding: 6rpx;
		border-radius: 10rpx;
	}
</style>
