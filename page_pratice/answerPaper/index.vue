<template>
	<view class="">
		<answerPage :paper="paper" :type="type" :scoreList="scoreList" @toPaperSubmit="toPaperSubmit"
			@comfirmCopy='comfirmCopy'></answerPage>
	</view>
</template>

<script>
	import answerPage from 'components/answerPage'
	import {
		query,
		question_bank,
		paper_user,
		user_info,
		updateuserInfo,
		paper_public,
		test_paper
	} from '@/common/request'
	export default {
		name: 'answerPaper',
		components: {
			answerPage
		},
		data() {
			return {
				paper: [],
				scoreList: [],
				id: '',
				papered: '',
				userId: '',
				type: ''
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
			comfirmCopy() {
				let question = {
					question_set: [],
					question_set_score: []
				}
				this.paper.map(e => {
					question.question_set.push(e._id)
					question.question_set_score.push(e.score + '')
				})
				console.log(question);
				let MyRecord = paper_user.create()
				MyRecord.set({
					user_id: this.userId,
					name: this.paper[0].paper_title,
					score_paper: this.paper[0].points + '',
					question_set: question.question_set,
					question_set_score: question.question_set_score,
					paper_type: '2'
				})
				MyRecord.save().then(res => {
					updateuserInfo('public_p')
					uni.switchTab({
						url: '/pages/pratice/pratice'
					})
				})
			}
		},
		onLoad(e) {
			this.userId = uni.getStorageSync('id')
			this.type = e.type
			console.log(e);
			if (e.type == 5) {
				console.log();
				this.paper = JSON.parse(decodeURIComponent(e.list))
			} else {
				let list = e.list.split(',')
				let scoreList = e.question_set_score.split(',')
				this.scoreList = scoreList
				this.id = e.id
				if (e.papertype == 1) {
					list.map((e) => {
						question_bank.get(e).then((res) => {
							this.paper.push(res.data)
						})
					})
				} else {
					list.map((e) => {
						test_paper.get(e).then((res) => {
							this.paper.push(res.data)
						})
					})
				}
			}
		},
		onUnload: function() {
			uni.reLaunch({
				url: '/pages/pratice/pratice'
			})
		},
	}
</script>

<style scoped></style>
