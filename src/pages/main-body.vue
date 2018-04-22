<template>
  <div   :style="{'height':50+this.$store.state.viewHeight+'px'}" ref="scroll"   >
<div  class="wrapper" ref="wrapper" style="padding: 0;background: black" >
  <el-col
    v-loading="!q"
    style="width: 100%">
  <div class="swiper-container swiper-container-horizontal" style="height: 100%;text-align: center;background: black" v-if="q">
    <div class="swiper-wrapper" @click="open_option"     >
      <div class="swiper-slide " v-for="(a,index) in imgs_len" :key="index">
        <img  :src="comic_pages_imgs[index]" v-if="comic_pages_imgs[index]" style="width: 100%">
        <img src="static/timg.gif"  v-if="!comic_pages_imgs[index]"   style="width: 100%">
      </div>
    </div>
  </div>
  </el-col>
  <transition name="fade">
    <open-option :pages="pages"  :max="imgs_len"  :next="next"  :previou="previou" :word="this.$route.query.word"  :title2="this.$route.query.title" :id="id" v-if="option_show&&q" :title="this.$route.path.replace('/info/','')" @sendPages="tab_pages" @close="open_option" ></open-option>
  </transition>
</div>
    <div class="tags" v-if="imgs_len">{{$route.path.replace('/info/','')}} {{pages}}/{{imgs_len}} {{d.getHours()}}:{{d.getMinutes()}} </div>
  </div>
</template>

<script>
  import openOption from '@/pages/open_option.vue'
  import  pubic_fn from 'static/_PubicFunction.js'
  import BScroll from 'better-scroll'
    export default {
    components:{
      openOption
    },
      created(){
        this.episode=this.$route.query.href
        this.init()
        this.$store.commit('tabShow',{
          type:'hide'
        })
      },
      updated(){
        if(this. comic_pages_imgs.length==0){
          this.swiper_init()
          this.tab_pages(this.$route.query.p-1)
        }
      },
      mounted(){

      },
      data(){
        return{
          d:new Date(),
          cache:'',
          id:this.$route.query.id,
          next:2,
          previou:1,
          swiper:null,
          images: [
            'https://img.yzcdn.cn/1.jpg',
            'https://img.yzcdn.cn/2.jpg'
          ],
          option_show:false,
          once_req_data:'各种数据',
          mc_event:false,
          comic_pages_imgs:[], //imgs 容器
          imgs:false,
          pages:1,
          episode:false,
          show_option:false,
          opacity:0,
          url:pubic_fn.host_url,
          scroll:0,
          cancel_req:0,
          imgs_len:0,
          q:false// pictures imgs length
        }
      },
      beforeRouteLeave(to,form,next){
        next()
        window.location.reload(true)
        this.$router.go(0)
        this.$store.commit('tabShow',{
          type:'show'
        })
      },
      methods:{
        getMaxEpisode(){
          var that=this
          let url=this.url+'get-episode?id='+this.id
          this.$axios.get(url, {
            validateStatus: function (status) {
              return status < 500; // Reject only if the status code is greater than or equal to 500
            }
          }).then(function (res) {
            that.cache=res.data
            let title=  that.$route.query.title
            let href= that.$route.query.href
            for(let  i=0;i<res.data.length;i++){
              if(res.data[i].title==title){
                   for(let f=0;f<res.data[i].data.length;f++){
                     if(res.data[i].data[f].href==href){
                       that.q=true
                       if(res.data[i].data[f+1]){
                         that.previou=JSON.stringify(res.data[i].data[f+1])
                       }else {
                         that.previou='#'
                       }
                       if(res.data[i].data[f-1]){
                         that.next=JSON.stringify(res.data[i].data[f-1])
                       }else {
                         that.next='#'
                       }
                     }
                   }
              }
            }
          }).catch(function (err) {
            console.log(err)
          });
        },
        tab_pages(pages){
          if(this.swiper) {
            this.swiper.slideTo(pages)
          }
          },
        init(){
          var that=this
          that.getMaxEpisode()
          that.save_history(this.$route.query.p)
          this.once_req().then(function (len) {
             that.imgs_len=len
            for(let i=0;i<that.imgs_len;i++){
              that.convertImg(i) //递归调用异步读取图片
            }

          })

        },
        save_history:function (activeIndex) {
          var  that =this
          let q='p='+that.$route.query.p
          let r=that.$route
          let w='p='+parseInt(activeIndex)
          that.$router.replace(that.$route.fullPath.replace(q,w))
          that.pages=parseInt(activeIndex)
          let obj={title:r.params.id,id:r.query.id,path:r.fullPath,word:r.query.word}
          that.$store.commit('save_history',obj)
        },
        open_option:function () {
         this.option_show=!this.option_show
        },
        swiper_init:function () {
          var that=this
          this.swiper = new Swiper('.swiper-container', {
            shortSwipes:true,
            watchSlidesProgress : true,
            autoHeight: true,
            on: {
              slideChange: function () {
                that.save_history(this.activeIndex+1)
              },
            },
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
          });
        },
        once_req:function () {
          let that=this,arr=this.$route.query.href.split('/'),id=arr[2],episodeId=parseInt(arr[3]),page=this.$route.query.p
          let url =this.url+'get-pages?id='+id+'&episodeId='+episodeId+'&page='+page
          this.comic_pages_imgs=[]
        return new Promise(function (resolve,reject) {
          that.$axios.get(url).then(function (res) {
            that.once_req_data=res.data
            resolve(that.once_req_data.len)
          }).catch(function () {
          })
        })
        },
        convertImg:function (page,len) {
          let o=this.once_req_data,path=o.path,i='http://i.hamreus.com/',f=o.files[page].replace('.webp',''),cid=o.cid,md5=o.sl.md5,
          url=i+path+f,that=this,x=encodeURI(that.url+'transfer?url='+url+'&md5='+md5+'&cid='+cid)
          var CancelToken = this.$axios.CancelToken;
          that.$axios({
            url:x,
            method:'get',
            cancelToken: new CancelToken(function executor(c) {
              that.cancel_req= c;
            })
          }).then(function (res) {
            if(res.data!='nofound') {
              console.log(page)
              let img = 'data:image/png;base64,' + res.data
              that.$set( that.comic_pages_imgs,page,img)
            }else {
              console.log('第'+page+'页加载失败')
            }
          })

        },
      }
    }
</script>

<style scoped>
  .tags{
    pointer-events: auto;
    position: absolute;
    z-index: 9999;
    bottom: 0;
    right: 20px;
    font-size: 18px;
    color: white;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
.wrapper{
  height: 100%; align-items:center;display: flex;background: #fafafa
}

.swiper-container {
  width: 100%;
  height: 100%;
}
.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #000000;
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

</style>
