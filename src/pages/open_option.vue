<template>
<div style="z-index: 10;width: 100%;position: fixed;"    >
<div  class="openOption-top" style="display: flex">
  <div class="prev" @click="goBack" > <i class="el-icon-back"></i></div>
  <div style="text-align: center;width: 100%;height: 50px;line-height: 50px">{{title}}</div>
  <div class="prev">   <i class="el-icon-star-off"></i></div>
</div>
<div style="display: inline-flex;width: 100%">
  <el-button  class="left-c" style="z-index:99999" @click="_previou">  <div><i class="el-icon-caret-left"></i>上一集 </div></el-button>
  <div style="flex: 1" @touchstart="_close"></div>
  <el-button   class="left-c" style="z-index:99999" @click="_next">  <div><i class="el-icon-caret-right"></i>下一集</div></el-button>
</div>
  <div style="z-index: 10;width: 100%" class="openOption">
    <el-slider v-model="range_pages" style="width: 100%;height: 25px"
               :show-tooltip="true"
               :step="1"
               :show-stops="true"
               :max="max"
               @change="sendRangeVal($event)"></el-slider>
    <div style="color: white;width: 100%;text-align: center">{{range_pages}}/{{max}}</div>
  </div>
</div>
</template>

<script >
  import { Slider } from 'element-ui';
  import  url from 'static/_PubicFunction'
    export default {
      props:['pages','max','title','next','previou','id','word','title2'],
      components:{
        'el-slider':Slider
      },
      data(){
        return {
          range_pages:1,
          next_page:'',
          previou_page:'',
          url:url.host_url,
          show_loading:true,
          episode:'',
          next_q:'',
          previou_q:''
        }
      },
      created(){
        if(this.next!=='#'){
          let n =JSON.parse(this.next)
          this.next_q='/info/'+n.name+'?href='+n.href+'&p=1&id='+n.id+'&word='+this.word+'&title='+this.title2
        }
        if(this.previou!=='#'){
          let  p=JSON.parse(this.previou)
          this.previou_q='/info/'+p.name+'?href='+p.href+'&p=1&id='+p.id+'&word='+this.word+'&title='+this.title2
        }
        this.range_pages=this.pages
      },
      watch:{
        pages(newVal){
          this.range_pages=newVal
        }
      },
      computed:{

      },
      methods:{
        _close(){
          this.$emit('close')
        },
        _previou(){
          if(this.previou!=='#') {
            this.$router.push(this.previou_q)
            this.$router.go(0)
            window.location.reload(false);
          }else {
            alert('已经是第一集')
          }
          return false
        },
        _next(){
          if(this.next!=='#') {
            this.$router.push(this.next_q)
            this.$router.go(0)
            window.location.reload(false);
          }else {
            alert('已经是最后一集')
          }
        },
        sendRangeVal(ev){
        this.$emit('sendPages',this.range_pages)
          let q='p='+this.$route.query.p
          let w='p='+parseInt(this.range_pages)
          this.$router.replace(this.$route.fullPath.replace(q,w))
        },
        goBack(){
          this.$router.push('/details?id='+this.id+'&word='+this.word)
        },
        formatTooltip(val) {
          return val / 100;
        }
      }
    }
</script>

<style scoped>
  .left-c{
    width: 100px;
    height: 300px;
    background: black;
    color: white;
    opacity: 0.85;
    font-size: 14px;
line-height: 300px;
    text-align: center;
  }
.prev{
  padding-top: 10px;
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 25px;
  color: white;
  font-size: 20px;
}
.openOption-top{
  z-index: 10;width: 100%;position: fixed;top: 0;height: 50px;  background: #181813;color: white
}

.openOption{
  width: 100%;
  background: #181813;
  height: 50px;
  position: fixed;
  bottom: 0;
}

</style>
