import Vue from 'vue';
import App from './App.vue';
import 'vant/lib/vant-css/index.css';
import router from '../config/vue-router'
import Vuex from 'Vuex'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import FastClick from 'fastclick'
FastClick.attach(document.body);
Vue.use(ElementUI);
Vue.use(Vuex)
Vue.prototype.$axios=axios
let history_data=localStorage.iris_last_history?JSON.parse(localStorage.iris_last_history):[]
/*axios.defaults.headers['Access-Token']=token*/
const height=document.documentElement.clientHeight-50
const store = new Vuex.Store({
  state: {
     viewHeight:height,
     tab_show:true,
      home_data:null,
    recommend_data:null,
      history_data:history_data,
      login_in:false
  },
  mutations: {
    increment (state) {
      state.count++
    },
    tabShow(state,obj){
      state.tab_show=obj.type=='show'?true:false
    },
    homePage(state,obj){
      state.home_data=obj.index
      state.recommend_data=obj.recommend
    },
     save_history(state,obj){
      if(state.history_data.length==0){
        state.history_data.push(obj)
      }
       for(var i=0;i<state.history_data.length;i++){
         if (parseInt(state.history_data[i].id)==parseInt(obj.id)){
           state.history_data[i]=obj
         }
       }
       if(obj.id) {
        function checkAdult(age) {
          return age.id == obj.id
        }
        state.history_data.some(checkAdult)
        if (!state.history_data.some(checkAdult)) {
          state.history_data.push(obj)
        }
      }
       localStorage.iris_last_history=JSON.stringify(state.history_data)
     },
    loginIn(state,s){
       if(s==1){
         state.login_in=true
         console.log('登录 成功')
       }else {
         state.login_in=false
         console.log('登录失败')
       }
    }
  }
})
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});


