<template>
  <view class="content">
    <u-search class="search" :show-action="false" @search="searchK"></u-search>
    <view class="" v-if="isRouterAlive">
      <echarts class="echarts" :option="option" v-if="isRouterAlive"></echarts>
      <view class="table">
        <view class="tr">
          <view class="th">实体1</view>
          <view class="th">关系</view>
          <view class="th">实体2</view>
        </view>
        <view v-for="(item, index) in node" :key="index">
          <view class="tr">
            <viwe class="td">{{ key }}</viwe>
            <view class="td">{{ relation[index] }}</view>
            <view class="td">{{ item.name }}</view>
          </view>
        </view>
      </view>
    </view>
    <!-- <button @click="ll">点击</button> -->
  </view>
</template>

<script>
import echarts from 'components/echarts/echarts.vue'
import { Product, query } from '@/common/request'
export default {
  name: 'KnowledgeGraph',
  props: {},
  components: {
    echarts,
  },
  data() {
    return {
      node: [],
      relation: [],
      key: '阿米巴病',
      isRouterAlive: false,
    }
  },
  computed: {
    nodes: function () {
      let flag = this.node.includes({ name: 'TX', id: 'TX' })
      console.log(this.node)
      let l1 = [{ name: this.key, id: this.key }]
      l1.push(...this.node)
      return l1
    },
    links: function () {
      let l2 = []
      let i
      for (i in this.relation) {
        l2.push({
          source: this.key,
          target: this.node[i].id,
          relation: {
            name: this.relation[i],
            id: i,
          },
        })
      }
      return l2
    },
    option: function () {
      return {
        title: {
          // text: '总学习时长',
        },
        series: [
          {
            type: 'graph',
            layout: 'force',
            nodes: this.nodes,
            roam: true,
            draggable: true,
            links: this.links,
            itemStyle: {
              color: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [
                  {
                    offset: 0,
                    color: '#3dd67a', // 0% 处的颜色
                  },
                  {
                    offset: 0.7,
                    color: '#3dd67a', // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#95dcb2', // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            },
            label: {
              show: true,
              position: 'bottom',
              distance: 5,
              fontSize: 18,
              align: 'center',
            },
            autoCurveness: 0.01, //多条边的时候，自动计算曲率
            edgeLabel: {
              //边的设置
              show: true,
              position: 'middle',
              fontSize: 12,
              formatter: (params) => {
                return params.data.relation.name
              },
            },
            edgeSymbol: ['circle', 'arrow'], //边两边的类型
            force: {
              repulsion: 100,
              gravity: 0.01,
              edgeLength: 150,
            },
          },
        ],
      }
    },
  },
  methods: {
    ll() {
      console.log(this.node)
    },
    reloadAll() {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    },
    searchK(value) {
      // this.isRouterAlive = true
      this.key = value
      this.getGraph()
      this.reloadAll()
    },
    getGraph() {
      query.queryObject.$and = []
      query.contains('entity1', this.key)
      Product.setQuery(query)
        .limit(100)
        .find()
        .then((res) => {
          // success
          if (res.data.objects == []) {
            return
          }
          console.log(this.key)
          console.log(res)
          console.log(query)
          if (this.node.length > 0) {
            this.node = []
            this.relation = []
          }
          res.data.objects.forEach((e, index) => {
            this.node.push({ name: e.entity2, id: index })
            this.relation.push(e.relation)
          })
        })
        .catch((err) => {
          // error
        })
    },
  },

  mounted() {
    this.getGraph()
    this.reloadAll()
  },
}
</script>

<style lang="scss">
.content {
}
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
.search {
  width: 100%;
}
.echarts {
  margin-top: 100rpx;
  width: 100%;
  height: 500px;
}
</style>
