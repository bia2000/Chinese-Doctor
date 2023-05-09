<template>
	<div class="inform">
		<u-cell-group class="group">
			<u-cell class="text" v-for="item in notices" :key="item.id" :title="item.title"
				:value="getTime(item.created_at)" :isLink="true" :label="ellipsis(item.content)" @click="$goBack(2, '/page_mine/informDetail/index?id='+item.id)"></u-cell>
		</u-cell-group>
	</div>
</template>

<script>
	import {
		notice
	} from '@/common/request.js'
	import {
		TimestampToDate
	} from '@/common/utils.js'
	export default {
		name: 'inform',
		components: {},
		props: {},
		data() {
			return {
				notices: []
			}
		},
		computed: {

		},
		methods: {
			getTime(e) {
				return TimestampToDate(e * 1000)
			},
			ellipsis(value){
				if (!value) return '';
				if (value.length > 10) {
					return value.slice(0,10) + '...'
				}
				return value
			}
		},
		watch: {},

		// 页面周期函数--监听页面加载
		onLoad() {
			notice.find()
				.then(res => {
					this.notices = res.data.objects
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

<style scoped>
</style>
