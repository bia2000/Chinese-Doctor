<template>
  <view class="">
    <answerPage :paper="paper" :type="2" @toMatch="toMatch"></answerPage>
  </view>
</template>

<script>
import answerPage from 'components/answerPage'

import { question_bank, user_info } from '@/common/request'
export default {
  name: 'matchPaper',
  components: { answerPage },
  data() {
    return {
      paper: [],
      randomList: [],
      num: 0,
    }
  },
  computed: {},
  methods: {
    toMatch(e) {
      let userId = uni.getStorageSync('id')
      if (e > this.num) {
        let product = user_info.getWithoutData(userId)
        product.set({ num_question: String(e) })
        product.update()
      }
    },
  },
  watch: {},
  // 页面周期函数--监听页面加载
	mounted(){
		console.log(1);
	},
  onLoad(e) {
    // this.paper = e.list
		
    this.num = e.num
		let list = e.list.replace(/\[|]/g,'')
    this.randomList = list.split(',')
    this.randomList.map((e) => {
			e = e.replace(/\"/g,'')
			console.log(e);
      question_bank.get(e).then((res) => {
        this.paper.push(res.data)
      })
    })
    console.log(this.paper)
  },
	onUnload:function(){
		console.log(11111);
	    uni.redirectTo({
	    	url:'/pages/pratice/pratice'
	    })
	  },

}
</script>

<style scoped></style>
