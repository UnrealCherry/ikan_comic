<template>
    <div :style="{'height':(this.$store.state.viewHeight-54)+'px'}" ref="scroll" style="padding: 0 5%;overflow: hidden">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  status-icon label-width="100px" class="demo-ruleForm" v-loading="loading" >
        <el-form-item label="邮箱(账号)" prop="name" style="text-align: center">
          <el-input v-model="ruleForm.name" placeholder="example@qq.com"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="verifyCode" style="text-align: center">
          <el-input v-model="ruleForm.verifyCode" style="width: 50%" @focus="refreshCode"></el-input>
          <el-button type="primary"  style="width: 40%"  :disabled="verifyCode_btn.disabled" :loading="verifyCode_btn.loadding" @click="sendverifyCode($event,ruleForm.name)">{{verifyCode_btn.status}}</el-button>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" type="password" placeholder="123456"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="second_password">
          <el-input v-model="ruleForm.second_password" type="password" placeholder="123456"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="ruleForm.sex" placeholder="男 ">
            <el-option label="男" value="man"></el-option>
            <el-option label="女" value="woman"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import {Tabs,Input} from 'element-ui'
    import url from 'static/_PubicFunction'
    export default {
        created() {
            this.init()
        },
        data() {
          let validatePass = (rule, value, callback) => {
          let q=/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/g
            if(q.test(value)){
              this.$axios({
                method:'get',
                url:this.url+'checkUserNameHaveBeen?name='+value,
                withCredentials:true
              }).then(res=>{
                if(!res.data.s){
                  callback();
                }else {
                 callback(new Error('该用户名已被注册'));
                }
              })
            }else {
              callback(new Error('请输入正确的邮箱'));
            }
          }
          let validatePass1 = (rule, value, callback) => {
            if(this.ruleForm.password==this.ruleForm.second_password){
              callback();
            }else {
              callback(new Error('请输入数字值'));
            }
          }
            return {
                scroll: '初始化bs',
                input:'',
                url:url.host_url,
                loading:false,
                verifyCode_btn:{
                  loading:false,
                  status:'发送',
                  disabled:false
                },
              ruleForm: {
                name: '',
                sex: '',
                password:'',
                second_password:'',
                verifyCode:''
              },
              rules: {
                name: [
                  { validator: validatePass, required: true, trigger: 'change' },
                ],
                password: [
                  { required: true, message: '请输入密码,长度在 6到 8 个字符', trigger: 'change' },
                  { min: 6, max: 8, message: '长度在 6到 8 个字符', trigger: 'blur' }
                ],
                verifyCode: [
                  { required: true, message: '验证码只能6~7位数', trigger: 'change' },
                  { min: 6, max: 7, message: '验证码只能6~7位数', trigger: 'change' }
                ],
                second_password: [
                  { validator: validatePass1, required: true, message: '两次密码输入不一样', trigger: 'change' },
                ],
               sex: [
                  { required: true, message: '请选择性别', trigger: 'change' }
                ]
              }
            }
        },
        methods: {
          refreshCode(){
           this.getCode()
          },
          sendverifyCode(ev,code){

          },
          getCode(){
            let that =this
            this.$axios({
              method:'get',
              url:this.url+'checkCode',
                withCredentials:true
            }).then(res=>{
              that.verifyCode_btn.status=res.data.code
            })
          },
          submitForm(formName) {
            var that=this
            this.$refs[formName].validate((valid) => {
              that.loading=true
              if (valid) {
                this.$axios({
                  method:'post',
                  url:this.url+'register',
                  data:this.ruleForm,
                  withCredentials:true
                }).then(res=>{
                  that.loading=false
                  if(res.data.s==1){
                    that.$message({
                      message: '注册成功,1s后跳转',
                      type: 'success'
                    });
                    setTimeout(function () {
                      that.$router.go('/login/sign')
                    },950)
                    console.log(res.data.msg)
                  }
                  if(res.data.s==0){
                    that.$message.error(res.data.msg);
                  }
                })
                console.log(this.ruleForm)
              } else {
                console.log('error submit!!');
                return false;
              }
            });
          },
          resetForm(formName) {
            this.$refs[formName].resetFields();
          },
          init() {
                this.getCode()
                this.$nextTick(function () {
                    this.scroll = new BScroll(this.$refs.scroll, {
                    })
                })
            }
        }
    }
</script>

<style scope lang='less'>
.el-form-item__label{
  text-align: center;
}
</style>
