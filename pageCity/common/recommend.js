function addScript(url){
	document.write("<script language=javascript src="+url+"></script>");
}
	import {user_actions,		query	} from './request.js'

function getLevel(score){
	let levelList = ['一级','二级','三级']
	if(score<60) return levelList[0]
	else if(score<85) return levelList[1]
	else return levelList[2]
}

	export async function  getkeyword(){
		let userId = uni.getStorageSync('id')
		let datauser=[]
		query.queryObject.$and = []
		query.contains('userId', userId)
		let level = await user_actions.setQuery(query).find().then((res) => {
			let data_a = res.data.objects[0]
			// this.dataList = res.data.objects[0]
			datauser = [data_a.hear, data_a.oral, data_a.read, data_a.write, data_a.assist, data_a.study]
			return (datauser[0]+datauser[1]+datauser[2]+datauser[3])/4
		})
		return getLevel(level)
	}
