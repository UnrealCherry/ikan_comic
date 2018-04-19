<template>
<div   :style="{'height':this.$store.state.viewHeight+'px'}" ref="scroll"  v-loading="show_loading" >
  <div style="margin-bottom: 50px">
  <div class="van-row" v-show="!show_loading" >
    <img :src="cover" style="width: 100%;height:200px;object-fit: cover;object-position:0 0" />
    <div class="van-col van-col-24"   style="padding:0 10px;margin-bottom: 0px">
      <van-button type="default" class="van-col van-col-8" style="color: black;background: white;border: none"> <van-icon name="like-o" /> 已收藏</van-button>
      <router-link :to="w.path"  >
      <van-button type="default" style="color: white;background: #ff1f31" class="van-col van-col-16">{{w.title}}</van-button>
      </router-link>
    </div>
    <el-tabs :tab-position="'top'" v-model="activeIndex" class="tab-2" :value="'目录'" style="margin-top: 50px">
      <el-tab-pane label="简介" name="first"></el-tab-pane>
      <el-tab-pane label="目录"></el-tab-pane>
      <el-tab-pane label="评价"></el-tab-pane>
    </el-tabs>
    <div style="overflow: hidden;width: 100%;">
    <el-tabs :tab-position="'top'" class="tab-2" :value="'目录'" style="margin-top: -50px"  v-model="activeIndex" id="tab-2">
      <el-tab-pane name="first"><div style="padding: 10px">{{des}}</div></el-tab-pane>
      <el-tab-pane><div v-if="!episode.length"  style="padding: 10%;font-size: 15px;font-weight: 400">
        尊敬的用户，应 <b>{{word}}</b>版权方的要求，现已删除屏蔽<b>{{word}}</b>所有卷和册，仅保留作品文字简介，请喜欢这部漫画的漫迷购买书籍或杂志欣赏！为此给各位漫迷带来的不便，敬请谅解！
      </div>
        <div  v-for="f in episode"  >
          <div class="van-col van-col-24 line-break" >{{f.title}}</div>
          <div class="van-col van-col-8" v-for="(e,index) in f.data"  style="padding:5px 5px">
            <router-link :to="'/info/'+e.name+'?href='+e.href+'&p=1&id='+e.id+'&word='+word+'&title='+f.title" >
              <van-button type="default" style="width: 100%;white-space: nowrap;overflow:hidden;padding: 0;text-align: center;text-overflow: ellipsis"
                          :class="{'qqq':w.title==e.name}">{{e.name}}<span style="font-size: 12px;opacity: 0.6;padding-left: 5px">{{e.p}}</span></van-button>
            </router-link>
          </div>
        </div> </el-tab-pane>
      <el-tab-pane >
        <div style="padding: 0 10px">
          <div v-for="(msg,index) in com_id" v-if="com_id" class="comment" >
            <div style="display: inline-flex">
            <div style="display: inline-block;flex: 1">
           <img style="width: 50px;height: 50px;background: greenyellow;border-radius: 50%" :src="com_data[parseInt(msg)].avatar?com_data[parseInt(msg)].avatar:'static/unsign.jpg'">
            </div>
              <div style="padding: 5px">
                <b>{{com_data[parseInt(msg)].user_name==''?'一只匿名用户':com_data[parseInt(msg)].user_name}}</b>
                <span :class="com_data[parseInt(msg)].sex==1?'man':'woman'" >{{com_data[parseInt(msg)].sex==1?'♂':'♀'}}&nbsp;</span>
                :
                <span> &nbsp;&nbsp;{{com_data[parseInt(msg)].content}}</span></div>
            </div>
            <div style="padding: 10px;text-align: right">
              <span><i class="el-icon-star-on" style="color: yellow"></i>赞({{com_data[parseInt(msg)].support_count}})</span>
              <span @click="open_reply(index)" style="padding: 0 10px"><i class="el-icon-edit"></i>回复({{msg.split(',').length-1}})</span>
              <span >{{com_data[parseInt(msg)].add_time}}</span></div>
<div class="reply" v-show="reply==index">
     <div style="display: inline-block;" v-if="msg.split(',').length!=1">
      <div v-for="(q,index) in  msg.split(',')"  style="display: inline-flex;margin-top: 5px;border-bottom: 0.5px white  solid; box-sizing: border-box" :style="{'padding-left':(index*5)+'px'}" v-if="index!=0">
        <div style="display: inline-block;border-radius: 50%;overflow: hidden;width: 30px;height: 30px;">
          <img style="width: 30px;height: 30px;background: #ff4c73;" :src="com_data[q].avatar?com_data[q].avatar:'static/unsign.jpg'">
        </div>
        <div style="display: inline-block;flex: 1;padding: 10px">

          <span style="padding: 5px"><b style="">{{com_data[q].user_name}}</b>
            <span :class="com_data[q].sex==1?'man':'woman'" >{{com_data[q].sex==1?'♂':'♀'}}&nbsp;</span>
            : {{com_data[q].content}}</span>
          <div style="padding: 10px;text-align: right">
            <span><i class="el-icon-star-on" style="color: yellow"></i>赞({{com_data[q].support_count}})</span>
            <span>{{com_data[q].add_time}}</span></div>
        </div>

      </div>
      </div>
</div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    </div>
    </div>

  </div>
  </div>
</template>

<script >
  import { Button,Badge} from 'vant';
  import  pubic_fn from 'static/_PubicFunction.js'
  import BScroll from 'better-scroll'
  import { Icon } from 'vant';
    export default {
   components:{
     [Button.name]:Button,
     [Icon.name]:Icon
   },
      data(){
     return {
       loading:false,
       activeIndex:'first',
       episode:false,
       show_loading:true,
       url:pubic_fn.host_url,
       scroll:0,
       id:null,
       cover:null,
       des:null,
       com_id:null,
       com_data:null,
       reply:10086,
       w:{
         title:'开始观看',
         path:'#',
         word:null
       },
     }
      },
      created(){
        this.word=this.$route.query.word
        this.id=parseInt(this.$route.query.id)
        this.init()
       this.$nextTick(function () {
         this.getMaxEpisode()
       })
      },
      methods:{
        open_reply(index){
          this.reply=index
        },
        getMaxEpisode(){
          var that=this
          let url=this.url+'get-episode?id='+this.id
          this.$axios.get(url, {
            validateStatus: function (status) {
              return status < 500; // Reject only if the status code is greater than or equal to 500
            }
          }).then(function (res) {
            that.show_loading=false
            that.episode=res.data
          }).catch(function (err) {
            console.log(err)
          });
        },
        load_history(){
          let q=this.$store.state.history_data
          if(q){
            for(var i=0;i<q.length;i++){
              if(parseInt(q[i].id)==parseInt(this.$route.query.id)){
                console.log('读取历史 记录...')
                this.w=q[i]
                break
              }else {
                this.w={
                  title:'开始观看',
                  path:'#'
                }
              }
            }
          }
        },
        init(){
          this.get_comments()
          this.getBdPictrue()
          this.get_describe()
          this.$nextTick(function () {
            this.scroll=new BScroll(this.$refs.scroll,{
              bounce: true
            })
          })
        },
        get_describe(){
          let url  =this.url+'getdescribe?id='+this.id
          var that=this
          this.$axios(url).then(res=>{
            that.des=res.data
          })
        },
        getBdPictrue(){
          let url=this.url+'getBdImg?word='+this.$route.query.word
          let that=this
          this.$axios(url).then(res=>that.cover=res.data)
        },
        get_comments(){
          let url=this.url+'getcomment?id='+this.id
          var that =this
          this.$axios.get(url).then(res=>{
            that.com_id=res.data.commentIds
            that.com_data=res.data.comments
          })
        }
      }

    }
</script>

<style lang="less">
  .reply{
    display: inline-block; background: #0e2225;
    border-radius: 5px;
  }
  .man{
    font-size: 15px;font-weight: 800;
    color: #6bb9ff;
  }
  .woman{
    font-size: 15px;font-weight: 800;
    color: #ff4358;
  }
  .comment{
    width: 100%;background: #000000;margin-top: 10px;
    padding: 10px;
    color: white;
    border-radius: 5px;
  }
.qqq{
   color: white;
   background: black;
}
.tab-2 {
  .el-tabs__nav {
    width: 100%;
    display: flex;
  }
  .el-tabs__item{
    flex: 1;
    text-align: center;
  }
}
  #tab-2{
    .el-tabs__header{
    opacity: 0
    }
  }

  .line-break{
    text-align: center;
    font-size: 25px;
    height: 50px;
    background: #2e2c2f;
    line-height: 50px;
    color: white;
  }

</style>
