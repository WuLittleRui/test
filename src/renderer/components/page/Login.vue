<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-left">
        <h2>LOGO</h2>
        <img src="static/img/login_bg.png">
      </div>
      <div class="ms-right">
        <div class="ms-title">口腔门诊系统</div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
          <el-form-item prop="hospital_name">
            <el-input v-model="ruleForm.hospital_name" placeholder="医院名">
              <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item prop="username">
            <el-input v-model="ruleForm.username" placeholder="用户名">
              <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" placeholder="密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')">
              <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
            </el-input>
          </el-form-item>
          <div class="login-btn">
            <el-button type="primary" @click="submitForm('ruleForm')" :loading="LoginButtonLoading">登录</el-button>
          </div>
          <!-- <p class="login-tips">Tips : 用户名和密码随便填。</p> -->
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import * as OauthApi from "../../api/OauthApi";

export default {
  data: function() {
    return {
      ruleForm: {
        hospital_name: process.env.NODE_ENV === "production" ? "" : "宠物中心",
        username: process.env.NODE_ENV === "production" ? "" : "admin",
        password: process.env.NODE_ENV === "production" ? "" : "123456"
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      LoginButtonLoading: false //登陆中
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let self = this;
          this.LoginButtonLoading = true;
          var username = this.ruleForm.username + "@" + this.ruleForm.hospital_name;
          OauthApi.login(username, this.ruleForm.password).then(user => {
            this.LoginButtonLoading = false;
            if (user.error && user.error != "success") {
              if (
                user.error === "unauthorized" ||
                user.error === "password_error"
              ) {
                this.$message.error("用户名或密码错误");
              } else if (user.error === "invalid_grant") {
                this.$message.error("管理员账户已被锁定，请联系超级管理员");
              } else if (user.error === "username_not_found") {
                this.$message.error("管理员不存在，请联系超级管理员");
              }else {
                this.$message.error(user.error);
              }

              return;
            }
            ipcRenderer.removeAll(["message", "downloadProgress", "isUpdateNow"]);//remove只能移除单个事件，单独封装removeAll移除所有事件
            this.$router.push("/index");
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, rgba(0, 0, 0, 0.9));
  background-size: 100%;
  margin: auto;
}
.ms-left img {
  width: 50%;
  float: left;
  margin: 0px 0 0 -50px;
}
h2 {
  color: #fff;
  height: 90px;
  line-height: 90px;
  font-size: 40px;
  margin-left: 90px;
  padding-top: 20px;
}
.ms-right {
  width: 25%;
  float: left;
  border-radius: 5px;
  background: rgba(1, 1, 1, 0.2);
  overflow: hidden;
  margin: 10% 0 0 10%;
  padding-bottom: 10px;
}
.ms-title {
  width: 100%;
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}
.ms-content {
  width: 86%;
  padding: 40px 30px;
}
.login-btn {
  text-align: center;
  margin-top: 10px;
}
.login-btn button {
  width: 100%;
  height: 40px;
  margin-bottom: 10px;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
</style>