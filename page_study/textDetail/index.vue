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
					<view class="th">
						英文
					</view>
        </view>
        <view v-for="item in keyWords" :key="item.id" class="">
          <view class="tr">
            <view class="td"><view class="">
            	{{getPinYin(item.name)}}
            </view> {{ item.name }}</view>
            <view class="td">{{ item.verb }}词</view>
						<view class="td">
							{{item.english}}
						</view>
          </view>
        </view>
      </view>
    </view>
    <view class="" v-if="!iscontent">
      <view class="theme" v-if="current == 1">
        <view class="title"> 对话主题 </view>
        <u-cell-group>
          <u-cell
            v-for="item,index in message"
            :key="item.id"
            isLink
            border-gap
            class="cell"
            @click="toDetail(item,index)"
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
			<u-subsection
			  :list='list1'
			  mode="button"
			  :current="current1"
			  @change="change1"
			  activeColor="#53A5D9"
			>
			</u-subsection>
      <view class="content" v-if="current1==0">
        <view class="" v-for="item,index in message" :key="item.id">
					<view class="sentence" v-for="item1 in getSentence(message[index].text)" :key="item1.id">

				<text class="content_text" v-if="index==themenums" v-for="i in getWordNum(item1)" :key="i.id">
				    <text class="pinyin">{{getPinYin(i)}}</text> {{i}} <text v-if="i=='我'"> </text>
				  </text>
			<!-- 	<text v-if="index==themenums">
            {{ message[index].text }}
          </text> -->
					</view>

        </view>
      </view>
			<view class="content" v-if="current1==1">
				<view class="" v-for="item,index in message" :key="item.id">
					<view class="sentence" v-for="item1 in getSentence(message[index].Eng_text)" :key="item1.id">{{item1}}</view>
				</view>
			</view>
    </view>
  </view>
</template>

<script>
import { pinyin } from 'pinyin-pro';
import { groupBy, trimAll } from '@/common/utils'
import { learn_information, query,point,updateUserAction } from '@/common/request.js'
export default {
  components: {},
  data() {
    return {
      list: ['关键词', '对话'],
      list1: ['中文', 'English'],
      current: 0,
      current1: 0,
      message: [],
      iscontent: false,
      theme: '',
			themenums:'',
			hh:'\n'
    }
  },
  computed: {
    keyWords() {
      let keys = ''
      if (this.message.length > 0) {
        keys = this.excludeSpecial(this.message[0].keywords||this.message[1].keywords||this.message[2].keywords)
        console.log(keys);
				var str4 = [],
          str3 = { name: '', verb: '' }
        keys = trimAll(keys)
        if (keys.length > 0) {
          // let r1 = new RegExp('(?<=\.)(.+?)(?=（)','g')
					// let r2 = new RegExp('(?<=（)(.+?)(?=）)','g')
					// let r3 = new RegExp('(?<=\[)(.+?)(?=\])','g')
          // str3['name'] = keys.match(r1)
          // str3['verb'] = keys.match(r2)
					// str3['english'] = keys.match(r3)
          // str3['name'] = keys.match(/(?<=\.)(.+?)(?=（)/g)
          // str3['verb'] = keys.match(/(?<=（)(.+?)(?=）)/g)
					// str3['english'] = keys.match(/(?<=\[)(.+?)(?=\])/g)
          let r1 = /\.([^（]+)（/g
					let r11 = /\.([^（]+)（/
					let r2 = /（([^）]+)）/g;
					let r22 = /（([^）]+)）/;
          let r3 = /\[([^\]]+)\]/g;
					let r33 = /\[([^\]]+)\]/;
          let arr11 = keys.match(r1)
					str3['name'] = arr11.map(e=>{
              return e.match(r11)[1]
            })
					// let arr = e[0].keywords.match(/(?<=\.)(.+?)(?=（)/g)
					let arr22 = keys.match(r2)
					str3['verb'] = arr22.map(e=>{
              return e.match(r22)[1]
            })
					let arr33 = keys.match(r3)
          str3['english'] = arr33.map(e=>{
              return e.match(r33)[1]
            })
        }
        // console.log(str3)
        for (let i = 0; i < str3.name.length; i++) {
					// console.log(4);
          str4.push({ name: str3.name[i], verb: str3.verb[i] ,english:str3.english[i]})
        }
        // console.log(str4)
        return str4
      }
    },
  },
  methods: {
		getSentence(e){
			return e.split("*");
		},
		getWordNum(e){
			// console.log(e);
			return e.split("")
		},
		getPinYin(e){
			return pinyin(e)
		},
    change(index) {
      this.current = index
			if(index == 0)this.iscontent = false
    },
		change1(index) {
		  this.current1 = index
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
    toDetail(e,i) {
			this.themenums = i
      if (e.theme) this.theme = e.theme
      else this.theme = e.topic
      this.iscontent = true
      // console.log(this.message[0].text)
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(e) {
		// console.log(e);
    query.queryObject.$and = []
    query.contains('textbook', e.book)
    query.contains('lesson', e.lesson)
    learn_information
      .setQuery(query)
      .limit(100)
      .find()
      .then((res) => {
				// console.log(res);
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
    width: 240rpx;
    border: 1px solid rgba(201, 201, 201, 1);
    padding: 10rpx;
  }
  .tr {
    display: flex;
  }
  .td {
    width: 240rpx;
		font-size: 24rpx;
		word-break:break-all;
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
		.sentence{
			padding: 6rpx 0;
		}
		.content_text{
			position: relative;
			display: inline-block;
			height: 60rpx;
			line-height: 70rpx;
			padding: 4rpx;
			.pinyin{
				position: absolute;
				font-size: 20rpx;
				padding: 4rpx;
				top: -28rpx;
			}
		}

		.text {
			padding: 10rpx 20rpx;
		}
	}
</style>
