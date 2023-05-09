<template>
	<view class="dialog">
		<u-cell-group>
			<u-cell v-for="(item, index) in lessonlist" :key="item.id" isLink @click="
          $goBack(
            2,
            '/page_study/dialogDetail/index?lesson=' +
              item[0].text_name
          )
        ">
				<view slot="title" class="u-slot-title">
					<text class="lesson-num">{{ index }}</text>
					<!-- <u-tag text="标签" plain size="mini" type="warning"> </u-tag> -->
				</view>
			</u-cell>
		</u-cell-group>
	</view>
</template>

<script>
	import {
		groupBy
	} from '@/common/utils'
	import {
		learn_information_MCTdialogue,
		query
	} from '@/common/request.js'
	export default {
		components: {},
		data() {
			return {
				message: [],
				name: '',
				dialoglist:[]
			}
		},
		computed: {
			lessonlist() {
				let lesson = []
				if (this.dialoglist.length > 0) {
					this.dialoglist.sort(function(a, b) {
						return a.text_number - b.text_number
					})
					lesson = groupBy(this.dialoglist, 'text_name')
					// console.log(lesson)
					}
				return lesson
			},
		},
		methods: {},
		watch: {},

		// 页面周期函数--监听页面加载
		async onLoad() {
			let total,batchTimes,tasks = []
			total = await learn_information_MCTdialogue
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
				tasks = await learn_information_MCTdialogue
					.limit(1000)
					.offset(i * 1000)
					.find()
					.then(
						(res) => {
							res.data.objects.forEach((e) => {
								this.dialoglist.push(e)
							})
							return tasks
						},
						(err) => {
							console.log('error')
						}
					)
			}
		},
		// 页面周期函数--监听页面初次渲染完成
		onReady() {},
		// 页面周期函数--监听页面显示(not-nvue)
		onShow() {
			if (this.message.length > 0) {
				let t1 = {
					name: ''
				}
				t1['name'] = this.message[1].text
				// console.log(t1)
				let t = this.message[1].text
				if (t.length > 0) {
					t1['name'] = t.match(/(?<=\n)(.+?)(?=\n)/g)
					// str3['verb'] = keys.match(/(?<=（)(.+?)(?=）)/g)
				}
				// console.log(str3)
				// console.log(t1)
			}
		},
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
	.lesson-num {
		padding: 20rpx 40rpx;
		color: #999;
	}
</style>
