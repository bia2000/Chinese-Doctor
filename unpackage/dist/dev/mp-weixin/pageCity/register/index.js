(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pageCity/register/index"],{248:function(e,n,t){"use strict";(function(e,n){var o=t(4);t(26);o(t(25));var r=o(t(249));e.__webpack_require_UNI_MP_PLUGIN__=t,n(r.default)}).call(this,t(1)["default"],t(2)["createPage"])},249:function(e,n,t){"use strict";t.r(n);var o=t(250),r=t(252);for(var i in r)["default"].indexOf(i)<0&&function(e){t.d(n,e,(function(){return r[e]}))}(i);t(254);var s,u=t(32),c=Object(u["default"])(r["default"],o["render"],o["staticRenderFns"],!1,null,"f5c13046",null,!1,o["components"],s);c.options.__file="pageCity/register/index.vue",n["default"]=c.exports},250:function(e,n,t){"use strict";t.r(n);var o=t(251);t.d(n,"render",(function(){return o["render"]})),t.d(n,"staticRenderFns",(function(){return o["staticRenderFns"]})),t.d(n,"recyclableRender",(function(){return o["recyclableRender"]})),t.d(n,"components",(function(){return o["components"]}))},251:function(e,n,t){"use strict";var o;t.r(n),t.d(n,"render",(function(){return r})),t.d(n,"staticRenderFns",(function(){return s})),t.d(n,"recyclableRender",(function(){return i})),t.d(n,"components",(function(){return o}));try{o={uInput:function(){return Promise.all([t.e("common/vendor"),t.e("node-modules/uview-ui/components/u-input/u-input")]).then(t.bind(null,538))},uAlert:function(){return Promise.all([t.e("common/vendor"),t.e("node-modules/uview-ui/components/u-alert/u-alert")]).then(t.bind(null,606))}}}catch(u){if(-1===u.message.indexOf("Cannot find module")||-1===u.message.indexOf(".vue"))throw u;console.error(u.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var r=function(){var e=this,n=e.$createElement;e._self._c},i=!1,s=[];r._withStripped=!0},252:function(e,n,t){"use strict";t.r(n);var o=t(253),r=t.n(o);for(var i in o)["default"].indexOf(i)<0&&function(e){t.d(n,e,(function(){return o[e]}))}(i);n["default"]=r.a},253:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=t(163),r={name:"register",data:function(){return{userName:"",phone:null,email:"",check:!1,newPassword:"",confirmPassword:"",description:"中文名，手机号等信息仅在登录及核对得分用，不做其他用途",userlist:[],rules:{userName:[{rule:/[\u4E00-\u9FA5]/,msg:"中文名只能是汉字"}],phone:[{rule:/^[1][3,4,5,7,8][0-9]{9}$/,msg:"请输入正确的手机号码"}],newPassword:[{rule:/^.{6,20}$/,msg:"密码长度必须为6-20个字符"}]}}},computed:{},methods:{checkboxChange:function(){this.check=!this.check},toRegister:function(){if(this.validate("userName")&&this.validate("phone")&&this.validate("newPassword")&&this.validate("confirmPassword")){if(!this.check)return e.showToast({title:"请先同意协议",icon:"none"});var n=o.user_info.create();n.set({name:this.userName,phone:this.phone+"",password:this.newPassword+""}),console.log(3),n.save().then((function(n){console.log(4),e.showToast({icon:"none",title:"注册成功"}),console.log(5),setTimeout((function(){e.redirectTo({url:"../login/index"})}),1e3)}),(function(e){console.log(e)}))}},validate:function(n){var t=this,o=!0;if("phone"==n){if(-1!=this.userlist.indexOf(this[n]))return e.showToast({title:"该手机号已注册过",icon:"none"}),o=!1}else if("confirmPassword"!=n)this.rules[n].forEach((function(r){if(!r.rule.test(t[n]))return e.showToast({title:r.msg,icon:"none"}),o=!1}));else if(this[n]!=this.newPassword)return e.showToast({title:"密码不一致",icon:"none"}),o=!1;return o}},watch:{},onLoad:function(){var e=this;o.user_info.find().then((function(n){n.data.objects.forEach((function(n){e.userlist.push(n.phone)}))}))},onReady:function(){},onShow:function(){}};n.default=r}).call(this,t(2)["default"])},254:function(e,n,t){"use strict";t.r(n);var o=t(255),r=t.n(o);for(var i in o)["default"].indexOf(i)<0&&function(e){t.d(n,e,(function(){return o[e]}))}(i);n["default"]=r.a},255:function(e,n,t){}},[[248,"common/runtime","common/vendor"]]]);