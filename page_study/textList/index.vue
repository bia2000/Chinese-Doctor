<template>
  <view class="textList">
    <u-cell-group>
      <u-cell
        v-for="(item, index) in lessonlist"
        :key="item.id"
        isLink
        @click="
          $goBack(
            2,
            '/page_study/textDetail/index?book=' +
              name +
              '&lesson=' +
              index +
              '&lesson_name=' +
              item[0].name
          )
        "
      >
        <view slot="title" class="u-slot-title">
          <text class="lesson-num">{{ index }}</text>
          <text class="">{{ item[0].name||item[1].name||item[2].name }} </text>
          <!-- <u-tag text="标签" plain size="mini" type="warning"> </u-tag> -->
        </view>
      </u-cell>
    </u-cell-group>
  </view>
</template>

<script>
import {  groupBy } from '@/common/utils'
import { learn_information, query } from '@/common/request.js'
export default {
  components: {},
  data() {
    return {
      message: [],
      name: '',
    }
  },
  computed: {
    lessonlist() {
      // let lesson = { name: [] }
      let lesson = []
      if (this.message.length > 0) {
        this.message.sort(function (a, b) {
          return a.index - b.index
        })
        // this.message.sort((a, b) => a.lesson.localeCompare(b.lesson, 'zh')) //a~z 排序
        // console.log(this.message)
        lesson = groupBy(this.message, 'lesson')
        // console.log(lesson)
      }
      return lesson
    },
  },
  methods: {},
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(e) {
    this.name = e.name
    query.queryObject.$and = []
    query.contains('textbook', e.name)
    learn_information
      .setQuery(query)
      .limit(100)
      .find()
      .then((res) => {
        this.message = res.data.objects
      })
  },
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {
    // if (this.message.length > 0) {
    //   let t1 = { name: '' }
    //   t1['name'] = this.message[1].text
    //   // console.log(t1)
    //   let t = this.message[1].text
    //   if (t.length > 0) {
    //     t1['name'] = t.match(/(?<=\n)(.+?)(?=\n)/g)
    //     // str3['verb'] = keys.match(/(?<=（)(.+?)(?=）)/g)
    //   }
    //   // console.log(str3)
    //   // console.log(t1)
    // }
  },
  // 页面周期函数--监听页面隐藏
  onHide() {},
  // 页面周期函数--监听页面卸载
  onUnload() {},
  // 页面处理函数--监听用户下拉动作
  // onPullDownRefresh() { uni.stopPullDownRefresh(); },
  // 页面处理函数--监听用户上拉触底
  // onReachBottom() {},
  // 页面处理函数--监听页面滚动(not-nvue)
  // onPageScroll(event) {},
  // 页面处理函数--用户点击右上角分享
  // onShareAppMessage(options) {},
}
</script>

<style scoped lang="scss">
.lesson-num {
  padding: 20rpx 40rpx;
  color: #999;
}
</style>
