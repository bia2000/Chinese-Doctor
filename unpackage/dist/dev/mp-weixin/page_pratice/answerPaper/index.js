(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["page_pratice/answerPaper/index"],{321:function(e,t,n){"use strict";(function(e,t){var r=n(4);n(26);r(n(25));var a=r(n(322));e.__webpack_require_UNI_MP_PLUGIN__=n,t(a.default)}).call(this,n(1)["default"],n(2)["createPage"])},322:function(e,t,n){"use strict";n.r(t);var r=n(323),a=n(325);for(var o in a)["default"].indexOf(o)<0&&function(e){n.d(t,e,(function(){return a[e]}))}(o);var i,s=n(32),u=Object(s["default"])(a["default"],r["render"],r["staticRenderFns"],!1,null,"6b3e0e36",null,!1,r["components"],i);u.options.__file="page_pratice/answerPaper/index.vue",t["default"]=u.exports},323:function(e,t,n){"use strict";n.r(t);var r=n(324);n.d(t,"render",(function(){return r["render"]})),n.d(t,"staticRenderFns",(function(){return r["staticRenderFns"]})),n.d(t,"recyclableRender",(function(){return r["recyclableRender"]})),n.d(t,"components",(function(){return r["components"]}))},324:function(e,t,n){"use strict";var r;n.r(t),n.d(t,"render",(function(){return a})),n.d(t,"staticRenderFns",(function(){return i})),n.d(t,"recyclableRender",(function(){return o})),n.d(t,"components",(function(){return r}));var a=function(){var e=this,t=e.$createElement;e._self._c},o=!1,i=[];a._withStripped=!0},325:function(e,t,n){"use strict";n.r(t);var r=n(326),a=n.n(r);for(var o in r)["default"].indexOf(o)<0&&function(e){n.d(t,e,(function(){return r[e]}))}(o);t["default"]=a.a},326:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(163),a=function(){Promise.all([n.e("common/vendor"),n.e("components/answerPage/index")]).then(function(){return resolve(n(644))}.bind(null,n)).catch(n.oe)},o={name:"answerPaper",components:{answerPage:a},data:function(){return{paper:[],scoreList:[],id:"",papered:"",userId:"",type:""}},methods:{toPaperSubmit:function(e,t,n){console.log(this.id);var a=r.paper_user.getWithoutData(this.id);a.set({user_score:e+"",question_set_answer:t,flag:!0,time:n}),a.update(),(0,r.updateuserInfo)("papered")}},onLoad:function(t){var n=this;this.userId=e.getStorageSync("id"),this.type=t.type,4==t.type&&(this.type=3,r.paper_public.get(t.id).then((function(e){console.log(e);var t=r.paper_user.create();t.set({user_id:n.userId,name:e.data.name,score_paper:e.data.score_paper,question_set:e.data.question_set,question_set_score:e.data.question_set_score}),t.save().then((function(e){console.log(e),n.id=e.data.id}))})));var a=t.list.split(","),o=t.question_set_score.split(",");this.scoreList=o,this.id=t.id,a.map((function(e){r.question_bank.get(e).then((function(e){n.paper.push(e.data)}))}))},mounted:function(){},onUnload:function(){e.reLaunch({url:"/pages/pratice/pratice"})}};t.default=o}).call(this,n(2)["default"])}},[[321,"common/runtime","common/vendor"]]]);