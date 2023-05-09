<template>
  <view class="point">
    <view class="box">
      {{ totalScore }}分
      <view class="detail" @click="show = true"> 积分明细 > </view>
    </view>
    <view class="sum"> 累积积分：{{ totalScore }} </view>
    <view class="">
      <view class="top">
        <text class="title">积分规则 </text>
        <text class="">今天已获{{ todayScore }}分 </text></view
      >
      <scroll-view scroll-y="true" style="height: 600rpx">
        <view class="content" v-for="item in content" :key="item.id">
          <view class="">
            <view class="">{{ item.title }} </view><view class="desc">{{ item.desc }} </view>
          </view>
        </view>
      </scroll-view>
    </view>
    <u-popup
      :show="show"
      border-radius="40rpx"
      mode="bottom"
      length="60%"
      @close="show = false"
      closeable
    >
      <scroll-view scroll-y="true" style="height: 800rpx">
        <view class="point-detail" v-for="point in upoints" :key="point.id">
          <view class="text title">
            <text>项目</text>
            <text>积分</text>
            <text>时间</text>
          </view>
          <view class="text">
            <text>{{ content[0].title }}</text
            ><text>{{ point.issign }}</text
            ><text>{{ getTime(point.created_at) }}</text>
          </view>
          <view class="text">
            <text>{{ content[1].title }}</text
            ><text>{{ point.isarticle }}</text
            ><text>{{ getTime(point.created_at) }}</text>
          </view>
          <view class="text">
            <text>{{ content[2].title }}</text
            ><text>{{ point.isvideo }}</text
            ><text>{{ getTime(point.created_at) }}</text>
          </view>
          <view class="text">
            <text>{{ content[3].title }}</text
            ><text>{{ point.isanswer }}</text
            ><text>{{ getTime(point.created_at) }}</text>
          </view>
          <view class="text">
            <text>{{ content[4].title }}</text
            ><text>{{ point.isspecial }}</text
            ><text>{{ getTime(point.created_at) }}</text>
          </view>
          <view class="text">
            <text>{{ content[5].title }}</text
            ><text>{{ point.ismatch }}</text
            ><text>{{ getTime(point.created_at) }}</text>
          </view>
          <view class="text">
            <text>{{ content[6].title }}</text
            ><text>{{ point.iscollect }}</text
            ><text>{{ getTime(point.created_at) }}</text>
          </view>
          <view class="text">
            <text>{{ content[7].title }}</text
            ><text>{{ point.isshare }}</text
            ><text>{{ getTime(point.created_at) }}</text>
          </view>
          <!-- 		  	<view class="" v-for="item,index in point" :key="item.id">
		  		<view class="" v-if="item <1000">
		  			{{index +":"+ item}}
		  		</view>
		  	</view> -->
        </view>
      </scroll-view>
    </u-popup>
  </view>
</template>

<script>
import { TimestampToDate } from '@/common/utils'
import { points, query } from '@/common/request'
import upload from '../../uni_modules/uview-ui/libs/config/props/upload'
export default {
  name: 'point',
  components: {},
  props: {},
  data() {
    return {
      points: {},
      upoints: [],
      show: false,
      content: [
        { title: '登录', desc: '1分/每日首次登录' },
        { title: '阅读文章', desc: '1分/每有效阅读文章一篇， 上限6分' },
        { title: '视听学习', desc: '1分/每有效视听视频或音频1次，上限6分' },
        { title: '每日答题', desc: '每组答题每答对1题积1分' },
        {
          title: '专项答题',
          desc: '每组答题每答对1题积1分，同组答题不重复积分',
        },
        { title: '挑战答题', desc: '每组答题每答对1题积1分' },
        { title: '收藏', desc: '1分/每日收藏2次' },
        { title: '分享', desc: '1分/每日分享1次' },
        { title: '评论', desc: '1分/每日评论1次' },
      ],
    }
  },
  computed: {
    todayScore() {
      let p = this.points
      return (
        p.isarticle +
        p.issign +
        p.isvideo +
        p.isanswer +
        p.isspecial +
        p.ismatch +
        p.iscollect +
        p.isshare
      )
    },
    totalScore() {
      if (this.upoints.length > 0) {
        let total = this.upoints.reduce((sum, p) => {
          // console.log(sum,p);
          return (
            sum +
            p.isarticle +
            p.issign +
            p.isvideo +
            p.isanswer +
            p.isspecial +
            p.ismatch +
            p.iscollect +
            p.isshare
          )
        }, 0)
        return total
      }
    },
  },
  methods: {
    getTime(e) {
      // console.log(typeof(111));
      return TimestampToDate(e * 1000)
    },
  },
  watch: {},
  async onShow() {
    let pointsid = uni.getStorageSync('pointsid')
    points.get(pointsid).then((res) => {
      this.points = res.data
    })
    this.userId = uni.getStorageSync('id')
    console.log(this.userId)
    // let todays = new Date(new Date(new Date().toLocaleDateString()).getTime())
    query.queryObject.$and = []
    query.contains('userId', this.userId)
    this.upoints = await points
      .setQuery(query)
      .find()
      .then((res) => {
        return res.data.objects
      })
    // console.log(this.upoints);
  },
  // 页面周期函数--监听页面加载
  onLoad() {
    uni.setNavigationBarTitle({
      title: '我的积分',
    })
  },
}
</script>

<style scoped lang="scss">
.box {
  height: 250rpx;
  text-align: center;
  font-size: 50rpx;
  font-weight: bold;
  color: #fff;
  padding: 40rpx 0;
  border-bottom-left-radius: 100rpx;
  border-bottom-right-radius: 100rpx;

  background-color: #53a5d9;
  .detail {
    margin: 20rpx 0;
    font-size: 26rpx;
  }
}
.sum {
  height: 120rpx;
  width: 600rpx;
  margin: -100rpx auto 0 auto;
  background-color: #e7f4f2;
  border-radius: 30rpx;
  padding: 30rpx;
  color: #fbaf3c;
  font-weight: 600;
}
.top {
  display: flex;
  justify-content: space-between;
  margin: 40rpx 28rpx;
}
.title {
  font-size: 36rpx;
  font-weight: 700;
}
.content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0rpx 28rpx;
  padding: 10rpx 0;
  border-top: 2rpx solid;
  .desc {
    font-size: 28rpx;
    color: #999;
  }
  .btn {
    background-color: #53a5d9;
    color: #fff;
    border-radius: 30rpx;
    align-items: center;
    height: 60rpx;
    line-height: 60rpx;
    width: 140rpx;
    text-align: center;
  }
}
.point-detail {
  margin-top: 60rpx;
  margin-left: 80rpx;
	padding: 30rpx;
  width: 600rpx;
  text-align: right;
  .text {
    width: 100%;
    display: flex;
    justify-content: space-between;
    text {
      width: 150rpx;
    }
  }
	.title{
		font-weight: bold;
	}
}
</style>
