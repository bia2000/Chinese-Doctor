// export var BaaS = require('minapp-sdk')
// import './sdk-wechat.3.22.0.js'
let clientID = '1f260e46eac461319ce1'
wx.BaaS.init(clientID)

export let user = new wx.BaaS.TableObject('_userprofile')
export let outline_top = new wx.BaaS.TableObject('outline_top')
export let grade_standard = new wx.BaaS.TableObject('grade_standard')
export let task_outline = new wx.BaaS.TableObject('task_outline')
export let vocabulary_outline = new wx.BaaS.TableObject('vocabulary_outline')
export let topic_outline = new wx.BaaS.TableObject('topic_outline')
export let test_paper = new wx.BaaS.TableObject('test_paper')
export let question_bank = new wx.BaaS.TableObject('question_bank')
export let user_info = new wx.BaaS.TableObject('user_info')
export let paper_user = new wx.BaaS.TableObject('paper_user')
export let paper_public = new wx.BaaS.TableObject('paper_public')
export let collect_article = new wx.BaaS.TableObject('collect_article')
export let user_comment = new wx.BaaS.TableObject('user_comment')
export let learn_information = new wx.BaaS.TableObject('learn_information')
export let learn_information_MCTdialogue = new wx.BaaS.TableObject('learn_information_MCTdialogue')
export let points = new wx.BaaS.TableObject('points')
export let user_actions = new wx.BaaS.TableObject('user_actions')
export let notice = new wx.BaaS.TableObject('notice')
export let news = new wx.BaaS.TableObject('news')
export let chat_circle = new wx.BaaS.TableObject('chat_circle')
export let questionnaire = new wx.BaaS.TableObject('questionnaire')
export let MyFile = new wx.BaaS.File()
export let MyFileCategory = new wx.BaaS.FileCategory()
export let query = new wx.BaaS.Query()
export let query2 = new wx.BaaS.Query()

export let Product = new wx.BaaS.TableObject('kg')

	wx.BaaS.auth.login({
		username: '13555555555',
		password: '111111'
	})

export async function _login(i) {
	// BaaS.auth.anonymousLogin().then(user => {
	// 	console.log(user)
	// }).catch(err => {
	// 	// HError
	// })
	// console.log(i);
	query.queryObject.$and = []
	var r2
	query.contains('phone', i.phone)
	r2 = await user_info
		.setQuery(query)
		.find()
		.then(
			(res) => {
				var r1
				// console.log(res)
				res.data.objects.forEach((e) => {
					if (i.password == e.password) r1 = true
					else r1 = false
				})
				if (res.data.objects.length < 1 || r1 == false)
					uni.showToast({
						title: '账号密码错误',
						// 勾号消失
						icon: 'none',
					})
				return r1
			},
			(err) => {
				console.log('error')
			}
		)
	wx.BaaS.auth.login({
		username: '13555555555',
		password: '111111'
	})
	// wx.BaaS.auth.loginWithWechat().then(user => {
	//   // 登录成功
	// 	console.log(user);
	// }, err => {
	//   // 登录失败
	// 	console.log('denglushibai');
	// })
	return r2
}

export function updateuserInfo(key) {
	let id = uni.getStorageSync('id')
	user_info.get(id).then(res=>{
		console.log(res);
		console.log(res);
		let papers = res.data[key] + 1
		let product = user_info.getWithoutData(id)
		product.set(key, papers)
		product.update()
	})
	
}
// 获取用户信息
export async function getUserInfo(id) {
	let userInfo = []
	userInfo = await user_info
		.get(id)
		.then(
			(res) => {
				userInfo = res.data
				return userInfo
			},
			(err) => {
				console.log('error')
			}
		)
	return userInfo
}

// 获取试卷列表
export async function getUserPaper(query) {
	let paperList = []
	// query.queryObject.$and = []
	// query.contains('user_id', userId)
	paperList = await paper_user
		.setQuery(query)
		.limit(100)
		.orderBy('-created_at')
		.find()
		.then(
			(res) => {
				paperList = res.data.objects
				return paperList
			},
			(err) => {
				console.log('error')
			}
		)
	return paperList
}

export function getPoints(key, num) {
	let userId = uni.getStorageSync('id')
	// let today = new Date()
	let userd = []
	let todays = new Date(new Date(new Date().toLocaleDateString()).getTime())
	// let todaye = new Date(new Date(new Date().toLocaleDateString()).getTime() +24 * 60 * 60 * 1000 -1)
	query.queryObject.$and = []
	query.contains('userId', userId)
	query.compare('created_at', '>', todays / 1000)
	userd = points.setQuery(query).find().then((res) => {
		uni.setStorageSync('pointsid', res.data.objects[0].id)
	})
	let pointsid = uni.getStorageSync('pointsid')
	points.get(pointsid).then(res => {
		let pp = res.data[key]
		if (pp != num)
			++pp
		let product = points.getWithoutData(pointsid)
		product.set(key, pp)
		product.update()
		// console.log(res);
		// console.log(pp);
	})
}
export function updateUserAction(key,num) {
		let id = uni.getStorageSync('id')
		let usera = []
		query.queryObject.$and = []
		query.contains('userId', id)
		user_actions.setQuery(query).find().then((res) => {
			// console.log(res)
			usera = res.data.objects[0][key]
			if(key.indexOf('rate')!=-1){
				usera = (num*1+usera)/2
			}else
			usera += num
			let product = user_actions.getWithoutData(res.data.objects[0].id)
			product.set(key, usera)
			product.update()
		})
}
