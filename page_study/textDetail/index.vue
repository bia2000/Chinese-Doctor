<template>
  <view class="textDetail">
    <u-subsection
      :list="list"
      mode="button"
      :current="current"
      @change="change"
      activeColor="#53A5D9"
    >
    </u-subsection>
    <view v-if="current == 0">
      <view class="table">
        <view class="tr">
          <view class="th">词</view>
          <view class="th">词性</view>
        </view>
        <view v-for="item in keyWords" :key="item.id" class="">
          <view class="tr">
            <view class="td">{{ item.name }}</view>
            <view class="td">{{ item.verb }}词</view>
          </view>
        </view>
      </view>
    </view>
    <view class="" v-if="!iscontent">
      <view class="theme" v-if="current == 1">
        <view class="title"> 对话主题 </view>
        <u-cell-group>
          <u-cell
            v-for="item in message"
            :key="item.id"
            isLink
            border-gap
            class="cell"
            @click="toDetail(item)"
          >
            <view slot="title">
              <text class="lesson-num" v-if="item.theme">{{ item.theme }}</text>
							<text class="lesson-num" v-if="item.topic">{{ item.topic }}</text>
            </view>
          </u-cell>
        </u-cell-group>
      </view>
    </view>
    <view class="" v-if="iscontent">
      <view class="nav">
        <view class="back">
          <u-icon name="arrow-left" class="" @click="goback"></u-icon>
        </view>

        <text class="title">
          {{ theme }}
        </text>
      </view>
      <view class="content">
        <!-- <view class="" v-for="item in message" :key="item.id"> -->
				<text>
            {{ message[1].text }}
          </text
        >
        <!-- </view> -->
      </view>
    </view>
  </view>
</template>

<script>
import { groupBy, trimAll } from '@/common/utils'
import { learn_information, query,point,updateUserAction } from '@/common/request.js'
export default {
  components: {},
  data() {
    return {
      list: ['关键词', '对话'],
      current: 0,
      message: [],
      iscontent: false,
      theme: '',
    }
  },
  computed: {
    keyWords() {
      let keys = ''
      if (this.message.length > 0) {
        keys = this.excludeSpecial(this.message[0].keywords||this.message[1].keywords||this.message[2].keywords)
        var str4 = [],
          str3 = { name: '', verb: '' }
        keys = trimAll(keys)
        if (keys.length > 0) {
          str3['name'] = keys.match(/(?<=\.)(.+?)(?=（)/g)
          str3['verb'] = keys.match(/(?<=（)(.+?)(?=）)/g)
        }
        // console.log(str3)
        for (let i = 0; i < str3.name.length; i++) {
          str4.push({ name: str3.name[i], verb: str3.verb[i] })
        }
        // console.log(str4)
        return str4
      }
    },
  },
  methods: {
    change(index) {
      this.current = index
			if(index == 0)this.iscontent = false
    },
    goback() {
      this.iscontent = false
    },
    excludeSpecial(s) {
      // 去掉转义字符
      s = s.replace(/[\'\"\\\/\b\f\n\r\t]/g, '')
      // 去掉特殊字符
      // s = s.replace(/[\@\#\$\%\^\&\*\{\}\:\"\L\<\>\?]/)
      return s
    },
    toDetail(e) {
      if (e.theme) this.theme = e.theme
      else this.theme = e.topic
      this.iscontent = true
      // console.log(this.message[0].text)
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(e) {
    query.queryObject.$and = []
    query.contains('textbook', e.book)
    query.contains('lesson', e.lesson)
    learn_information
      .setQuery(query)
      .limit(100)
      .find()
      .then((res) => {
				console.log(res);
        this.message = res.data.objects
        // console.log(this.message)
      })

    uni.setNavigationBarTitle({
      title: e.lesson + ' ' + e.lesson_name,
    })
  },
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {
		updateUserAction('count_word',1)
		
	},
  // 页面周期函数--监听页面隐藏
  onHide() {
	},
  // 页面周期函数--监听页面卸载
  onUnload() {
		updateUserAction('num_word',this.keyWords.length)
	},
}
</script>

<style scoped lang="scss">
.table {
  text-align: center;
  margin: 40rpx auto;
  width: 700rpx;
  border-collapse: collapse;
  border-spacing: 0;
  border: 1px solid rgba(201, 201, 201, 1);
  .th {
    font-weight: bold;
    width: 400rpx;
    border: 1px solid rgba(201, 201, 201, 1);
    padding: 10rpx;
  }
  .tr {
    display: flex;
  }
  .td {
    width: 400rpx;
    border: 1px solid rgba(201, 201, 201, 1);
    padding: 10rpx;
  }
}
.theme {
  padding-top: 80rpx;
  .title {
    font-size: 40rpx;
    margin: 15rpx;
  }
  .cell {
    // height: 60rpx;
    // line-height: 60rpx;
    margin: 15rpx;
    border: 2rpx solid #999;
    border-radius: 10rpx;
  }
}
.nav {
  // margin-top: 20rpx;
  background-color: #e7f4f2;
  height: 70rpx;
  line-height: 70rpx;
  font-size: 36rpx;
  font-weight: bold;
  text-align: center;
  .back {
    display: inline-block;
    float: left;
    margin: 20rpx;
    // align-items: center;
  }
}
	.content {
		margin: 20rpx 40rpx;

		.text {
			padding: 10rpx 20rpx;
		}
	}
</style>
