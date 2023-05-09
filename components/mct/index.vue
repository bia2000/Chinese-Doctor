<template>
  <view class="mct">
    <u-tabs :list="list" mode="button" :current="current" @click="change" activeColor="#53A5D9">
    </u-tabs>
    <!-- </scroll-view> -->
    <view class="content">
      <view v-if="current == '0'"
        ><u-collapse>
          <u-collapse-item
            :title="title(index1, item)"
            v-for="(item, index1) in grade.title"
            :key="index1"
          >
            <view class="table">
              <view class="tr">
                <view class="th">等级划分</view>
                <view class="th">总体描述</view>
                <view class="th" v-if="index1 != 0">任务举例</view>
              </view>
              <view v-for="item1 in grade.content[index1]" :key="item.id">
                <view class="tr">
                  <view class="td">{{ item1[0] }}</view>
                  <view class="td">{{ item1[1] }}</view>
                  <view class="td" v-if="index != 0">{{ item1[2] }}</view>
                </view>
              </view>
            </view>
          </u-collapse-item>
        </u-collapse>
      </view>
      <view v-if="current == '1'" class="topic">
        <view v-for="item in topic" :key="item.id" @click="$goBack(2, '/page_study/topicInfo/index?id='+item.text)" class="topic_item">
          <img :src="item.img" alt="" />
          <view>{{ item.text }}</view>
        </view>
      </view>
      <view v-if="current == '2'" class="">
        <u-collapse>
          <u-collapse-item :title="tiem.title" v-for="(tiem, index) in task" :key="index">
            <view class="task" v-for="item in tiem.content" :key="item.id">
              {{ item }}
            </view>
          </u-collapse-item>
        </u-collapse>
      </view>
      <view v-if="current == '3'" class="voca">
        <view class="table">
          <view class="tr">
            <view class="th">词语</view>
            <view class="th">词性</view>
            <view class="th">拼音</view>
          </view>
          <view v-for="item in vocabulary" :key="item.id">
            <view class="tr">
              <view class="td">{{ item.words }}</view>
              <view class="td">{{ item.part_of_speech }}</view>
              <view class="td">{{ item.pinyin }}</view>
            </view>
          </view>
        </view>
         <uniPagination
          :current="page"
          :total="total"
          :show-icon="true"
          @change="changePage"/>
      </view>
      <KnowledgeGraph v-if="current == '4'"> </KnowledgeGraph>
      <view v-if="current == '5'">
        <view class="sign_up"
          ><img src="@/static/images/sign-up.png" alt="" /><view></view
          ><view><view>汉语考试服务网</view><view>www.chinesetest.cn</view></view></view
        >
      </view>
      <view v-if="current == '6'">
        <view class="sign_up"
          ><img src="@/static/images/AC.png" alt="" /><view></view
          ><view><view>中外语言交流合作中心</view><view>www.chinese.cn/</view></view></view
        >
        <view class="sign_up"
          ><img src="@/static/images/OET.png" alt="" /><view></view
          ><view
            ><view>OET-OCCUPATIONAL ENGL ISH TEST </view
            ><view>www.occupationalenglishtest.org</view></view
          ></view
        >
      </view>
    </view>
  </view>
</template>

<script>
import { spArray, numToCapital } from '@/common/utils'
import { outline_top, grade_standard, task_outline, vocabulary_outline,updateUserAction } from '@/common/request.js'
import uniPagination from 'components/pagination/pagination.vue'
import KnowledgeGraph from 'components/KnowledgeGraph/index.vue'
export default {
  name: 'mct',
  components: { KnowledgeGraph,uniPagination },
  data() {
    return {
      current: 0,
      page: 0,
      total: 50,
      list: [],
      grade: {
        title: [],
        content: [],
      },

      task: [],
      vocabulary: [],

      topic: [
        {
          img: 'https://cloud-minapp-45998.cloud.ifanrusercontent.com/1pfe63G82E6rhXtL.jpg',
          text: '医生-医生',
        },
        {
          img: 'https://cloud-minapp-45998.cloud.ifanrusercontent.com/1pfe63hirx2HmpeR.jpg',
          text: '医生-患者',
        },
        {
          img: 'https://cloud-minapp-45998.cloud.ifanrusercontent.com/1pfe63RcdgDyRlk5.jpg',
          text: '医生-护士',
        },
        {
          img: 'https://cloud-minapp-45998.cloud.ifanrusercontent.com/1pfe63nBqkorP9em.jpg',
          text: '患者-护士',
        },
      ],
			
    }
  },
  computed: {},
  methods: {
    title(a, b) {
      return numToCapital(a + 1) + '、' + b
    },
    change(index) {
      this.current = index.index
    },
    changePage(e) {
      this.page = e.current
			if(this.current==3){
			updateUserAction('count_mct',1)
			
			}
      this.getVocabulary()
    },
    getVocabulary() {
			updateUserAction('num_mct',10)
      vocabulary_outline
        // .orderBy('pinyin')
        .limit(10)
        .offset(this.page)
        .find()
        .then(
          (res) => {
            this.vocabulary = res.data.objects
          },
          (err) => {
            console.log('error')
          }
        )
    },
  },
  watch: {},
  // 组件周期函数--监听组件挂载完毕
	onShow() {

	},
  mounted() {
    outline_top.find().then(
      (res) => {
        res.data.objects.forEach((e) => {
          this.list.push({ name: e.type })
        })
        console.log(this.list)
      },
      (err) => {
        console.log('error')
      }
    )
    grade_standard.find().then(
      (res) => {
        res.data.objects.sort((a, b) => {
          return a.level - b.level
        })
        res.data.objects.forEach((e) => {
          this.grade.title.push(e.title)
          this.grade.content.push(spArray(3, e.content))
        })
        console.log(this.grade)
      },
      (err) => {
        console.log('error')
      }
    )
    task_outline.find().then(
      (res) => {
        // console.log(res.data.objects)
        this.task = res.data.objects
        this.task.sort((a, b) => {
          return a.index - b.index
        })
        // console.log(this.task)
      },
      (err) => {
        console.log('error')
      }
    )
    vocabulary_outline.count().then((res) => {
      this.total = res
    })
    this.getVocabulary()
  },
  // 组件周期函数--监听组件数据更新之前
  beforeUpdate() {},
  // 组件周期函数--监听组件数据更新之后
  updated() {},
  // 组件周期函数--监听组件激活(显示)
  activated() {},
  // 组件周期函数--监听组件停用(隐藏)
  deactivated() {},
  // 组件周期函数--监听组件销毁之前
  beforeDestroy() {},
}
</script>

<style scoped lang="scss">
.content {
  font-weight: bold;
}
// .table {
//   // text-align: center;
//   margin: 0 auto;
//   width: 700rpx;
//   height: 900rpx;
//   border-collapse: collapse;
//   border-spacing: 0;
//   border: 1px solid rgba(201, 201, 201, 1);
//   td {
//     border: 1px solid rgba(201, 201, 201, 1);
//     padding: 5rpx;
//   }
// }
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
.sign_up {
  display: flex;
  background-color: #fff;
  height: 140rpx;
  margin: 20rpx;
  border-radius: 20rpx;
  img {
    margin: 20rpx;
    width: 120rpx;
    height: 100rpx;
  }
}

.topic {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  text-align: center;
  img {
    width: 300rpx;
    height: 350rpx;
  }
  .topic_item {
    background-color: #fff;
    margin: 20rpx 0;
    padding: 10rpx 0;
  }
}
.task {
  padding: 10rpx 0;
}
.voca {
  padding: 0 10rpx;
  text-align: center;
}
</style>
