<template>
	<view class="zujuanDetail">
		<view v-if="paper.length > 0">
			<view class="">
				<view @change="radioGroupChange" class="content" v-for="(item, index) in paper" :key="index">
					<view class="options-item" @click="radioChange(item.check, index)">{{
            title(item)
          }}</view>
					<view class="question">
						{{ item.question }}({{ item.score }}分)
					</view>
					<view class="" v-if="item.question_content.length > 20"><text>{{ item.question_content }}</text>
					</view>
					<view class="" v-if="
              item.question_content.length > 10 &&
              item.question_content.length < 20
            ">
						<image :src="getFile(item.question_content)" alt="" />
					</view>
					<view v-if="item.question_content.length < 10">
						<audioView :audioUrl="getFile(item.question_content)"></audioView>
					</view>
					<view class="option" v-for="opt in options[index]" :key="opt.id">
						{{ opt }}
					</view>
					<view class="btn">
						<view class="btn-item" @click="clickUp(index)">上移</view>
						<view class="btn-item" @click="clickDown(index)">下移</view>
						<view class="btn-item" @click="clickDelete(index)">删除</view>
					</view>
				</view>
			</view>
		</view>
		<view class="buttom">
			<view class="right">
				<view class="">
					<view class="count">
						合计：<view>{{ paper.length }}题 </view> 共：<view>{{ score_question }}分</view>
					</view>
					<view class="detail" @click="getDetail"> 查看明细 </view>
				</view>
				<view class="compose" @click="toCompose"> 组卷 </view>
			</view>
		</view>
		<u-popup :show="show" border-radius="40rpx" mode="bottom" length="60%" @close="show = false" closeable>
			<view class="detail-info">
				<u-subsection :list="list" mode="button" :current="current" @change="change" activeColor="#53A5D9">
				</u-subsection>
				<view class="" v-if="current == 0">
					<view class="" v-if="isAlive">
						<echarts class="echarts" force-use-old-canvas="true" :ec="option2" canvas-id="multi-charts-line"
							v-if="isAlive"></echarts>
					</view>
					<view class="" v-if="isAlive">
						<echarts class="echarts" force-use-old-canvas="true" :ec="option1" canvas-id="multi-charts-line"
							v-if="isAlive"></echarts>
					</view>
				</view>
				<view class="" v-if="current == 1">
					<view class="" v-if="isAlive">
						<echarts class="echarts" force-use-old-canvas="true" :ec="option3" canvas-id="multi-charts-line"
							v-if="isAlive"></echarts>
						<view class="sum">
							<view class="total">
								总题量：{{ paper.length }}题 总分：{{ score_question }}分
							</view>
							<view class="">
								<view class="" v-for="(item_q, index) in type_question" :key="item_q.id">
									{{ ToCapital(index + 1) + '、' + item_q.name }}(共{{
                    item_q.value
                  }}道题，共{{ score_q[index].value }}分)
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- <echarts class="echarts" :option="option" v-if="isRouterAlive"></echarts> -->
			</view>
		</u-popup>
		<u-popup :show="isShow" border-radius="20rpx" mode="bottom" length="60%" @close="show = false">
			<u-cell-group>
				<u-cell title="导出为pdf文件" icon="file-text-fill" isLink></u-cell>
				<u-cell title="导出为word文件" icon="file-text-fill" isLink></u-cell>
			</u-cell-group>
			<u-button class="" size="large" @click="isShow = false">取消</u-button>
		</u-popup>
		<u-modal :show="show2" title="提示" confirm-text="放入试卷库" cancel-text="导出试卷" @confirm="setPaper"
			@cancel="exportPaper" showCancelButton>
			<input type="text" v-model="paperTitle" placeholder="请输入试卷标题">
		</u-modal>
	</view>
</template>

<script>
	import {
		paper_user,
		paper_public,
		question_bank,
		user_info,
		updateuserInfo
	} from '@/common/request'
	import {
		trimAll,
		TimestampToDate,
		numToCapital,
	} from '@/common/utils'
	import echarts from 'components/uni-ec-canvas/uni-ec-canvas.vue'
	import audioView from 'components/audioView'
	export default {
		components: {
			audioView,
			echarts
		},
		data() {
			return {
				show: false,
				show2: false,
				isAlive: true,
				paperTitle: '',
				current: 0,
				list: ['题目明细', '分数结构'],
				today: Number(new Date()),
				paper: [],
				idList: [],
				isShow: false,
			}
		},
		computed: {
			type_question() {
				let name = ['听力', '阅读', '写作']
				let value = [0, 0, 0]
				this.paper.map((e) => {
					name.map((n, index) => {
						if (e.primary_ques_type == n) value[index]++
					})
				})
				let type = []
				for (let i in name)
					type.push({
						name: name[i],
						value: value[i],
					})
				return type
			},
			grade_question() {
				let name = ['一级', '二级', '三级']
				let value = [0, 0, 0]
				let reg
				this.paper.map((e) => {
					name.map((n, index) => {
						reg = new RegExp(`${n}`)
						if (reg.test(e.grade_standard)) value[index]++
					})
				})
				let grade = []
				grade['name'] = name
				grade['value'] = value
				return grade
			},
			score_q() {
				let name = ['听力', '阅读', '写作']
				let value = [0, 0, 0]
				this.paper.map((e) => {
					name.map((n, index) => {
						if (e.primary_ques_type == n) value[index] += e.score * 1
					})
				})
				// console.log(name)
				let score = []
				for (let i in name)
					score.push({
						name: name[i],
						value: value[i],
					})
				return score
			},
			option1() {
				return {
					option: {

						// 注意：饼图不是直角坐标系图表，就不用配置x轴和y轴了
						series: [{
							type: 'pie',
							data: this.type_question,
						}, ],
						tooltip: {
							trigger: 'item',
							backgroundColor: 'rgba(32, 33, 36,.7)',
							borderColor: 'rgba(32, 33, 36,0.20)',
							borderWidth: 1,
							textStyle: {
								// 文字提示样式
								color: '#fff',
								fontSize: '12',
							},
						},
					}
				}
			},
			option2() {
				return {
					option: {
						xAxis: {
							type: 'value',
						},
						yAxis: {
							type: 'category',
							data: this.grade_question.name,
						},
						series: [{
							type: 'bar',
							data: this.grade_question.value,
						}, ],
						tooltip: {
							show: true,
							trigger: 'item',
							backgroundColor: 'rgba(32, 33, 36,.7)',
							borderColor: 'rgba(32, 33, 36,0.20)',
							borderWidth: 1,
							textStyle: {
								// 文字提示样式
								color: '#fff',
								fontSize: '12',
							},
						},
					}
				}
			},
			option3() {
				return {
					option: {

						// 注意：饼图不是直角坐标系图表，就不用配置x轴和y轴了
						series: [{
							type: 'pie',
							data: this.score_q,
						}, ],
						tooltip: {
							trigger: 'item',
							backgroundColor: 'rgba(32, 33, 36,.7)',
							borderColor: 'rgba(32, 33, 36,0.20)',
							borderWidth: 1,
							textStyle: {
								// 文字提示样式
								color: '#fff',
								fontSize: '12',
							},
						},
					}
				}
			},
			score_question() {
				let score = 0
				this.paper.forEach((e) => {
					score += e.score * 1
				})
				return score
			},
			options() {
				var str3 = null
				var str = []
				var str = this.paper.map((e) => {
					return e.options
				})
				// console.log(str)
				if (this.paper.length > 0) {
					str3 = str.map((e) => {
						var str1 = trimAll(e)
						let r1 = new RegExp('(?<=(content":")).*?(?=("))','g')
						if (str1) var code1 = str1.match(r1)
						return code1
					})
				}
				// console.log(str3)
				return str3
			},
		},
		methods: {
			change(index) {
				this.current = index
				this.reloadAll()
			},
			getDetail() {
				this.show = true
			},
			ToCapital(e) {
				return numToCapital(e)
			},
			reloadAll() {
				this.isAlive = false
				this.$nextTick(() => {
					this.isAlive = true
				})
			},
			title(item) {
				return item.primary_ques_type + '-' + item.secondary_ques_type
			},
			getFile(url) {
				return 'https://cloud-minapp-45998.cloud.ifanrusercontent.com/' + url
			},
			clickUp(index) {
				if (index > 0) {
					let arr = this.paper
					arr.splice(index - 1, 1, ...arr.splice(index, 1, arr[index - 1]))
					let idArr = this.idList
					idArr.splice(index - 1, 1, ...idArr.splice(index, 1, idArr[index - 1]))
				}
				// console.log(this.paper[index])
			},
			clickDown(index) {
				if (index < this.paper.length) {
					let arr = this.paper
					arr.splice(index, 1, ...arr.splice(index + 1, 1, arr[index]))
					let idArr = this.idList
					idArr.splice(index, 1, ...idArr.splice(index + 1, 1, idArr[index]))
				}
			},
			clickDelete(index) {
				let arr = this.paper
				arr.splice(index, 1)
				let idArr = this.idList
				idArr.splice(index, 1)
			},
			updateData() {
				let scoreList = []
				this.paper.map((e) => {
					let product = question_bank.getWithoutData(e.id)
					e.num_use = e.num_use * 1 + 1
					product.set('num_use', String(e.num_use))
					product.update()
					scoreList.push(e.score)
				})
				let userId = uni.getStorageSync('id')
				if (userId == '64646d1473e26ce437aeb672') {
					let paperUser = paper_public.create()
					paperUser.set({
						user_id: userId,
						question_set: this.idList,
						score_paper: String(this.score_question),
						question_set_score: scoreList,
						name: this.paperTitle,
					})
					paperUser.save()
				} else {
					let paperUser = paper_user.create()
					paperUser.set({
						user_id: userId,
						question_set: this.idList,
						score_paper: String(this.score_question),
						question_set_score: scoreList,
						name: this.paperTitle,
					})
					paperUser.save()
				}
			},
			setPaper() {
				if(this.paperTitle.length>1){
				this.updateData()
				uni.reLaunch({
					url: '/pages/pratice/pratice'
				})
				}else{
					uni.showToast({
						icon:'none',
						title:'请填写一个标题'
					})
				}
			},
			exportPaper() {
				this.updateData()
				this.show2 = false
				this.isShow = true
			},
			toCompose() {
				this.show2 = true
				updateuserInfo('papers')
			},
		},
		watch: {},

		// 页面周期函数--监听页面加载
		onLoad() {
			this.paper = this.$store.state.question_set
			this.paper.forEach((e) => {
				this.idList.push(e.id)
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
	.zujuanDetail {
		padding: 10rpx;
		padding-bottom: 100rpx;

		.content {
			padding: 20rpx;
			border: 2rpx solid #999;
			border-radius: 40rpx;
			margin: 30rpx 0;
			font-size: 30rpx;

			.score {
				display: flex;

				input {
					margin: 0 10rpx;
					width: 60rpx;
					border-bottom: 2rpx solid;
					text-align: center;
				}
			}

			.question {
				text-indent: 2em;
				padding: 10rpx 0;
			}

			.options-item {
				font-size: 34rpx;
				font-weight: bold;
				width: 100%;
			}

			.option {
				display: inline-block;
				font-size: 26rpx;
				margin: 10rpx 20rpx;
				width: 120rpx;
				text-align: center;
			}
		}

		.btn {
			display: flex;
			border-top: 1px solid #999;
			margin-top: 15rpx;

			.btn-item {
				width: 200rpx;
				padding: 0 20rpx;
				text-align: center;
			}
		}

		.detail-info {
			padding: 20rpx;

			.echarts {
				margin-top: 10rpx;
				width: 100%;
				height: 360rpx;
				display: block;
			}

			.sum {
				padding: 20rpx;

				view {
					margin: 10px;
					font-weight: bold;
				}

				.total {
					font-size: 36rpx;
				}
			}
		}

		.buttom {
			position: fixed;
			display: flex;
			height: 100rpx;
			width: 100%;
			bottom: 5rpx;
			font-weight: bold;
			background-color: #fff;

			.radio {
				line-height: 100rpx;
				font-size: 30rpx;
				color: #999;
			}

			.right {
				// float: right;
				display: flex;
				position: absolute;
				align-items: center;
				right: 50rpx;
				font-size: 24rpx;

				.detail {
					padding: 5rpx;
					font-weight: bold;
					color: #53a5d9;
				}

				.count {
					line-height: 60rpx;
					display: flex;

					view {
						padding: 0 10rpx;
						font-size: 36rpx;
						color: #53a5d9;
					}
				}

				.compose {
					color: #fff;
					background-color: #53a5d9;
					font-size: 26rpx;
					width: 100rpx;
					height: 40rpx;
					margin: 10rpx;
					padding: 6rpx;
					border-radius: 30rpx;
					text-align: center;
				}
			}
		}
	}
</style>
