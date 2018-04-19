import Vue from 'vue';
import VueRouter from 'vue-router'
import  mainPart from '../src/pages/main-part.vue'
import  mainBody from  '../src/pages/main-body.vue'
import  home from '../src/pages/home.vue'
import  history from '@/pages/history.vue'
import  login from '@/pages/login/login'
import  sign from '@/pages/login/sign'
import  register from '@/pages/login/register'
import author from '@/pages/author/author'
import  user_index from '@/pages/login/index'
Vue.use(VueRouter)
const routes = [
  {path:'/',component:home},
  {path:'/details',component:mainPart},
  { path: '/info/:id', component: mainBody,name:'info' },
  { path: '/history', component: history },
  { path: '/author', component: author },
  { path: '/user_index', component:user_index },
  { path: '/login', component: login ,
    children: [{path:'sign',component:sign},{path:'register',component:register}]},
]
export default new VueRouter({
/*  mode: 'history',*/
  routes
})
