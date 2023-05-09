<template>
	<view class="abilityPortrait">
		<view  class="content">
			<echarts class="uni-ec-canvas" id="line-chart" canvas-id="multi-charts-line" :ec="ringOption"></echarts>
			<view class="text">
				<view class="">
					你的强项：{{analysis.max}}
				</view>
				<view class="">
					弱项：{{analysis.min}}
				</view>
				<view class="">
					{{analysis.time}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		updateUserAction,
		user_actions,
		query
	} from '@/common/request.js'
	// import echarts from 'c/echarts/echarts.vue'
	import echarts from "components/uni-ec-canvas/uni-ec-canvas.vue"
	export default {
		name: 'abilityPortrait',
		components: {
			echarts
			// uniEcCanvas
		},
		props: {},
		data() {
			return {
				datauser: [],
				dataList: [],
				analysis: {
					max: '',
					min: '',
					time: ''
				},
				dataMax: [{
						name: '听力',
						max: '100'
					},
					{
						name: '口语',
						max: '100'
					},
					{
						name: '阅读',
						max: '100'
					},
					{
						name: '写作',
						max: '102'
					},
					{
						name: '辅助学习',
						max: '100'
					},
					{
						name: '自主学习',
						max: '100'
					},
				]
			}
		},
		methods: {
			getIndexMAx(arr) {
			    const maxNum = Math.max(...arr)
			    const minNum = Math.min(...arr)
			    const [maxIndex, minIndex] = [arr.indexOf(maxNum), arr.indexOf(minNum)]
			    // console.log(maxNum, minNum, maxIndex, minIndex)
					return [maxIndex, minIndex]
			}
		},
		computed: {
			// analysisH() {
			// 	// let a = this.datauser.map()
			// 	if (this > 0) {
			// 		console.log(10);
			// 		return edge
			// 	}
			// },
			ringOption() {
				console.log(this.dataMax)
				return {

					option: {
						//配置维度的最大值
						radar: {
							name: {
								show: true,
								color: 'red',
							},
							//   雷达图的指示器，用来指定雷达图中的多个变量（维度）
							indicator: this.dataMax,
							shape: 'circle', //对雷达图形设置成一个圆形,可选 circle:圆形,polygon:多角形(默认)
						},
						series: [{
							type: 'radar',
							label: {
								show: true, //显示数值
							},
							areaStyle: {}, //每个雷达图形成一个阴影的面积
							data: [{
								name: '华为手机',
								value: this.datauser,
							}],
						}, ],
					},
				}
			}
		},
		onLoad() {
			let userId = uni.getStorageSync('id')
			query.queryObject.$and = []
			query.contains('userId', userId)
			user_actions.setQuery(query).find().then((res) => {
				let data_a = res.data.objects[0]
				// this.dataList = res.data.objects[0]
				if (data_a.time < 6000)
					this.analysis.time = '要更加积极学习'
				else if (data_a.time > 26000)
					this.analysis.time = '学习十分积极'
				this.datauser = [data_a.hear, data_a.oral, data_a.read, data_a.write, data_a.assist, data_a.study]
				let edge = this.getIndexMAx(this.datauser)
				this.analysis.max = this.dataMax[edge[0]].name;
				this.analysis.min = this.dataMax[edge[1]].name;
			})
		},

		onShow() {
			updateUserAction('count_record', 1)
		},
		onHide() {},
		// 页面周期函数--监听页面卸载
		onUnload() {},
	}
</script>
<style scoped lang="scss">
	.abilityPortrait {
		.content {
			width: 100%;
			height: 600rpx;
			text-align: center;
			background-color: #fff;
			.text{
				padding: 80rpx;
				background-color: #fff;
			}
			// width: 600rpx;
			// height: 600rpx;
		}

		.uni-ec-canvas {
			width: 100%;
			height: 90%;
			display: block;
		}
	}
</style>
