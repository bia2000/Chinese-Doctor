<template>
  <view class="zujuan">
   <view class="dropdown">
      <dropDown
        v-model="gradeId"
        :list="dropDownList.time"
        @input="toSelect5"
        placeholder="发布时间"
      ></dropDown>
      <dropDown
        v-model="gradeId"
        :list="dropDownList.num_use"
        @input="toSelect6"
        placeholder="组卷次数"
      ></dropDown>
			<view class="recommend" @click="toRecommend">
				智能推荐
			</view>
      <view class="guide" @click="$goBack(2, '/page_pratice/paperGuide/index')">
        试卷结构指引
      </view>
    </view>
    <view class="dropdown">
     <dropDown
        v-model="gradeId"
        :list="dropDownList.title1"
        placeholder="一级题型"
        @input="toSelect1"
      ></dropDown>
      <dropDown
        v-model="gradeId"
        :list="dropDownList.title2"
        placeholder="二级题型"
        @input="toSelect2"
      ></dropDown>
      <dropDown
        v-model="gradeId"
        :list="dropDownList.grade"
        placeholder="等级"
        @input="toSelect3"
      ></dropDown>

      <dropDown
        v-model="gradeId"
        :list="dropDownList.department"
        placeholder="科室"
        @input="toSelect4"
      ></dropDown>
    </view>
    <view v-if="bank.length > 0">
      <view class="">
        <view class="content" v-for="(item, index) in bank" :key="index">
          <view class="score">
            <input type="text" v-model="item.score" />分
            <button type="primary" size="mini" @click="addPaper(item, index)">加入试卷</button>
          </view>
          <view
            class="options-item"
            :name="item.id"
            :checked="item.check"
            :value="String(index)"
            @click="radioChange(item.check, index)"
            >{{ title(item) }}</view
          >

          <view class="question" v-if="item.question != null">
            {{ item.question }}
          </view>
         <view class="" v-if="item.question_content.length > 20"
            >{{ item.question_content }}
          </view>
         <view
            class=""
            v-if="item.question_content.length > 10 && item.question_content.length < 20"
          >
            <image :src="getFile(item.question_content)" alt="" />
          </view>

          <view v-if="item.question_content.length < 10">
            <audioView :audioUrl="getFile(item.question_content)"></audioView>
          </view>
          <view class="option" v-for="opt in options[index]" :key="opt.id">
            {{ opt }}
          </view>
        </view>
      </view>
      <view class="buttom">
        <view class="right">
          <view class="">
            <view class="count">
              合计：<view>{{ num_question }}题 </view> 共：<view>{{ score_question }}分</view>
            </view>
            <view class="detail" @click="getDetail"> 查看明细 </view>
          </view>
          <view class="compose" @click="toCompose"> 组卷 </view>
        </view>
      </view>
      <u-popup
        :show="show"
        border-radius="40rpx"
        mode="bottom"
        length="60%"
        @close="show = false"
        closeable
      >
        <view class="detail-info">
          <u-subsection
            :list="list"
            mode="button"
            :current="current"
            @change="change"
            activeColor="#53A5D9"
          >
          </u-subsection>
          <view class="" v-if="current == 0">
            <scroll-view scroll-y="true" class="scroll-Y" style="height: 800rpx">
              <view class="content" v-for="(item, index) in question_set" :key="index">
                <view class="title">
                  <view class=""> {{ title(item) }}({{ item.score }}分 ) </view>
                  <button type="warn" size="mini" @click="Delete(index)">删除</button>
                </view>
                <view class="question" v-if="item.question != null">
                  {{ item.question }}
                </view>
                <view class="" v-if="item.question_content.length > 20"
                  >{{ item.question_content }}
                </view>
                <view
                  class=""
                  v-if="item.question_content.length > 10 && item.question_content.length < 20"
                >
                  <image :src="getFile(item.question_content)" alt="" />
                </view>
                <view v-if="item.question_content.length < 10">
                  <audioView :audioUrl="getFile(item.question_content)"></audioView>
                </view>
              </view>
            </scroll-view>
          </view>
          <view class="" v-if="current == 1">
						<scroll-view scroll-y="true" class="scroll-Y" style="height: 800rpx">
            <view class="" v-if="isAlive">
							<view class="sum">
                <view class="total">
                  总题量：{{ num_question }}题 总分：{{ score_question }}分
                </view>
                <view class="">
                  <view class="" v-for="(item_q, index) in type_question" :key="item_q.id">
                    {{ ToCapital(index + 1) + '、' + item_q.name }}(共{{ item_q.value }}道题，共{{
                      score_q[index].value
                    }}分)
                  </view>
                </view>
              </view>
							<echarts class="echarts" :ec="option3" force-use-old-canvas="true" canvas-id="multi-charts-line" v-if="isAlive"></echarts>
							  <echarts class="echarts" :ec="option2" force-use-old-canvas="true" canvas-id="multi-charts-line" v-if="isAlive"></echarts>
							  <echarts class="echarts" :ec="option1" force-use-old-canvas="true" canvas-id="multi-charts-line" v-if="isAlive"></echarts>
            </view>
						</scroll-view>
					</view>
        </view>
      </u-popup>
    </view>
  </view>
</template>

<script>
import echarts from 'components/uni-ec-canvas/uni-ec-canvas.vue'
import dropDown from 'components/dropDown'
import audioView from 'components/audioView'
import { question_bank, query, groupBy, trimAll, numToCapital } from '@/common/utils'
export default {
  components: {
    audioView,
    echarts,
		dropDown
  },
  props: ['paper','keyword'],
  data() {
    return {
      show: false,
      isAlive: true,
      bank: [],
      question_set: [],
      current: 0,
      list: ['题目明细', '分数结构'],
      // active: null,
      gradeId: 'as',
      gradeList1: [
        {
          label: '↑',
          value: 'a',
        },
        {
          label: '↓',
          value: 'b',
        },
      ],
    }
  },
  computed: {
    type_question() {
      let name = ['听力', '阅读', '写作']
      let value = [0, 0, 0]
      this.question_set.map((e) => {
        name.map((n, index) => {
          if (e.primary_ques_type == n) value[index]++
        })
      })
      let type = []
      for (let i in name)
        type.push({
          name: name[i],
          value: value[i],
        })
      return type
    },
    grade_question() {
      let name = ['一级', '二级', '三级']
      let value = [0, 0, 0]
      let reg
      this.question_set.map((e) => {
        name.map((n, index) => {
          reg = new RegExp(`${n}`)
          if (reg.test(e.grade_standard)) value[index]++
        })
      })
      let grade = []
      grade['name'] = name
      grade['value'] = value
      return grade
    },
    score_q() {
      // console.log(1)
      let name = ['听力', '阅读', '写作']
      let value = [0, 0, 0]
      this.question_set.map((e) => {
        name.map((n, index) => {
          if (e.primary_ques_type == n) value[index] += e.score * 1
        })
      })
      // console.log(name)
      let score = []
      for (let i in name)
        score.push({
          name: name[i],
          value: value[i],
        })
      return score
    },
    options() {
      var str3 = null
      var str = []
      var str = this.bank.map((e) => {
        return e.options
      })
      // console.log(str)
      if (this.bank.length > 0) {
        str3 = str.map((e) => {
          var str1 = trimAll(e)
          if (str1) var code1 = str1.match(/(?<=(content":")).*?(?=("))/g)
          return code1
        })
      }
      // console.log(str3)
      return str3
    },
    option1() {
      return {
				option:{
        // 注意：饼图不是直角坐标系图表，就不用配置x轴和y轴了
				title: {
				        text: '题型分布',
				    },
        series: [
          {
            type: 'pie',
            data: this.type_question,
          },
        ],
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(32, 33, 36,.7)',
          borderColor: 'rgba(32, 33, 36,0.20)',
          borderWidth: 1,
          textStyle: {
            // 文字提示样式
            color: '#fff',
            fontSize: '12',
          },
        },
      }}
    },
    option2() {
      return {
				option:{
					title: {
					        text: '等级分布',
					    },
        xAxis: {
          type: 'value',
        },
        yAxis: {
          type: 'category',
          data: this.grade_question.name,
        },
        series: [
          {
            type: 'bar',
            data: this.grade_question.value,
          },
        ],
        tooltip: {
          show: true,
          trigger: 'item',
          backgroundColor: 'rgba(32, 33, 36,.7)',
          borderColor: 'rgba(32, 33, 36,0.20)',
          borderWidth: 1,
          textStyle: {
            // 文字提示样式
            color: '#fff',
            fontSize: '12',
          },
        },
      }}
    },
    option3() {
      // let name = ['听力', '阅读', '写作']
      // let value = [0, 0, 0]
      // this.paper.map((e) => {
      //   name.map((n, index) => {
      //     if (e.primary_ques_type == n && e.check) value[index] += e.score * 1
      //   })
      // })
      // let pieData = []
      // for (let i in name) pieData.push({ name: name[i], value: value[i] })
      return {
				option:{
        // 注意：饼图不是直角坐标系图表，就不用配置x轴和y轴了
				title: {
				        text: '分数分布',
				    },
        series: [
          {
            type: 'pie',
            data: this.score_q,
          },
        ],
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(32, 33, 36,.7)',
          borderColor: 'rgba(32, 33, 36,0.20)',
          borderWidth: 1,
          textStyle: {
            // 文字提示样式
            color: '#fff',
            fontSize: '12',
          },
        },
      }}
    },
    dropDownList() {
      const d1 = [
        {
          title1: [],
          title2: [],
          department: [],
          grade: [],
        },
      ]
      d1[0]['title1'] = Object.keys(groupBy(this.paper, 'primary_ques_type'))
      d1[0]['title2'] = Object.keys(groupBy(this.paper, 'secondary_ques_type'))
      d1[0]['department'] = Object.keys(groupBy(this.paper, 'department'))
      d1[0]['grade'] = Object.keys(groupBy(this.paper, 'grade_standard'))
      let d2 = Object.keys(d1[0])
      for (let k of d2) {
        d1[0][k] = d1[0][k].map((e) => {
          return {
            label: e,
            value: e,
          }
        })
        d1[0][k].push({
          label: '全部',
          value: 'all',
        })
      }
      d1[0]['time'] = [
        {
          label: '最近',
          value: '最近',
        },
        {
          label: '最远',
          value: '最远',
        },
      ]
      d1[0]['num_use'] = [
        {
          label: '使用最多',
          value: '使用最多',
        },
        {
          label: '使用最少',
          value: '使用最少',
        },
      ]
      return d1[0]
    },
    num_question() {
      let num = 0
      this.question_set.forEach((e) => {
        num++
      })
      return num
    },
    score_question() {
      let score = 0
      this.question_set.forEach((e) => {
        score += e.score * 1
      })
      return score
    },
  },
  methods: {
    addPaper(item, index) {
      this.question_set.push(item)
      this.bank.splice(index, 1)
      this.paper.splice(index, 1)
      // console.log(this.question_set);
    },
    Delete(index) {
      let arr = this.question_set
      arr.splice(index, 1)
    },
    toCompose() {
      // let question_set_id = this.question_set.map((e)=>{
      // 	return e.id
      // })
      // console.log(question_set);
      this.$store.commit('getQuestionset', this.question_set)
      setTimeout(() => {
        uni.navigateTo({
          url: '/page_pratice/zujuanDetail/index?list=' + this.question_set,
        })
      }, 1000)
    },
    change(index) {
      this.current = index
      this.reloadAll()
    },
    toSelect1(e) {
      let arr = this.paper
      let dataInfo = {}
      arr.forEach((item) => {
        let { primary_ques_type } = item
        if (!dataInfo[primary_ques_type]) {
          dataInfo[primary_ques_type] = {
            primary_ques_type,
            child: [],
          }
        }
        dataInfo[primary_ques_type].child.push(item)
      })
      let list = Object.values(dataInfo) // list 转换成功的数据
      list.forEach((i) => {
        if (e == i.primary_ques_type) this.bank = i.child
      })
			console.log(e);
			console.log(dataInfo);
    },
    toSelect2(e) {
      let arr = this.paper
      let dataInfo = {}
      arr.forEach((item) => {
        let { secondary_ques_type } = item
        if (!dataInfo[secondary_ques_type]) {
          dataInfo[secondary_ques_type] = {
            secondary_ques_type,
            child: [],
          }
        }
        dataInfo[secondary_ques_type].child.push(item)
      })
      let list = Object.values(dataInfo) // list 转换成功的数据
      list.forEach((i) => {
        if (e == i.secondary_ques_type) this.bank = i.child
      })
      // this.getMessage(e, 'secondary_ques_type')
    },
    toSelect3(e) {
      let arr = this.paper
      let dataInfo = {}
      arr.forEach((item) => {
        let { grade_standard } = item
        if (!dataInfo[grade_standard]) {
          dataInfo[grade_standard] = {
            grade_standard,
            child: [],
          }
        }
        dataInfo[grade_standard].child.push(item)
      })
      let list = Object.values(dataInfo) // list 转换成功的数据
      list.forEach((i) => {
        if (e == i.grade_standard) this.bank = i.child
      })
    },
    toSelect4(e) {
      let arr = this.paper
      let dataInfo = {}
      arr.forEach((item) => {
        let { department } = item
        if (!dataInfo[department]) {
          dataInfo[department] = {
            department,
            child: [],
          }
        }
        dataInfo[department].child.push(item)
      })
      let list = Object.values(dataInfo) // list 转换成功的数据
      list.forEach((i) => {
        if (e == i.department) this.bank = i.child
      })
      // this.getMessage(e, 'department')
    },
    toSelect5(e) {
      if (e == 'a')
        this.bank.sort((a, b) => {
          return a.created_at - b.created_at
        })
      else {
        this.bank.sort((a, b) => {
          return b.created_at - a.created_at
        })
      }
    },
    toSelect6(e) {
      if (e == 'a')
        this.bank.sort((a, b) => {
          return a.num_use - b.num_use
        })
      else {
        this.bank.sort((a, b) => {
          return b.num_use - a.num_use
        })
      }
    },
		toRecommend(){
			let arr = this.paper
			let dataInfo = {}
			arr.forEach((item) => {
			  let { grade_standard } = item
			  if (!dataInfo[grade_standard]) {
			    dataInfo[grade_standard] = {
			      grade_standard,
			      child: [],
			    }
			  }
			  dataInfo[grade_standard].child.push(item)
			})
			let list = Object.values(dataInfo) // list 转换成功的数据
			list.forEach((i) => {
				if(i.grade_standard!=null)
			  if (i.grade_standard.indexOf(this.keyword)) this.bank = i.child
			})
		},
    getDetail() {
      this.show = true
    },
    title(item) {
      return item.primary_ques_type + '-' + item.secondary_ques_type
    },
    radioGroupChange() {},
    radioChange(check, index) {
      if (check) {
        // 如果已经选中，则取消选中
        this.paper[index].check = false
      } else {
        // 否则进行选中赋值
        this.paper[index].check = true
      }
      // this.answer = e
      // this.paper[0].check = e
    },
    getMessage(e, key) {
      query.queryObject.$and = []
      query.contains(key, e)
      question_bank
        .setQuery(query)
        .limit(100)
        .find()
        .then(
          (res) => {
            this.bank = res.data.objects
            // console.log(this.bank)
          },
          (err) => {
            console.log('error')
          }
        )
    },
    getFile(url) {
      return 'https://cloud-minapp-45998.cloud.ifanrusercontent.com/' + url
    },
    reloadAll() {
      this.isAlive = false
      this.$nextTick(() => {
        this.isAlive = true
      })
    },
    ToCapital(e) {
      return numToCapital(e)
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  mounted() {
    this.bank = this.paper

    // console.log(list)
  },

  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {},
  // 页面周期函数--监听页面隐藏
  onHide() {},
  // 页面周期函数--监听页面卸载
  onUnload() {},
}
</script>

<style scoped lang="scss">
.zujuan {
  padding: 20rpx;

  .dropdown {
    display: flex;
		.recommend{
			position: absolute;
			padding: 10rpx;
			right: 200rpx;
			font-size: 24rpx;
			color: #fff;
			border-radius: 10rpx;
			background-color: #53a5d9;
		}
    .guide {
      position: absolute;
      right: 10rpx;
      padding: 15rpx;
      font-size: 24rpx;
      font-weight: bold;
      color: #53a5d9;
    }
  }

  .content {
    padding: 20rpx;
    border: 2rpx solid #999;
    border-radius: 40rpx;
    margin: 30rpx 0;
    font-size: 30rpx;

    .title {
      display: flex;
      font-weight: bold;

      view {
        width: 500rpx;
      }

      button {
        height: 60rpx;
      }
    }

    .score {
      display: flex;

      input {
        margin: 0 10rpx;
        width: 60rpx;
        border-bottom: 2rpx solid;
        text-align: center;
      }
    }

    .question {
      text-indent: 2em;
      padding: 10rpx 0;
			font-weight: bold;
    }

    .options-item {
      display: flex;
      justify-content: space-between;
      font-size: 34rpx;
      font-weight: bold;
      width: 100%;
    }

    .option {
      display: inline-block;
      font-size: 26rpx;
      margin: 10rpx 20rpx;
      width: 120rpx;
      text-align: center;
    }
  }

  .buttom {
    position: fixed;
    display: flex;
    height: 100rpx;
    width: 100%;
    bottom: 0rpx;
    font-weight: bold;
    background-color: #fff;

    .radio {
      line-height: 100rpx;
      font-size: 30rpx;
      color: #999;
    }

    .right {
      // float: right;
      display: flex;
      position: absolute;
      align-items: center;
      right: 50rpx;
      font-size: 24rpx;

      .detail {
        padding: 5rpx;
        font-weight: bold;
        color: #53a5d9;
      }

      .count {
        line-height: 60rpx;
        display: flex;

        view {
          padding: 0 10rpx;
          font-size: 36rpx;
          color: #53a5d9;
        }
      }

      .compose {
        color: #fff;
        background-color: #53a5d9;
        font-size: 26rpx;
        width: 100rpx;
        height: 40rpx;
        margin: 10rpx;
        padding: 6rpx;
        border-radius: 30rpx;
        text-align: center;
      }
    }
  }

  .detail-info {
    padding: 20rpx;

    .echarts {
      width: 100%;
			// width: 600rpx;
      height: 360rpx;
			display: inline-block;
    }

    .sum {
      padding: 20rpx;

      view {
        margin: 10px;
        font-weight: bold;
      }

      .total {
        font-size: 36rpx;
      }
    }
  }
}
</style>
