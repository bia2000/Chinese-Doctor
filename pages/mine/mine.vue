<template>
  <view>
		<button class="login" type="primary" size="default" @click="$goBack(2, '/pageCity/login/index')" v-if="!userId">
			点击登录
		</button>
		<view class="" v-if="userId">
    <view class="top"
      ><view class="user" @click="$goBack(2, '/page_mine/userInfo/index')">
        <u-avatar :src="src" size="80"></u-avatar><text class="name">{{ userInfo.name }}</text>
      </view>
      <view class="top-content">
        <view @click="$goBack(2, '/page_mine/sign/index')"
          ><view class="number">{{ userInfo.day }}</view
          ><view>已累计打卡</view></view
        >
        <view @click="$goBack(2, '/page_mine/learningRecord/index?type=2')"
          ><view class="number">{{ userInfo.papered }}</view
          ><view>做卷总卷数</view></view
        >
      </view></view
    >
    <u-cell-group class="group">
      <u-cell
        title="收藏"
        icon="star-fill"
        :isLink="true"
        @click="$goBack(2, '/page_mine/favorites/index')"
      ></u-cell>
      <u-cell
        title="积分"
        icon="rmb-circle-fill"
        :isLink="true"
        @click="$goBack(2, '/page_mine/point/index')"
      ></u-cell>
    </u-cell-group>
    <u-cell-group class="group">
      <u-cell
        title="成绩分析"
        icon="file-text"
        :isLink="true"
        @click="$goBack(2, '/page_mine/resultAnalysis/index')"
      ></u-cell>
      <u-cell
        title="能力画像"
        icon="account"
        :isLink="true"
        @click="$goBack(2, '/page_mine/abilityPortrait/index')"
      ></u-cell>
    </u-cell-group>
    <u-cell-group class="group">
      <u-cell
        title="学习记录"
        icon="clock"
        :isLink="true"
        @click="$goBack(2, '/page_mine/learningRecord/index?type=1')"
      ></u-cell>
      <u-cell
        title="通知"
        icon="chat"
        :isLink="true"
        @click="$goBack(2, '/page_mine/inform/index')"
      ></u-cell>
    </u-cell-group>
  </view>
	</view>
</template>

<script>
import { getUserInfo, updateUserAction} from 'pageCity/common/request'
export default {
  data() {
    return {
      userInfo: [],
			userId:'',
      src: 'https://cloud-minapp-45998.cloud.ifanrusercontent.com/new_2.jpg',
    }
  },
  methods: {},
  onShow() {
		// console.log(this.$store.state.seconds);
    this.userId = uni.getStorageSync('id')
    let user = getUserInfo(this.userId)
		// console.log(userId);
    user.then((res) => {
      this.userInfo = res
			
    })
		
  },
}
</script>

<style scoped lang="scss">
	.login {
		position: absolute;
		width: 200rpx;
		height: 100rpx;
		top: 50%;
		left: 50%;
		margin-top: -50rpx;
		margin-left: -100rpx;
	}
	
.group {
  background-color: #fff;
  margin: 30rpx;
  border-radius: 25rpx;
}
.top {
  background-color: #53a5d9;
  .user {
    display: flex;
    align-items: center;
    font-size: 40rpx;
    padding: 30rpx;
    color: #fff;
    .name {
      padding: 18px;
    }
  }

  .top-content {
    display: flex;
    justify-content: space-around;
    font-size: 20rpx;
    text-align: center;
    color: #fff;
    padding: 30rpx;
    .number {
      font-size: 40rpx;
    }
  }
}
</style>
