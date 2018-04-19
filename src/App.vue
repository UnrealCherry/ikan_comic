<template>
  <div id="app">
        <div  :style="{'height':this.$store.state.viewHeight+'px'}" style="margin-bottom: 50px;" ref="scroll" v-if="pageRefresh.show">
          <transition name="silder-down">
          <router-view  />
          </transition>
        </div>
    <!--视图-->
    <div class="view"  v-show="this.$store.state.tab_show"  id="tab">
      <div style="flex: 1;text-align: center;line-height: 50px;color: #00010e;" v-for="index in 4" @click="select_tab($event,index)" :class="{'we-hover':icon_face_index==index}">
      <router-link :to="'/'+tab[index-1].path">
        <svg class="icon" aria-hidden="true">
        <use  :xlink:href="icon_face_index==index?'#icon-emoji-'+(1+parseInt(Math.random()*25)):'#icon-emoji-26'"></use>
      </svg>
        <div style="margin-top: -40px;font-size: 12px">{{tab[index-1].name}}</div>
      </router-link>
      </div>
    </div>
    <!--导航-->
  </div>
</template>

<script>
import { Slider } from 'element-ui';
import { Cell, CellGroup, Icon } from 'vant';
import HOME from './pages/home.vue'
import PullTo from 'vue-pull-to'
import BScroll from 'better-scroll'
import url from 'static/_PubicFunction'
export default {
  created:function () {
    let path=this.$route.path.replace('/','')
    let parent_path=path.substring(0,path.indexOf('/'))
     for(let i=0;i<this.tab.length;i++){
      if(parent_path==this.tab[i]['path']){
        this.icon_face_index=i+1
      }
     }
    this.init()
  },
  mounted(){

  },
  updated(){

  },
  beforeDestroy(){
console.log('destroy')
  },
  components: {
    PullTo,
    [Cell.name]: Cell,
    HOME,
    'el-slider':Slider
  },
  watch:{
'pageRefresh.count':function (newVal,oldVal) {
  var that=this
  this.pageRefresh.show=false
 setTimeout(function () {
   that.pageRefresh.show=true
 },0)
},
    $route:function (to,from) {

    }
  },
  methods:{
    request_data(){
      var that =this
      let token=localStorage.Puless_token?localStorage.Puless_token:'nullF'
      this.$axios.get(url.host_url+'token?token='+token).then(function (tokenRes) {
        that.$store.commit('loginIn',tokenRes.data.s)
      })
      this.$axios.get(url.host_url+'homepage').then(function (res) {
        that.$store.commit('homePage',res.data)
      })
    },
    pageRefresh_run(){
    this.pageRefresh.count++
    },
    refresh(loaded){
      this.pageRefresh_run()
      loaded('done')
    },
    select_tab(ev,index){
      this.icon_face_index=index
    },
    init(){
      this.request_data()
      this.$nextTick(function () {
        this.scroll=new BScroll(this.$refs.scroll,{
          click: true
        })
      })
    }
  },
  data(){
    return {
      value1:0,
      url:url.host_url,
      icon_face_index:1,
      tab:[{name:'home',path:''},{name:'history',path:'history'},{name:'author',path:'author'},{name:'login',path:'login'}],
      pageRefresh:{
        show:true,
        count:0
      },
       _name:'a',
      scroll:0,
      TOP_DEFAULT_CONFIG:{
        pullText: '下拉刷新11', // The text is displayed when you pull down
        triggerText: '释放更新', // The text that appears when the trigger distance is pulled down
        loadingText: '加载中...', // The text in the load
        doneText: '加载完成', // Load the finished text
        failText: '加载失败', // Load failed text
        loadedStayTime: 400, // Time to stay after loading ms
        stayDistance: 50, // Trigger the distance after the refresh
        triggerDistance: 70 // Pull down the trigger to trigger the distance
      }
    }
  }
};
</script>

<style>
  .view{
    width: 100%;height: 50px;display: flex;position: fixed;bottom: 0;background: #e8e8e8;max-width: 680px;
  }
  .slide-down-enter-active {
    transition: all .2s ease;
  }
  .slide-down-leave-active {
    transition: all .2s
  }

  .slide-down-enter, .slide-down-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateY(1000px);
    opacity: 0;
  }

  .slide-fade-enter-active {
    transition: all .2s ease;
  }
  .slide-fade-leave-active {
    transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: scale(0.2);
    opacity: 0;
  }
  .we-hover{
background: #cacaca;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
body {
  background-color: #ffffff;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
img{
  width: inherit
}
a{
  text-decoration: none;
}

.van-cell__title .van-icon {
  font-size: 18px;
}
</style>
