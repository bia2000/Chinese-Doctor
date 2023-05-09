<template>
  <view>
    <!-- <u-search :show-action="false"></u-search> -->
    <!-- <scroll-view class="nav" scroll-x="true" scroll-left="120"> -->
    <u-subsection
      :list="list"
      mode="button"
      :current="current"
      @change="change"
      activeColor="#53A5D9"
    >
    </u-subsection>
    <!-- </scroll-view> -->
    <view class="" v-if="current == 0">
      <!-- <view class="nav"> 我的教材 </view> -->
      <!-- <u-search :show-action="false"></u-search> -->
      <!-- 课本列表 -->
      <view class="contain">
				<view class="col" @click="$goBack(2, '/page_study/dialog/index')">
					<img src="@/static/images/book.jpg" alt="" />
					<view class="txt">
						MCT对话练习
					</view>
				</view>
        <view
          v-for="item in booklist"
          :key="item.id"
          class="col"
          @click="$goBack(2, '/page_study/textList/index?name=' + item)"
        >
          <img src="@/static/images/book.jpg" alt="" />
          <view class="txt">
            {{ item }}
          </view>
        </view>
      </view>
    </view>

    <view class="" v-if="current == '1'">
      <view class="" >
        <view
          class="box-item"
          v-for="item in videoList"
          :key="item.id"
          @click="
            $goBack(
              2,
              '/page_study/resourceDetail/index?path=' +
                item.path +
                '&title=' +
                item.name +
                '&type=1'
            )
          "
        ><view class="cover">
          <img :src="cover" alt="" />
</view>					
          <view class="title">
            {{ item.name }}
          </view>
        </view>
      </view>
    </view>
    <mct v-if="current == '2'"></mct>
  </view>
</template>

<script>
import {  groupBy } from 'pageCity/common/utils'
import { learn_information, MyFileCategory } from 'pageCity/common/request.js'
import mct from 'components/mct/index.vue'
export default {
  components: { mct },
  data() {
    return {
      list: ['知识学习', '多媒体资源', 'MCT大纲'],
      list1: ['图文', '视频', '音频'],
      current: 0,
      current1: 0,
      message: [],
      videoList: [],
			cover:'https://cloud-minapp-45998.cloud.ifanrusercontent.com/1pfe63girpJVCTvo.jpg'
    }
  },
  computed: {
    booklist() {
      let book = []
      let textbook = groupBy(this.message, 'textbook')
      book = Object.keys(textbook)
      // console.log(book)
      return book
    },
  },
  methods: {
    // toDetail(item) {
    //   console.log(item)
    // },
    change(index) {
      this.current = index
    },
    change1(index) {
      this.current1 = index
    },
  },
  onLoad(e) {
    if (e.current) this.current = e.current
  },
  mounted() {
    MyFileCategory.getFileList('6412908d961c5261ffd01806').then(
      (res) => {
        this.videoList = res.data.objects
        // console.log(this.videoList)
      },
      (err) => {}
    )
    learn_information
      .limit(1000)
      .find()
      .then(
        (res) => {
          this.message = res.data.objects
          // console.log(this.message[154].text)
        },
        (err) => {
          console.log('error')
        }
      )
  },
}
</script>

<style scoped lang="scss">
.nav {
  background-color: #e7f4f2;
  width: 100%;
  text-align: center;
  height: 60rpx;
  line-height: 60rpx;
  font-size: 28rpx;
  font-weight: bold;
  color: #53a5d9;
}
.contain {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .col {
    width: 26%;
    // padding-top: 40rpx;
    margin: 25rpx 20rpx;
    position: relative;
    .txt {
      font-size: 24rpx;
    }
  }
  img {
    width: 160rpx;
		height: 240rpx;
  }
  .item {
    width: 100%;
    height: 100%;
    border-radius: 20rpx;
    overflow: hidden;
    position: absolute;
    box-sizing: border-box;
    top: 0;
    display: flex;
    flex-direction: column;
  }
}

.box-item {
  display: flex;
  height: 200rpx;
  margin: 30rpx;
  padding: 20rpx;
  border-radius: 30rpx;
  background-color: #fff;
	.cover{
		width: 250rpx;
		height: 200rpx;
		image{
			width: 100%;
			height: 100%;
		}
	}
  .title {
    margin: 20rpx;
    font-size: 32rpx;
    font-weight: bold;
  }
}
</style>
