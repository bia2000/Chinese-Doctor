import Vue from 'vue'
import App from './App'
import uView from "@/uni_modules/uview-ui";
import store from './store/index';
import 'pageCity/sdk-wechat.3.22.0.js'
import { goBack } from 'pageCity/common/utils.js' //公共方法
import { updateUserAction} from '@/common/request'
Object.assign(Vue.prototype, {
	'$goBack':goBack,
})
Vue.use(uView);
Vue.config.productionTip = false
let clientID = '1f260e46eac461319ce1'  
wx.BaaS.init(clientID)
App.mpType = 'app'
setInterval(function(){
	updateUserAction('time',30)
},30000)
setInterval(function(){
	store.state.seconds += 1
},1000)
// console.log(.hasLogin);
const app = new Vue({
  store,
  ...App
})
app.$mount()
