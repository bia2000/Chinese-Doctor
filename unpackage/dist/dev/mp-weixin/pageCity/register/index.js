(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pageCity/register/index"],{232:function(e,n,t){"use strict";(function(e,n){var r=t(4);t(26);r(t(25));var o=r(t(233));e.__webpack_require_UNI_MP_PLUGIN__=t,n(o.default)}).call(this,t(1)["default"],t(2)["createPage"])},233:function(e,n,t){"use strict";t.r(n);var r=t(234),o=t(236);for(var i in o)["default"].indexOf(i)<0&&function(e){t.d(n,e,(function(){return o[e]}))}(i);t(238);var s,u=t(32),a=Object(u["default"])(o["default"],r["render"],r["staticRenderFns"],!1,null,"f5c13046",null,!1,r["components"],s);a.options.__file="pageCity/register/index.vue",n["default"]=a.exports},234:function(e,n,t){"use strict";t.r(n);var r=t(235);t.d(n,"render",(function(){return r["render"]})),t.d(n,"staticRenderFns",(function(){return r["staticRenderFns"]})),t.d(n,"recyclableRender",(function(){return r["recyclableRender"]})),t.d(n,"components",(function(){return r["components"]}))},235:function(e,n,t){"use strict";var r;t.r(n),t.d(n,"render",(function(){return o})),t.d(n,"staticRenderFns",(function(){return s})),t.d(n,"recyclableRender",(function(){return i})),t.d(n,"components",(function(){return r}));try{r={uInput:function(){return Promise.all([t.e("common/vendor"),t.e("node-modules/uview-ui/components/u-input/u-input")]).then(t.bind(null,512))}}}catch(u){if(-1===u.message.indexOf("Cannot find module")||-1===u.message.indexOf(".vue"))throw u;console.error(u.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var o=function(){var e=this,n=e.$createElement;e._self._c},i=!1,s=[];o._withStripped=!0},236:function(e,n,t){"use strict";t.r(n);var r=t(237),o=t.n(r);for(var i in r)["default"].indexOf(i)<0&&function(e){t.d(n,e,(function(){return r[e]}))}(i);n["default"]=o.a},237:function(e,n,t){"use strict";(function(e){var r=t(4);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=r(t(13)),i=t(163),s={name:"register",data:function(){return{userName:"",phone:null,email:"",newPassword:"",confirmPassword:"",userlist:[],codeKey:"",rules:{userName:[{rule:/[\u4E00-\u9FA5]/,msg:"中文名只能是汉字"}],phone:[{rule:/^[1][3,4,5,7,8][0-9]{9}$/,msg:"请输入正确的手机号码"}],email:[{rule:/^([0-9a-zA-Z_\.\-\u4e00-\u9fa5])+\@([0-9a-zA-Z_\.\-\])+\.([a-zA-Z]{2,8})$/,msg:"请输入正确的邮箱"}],newPassword:[{rule:/^.{6,20}$/,msg:"密码长度必须为6-20个字符"}]}}},computed:{},methods:{toRegister:function(){if(this.validate("userName")&&this.validate("email")&&this.validate("phone")&&this.validate("newPassword")&&this.validate("confirmPassword")){console.log((0,o.default)(this.phone)),console.log((0,o.default)(this.newPassword));var n=i.user_info.create();n.set({name:this.userName,email:this.email,phone:this.phone,password:this.newPassword}),n.save().then((function(n){e.redirectTo({url:"../login/index"})}),(function(e){}))}},validate:function(n){var t=this,r=!0;if("phone"==n){if(-1!=this.userlist.indexOf(this[n]))return e.showToast({title:"该手机号已注册过",icon:"none"}),r=!1}else if("confirmPassword"!=n)this.rules[n].forEach((function(o){if(!o.rule.test(t[n]))return e.showToast({title:o.msg,icon:"none"}),r=!1}));else if(this[n]!=this.newPassword)return e.showToast({title:"密码不一致",icon:"none"}),r=!1;return r}},watch:{},onLoad:function(){var e=this;i.user_info.find().then((function(n){n.data.objects.forEach((function(n){e.userlist.push(n.phone)}))}))},onReady:function(){},onShow:function(){}};n.default=s}).call(this,t(2)["default"])},238:function(e,n,t){"use strict";t.r(n);var r=t(239),o=t.n(r);for(var i in r)["default"].indexOf(i)<0&&function(e){t.d(n,e,(function(){return r[e]}))}(i);n["default"]=o.a},239:function(e,n,t){}},[[232,"common/runtime","common/vendor"]]]);