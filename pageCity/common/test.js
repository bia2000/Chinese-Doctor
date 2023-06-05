// var spArray = function(N,Q)
// {
//     var R = [],F;
//     for (F = 0;F < Q.length;) {
//         R.push(Q.slice(F,F += N))
//     }
//     return R
// }

// var arr = ['a','b','c','d','e','f'];
// console.log(spArray(3,arr))


// var str = 'http://zhipur.com/item?data=SN12018手动0525FEOCE';
// var code1 = str.match(/\?data=(.*)/)[1];//取 ?data=后面所有字符串
// var code2 = str.match(/data=(.*)/)[1];//取 data=后面所有字符串
// var code3 = str.match(/data=(.*)/)[0]; //取 包含 data=及后面的字符串
// console.log('?data= 后的内容为: '+code1);
// console.log('data= 后的内容为: '+code2);
// console.log('包含 data= 的所有内容为: '+code3);


// 花老半天写出来却没用上的
// answer() {
//   let str = this.paper[this.currentPage - 1].options
//   if (
//     this.currentPage <= 3 ||
//     (this.currentPage >= 13 && this.currentPage <= 17)
//   )
//     var code2 = str.match(/(?<=(index":")).*?(?=("))/g)
//   else var code2 = str.match(/(?<=(index": ")).*?(?=("))/g)
//   return code2
// },
// title1() {
//   const groupedBy = {}
//   for (const item of this.paper) {
//     if (groupedBy[item.primary_ques_type]) {
//       groupedBy[item.primary_ques_type].push(item)
//     } else {
//       groupedBy[item.primary_ques_type] = [item]
//     }
//   }
//   const t1 = { title: [], len: [0] }
//   t1['title'] = Object.keys(groupedBy)
//   if (t1['title'].length > 0)
//     for (let i of t1.title) {
//       t1['len'].push(groupedBy[i].length)
//     }
//   t1.len.pop()
//   for (let j = 1; j < t1.len.length; j++) {
//     t1.len[j] = t1.len[j] + t1.len[j - 1]
//   }
//   return t1
// },
// title2() {
//   const groupedBy = {}

//   for (const item of this.paper) {
//     if (groupedBy[item.secondary_ques_type]) {
//       groupedBy[item.secondary_ques_type].push(item)
//     } else {
//       groupedBy[item.secondary_ques_type] = [item]
//     }
//   }
//   const t1 = { title: [], len: [0] }
//   t1['title'] = Object.keys(groupedBy)
//   if (t1['title'].length > 0)
//     for (let i of t1.title) {
//       t1['len'].push(groupedBy[i].length)
//     }
//   t1.len.pop()
//   for (let j = 1; j < t1.len.length; j++) {
//     t1.len[j] = t1.len[j] + t1.len[j - 1]
//   }
//   return t1
// },

// var str = "时代精神的";
// var reg = RegExp(/一级/);
// console.log(reg.test(str)); // true



// let enterTime = '';
// let outTime = '';
// let stayTime = '';
// export default {
//   data() {
//     return {

//     };
//   },
// 	onShow(){
// 		// 用户进入时间
// 		enterTime = new Date();
// 		console.log(enterTime);
// 	},
// 	onHide(){
// 		// 用户退出时间
// 		outTime = new Date();
// 		//停留时间(毫秒)
// 		stayTime = outTime.getTime() - enterTime.getTime();
// 		let curRoute = this.$mp.page.route;
// 		console.log('页面隐藏'+curRoute+':'+stayTime);
// 	},
// 	onUnload() {
// 		// 用户退出时间
// 		outTime = new Date();
// 		//停留时间(毫秒)
// 		stayTime = outTime.getTime() - enterTime.getTime();
// 		let curRoute = this.$mp.page.route;
// 		console.log('页面卸载'+curRoute+':'+stayTime);
// 	}

// }

// 2.main.js文件全局注入

// import residenceTime from '@/mixins/residenceTime.js'

// Vue.mixin(residenceTime); //全局混入
// var str = "hello Tara";
// if(str.indexOf("Tara") !== -1){
// 	console.log(111);
// }
// var array = ['武汉', '北京', '上海', '天津'];
// var resultArray = array.sort(
//     function compareFunction(param1, param2) {
//         return param1.localeCompare(param2,"zh");
//     }
// );
// // return [resultArray]
// console.log([resultArray]);

// const inputString = '[{"content":"得分111","index":"时光"},{"content":"覆盖222","index":"反对"}]';
// const regex = /"content":"([^"]+)"/g;
// const matches = inputString.match(regex);
// const regex1 = /"content":"([^"]+)"/;
// // const matches1 = matches[0].match(regex1)
// const matches1 = matches.map(e=>{
//     return e.match(regex1)[1]
// })
// console.log(matches1); // ["content":"得分", "content":"覆盖"]
const inputString = '1.优生优育[nan] 2.保守[形/动] 3.牙龈（名）'
const regex = /（([^）]+)）/g;
const regex1 = /（([^）]+)）/;
const regex2 = /\[([^\]]+)\]/g;
const regex3 = /\[([^\]]+)\]/;


const matches = inputString.match(regex2);
console.log(matches);
const matches1 = matches.map(e=>{
    return e.match(regex3)[1]
})
console.log(matches1);
// console.log(inputString.match(/\[(?:.+?)\]/g));
