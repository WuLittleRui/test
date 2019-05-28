<template>
    <div style="login-wrap">
        <div class="container">
            <h1 class="title">
                忘记密码
            </h1>
            <div>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px">
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
                    <el-form-item prop="username"> 
                        <el-row :gutter="20">
                            <el-col :span="17">
                                <el-input type="password" placeholder="验证码" v-model="ruleForm.code">
                                    <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                                </el-input>
                            </el-col>
                            <el-col :span="1">
                                <el-button type="success" :disabled="isDisabled" @click="getVerfityCode">{{button}}</el-button>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" placeholder="新密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')">
                            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                        </el-input>
                    </el-form-item>
                    <div class="login-btn">
                        <el-button type="danger" @click="returnLogin">返回登录</el-button>
                        <el-button type="primary" style="width: 93px;" @click="submitForm('ruleForm')" :loading="LoginButtonLoading">确 定</el-button>
                    </div>
                    </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import * as ResetApi from "@/api/ResetApi";
export default {
    data() {
        return {
            LoginButtonLoading: false,
            button: "验证码",
            isDisabled: false,
            time: 60,
            ruleForm: {
                hospital_name: process.env.NODE_ENV === "production" ? "" : "",
                username: process.env.NODE_ENV === "production" ? "" : "",
                password: process.env.NODE_ENV === "production" ? "" : "",
                code: ""
            }, 
            rules: {
                hospital_name: [
                { required: true, message: "请输入医院名称", trigger: "blur" }
                ],
                username: [
                { required: true, message: "请输入用户名", trigger: "blur" }
                ],
                password: [{ required: true, message: "请输入密码", trigger: "blur" }]
            },
        }
    },
    methods: {
        getVerfityCode() {
            if(this.ruleForm.hospital_name == "" || this.ruleForm.username == null) {
                this.$message.error("请输入用户名和医院名称");
                return;
            }
            
            ResetApi.getVerfityCode(this.ruleForm.username, this.ruleForm.hospital_name).then(data => {
                if (data.error === "success") {
                    this.$message({
                        message: '短信已发送',
                        type: 'success'
                    });
                    this.isDisabled = true;
                    var _this = this;
                    let interval = window.setInterval(function() {
                        _this.button = _this.time + '秒后重新发送';
						--_this.time;
						if(_this.time < 0) {
							_this.button = "重新发送";
							_this.isDisabled = false;
							window.clearInterval(interval);
						}
					}, 1000);
                } else if (data.error_description) {
                    this.$message.error(data.error_description);
                } else {
                    this.$message.error(data.error);
                }
            })
        },
        returnLogin() {
            this.$router.push('/login');
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.LoginButtonLoading = true;
                    ResetApi.resetPassword(this.ruleForm.username, this.ruleForm.hospital_name, this.ruleForm.code, this.ruleForm.password).then(data => {
                        this.LoginButtonLoading = false;
                        if(data.error === "success") {
                            this.$message({
                                type: "success",
                                message: "重置成功!"
                            });
                            this.returnLogin();
                        } else {
                            this.$message.error(this.$t(data.error));
                        }
                    })
                }
            })
        }
    }
}
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: white;
  background-size: 100%;
  margin: auto;
}
.login-btn {
  text-align: center;
  margin: 0 20px;
}
.title {
    text-align: center;
    margin-bottom: 15px;
}
.container {
    width: 350px; 
    margin: 0 auto; 
    margin-top: 14%; 
    box-shadow:2px 2px 2px #ddd,2px -2px 2px #ddd,-2px 2px 2px #ddd,-2px -2px 2px #ddd; 
    padding: 50px; 
}
</style>

