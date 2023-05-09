<template>
  <view class="articleList">
    <view v-for="item in detail" :key="item.id" class="boxlist" @click="$goBack(2, '/pageCity/articleDetial/index?id='+item.id+'&type='+ type)">
      <img :src="item.img_url" alt="" v-if="item.img_url" />
      <view class=""><view class="title">
      	{{item.title}}
      </view>
			<view class="bottom">
			<text class="author" v-if="item.author">
      	{{item.author}}
      </text>
			<text class="time">
      	{{getTime(item.created_at)}}
      </text>
			</view>
			</view>
		</view>
  </view>
</template>

<script>
	import {
		TimestampToDate
	} from '@/common/utils'
export default {
  name: 'articleList',
  props: ['detail','type'],
  data() {
    return {}
  },
  computed: {},
  methods: {
		getTime(e){
			return TimestampToDate(e*1000)
		}
	},
  watch: {},

  // 组件周期函数--监听组件挂载完毕
  onLoad(e) {
		// console.log(e);
		// uni.setNavigationBarTitle({
		// 	title: '新的标题'
		// });
	},
  // 组件周期函数--监听组件数据更新之前
  beforeUpdate() {},
  // 组件周期函数--监听组件数据更新之后
  updated() {},
  // 组件周期函数--监听组件激活(显示)
  activated() {},
  // 组件周期函数--监听组件停用(隐藏)
  deactivated() {},
  // 组件周期函数--监听组件销毁之前
  beforeDestroy() {},
}
</script>

<style scoped>
.articleList {
	/* width: 100%; */
	height: 100%;
  padding: 20rpx;
}
.boxlist {
  display: flex;
  /* justify-content: space-between; */
  margin: 5% 3%;
  padding: 10rpx;
  border-radius: 20rpx;
  background-color: #fff;
}
.boxlist img {
  width: 150rpx;
  height: 120rpx;
}
.title{
	margin-left: 60rpx;
}
.bottom{
	margin: 20rpx 40rpx;
	display: flex;
	justify-content: space-between;
	font-size: 24rpx;
	color: #999;
}
</style>
