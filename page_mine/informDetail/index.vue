<template>
	<view class="informDetail">
		<view class="title">
			{{notice.title}}
		</view>
		<view class="time">
			{{getTime(notice.created_at)}}
		</view>
		<view class="content">
			{{notice.content}}
		</view>
	</view>
</template>

<script>
	import {
		notice
	} from '@/common/request.js'
	import {
		TimestampToDate
	} from '@/common/utils.js'
	export default {
		data() {
			return {
				notice:{}
			}
		},
		methods: {
			getTime(e){
				return TimestampToDate(e*1000)
			}
		},
		onLoad(e) {
			console.log(e);
			notice.get(e.id).then(res=>{
				this.notice = res.data
				// console.log(res.data);
			})
		}
	}
</script>

<style scoped lang="scss">
.informDetail{
	.title{
		font-size: 40rpx;
		font-weight: bold;
		text-align: center;
		margin: 40rpx 0;
	}
	.time{
		color: #999;
		font-size: 26rpx;
		text-align: center;
	}
	.content{
		margin: 60rpx;
		// text-align: center;
	}
}
</style>
