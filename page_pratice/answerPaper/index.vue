<template>
  <view class="">
    <answerPage
      :paper="paper"
      :type="type"
      :scoreList="scoreList"
      @toPaperSubmit="toPaperSubmit"
    ></answerPage>
  </view>
</template>

<script>
import answerPage from 'components/answerPage'
import { query, question_bank, paper_user,user_info,updateuserInfo,paper_public } from '@/common/request'
export default {
  name: 'answerPaper',
  components: { answerPage },
  data() {
    return {
      paper: [],
      scoreList: [],
      id: '',
			papered:'',
			userId:'',
			type:''
    }
  },
  methods: {
    toPaperSubmit(score, list, time) {
			console.log(this.id);
      let product = paper_user.getWithoutData(this.id)
      product.set({
        user_score: score + '',
        question_set_answer: list,
        flag: true,
        time: time,
      })
      product.update()
			updateuserInfo('papered')
			// this.papered= this.papered+1
			// let userPaper = user_info.getWithoutData(this.userId)
			// userPaper.set({
			// 	'papered':this.papered
			// })
			// userPaper.update()
    },
  },
  onLoad(e) {
		this.userId = uni.getStorageSync('id')
		this.type = e.type
		if(e.type == 4){
			this.type = 3
			paper_public.get(e.id).then((res) => {
				console.log(res);
				let MyRecord = paper_user.create()
				MyRecord.set({
				  user_id: this.userId,
				  name: res.data.name,
					score_paper:res.data.score_paper,
					question_set:res.data.question_set,
					question_set_score:res.data.question_set_score,
				})
				MyRecord.save().then(res=>{
					console.log(res);
					this.id = res.data.id
				})
				// console.log(res);
			})
		}
		
		// user_info.get(this.userId).then(res=>{
		// 	console.log(res);
		// 	this.papers = res.data.papers
		// })
    // console.log(e.question_set_score)
    let list = e.list.split(',')
    let scoreList = e.question_set_score.split(',')
    this.scoreList = scoreList
    this.id = e.id
    list.map((e) => {
      question_bank.get(e).then((res) => {
        this.paper.push(res.data)
      })
    })
  },
  mounted() {
	},
	onUnload:function(){
	    uni.reLaunch({
	    	url:'/pages/pratice/pratice'
	    })
	  },
}
</script>

<style scoped></style>
