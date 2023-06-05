<template>
  <view class="">
    <u-subsection
      :list="titlelist"
      mode="button"
      :current="current"
      @change="change"
      activeColor="#53A5D9"
    >
    </u-subsection>
    <view v-if="current == '0'" class="content">
			<view class="list">
				<text>今日在线时间</text>
				<text>{{today_time}}min</text>
			</view>
			<view class="list">
				<text>累计在线时间</text>
				<text>{{(totalTime*1/3600).toFixed(1)}}h</text>
			</view>
      <!-- <echarts class="echarts" canvas-id="multi-charts-line" :ec='ringOption' v-if="isRouterAlive"></echarts> -->
      <view class="list" v-for="(item, index) in list" :key="index">
        <!-- 不一定拿这个
        两个数据不在同一个对象里，v-for循环拿数据的时候，取index作为下标 -->
        <text class="">{{ item.name }} </text>
        <text class="">{{item.value}}卷 </text>
      </view>
    </view>
    <view v-if="current == '1'" class="box">
      <view class="" v-for="item in paperList" :key="item.id">
        <view class="boxItem" v-if="item.flag">
          <view class="">
            <view class="title">
              {{ item.name }}
            </view>
            <view class="box-bom">
              <view class="time"> {{ time(item.created_at * 1000) }} </view>
              <view class="score"> 分数：{{ item.user_score }}/{{ item.score_paper }} </view>
            </view>
          </view>
          <view class="right">
            <!-- <view class=""> {{ item.score_paper }}分 </view> -->
            <view class="btn" @click="$goBack(2, '/page_pratice/paper/index?list=' + item.question_set+'&answer='+item.question_set_answer+'&flag=1'+'&papertype='+item.paper_type)">
              查看成绩
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
	import echarts  from "components/uni-ec-canvas/uni-ec-canvas.vue"
import { TimestampToDate } from '@/common/utils'
import { getUserPaper, query,updateUserAction,getUserInfo,user_actions } from '@/common/request'

export default {
  name: 'resultAnalysis',
  components: { echarts },
  data() {
    return {
      isRouterAlive: true,
      current: 0,
			totalTime:0,
			userInfo:{},
      paperList: [],
      titlelist: ['学习数据', '试卷成绩'],
      list: [{name:'我的做卷数',value:''},{name:'我的模考数',value:''},{name:'我的组卷数',value:''}],
    }
  },
  computed: {
		today_time(){
			let t = this.$store.state.seconds*1
			return (t/60).toFixed(1)
		},
    ringOption() {
      return {
				option:
				{
        xAxis: 
				{
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: [450, 232, 301, 734, 1090, 830, 500],
            type: 'line',
          }
        ]
      },
			}
    }
  },
  methods: {
    time(e) {
      return TimestampToDate(e)
    },
    change(index) {
      this.current = index
			// console.log(this.option);
    },

  },
  watch: {},
  mounted() {
		// console.log(this.$store.state.seconds);
  },
  // 页面周期函数--监听页面加载
  onLoad() {},
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {
		updateUserAction('count_record',1)
		let userId = uni.getStorageSync('id')
		query.queryObject.$and = []
		query.contains('user_id', userId)
		let papers = getUserPaper(query)
		papers.then((res) => {
		  this.paperList = res
		})
		let user = getUserInfo(userId)
		user.then((res) => {
		  this.userInfo = res
			this.list[0].value =res.papered
			this.list[1].value =res.public_p
			this.list[2].value =res.papers
		})
		query.queryObject.$and = []
		query.contains('userId', userId)
		user_actions.setQuery(query).find().then(res=>{
			// console.log();
			this.totalTime=res.data.objects[0].time
		})
		// console.log(this.totalTime);
	},
  // 页面周期函数--监听页面隐藏
  onHide() {},
}
</script>
<style lang="scss" scoped>
.content {
  .list {
    display: flex;
    justify-content: space-between;
    padding: 40rpx;
    color: #53a5d9;
    background-color: #e7f4f2;
  }
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

  .title {
    width: 460rpx;
    font-size: 38rpx;
    font-weight: bold;
    padding: 10rpx;
  }
  .box-bom {
    display: flex;
    font-size: 26rpx;
    color: #53a5d9;
    .time {
      margin: 0 20rpx;
      color: #666;
    }
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
    padding: 10rpx;
    border-radius: 15rpx;
  }
}
.echarts {
	padding: 40rpx;
  width: 100%;
  height: 500rpx;
	display: block;
}
</style>
