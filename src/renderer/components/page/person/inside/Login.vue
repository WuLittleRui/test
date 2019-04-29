<template>
    <div>
        <div class="container" style="min-width: 1580px;">
            <div class="ms-right">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="ms-content">
                    <el-form-item prop="mobile">
                        <el-input v-model="ruleForm.mobile" placeholder="手机号">
                            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="code">
                        <el-row :gutter="20">
                            <el-col :span="17">
                                <el-input type="password" placeholder="验证码" v-model="ruleForm.code" @keyup.enter.native="submitForm('ruleForm')">
                                    <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                                </el-input>
                            </el-col>
                            <el-col :span="1">
                                <el-button type="success" :disabled="isDisabled" @click="getVerfityCode">{{button}}</el-button>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <div class="login-btn">
                        <el-button type="primary" @click="submitForm('ruleForm')" :loading="LoginButtonLoading">查询</el-button>
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import * as PersonApi from '@/api/PersonApi';
import { validPhone } from "@/utils/validate";
export default {
    data() {
        var validateMobile = (rule, value, callback) => {
            if (this.ruleForm.mobile === '') {
                callback(new Error('请输入联系手机'));
            } else {
                if (!validPhone(this.ruleForm.mobile)) {
                    callback(new Error('请输入正确的11位手机号码'));
                }
                callback();
            }
        }
        var validateCode = (rule, value, callback) => {
            if (this.ruleForm.mobile === '') {
                callback(new Error('请输入验证码'));
            } else {
                callback();
            }
        }
        return {
            LoginButtonLoading: false,
            isDisabled: false,
            button: "获取验证码",
            time: 60,
            code: null,
            ruleForm: {
                mobile: "17688723510",
                code: "1"
            },
            rules: {
                mobile: [{ 
                    required: true, validator: validateMobile, trigger: "blur" 
                }],
                code: [{
                    required: true, message: "请输入验证码", trigger: "blur" 
                }]
            }
        }
    },
    methods: {
        getVerfityCode() {
            if(this.ruleForm.mobile == "" || this.ruleForm.mobile == null) {
                this.$message.error("请输入手机号");
                return;
            }
            
            PersonApi.getVerfityCode(this.ruleForm.mobile).then(data => {
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
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.LoginButtonLoading = true;
                    PersonApi.verfityCode(this.ruleForm.mobile, this.ruleForm.code).then(data => {
                        this.LoginButtonLoading = false;
                        if (data.error === "success") {
                            this.code = data.data.code;
                            this.$emit("refresh", this.code);
                        } else if (data.error_description) {
                            this.$message.error(data.error_description);
                        } else {
                            this.$message.error(data.error);
                        }
                    })
                } else {
                    return false;
                }
            });
        }
    }
}
</script>

<style scoped>
.ms-right  {
    width: 350px;
    margin: 0 auto;
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
</style>

