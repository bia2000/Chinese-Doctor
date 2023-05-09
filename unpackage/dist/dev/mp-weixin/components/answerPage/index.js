(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/answerPage/index"],{644:function(t,e,n){"use strict";n.r(e);var i=n(645),r=n(647);for(var s in r)["default"].indexOf(s)<0&&function(t){n.d(e,t,(function(){return r[t]}))}(s);n(649);var u,o=n(32),a=Object(o["default"])(r["default"],i["render"],i["staticRenderFns"],!1,null,"e5c38e2a",null,!1,i["components"],u);a.options.__file="components/answerPage/index.vue",e["default"]=a.exports},645:function(t,e,n){"use strict";n.r(e);var i=n(646);n.d(e,"render",(function(){return i["render"]})),n.d(e,"staticRenderFns",(function(){return i["staticRenderFns"]})),n.d(e,"recyclableRender",(function(){return i["recyclableRender"]})),n.d(e,"components",(function(){return i["components"]}))},646:function(t,e,n){"use strict";var i;n.r(e),n.d(e,"render",(function(){return r})),n.d(e,"staticRenderFns",(function(){return u})),n.d(e,"recyclableRender",(function(){return s})),n.d(e,"components",(function(){return i}));try{i={uIcon:function(){return Promise.all([n.e("common/vendor"),n.e("node-modules/uview-ui/components/u-icon/u-icon")]).then(n.bind(null,471))},uRadioGroup:function(){return Promise.all([n.e("common/vendor"),n.e("node-modules/uview-ui/components/u-radio-group/u-radio-group")]).then(n.bind(null,588))},uRadio:function(){return Promise.all([n.e("common/vendor"),n.e("node-modules/uview-ui/components/u-radio/u-radio")]).then(n.bind(null,596))},uModal:function(){return Promise.all([n.e("common/vendor"),n.e("node-modules/uview-ui/components/u-modal/u-modal")]).then(n.bind(null,651))}}}catch(o){if(-1===o.message.indexOf("Cannot find module")||-1===o.message.indexOf(".vue"))throw o;console.error(o.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var r=function(){var t=this,e=t.$createElement,n=(t._self._c,t.paper.length>0||t.papers),i=n&&2!=t.type?t.paper.length||10:null,r=n?t.paper[t.currentPage-1].question_content.length:null,s=n?t.paper[t.currentPage-1].question_content.length>10&&t.paper[t.currentPage-1].question_content.length<20:null,u=n&&s?t.getFile(t.paper[t.currentPage-1].question_content):null,o=n?t.paper[t.currentPage-1].question_content.length:null,a=n&&o<10?t.getFile(t.paper[t.currentPage-1].question_content):null,c=n&&!t.isWrong?t.currentPage==t.paper.length&&(t.isSubmit||3==t.type||4==t.type):null,h=n&&!t.isWrong?t.paper.length:null;t._isMounted||(t.e0=function(){return t.isShow=!1}),t.$mp.data=Object.assign({},{$root:{g0:n,g1:i,g2:r,g3:s,m0:u,g4:o,m1:a,g5:c,g6:h}})},s=!1,u=[];r._withStripped=!0},647:function(t,e,n){"use strict";n.r(e);var i=n(648),r=n.n(i);for(var s in i)["default"].indexOf(s)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(s);e["default"]=r.a},648:function(t,e,n){"use strict";(function(t){var i=n(4);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=i(n(55)),s=i(n(57)),u=n(162),o=n(163),a=n(159),c=function(){n.e("components/audioView/index").then(function(){return resolve(n(629))}.bind(null,n)).catch(n.oe)},h={name:"answerPage",props:["paper","type","scoreList"],components:{audioView:c},data:function(){return{userId:"",currentPage:1,check:[],nums:0,isWrong:!1,isSubmit:!1,isPaperSubmit:!1,isShow:!1,num_actions:{h:0,r:0,w:0},answerList:[],userInfo:[],num_question:0,score:0,t:{flag:null,s1:"00",f1:"00",m1:"00",s2:0,f2:0,m2:0}}},watch:{check:function(t,e){}},computed:{papers:function(){},time:function(){return this.t.s1+":"+this.t.f1+":"+this.t.m1},percent:function(){if(this.paper.length>0)var t=this.currentPage/this.paper.length;var e=Math.ceil(100*t)+"%";return e},content:function(){return"您答对了"+this.num_question+"题"},options:function(){if(this.paper.length>0){var t={},e=[],n=this.paper[this.currentPage-1].options;if(this.paper.length>0){var i=(0,u.trimAll)(n);if(i&&(t["content"]=i.match(/(?<=(content":")).*?(?=("))/g),t["index"]=i.match(/(?<=(index":")).*?(?=("))/g)),i)for(var r=0;r<t.content.length;r++)e.push({content:t.content[r],index:t.index[r]})}return e}},showError:function(){return this.check[this.currentPage-1]!=this.paper[this.currentPage-1].answer&&(this.isWrong||this.isSubmit||this.isPaperSubmit)},totalScore:function(){var t=0;if(this.scoreList)return this.scoreList.map((function(e){t+=1*e})),t}},methods:{quit:function(){t.reLaunch({url:"/pages/pratice/pratice"})},toNext:function(){if(this.groupby(),this.isWrong=!1,2==this.type)if(this.check[this.currentPage-1]!=this.paper[this.currentPage-1].answer){var e=this.paper[this.currentPage-1].user_id,n=o.question_bank.getWithoutData(this.paper[this.currentPage-1].id);-1==e.indexOf(this.userId)&&e.push(this.userId),n.set("user_id",e),n.update(),this.isWrong=!0,this.isShow=!0,this.$emit("toMatch",this.num_question)}else(0,o.updateUserAction)("count_ma_h",1),(0,o.updateUserAction)("count_ma_r",1),(0,o.updateUserAction)("count_ma_w",1),(0,o.getPoints)("ismatch",20),this.currentPage++,this.num_question++;else this.currentPage++;if(11==this.currentPage&&1==this.type){this.currentPage--,this.getGreat(),this.isSubmit=!0,(0,o.updateUserAction)("count_sp_h",this.num_actions.h),(0,o.updateUserAction)("count_sp_r",this.num_actions.r),(0,o.updateUserAction)("count_sp_w",this.num_actions.w);var i=this.nums/this.paper.length;(0,o.updateUserAction)("rate_sp_w",i),(0,o.updateUserAction)("rate_sp_h",i),(0,o.updateUserAction)("rate_sp_r",i),t.showToast({title:"恭喜您答对了"+this.nums+"题",icon:"none"})}},toPrev:function(){this.currentPage--},radioGroupChange:function(t){this.paper[this.currentPage-1].check=t,this.check[this.currentPage-1]=t},getGreat:function(){if(1==this.type)for(var t=0;t<this.paper.length;t++){var e=o.question_bank.getWithoutData(this.paper[t].id),n=this.paper[t].userlist;if(-1==n.indexOf(this.userId)&&n.push(this.userId),e.set("userlist",n),e.update(),this.check[t]==this.paper[t].answer)(0,o.getPoints)("isspecial",20),this.nums+=1;else{var i=this.paper[t].user_id,r=o.question_bank.getWithoutData(this.paper[t].id);-1==i.indexOf(this.userId)&&i.push(this.userId),r.set("user_id",i),r.update()}}else if(3==this.type)for(var s=0;s<this.paper.length;s++)if(this.answerList.push(this.check[s]),console.log(this.answerList),this.check[s].length<5)if(this.check[s]==this.paper[s].answer)(0,o.getPoints)("isanswer",20),this.nums+=1,this.score+=1*this.scoreList[s];else{var c=this.paper[s].user_id,h=o.question_bank.getWithoutData(this.paper[s].id);-1==c.indexOf(this.userId)&&c.push(this.userId),h.set("user_id",c),h.update()}else{var p=(0,u.similar)(this.check[s],this.paper[s].answer);(0,o.getPoints)("isanswer",20),this.score+=Math.ceil(this.scoreList[s]*p),(0,a.createLogger)(this.score)}},getFile:function(t){return"https://cloud-minapp-45998.cloud.ifanrusercontent.com/"+t},submit:function(){this.getGreat(),this.isPaperSubmit=!0,(0,o.updateUserAction)("count_pp_h",this.num_actions.h),(0,o.updateUserAction)("count_pp_r",this.num_actions.r),(0,o.updateUserAction)("count_pp_w",this.num_actions.w);var e=this.nums/this.paper.length;(0,o.updateUserAction)("rate_pp_w",e),(0,o.updateUserAction)("rate_pp_h",e),(0,o.updateUserAction)("rate_pp_r",e),t.showToast({title:"提交成功",icon:"none"}),this.$emit("toPaperSubmit",this.score,this.answerList,this.time)},deleteError:function(t){var e=this.paper[t].user_id,n=o.question_bank.getWithoutData(this.paper[t].id),i=e.indexOf(this.userId);-1!=i&&(this.paper.splice(i,1),e.splice(i,1)),n.set("user_id",e),n.update()},groupby:function(){var t=this.paper,e={};t.forEach((function(t){var n=t.primary_ques_type;e[n]||(e[n]={primary_ques_type:n,child:[]}),e[n].child.push(t)})),e["听力"]&&(this.num_actions.h=e["听力"].child.length),e["阅读"]&&(this.num_actions.r=e["阅读"].child.length),e["写作"]&&(this.num_actions.w=e["写作"].child.length),console.log(this.num_actions)},startHandler:function(){var t=this;this.t.flag=setInterval((function(){60===t.t.m1||"60"===t.t.m1?(t.t.m1="00",t.t.m2=0,60===t.t.f1||"60"===t.t.f1?(t.t.f1="00",t.t.f2=0,t.t.s2+1<=9?(t.t.s2++,t.t.s1="0"+t.t.s2):(t.t.s2++,t.t.s1=t.t.s2)):t.t.f2+1<=9?(t.t.f2++,t.t.f1="0"+t.t.f2):(t.t.f2++,t.t.f1=t.t.f2)):t.t.m2+1<=9?(t.t.m2++,t.t.m1="0"+t.t.m2):(t.t.m2++,t.t.m1=t.t.m2)}),1e3)},endHandler:function(){this.flag=clearInterval(this.flag)}},onShow:function(){},mounted:function(){var e=this;return(0,s.default)(r.default.mark((function n(){return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return e.userId=t.getStorageSync("id"),e.startHandler(),4==e.type&&(e.isPaperSubmit=!0),n.next=5,(0,o.getUserInfo)(e.userId);case 5:e.userInfo=n.sent;case 6:case"end":return n.stop()}}),n)})))()}};e.default=h}).call(this,n(2)["default"])},649:function(t,e,n){"use strict";n.r(e);var i=n(650),r=n.n(i);for(var s in i)["default"].indexOf(s)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(s);e["default"]=r.a},650:function(t,e,n){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/answerPage/index-create-component',
    {
        'components/answerPage/index-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('2')['createComponent'](__webpack_require__(644))
        })
    },
    [['components/answerPage/index-create-component']]
]);