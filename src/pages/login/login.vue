<template>
    <div :style="{'height':this.$store.state.viewHeight+'px'}" ref="scroll">
      <el-tabs v-model="activeName" @tab-click="handleClick"  style="width: 100%">
        <el-tab-pane label="登录" name="first"  > </el-tab-pane>
        <el-tab-pane label="注册" name="second"></el-tab-pane>
      </el-tabs>
      <router-view ></router-view>
    </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import {Tabs,Input} from 'element-ui'
    export default {
        created() {
            this.init()
          if(this.$store.state.login_in){
            this.$router.push('/user_index')
          }
        },
      components:{
          'el-tabs':Tabs,
           'el-input':Input
      },
        data() {
            return {
                scroll: '初始化bs',
              activeName: 'first'
            }
        },
        methods: {
          handleClick(tab, event) {
         if(this.activeName=='first'){
           this.$router.push('/login/sign')
         }
            if(this.activeName=='second'){
              this.$router.push('/login/register')
            }
          },
            init() {
              this.activeName='first'
              this.$router.push('/login/sign')
              let p=this.getParent_path(this.$route.path)
              if(p=='sign'){
                 this.activeName='first'
              }
              if(p=='register'){
                this.activeName='second'
              }
            },
           getParent_path(path){
            let p=path.replace('/','')
             return p.split('/')[1]
           }
        }
    }
</script>

<style scope lang='less'>
.el-tabs__nav{
  width: 100%;
  text-align: center;
}
#tab-first{
  width: 50%;
}
#tab-second{
  width: 50%;
}
  .el-tabs__active-bar .is-top{
    width: 50%;
  }
  .el-tabs__item{
opacity: 0.2;
    transition: 0.3s ease-in;
  }
.el-tabs__item.is-active{
  color:  #FD5593;
  opacity: 1;
}
  .el-tabs__active-bar{
    background: #FD5593;
  }
</style>
