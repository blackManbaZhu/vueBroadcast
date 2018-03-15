<template>
  <div class="login">
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
        <h2 class="title">系统登录</h2>
        <el-form-item prop="account">
            <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
            <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
            <el-checkbox type="checked" v-model="checked" @change="rememberMe()">记住我</el-checkbox>
        </el-form-item>
        <el-form-item style="width:100%;">
            <el-button type="primary" style="width:100%;" @click="submitForm('ruleForm2')" :loading="logining">登录</el-button>
        </el-form-item>
    </el-form>
  </div> 
</template>
<script>
export default {
  data() {
        // var validateAccount = (rule, value, callback) => {
        //     if (value === '') {
        //         callback(new Error('请输入账号'));
        //     } 
        // };
        // var validatePass = (rule, value, callback) => {
        //     if (value === '') {
        //         callback(new Error('请输入密码'));
        //     }
        // };
        return {
            checked :false,
            logining:false,
            ruleForm2: {
                account:'',
                checkPass: '',
            },
            rules2: {
                account: [
                    { required: true, message: '请输入账号', trigger: 'blur' }
                    // { validator: validateAccount, trigger: 'blur' }
                ],
                checkPass: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                    // { validator: validatePass, trigger: 'blur' }
                ],
            }
        };
    },
    //实例创建之后立即调用
    created(){
         let user = JSON.parse(sessionStorage.getItem('userInfo'));
         if(user){
             this.checked             = true;
             this.ruleForm2.account   = user.account;
             this.ruleForm2.checkPass = user.checkPass;
         }else {
             this.ruleForm2.account   = this.ruleForm2.checkPass = '';
         }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let user = this.ruleForm2.account;
            sessionStorage.setItem('user',JSON.stringify(user));
            this.logining = true;
            this.$router.push({ path:'/main' });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      rememberMe (val) {
          let userInfo  = {
                'account' :this.ruleForm2.account,
                'checkPass': this.ruleForm2.checkPass
            }
          if(this.checked){
            sessionStorage.setItem('userInfo',JSON.stringify(userInfo));
            console.log('remember me !')
          }else {
              console.log('no!')
              sessionStorage.removeItem('userInfo');
          }
      }
    }
}
</script>

<style lang="scss" scoped>
  .login {
    height: calc(100vh - 180px);
    height: -moz-calc(100vh - 180px);
    height: -webkit-calc(100vh - 180px);
    height: 100vh;
    position: relative;
    // padding-top: 180px;
    // background-color: #324057;
    background: url('../../public/1176915.jpg') no-repeat;
    background-size:  100% 100%;
  }
  .login-container {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -180px;
      margin-top: -180px;
     -webkit-border-radius: 5px;
     border-radius: 5px;
     -moz-border-radius: 5px;
     background-clip: padding-box;
     width: 360px;
     padding: 35px 35px 15px 35px;
     background: #fff;
     border: 1px solid #eaeaea;
     box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>
