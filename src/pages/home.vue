<template>
  <div  :style="{'height':this.$store.state.viewHeight+'px'}" id="home">
    <div>
    <form action="/" >
      <van-search
        show-action
        @input="onSearch($event)"
        v-model="vale"
        style="background: #000000"
      >
        <div slot="action"  style="padding:  0 5px"><div class="van-button van-button--danger van-button--small">搜索</div></div>
      </van-search>
    </form>
    <div class="list">
      <div v-for="(s,index) in search_data" >
        <router-link :to="'details?id='+s.u.replace('/comic/','').replace('/','')+'&word='+s.t"><div style="height: 30px;line-height: 30px" class="search-hover"><span>{{s.t}}</span>
          <span style="padding-left: 10px"> 更新:{{s.ct}}</span>
          <span style="padding-left: 10px">作者:[{{s.a}}]</span>
        </div></router-link>
      </div>
    </div>
      <div class="swiper-container swiper-container-horizontal">
        <div class="swiper-wrapper" >
          <div class="swiper-slide"
               v-for="(book,index) in this.$store.state.home_data"
               :style="{'background-image':'url('+book.swiper+')'}"
               style=" background-size: cover;background-position:center center">
            <router-link :to="'details?id='+book.id+'&word='+book.name"  class="router-font" >
              {{book.name}}
            </router-link>
          </div>

        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination swiper-pagination-bullets swiper-pagination-bullets-dynamic" style="width: 80px;"></div>
      </div>
    <!--search end-->
    <div class="wrapper van-row"  style="background: #eeeeee;overflow:hidden" :style="{'height':(this.$store.state.viewHeight-200-45)+'px'}" ref="scroll" >
<div >
  <div class="swiper-container-1 "style="overflow: hidden" >
    <div class="swiper-wrapper" style="width: 100%">
      <div class="swiper-slide   swiper-no-swiping" style="display: block" >
        <el-button type="primary" icon="el-icon-refresh" class="refresh"  @click="nextX"></el-button>
        <book :home_data="this.$store.state.recommend_data" :title="'今日推荐'"></book>
      </div>
      <div class="swiper-slide   swiper-no-swiping" style="display: block" >
        <el-button type="primary" icon="el-icon-refresh" class="refresh"  @click=" prevX"></el-button>
        <book :home_data="this.$store.state.home_data" :title="'今日推荐'"></book>
      </div>
    </div>
  </div>
</div>
</div>
    </div>
  </div>
</template>

<script >
  import BScroll from 'better-scroll'
  import { Search } from 'vant';
  import  {Carousel } from 'element-ui'
  import url from 'static/_PubicFunction';
  import  book from '@/pages/book.vue'
    export default {
      components:{
        [Search.name]:Search,
        'el-carousel':Carousel,
        Book:book
      },
      created(){
        this.$nextTick(function () {
          this.init()
        })
      },
    methods:{
        nextX(){
            this.swiper_1.slideNext()
        },
      prevX(){
        this.swiper_1.slidePrev()
      },
      onSearch(val){
        this.send_searchVal(val)
      },
      send_searchVal(val){
        var url=encodeURI(encodeURI(this.url+'search?key='+val))
        console.log(url)
        var that=this
        this.$axios({
          url:url,
          methods:'get',
        }).then(function (res) {
          that.search_data=res.data
        }).catch(function (err) {
          console.log(JSON.stringify(err))
        })
      },
      init(){
        this.swiper = new Swiper('.swiper-container', {
          autoplay:true,
          pagination: {
            el: '.swiper-pagination',
            dynamicBullets: true,
          },
        });
        this.swiper_1= new Swiper('.swiper-container-1',{
          noSwiping : true
        });
        this.scroll=new BScroll(this.$refs.scroll,{
          bounce: false
        })
      }
    },
      updated(){
        if(!this.swiper_1.length){
          this.init()
        }
      },
      data(){
      return {
        swiper:0,
        swiper_1:0,
       scroll:0,
        search_data:'',
        vale:'',
        url:url.host_url
      }
    },
      mounted() {

      }
    }
</script>

<style lang="less" >
#home {
  .refresh{
    color: #2050ff;
    float: right;margin-top: 10px;    background-color: #ffffff;
    border-color: #ffffff;
    cursor: pointer;
    font-size: 20px;
    font-weight: 800;
  }
  .refresh :hover{
    cursor: pointer;
  }
  .list {
    opacity: 0.95;
    width: 100%;
    text-align: center;
    background: white;
    position: absolute;
    z-index: 999
  }
  .router-font {
    -webkit-text-stroke: 1px rgba(23, 6, 11, 0.44);
    width: 100%;
    height: 100%;
    line-height: 200px;
    color: white;
    font-size: 30px;
    font-weight: 800
  }
  .swiper-slide-1 {
    text-align: center;
    font-size: 18px;
    background: #fff;
    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
  .swiper-container {
    width: 100%;
    height: 200px;
    .swiper-pagination-bullet {
      width: 8px;
      height: 8px;
      display: inline-block;
      border-radius: 100%;
      background: #fff !important;
      opacity: 1 !important;
    }
    .swiper-pagination-bullet-active {
      opacity: 1 !important;
      background: #FFEB3B !important;
    }
  }
  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;
    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
}
</style>
