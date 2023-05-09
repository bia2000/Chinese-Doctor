<template>
  <view>
    <ss-calendar :checks="userInfo.checks"></ss-calendar>
    <u-popup
      :show="show"
      @close="show = false"
      mode="center"
      closeable
      round="10"
      width="500rpx"
      height="380rpx"
    >
      <view class="content">
        <view class="content-box">{{ titlecontent }}</view>
        <view class="txt">连续签到可增加更多积分！</view>
        <view class="icon">
          <u-icon name="checkmark-circle" color="#2979ff" size="68"></u-icon>
        </view>
      </view>
    </u-popup>
    <button type="primary" class="btn" @click="handleqd" size="medium">立即签到</button>
  </view>
</template>

<script>
import ssCalendar from '../ss-calendar/ss-calendar.vue'
import { formatDate } from '@/common/utils'
import { user_info, query, getUserInfo,getPoints,updateUserAction } from '@/common/request'
export default {
  data() {
    return {
      show: false,
      userInfo: [],
      titlecontent: '签到成功',
    }
  },
  methods: {
    handleqd() {
      let product = user_info.getWithoutData(this.userInfo.id)
      this.show = true
      let i = new Date()
      let days = this.userInfo.day
      let checksdata = this.userInfo.checks
      let today = formatDate(i, 'yyyy-MM-dd')
      // console.log(typeof );
      if (checksdata.indexOf(today) != -1) {
        this.titlecontent = '今日已签到，无需重复签到'
      } else {
				getPoints('issign',1)
				updateUserAction('count_sign',1)
        checksdata.push(today)
        days = days * 1 + 1
        product.set({
          checks: checksdata,
          day: String(days),
        })
        product.update()
      }
    },
  },
  components: {
    ssCalendar,
  },
  onLoad() {
    let userId = uni.getStorageSync('id')
    let user = getUserInfo(userId)
    user.then((res) => {
      this.userInfo = res
    })
  },
}
</script>

<style lang="scss" scoped>
.btn {
  margin: 60rpx;
}
.content {
  padding: 20rpx;
  text-align: center;
  .content-box {
    margin-top: 60rpx;
    line-height: 46rpx;
    font-size: 32rpx;
    font-weight: bolder;
  }
  .txt {
    margin: 20rpx;
  }
  .icon {
    display: inline-block;
    margin: 30rpx auto;
  }
}
</style>
