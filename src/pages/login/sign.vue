<template>
    <div :style="{'height':(this.$store.state.viewHeight-54)+'px'}" ref="scroll" style="padding: 10%">
      <el-col v-loading="loading">
      <div class="font-1">Emali Id</div>
      <el-input v-model="input.username" placeholder="请输入内容"  clearable autofocus></el-input>
      <div class="font-1">PASSWORD</div>
      <el-input v-model="input.password" placeholder="请输入内容"  type="password" clearable></el-input>
      <el-checkbox v-model="checked" style="margin-right: 0;margin-top: 10px;text-align: right" >记住密码</el-checkbox>
      <router-link to='/login/sign' style="float: right">忘记密码?</router-link>
      <div>
        <el-button @click="submit()" round class="sign-in" >Sign In</el-button>
      </div>
      <div style="text-align: center;padding-top: 50px;opacity: 0.85;">-- 其他方式登录 --</div>
      <div style="padding-top: 50px;text-align: center;display: inline-flex">
        <el-button icon="el-icon-goods" round  style="background: #ffcb00;color: white;flex:1" >微博 </el-button>
        <el-button  icon="el-icon-star-off" round style="background: #4bfa54;color: white;flex: 1" >微信</el-button>
        <el-button icon="el-icon-delete" round  style="background: #ff1f31;color: white;flex: 1" >QQ</el-button>
      </div>
      </el-col>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import url from 'static/_PubicFunction'
    export default {
        created() {
            this.init()
          this.input.username=localStorage.Puless_save_username
          this.input.password=localStorage.Puless_save_password
        },
        data() {
            return {
                scroll: '初始化bs',
                input:{
                  username:'',
                  password:''
                },
              url:url.host_url,
              checked: true,
              loading:false,
            }
        },
       watch:{
         input:{
           handler:function (newVal) {
             this.check()
           },
           deep:true
         },
         checked(newVal){
             this.check()
         }
       },
        methods: {
          check(){
            if(this.checked){
              localStorage.Puless_save_username=this.input.username?this.input.username.trim():''
              localStorage.Puless_save_password=this.input.password?this.input.password.trim():''
            }else {
              localStorage.Puless_save_username=''
              localStorage.Puless_save_password=''
            }
          },
          init() {
                this.$nextTick(function () {
                    this.scroll = new BScroll(this.$refs.scroll, {
                    })
                })
            },
          submit(){
            let url =this.url+'login'
            let that=this
            this.loading=true
          this.$axios.post(url,this.input).then(res=>{
            that.loading=false
            if(res.data.s==1){
              localStorage.Puless_token=res.data.token
              that.$message({
                message: '登录成功,1s后挑转',
                type: 'success'
              });
              that.$store.commit('loginIn',1)
              setTimeout(function () {
                that.$router.push('/user_index')
              },950)
            }else {
              that.$store.commit('loginIn',0)
              that.$message.error(res.data.msg);
            }
            console.log(res)
          })
          }
        }
    }
</script>

<style scope lang='less'>
.font-1{
   font-size: 20px;
  font-weight: 400;
  font-family: "Arial";
  color: #FD5593;
}
  .sign-in{
    clear: both;width:100%;background: linear-gradient(to right, #FF916F, #FD6493);font-size: 20px;color: white
  }

</style>
