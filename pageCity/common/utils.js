// import * from './request'
// export var BaaS = require('minapp-sdk')
// let clientID = '1f260e46eac461319ce1'
// BaaS.init(clientID)

// export let outline_top = new BaaS.TableObject('outline_top')
// export let grade_standard = new BaaS.TableObject('grade_standard')
// export let task_outline = new BaaS.TableObject('task_outline')
// export let vocabulary_outline = new BaaS.TableObject('vocabulary_outline')
// export let topic_outline = new BaaS.TableObject('topic_outline')
// export let test_paper = new BaaS.TableObject('test_paper')
// export let question_bank = new BaaS.TableObject('question_bank')
// export let user_info = new BaaS.TableObject('user_info')
// export let paper_user = new BaaS.TableObject('paper_user')
// export let learn_information = new BaaS.TableObject('learn_information')
// export let MyFile = new BaaS.File()
// export let MyFileCategory = new BaaS.FileCategory()
// export let query = new BaaS.Query()
// export let query2 = new BaaS.Query()
//   // 设置查询条件（比较、字符串包含、组合等）
//   //...
//   // 应用查询对象
// 	export  let Product = new BaaS.TableObject('kg')

// export async function _login(i){
// 	// BaaS.auth.anonymousLogin().then(user => {
// 	// 	console.log(user)
// 	// }).catch(err => {
// 	// 	// HError
// 	// })
// 	query.queryObject.$and = []
// 	var r2
// 	query.contains('phone', i.phone)
// 	r2 = await user_info
// 	.setQuery(query)
// 	.find()
// 	.then(
// 		(res) => {
// 			var r1
// 			// console.log(res)
// 			res.data.objects.forEach((e) => {
// 				if(i.password == e.password) r1=true
// 				else r1=false
// 			})
// 			if(res.data.objects.length<1||r1==false)
// 			uni.showToast({
// 				title: '账号密码错误',
// 				// 勾号消失
// 				icon: 'none',
// 			})
// 			return r1
// 		},
// 		(err) => {
// 			console.log('error')
// 		}
// 	)
// 	BaaS.auth.login({username: i.phone, password: i.password}).then(user => {
// 		console.log(user)
// 	}).catch(err=>{
// 		// HError
// 	})
// 	return r2
// }

// export function updateuserInfo(recordID,key,value){
// 	let product = user_info.getWithoutData(recordID)
// 	product.set(key, value)
// 	product.update()
// }
// // 获取用户信息
// export async function getUserInfo(id){
// 	let userInfo =[]
// 	userInfo = await user_info
// 		.get(id)
//       .then(
//         (res) => {
// 					userInfo = res.data
// 					return userInfo
//         },
//         (err) => {
//           console.log('error')
//         }
//       )
// 			return userInfo
// }
//将一个数组中，每n个组成一个新数组
export function spArray(N,Q){
  var R = [],F;
  for (F = 0;F < Q.length;) {
      R.push(Q.slice(F,F += N))
  }
  return R
}

//页面跳转
export function goBack(index, url) {
	if (index == 1) {
		// 关闭当前页，返回上一页面或多级页面。
		uni.navigateBack({
			delta: url,
			animationType: 'pop-out',
			animationDuration: 300
		});
	} else if (index == 2) {
		// 保留当前页，跳转到非tabbar页面，使用uni.navigateBack可以返回到原页面。
		uni.navigateTo({
			url: url,
			animationType: 'pop-in',
			animationDuration: 300
		})
	} else if (index == 3) {
		// 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。
		uni.switchTab({
			url: url,
			animationType: 'pop-in',
			animationDuration: 300
		})
	} else if (index == 4) {
		// 关闭所有页面，打开到应用内的某个页面。
		uni.reLaunch({
			url: url,
			animationType: 'pop-in',
			animationDuration: 300
		})
	} else if (index == 5) {
		// 关闭当前页面，跳转到应用内的某个页面。
		uni.redirectTo({
			url: url,
		});
	}
}

//消除空格
export function trimAll(ele){
	if(typeof ele === 'string'){
		 return ele.split(' ').join('');
	}else{
			// console.error(`${typeof ele} is not the expected type, but the string type is expected`)
	}
}
// 随机从一个数组中取n个
export function getRandomArrayElements(arr, count) {
	var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;  //只是声明变量的方式, 也可以分开写
	while (i-- > min) {
			//console.log(i);
			index = Math.floor((i + 1) * Math.random()); //这里的+1 是因为上面i--的操作  所以要加回来
			temp = shuffled[index];  //即值交换
			shuffled[index] = shuffled[i];
			shuffled[i] = temp;
			//console.log(shuffled);
	}
	return shuffled.slice(min);
}

//根据每个数组中一个属性的值进行分组
// 方法1
export function groupBy(paper,key){
	const groupedBy = {}
	for (const item of paper) {
		if (groupedBy[item[key]]) {
			groupedBy[item[key]].push(item)
		} else {
			groupedBy[item[key]] = [item]
		}
	}
	return groupedBy
}
// 方法2

// 时间戳转化 年月日
export function TimestampToDate(Timestamp) {
	let date1 = new Date(Timestamp);
	return date1.toLocaleDateString().replace(/\//g, ".")
}

/**
 * 格式化函数 ， 给日期格式化
 * date为 new Date()对象， fmt为 'yyyy-MM-dd'的格式
 */
export function formatDate(date, fmt) {
  //获取年份
  if (/(y+)/.test(fmt)) {
    let dateY = date.getFullYear() + "";
    //RegExp.$1 在判断中出现过，且是括号括起来的，所以 RegExp.$1 就是 "yyyy"
    fmt = fmt.replace(RegExp.$1, dateY.substr(4 - RegExp.$1.length));
  }

  //获取其他
  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  };
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + "";
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? str : padLeftZero(str)
      );
    }
  }
  return fmt;
}
function padLeftZero(str) {
  return ("00" + str).substr(str.length);
}

// 播放音频文件
export function playAudio(url) {
	var mp3 = null
	this.f2 = true
	mp3 = this.getFile(url)
	mp3 = new Audio(mp3)
	if (this.f2) {
		mp3.play() //播放 mp3这个音频对象
		this.f2 = false
	}
}
//某一项属性相同的对象筛选出来   (解构貌似不能带参数)
// containSelect(arr,key){
// 	// let arr = this.paper
//       let dataInfo = {}
//       arr.forEach((item) => {
//         let { key } = item
//         // console.log(line_name)
//         if (!dataInfo[primary_ques_type]) {
//           dataInfo[primary_ques_type] = {
//             primary_ques_type,
//             child: [],
//           }
//         }
//         dataInfo[primary_ques_type].child.push(item)
//       })
//       let list = Object.values(dataInfo)
// }

// 数字转大写
export function numToCapital(num, type = ''){
  if (!num) return 0
  const strNum = Number((num + '').replace(/[,，]*/g, '')) + '' // 记录字符
  num = parseInt(Number(strNum)) // 转为整数，
  let capitalAr = '零一二三四五六七八九十'
  let unitAr = ['十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千']
  if (type) {
    capitalAr = '零壹贰叁肆伍陆柒捌玖拾'
    unitAr = ['拾', '佰', '仟', '万', '拾', '佰', '仟', '亿', '拾', '佰', '仟'] // 单位
  }
  const resultAr = [] // 记录结果，后边json.in就可
  let index = strNum.length - 1 //记录位数
  let idx = 0 // 记录单位
  let percent = 10
  const turnNum = (num, percent, index) => {
    const unit = num / percent
    const capital = capitalAr[Number(strNum[index])]
    if (unit < 1) {
      resultAr.push(capital)
      // 出现11【一十一】这种情况
      if (Number(strNum[index]) === 1 && (strNum.length === 2 || strNum.length === 6 || strNum.length === 10)) {
        resultAr.pop()
      }
      return false //结束递归
    } else {
      if (capital === '零') {
        // 万和亿单位不删除
        if (!['万', '亿'].includes(resultAr[resultAr.length - 1])) {
          resultAr.pop()
        }
        // 前面有零在删掉一个零
        if (resultAr[resultAr.length - 1] === '零') {
          resultAr.pop()
        }
      }
      resultAr.push(capital)
      // 过滤存在【零万】【零亿】这种情况
      if (['万', '亿'].includes(resultAr[resultAr.length - 2]) && capital === '零') {
        resultAr.pop()
      }
      // 过滤【1亿万】这种情况
      if (resultAr[0] === '万' && resultAr[1] === '亿') {
        resultAr.shift()
      }
      // 末尾【零】删掉
      if (resultAr[0] === '零') {
        resultAr.pop()
      }
      resultAr.push(unitAr[idx++])
      turnNum(num, percent * 10, --index)
    }
  }
  turnNum(num, percent, index)
  return resultAr.reverse().join('')
}

export function similar(s, t, f) {
  if (!s || !t) {
      return 0
  }
  var l = s.length > t.length ? s.length : t.length
  var n = s.length
  var m = t.length
  var d = []
  f = f || 3
  var min = function(a, b, c) {
      return a < b ? (a < c ? a : c) : (b < c ? b : c)
  }
  var i, j, si, tj, cost
  if (n === 0) return m
  if (m === 0) return n
  for (i = 0; i <= n; i++) {
      d[i] = []
      d[i][0] = i
  }
  for (j = 0; j <= m; j++) {
      d[0][j] = j
  }
  for (i = 1; i <= n; i++) {
      si = s.charAt(i - 1)
      for (j = 1; j <= m; j++) {
          tj = t.charAt(j - 1)
          if (si === tj) {
              cost = 0
          } else {
              cost = 1
          }
          d[i][j] = min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost)
      }
  }
  let res = (1 - d[n][m] / l)
  return res.toFixed(f)
}