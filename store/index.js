import Vue from "vue"
import Vuex from "vuex"
 
Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        userId:'',
        userInfo: {},  
				seconds:0,
        hasLogin: false,
        question_set:[],
        pathName: "",
        currDbSource: {},
        currJobData: {},
        DbSource: []
    },
    mutations:{
    getQuestionset(state,e){
        state.question_set =e
    },
    // getId(state,id){
    //         state.userId =id
    //     },
    login(state, provider) {//改变登录状态  
        
        // state.uerInfo.token = provider.token  
        state.userInfo.phone = provider.phone
        state.userInfo.password = provider.password
        provider = JSON.stringify(provider);
        uni.setStorage({//将用户信息保存在本地  
            key: 'userInfo',  
            data: provider  
        })  
    },  
    logout(state) {//退出登录  
        state.hasLogin = false  
        state.userInfo = {}  
        uni.removeStorage({
            key:'id'
        })  
        uni.removeStorage({
            key:'userInfo'
        })  
      },

        // 保存当前菜单栏的路径
        savePath(state,pathName){
            state.pathName = pathName;
        },
        // 保存当前点击的数据源
        saveCurrDbSource(state,currDbSource){
            state.currDbSource = currDbSource;
        },
        // 保存当前点击的元数据
        saveCurrJobData(state,currJobData){
            state.currJobData = currJobData;
        },
        // 保存所有数据源
        saveDbSource(state,DbSource){
            state.DbSource = DbSource;
        }
    }
})