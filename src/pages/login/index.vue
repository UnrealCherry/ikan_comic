<template>
    <div :style="{'height':this.$store.state.viewHeight+'px'}" ref="scroll"  v-loading="loading">
      <div class="conver" ref="color">
          <div class="item">
            <div class="ball"><img  src="static/avatar.jpg"/></div>
            <div class="font-1">{{user_data.username}}</div>
            <div class="font-1"><span>粉丝: 0</span>丨<span>关注: 0</span></div>
            <div class="font-1"><a @click="signOut">登出</a></div>
          </div>
      </div>
      <div class="ul-box">
      <div class="item-box " v-for="(e,index) in itemBox">
          <div class="icon-box">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="e.icon"></use>
            </svg>
          </div>
          <div class="icon-font">{{e.bold}}<span  class="icon-span">{{e.des}}</span></div>
        <div class="x-box">
          <span style="color: #ff4548">{{e.btnTitle}}</span><i class="el-icon-arrow-right right" ></i>
        </div>
      </div>
      </div>
      </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import url from 'static/_PubicFunction'
    export default {
        created() {
            this.init()
        },
        components: {},
        data() {
            return {
              loading:false,
              itemBox:[
                 {icon:'#icon-binggan',
                  bold:'我的vip',
                   des:'vip看漫画无广告',
                   btnTitle:'立即开通'
                 },
                 {icon:'#icon-mangguo',
                   bold:'钱包君',
                   des:'vip看漫画无广告',
                   btnTitle:'立即开通'
                 },
                 {icon:'#icon-xigua',
                   bold:'充钱',
                   des:'vip看漫画无广告',
                   btnTitle:'立即开通'
                 }
               ],
              scroll: '初始化bs',
              colorIndex:5,
              color:{
                 differ:5,
                  a:parseInt(Math.random()*255),
                 b:parseInt(Math.random()*255),
                 c:parseInt(Math.random()*255),
                 d:parseInt(Math.random()*255),
                 e:parseInt(Math.random()*255),
                 f:parseInt(Math.random()*255),
               },
              user_data:''
            }
        },
        methods: {
          signOut(){
            var that=this
            this.loading=true
            this.$message({
              message: '登出成功,1s后返回注册页面',
              type: 'success'
            });
            setTimeout(function () {
              that.loading=false
              that.$store.state.login_in=false
              localStorage.Puless_token=''
              that.$router.push('/login/sign')
            },1000)

          },  //登出
          randomColor(){
            let arr= ['a','b','c','d','e','f']
            for(var i=0;i<arr.length;i++){
              this.color[arr[i]]=this.color[arr[i]]+parseInt(Math.random()*this.color.differ)
              if(this.color[arr[i]]>255){
                this.color[arr[i]]=0
              }
            }
            let setcolor='rgba('+this.color.a+','+this.color.b+','+this.color.c+','+parseInt(Math.random()*100)*0.01+')'
            let setcolor1='rgba('+this.color.d+','+this.color.e+','+this.color.f+','+parseInt(Math.random()*100)*0.01+')'
            console.log(setcolor,setcolor1)
            let color='linear-gradient('+setcolor+','+setcolor1+')'
            this.$refs.color.style.background=color
          }, //随机颜色函数
          login(){
            var that=this
            let token=localStorage.Puless_token?localStorage.Puless_token:'nullF'
            this.$axios.get(url.host_url+'token?token='+token).then(function (tokenRes) {
              if(tokenRes.data.s!=0){
                that.user_data=tokenRes.data.s
              }else {
                that.$message.error('登录失败,1s后跳转');
                setTimeout(function () {
                  that.$router.push('/login/sign')
                },1000)
              }
            })
          },
          init() {
               this.login()
                this.$nextTick(function () {
                    this.scroll = new BScroll(this.$refs.scroll, {
                        click: true
                    })
                })
            }
        }
    }
</script>

<style scope lang='less'>
  .ul-box{
    padding:  10px 10px;
    .icon-font{
      flex: 1;display: inline-block;line-height: 30px;font-size: 16px;font-weight: 600
    }
    .icon-box{
      width: 50px;display: inline-block;text-align: center;line-height: 30px;font-size: 20px
    }
    .icon-span{
      font-size: 12px;opacity: 0.4;padding-left: 20px;font-weight: 400
    }
    .x-box{
      display: inline-block;line-height: 30px;width: 80px;text-align:left;
    }
    .right{
      padding-left: 10px;font-size: 20px;vertical-align: middle;opacity: 0.85
    }
  }

  .item-box{
    width: 100%;
    height: 50px;
    margin-top: 10px;
    box-sizing: border-box;
   background: #ffffff;padding: 10px 5px;
    border-bottom: 0.5px rgba(23, 6, 11, 0.28) solid;
    display: inline-flex;
    .bold{
      flex: 1;display: inline-block;line-height: 30px;font-size: 16px;font-weight: 800
    }
  }
.conver{
  width: 100%;
  height: 250px;
  background: #F9DD69;
  background:-webkit-gradient(linear, 0 0, 0 bottom, from(#ffcb00), to(rgba(255, 203, 0, 0.5)));
  display: flex;
  align-items: center;
  justify-content: center;
  .item{
      width: 150px;
      height: 150px;
      text-align: center;
   .ball{
     width: 80px;
     height: 80px;
     border-radius: 50%;
     background: greenyellow;
     margin: 0 auto;
     overflow: hidden;
   }
    .font-1{
      color: #17060b;
      padding: 10px 5px;
      font-size: 14px;
      font-family:'Microsoft YaHei';
      font-weight: 500;
     font-smoothing:antialiased;
    }
  }
}
</style>
