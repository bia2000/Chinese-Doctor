<template>
  <view>
    <view v-for="item in content" class="topicInfo" :key="item.id">
      <view class="title">{{ item.second_title }}</view>
      <view class="content"
        ><view v-for="text in item.content" :key="text.id">{{
          text
        }}</view></view
      >
    </view>
  </view>
</template>

<script>
import { topic_outline } from '@/common/request'
export default {
  data() {
    return {
      content: [],
      id: null,
    }
  },
  computed: {},
  methods: {},
  watch: {},
  onLoad(e) {
		console.log(e);
    this.id = e.id
  },
  // 页面周期函数--监听页面加载
  mounted(e) {
    topic_outline.find().then(
      (res) => {
        res.data.objects.forEach((i) => {
          if (i.first_title == this.id) {
            this.content.push(i)
          }
					console.log(this.content);
        })
      },
      (err) => {
        console.log('error')
      }
    )
  },
}
</script>

<style scoped>
.topicInfo {
  /* margin: 0 auto; */
  /* text-align: center; */
  width: 550rpx;
  height: 400rpx;
  margin: 30rpx auto;
  padding: 20rpx;
  font-size: 27rpx;
  text-indent: 2em;

  box-shadow: 10rpx 10rpx 5rpx #888888;
  background-color: #fff;
}
.title {
  text-align: center;
  font-weight: 700;
  font-size: 40rpx;
}
</style>
