<template>
  <view class="paperGuide">
    <view class="" v-for="(item, index) in title2" :key="item.id">
      <view class="title" v-if="index == 0">
        <!-- {{}} -->
        第一部分：
        <view class="">
          {{ title1[0] }}(50题，约35分钟)
        </view>
      </view>
      <view class="title" v-if="index == 4">
        <!-- {{}} -->
        第二部分：
        <view class="">
          {{ title1[1] }}(50题，约50分钟)
        </view>
      </view>
      <view class="title" v-if="index == 7">
        <!-- {{}} -->
        第三部分：
        <view class="">
          {{ title1[2] }}(1题，约30分钟)
        </view>
      </view>
      <view class="content">
        {{ item }}
      </view>
    </view>
  </view>
</template>

<script>
import { question_bank, query } from '@/common/request'
export default {
  components: {},
  data() {
    return {
      paper: [],
    }
  },
  computed: {
    title1() {
      const groupedBy = {}
      for (const item of this.paper) {
        if (groupedBy[item.primary_ques_type]) {
          groupedBy[item.primary_ques_type].push(item)
        } else {
          groupedBy[item.primary_ques_type] = [item]
        }
      }
      const t1 = Object.keys(groupedBy)

      return t1
    },
    title2() {
      const groupedBy = {}

      for (const item of this.paper) {
        if (groupedBy[item.secondary_ques_type]) {
          groupedBy[item.secondary_ques_type].push(item)
        } else {
          groupedBy[item.secondary_ques_type] = [item]
        }
      }
      const t1 = Object.keys(groupedBy)

      return t1
    },
  },
  methods: {},
  watch: {},

  mounted() {
    // query.queryObject.$and = []
    // query.contains('primary_ques_type', this.title1)
    question_bank
      .limit(500)
      .find()
      .then(
        (res) => {
          res.data.objects.forEach((e) => {
            this.paper.push(e)
          })
          uni.setNavigationBarTitle({
            title: '试卷结构指引',
          })
          // console.log(this.paper)
        },
        (err) => {
          console.log('error')
        }
      )
  },
}
</script>

<style scoped lang="scss">
.paperGuide {
  padding: 40rpx;
  .title {
    font-size: 40rpx;
    font-weight: bold;
    padding: 10rpx;
  }
  .content {
    text-indent: 2em;
    padding: 10rpx;
    font-weight: bold;
  }
}
</style>
