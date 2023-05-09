<template>
  <view class="articleList">
    <view v-for="item in detail" :key="item.id" class="boxlist">
      <img :src="item.pic" alt="" />
      <view>{{ item.title }}</view></view
    >
  </view>
</template>

<script>
export default {
  name: 'articleList',
  props: ['detail'],
  data() {
    return {}
  },
  computed: {},
  methods: {},
  watch: {},

  // 组件周期函数--监听组件挂载完毕
  mounted() {},
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
  /* display: flex; */
  padding-top: 20rpx;
}
.boxlist {
  display: flex;
  justify-content: space-between;
  margin: 20rpx;
  padding: 10rpx;
  border-radius: 20rpx;
  background-color: #fff;
}
.boxlist img {
  width: 150rpx;
  height: 120rpx;
}
</style>
