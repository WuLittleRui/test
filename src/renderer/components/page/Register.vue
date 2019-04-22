<template>
    <div class="login-wrap">
        <div style="width: 30%; margin: 0 auto; margin-top: 150px;">
            <el-steps :active="active">
                <el-step title="基本信息" icon="el-icon-edit"></el-step>
                <el-step title="医院信息" icon="el-icon-upload"></el-step>
                <el-step title="医院资质" icon="el-icon-picture"></el-step>
            </el-steps>
        </div>
        <div :class=" active == 3 ? 'container':'container2'">
            <el-scrollbar style="height: 100%">
                <el-form ref="form" :model="form" :rules="rule" label-width="100px">
                    <!-- 基本信息 -->
                    <el-form-item label="医院名称" prop="hosptial_name" v-if="active == 1">
                        <el-input v-model="form.hosptial_name" style="width: 80%;"></el-input>
                    </el-form-item>
                    <el-form-item label="联 系 人" prop="username" v-if="active == 1">
                        <el-input v-model="form.username" style="width: 80%;"></el-input>
                    </el-form-item>
                    <el-form-item label="联系手机" prop="mobile" v-if="active == 1">
                        <el-input v-model="form.mobile" maxlength="11" style="width: 80%;"></el-input>
                    </el-form-item>
                    <el-form-item label="验证码" prop="verifyCode" v-if="active == 1">
                        <el-row :gutter="20">
                            <el-col :span="13">
                                <el-input v-model="form.verifyCode"></el-input>
                            </el-col>
                            <el-col :span="2">
                                <el-button type="success" :disabled="isDisabled" @click="getVerfityCode">{{button}}</el-button>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="设置密码" prop="password" v-if="active == 1">
                        <el-input type="password" minlength="6" v-model="form.password" style="width: 80%;" show-password></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPassword" v-if="active == 1">
                        <el-input type="password" minlength="6" v-model="form.checkPassword" style="width: 80%;" show-password></el-input>
                    </el-form-item>
                    <!-- 基本信息 -->
                    <!-- 医院信息 -->
                    <el-form-item label="医院地址" prop="address" v-if="active == 2">
                        <el-input v-model="form.address" style="width: 80%;"></el-input>
                    </el-form-item>
                    <el-form-item label="医院介绍" prop="remark" v-if="active == 2">
                        <el-input
                            type="textarea"
                            :rows="2"
                            :maxlength="1000"
                            placeholder="请输入简介"
                            v-model="form.remark">
                        </el-input>
                    </el-form-item>
                    <!-- 医院信息 -->
                    <!-- 医院资质 -->
                    <el-form-item label="营业执照" v-if="active == 3">
                        <el-upload
                            class="upload-demo"
                            :action="uploadAction"
                            :on-remove="handleRemovelicense"
                            :http-request="handleUploadImglicense"
                            :file-list="license_list"
                            list-type="picture">
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="医院资质" v-if="active == 3">
                        <el-upload
                            class="upload-demo"
                            :action="uploadAction"
                            :on-remove="handleRemovedocter"
                            :http-request="handleUploadImgdocter"
                            :file-list="docter_list"
                            list-type="picture">
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="医生职称资质" v-if="active == 3">
                        <el-upload
                            class="upload-demo"
                            :action="uploadAction"
                            :on-remove="handleRemoveaptitude"
                            :http-request="handleUploadImgaptitude"
                            :file-list="aptitude_list"
                            list-type="picture">
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="医院内部详情" v-if="active == 3">
                        <el-upload
                            class="upload-demo"
                            :action="uploadAction"
                            :http-request="handleUploadImgdetail"
                            :on-remove="handleRemovedetail"
                            :file-list="detail_list"
                            list-type="picture">
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </el-form-item>
                    <!-- 医院资质 -->
                </el-form>
                
                <div class="login-btn">
                    <el-button type="danger" @click="returnLogin" v-if="active == 1">返回登录</el-button>
                    <el-button type="danger" @click="previousStep" v-if="active != 1">上一步</el-button>
                    <el-button type="primary" @click="nextStep('form')" v-if="active != 3">下一步</el-button>
                    <el-button type="primary" @click="submitForm('form')" v-if="active == 3" :loading="LoginButtonLoading">确定</el-button>
                </div>
            </el-scrollbar>
        </div>
    </div>
</template>

<script>
import * as RegisterApi from '@/api/RegisterApi';
import { validPhone } from "@/utils/validate";
import * as config from "@/utils/config";
import * as uploadApi from "@/api/UploadApi";
export default {
    data() {
        var validatePass2 = (rule, value, callback) => {
            if (this.form.checkPassword === '') {
            callback(new Error('请再次输入密码'));
            } else if (this.form.checkPassword !== this.form.password) {
            callback(new Error('两次输入密码不一致!'));
            } else {
            callback();
            }
        };
        var validatePass = (rule, value, callback) => {
            if (this.form.password === '') {
                callback(new Error('请输入密码'));
            } else {
                if(this.form.password.length < 6) {
                    callback(new Error('密码需为6位数即以上'));
                }
                if (this.form.checkPassword !== '') {
                    this.$refs.form.validateField('checkPassword');
                }
                callback();
            }
        };
        var validateMobile = (rule, value, callback) => {
            if (this.form.mobile === '') {
                callback(new Error('请输入联系手机'));
            } else {
                if (!validPhone(this.form.mobile)) {
                    callback(new Error('请输入正确的11位手机号码'));
                }
                callback();
            }
        }
        var validateCode = (rule, value, callback) => {
            if (this.form.mobile === '') {
                callback(new Error('请输入验证码'));
            } else {
                RegisterApi.verVerfityCode(this.form.mobile, this.form.verifyCode).then(res => {
                    if (res.error !== "success") {
                        callback(new Error('验证码错误'));
                    } else {
                        callback();
                    }
                })
            }
        }
        return {
            form: {
                verifyCode: "",
                hosptial_name: "",
                username: "",
                password: "",
                checkPassword: "",
                mobile: "",
                address: "",
                remark: ""
            },
            license_list: [],
            docter_list: [],
            aptitude_list: [],
            detail_list: [],
            uploadAction: config.BASE_URL + "/api/v1/file/upload", // 上传的地址
            active: 1,
            button: "获取验证码",
            isDisabled: false,
            LoginButtonLoading: false,
            time: 60,
            rule: {
              remark: [{
                  required: true, message: "请输入医院简介", trigger: "blur"
              }],
              address: [{ 
                  required: true, message: "请输入医院地址", trigger: "blur"
              }],
              verifyCode: [{
                  required: true, validator: validateCode, trigger: "blur"
              }],
              hosptial_name: [{
                  required: true, message: "请输入医院名称", trigger: "blur"
              }],
              username: [{
                  required: true, message: "请输入联系人", trigger: "blur"
              }],
              password: [{
                  required: true, validator: validatePass, trigger: "blur"
              }],
              checkPassword: [{
                  required: true, validator: validatePass2, trigger: "blur"
              }],
              mobile: [{ 
                  required: true, validator: validateMobile, trigger: "blur" 
              }]
            }
        }
    },
    mounted() {
        this.resetForm();
    },
    methods: {
        handleUploadImglicense(e) {
            const formData = new FormData();
            formData.append("upfile", e.file);
            formData.append("type", "image");
            uploadApi.uploadNoToken(formData).then(res => {
                if (res.error === "success") {
                    this.license_list.push({
                        name: res.data.name,
                        url: res.data.url
                    });
                } else {
                    this.$message.error(this.$t(res.error));
                }
            });
        },
        handleRemovelicense(file, fileList) {
            this.license_list = fileList;
        },
        handleRemovedocter(file, fileList) {
            this.docter_list = fileList;
        },
        handleUploadImgdocter(e) {
            const formData = new FormData();
            formData.append("upfile", e.file);
            formData.append("type", "image");
            uploadApi.uploadNoToken(formData).then(res => {
                if (res.error === "success") {
                    this.docter_list.push({
                        name: res.data.name,
                        url: res.data.url
                    });
                } else {
                    this.$message.error(this.$t(res.error));
                }
            });
        },
        handleRemoveaptitude(file, fileList) {
            this.aptitude_list = fileList;
        },
        handleUploadImgaptitude(e) {
            const formData = new FormData();
            formData.append("upfile", e.file);
            formData.append("type", "image");
            uploadApi.uploadNoToken(formData).then(res => {
                if (res.error === "success") {
                    this.aptitude_list.push({
                        name: res.data.name,
                        url: res.data.url
                    });
                } else {
                    this.$message.error(this.$t(res.error));
                }
            });
        },
        handleUploadImgdetail(e) {
            const formData = new FormData();
            formData.append("upfile", e.file);
            formData.append("type", "image");
            uploadApi.uploadNoToken(formData).then(res => {
                if (res.error === "success") {
                    this.detail_list.push({
                        name: res.data.name,
                        url: res.data.url
                    });
                } else {
                    this.$message.error(this.$t(res.error));
                }
            });
        },
        handleRemovedetail(file, fileList) {
            this.detail_list = fileList;
        },
        previousStep() {
            this.active--;
        },
        nextStep(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.active++;
                } else {
                    return false;
                }
            });
        },
        resetForm() {
            this.form.verifyCode = "";
            this.form.hosptial_name = "";
            this.form.username = "";
            this.form.password = "";
            this.form.checkPassword = "";
            this.form.mobile = "";
        },
        getVerfityCode() {
            if(this.form.mobile == "" || this.form.mobile == null) {
                this.$message.error("请输入手机号");
                return;
            }
            
            RegisterApi.getVerfityCode(this.form.mobile).then(data => {
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
                    let tmp = [];
                    this.license_list.map(function(file, index) {
                        if (file.status === "success") tmp.push(file.url);
                    });
                    let tmp1 = [];
                    this.docter_list.map(function(file, index) {
                        if (file.status === "success") tmp1.push(file.url);
                    });
                    let tmp2 = [];
                    this.aptitude_list.map(function(file, index) {
                        if (file.status === "success") tmp2.push(file.url);
                    });
                    let tmp3 = [];
                    this.detail_list.map(function(file, index) {
                        if (file.status === "success") tmp3.push(file.url);
                    });

                    this.LoginButtonLoading = true;
                    RegisterApi.register(
                        this.form.hosptial_name, 
                        this.form.username,
                        this.form.password,
                        this.form.mobile,
                        this.form.address,
                        this.form.remark,
                        JSON.stringify(tmp),
                        JSON.stringify(tmp1),
                        JSON.stringify(tmp2),
                        JSON.stringify(tmp3)
                    ).then(res => {
                        this.LoginButtonLoading = false;
                        if(res.error === "success") {
                            this.$message({
                                type: "success",
                                message: "申请成功!"
                            });
                            this.$router.push("/login");
                        } else {
                            this.$message.error(this.$t(res.error));
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
.login-btn button {
  width: 30%;
  height: 40px;
  margin-bottom: 10px;
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}
.container {
    width: 30%; 
    margin: 0 auto; 
    margin-top: 30px; 
    box-shadow:2px 2px 2px #ddd,2px -2px 2px #ddd,-2px 2px 2px #ddd,-2px -2px 2px #ddd; 
    padding: 50px; 
    height: 450px;
}
.container2 {
    width: 30%; 
    margin: 0 auto; 
    margin-top: 30px; 
    box-shadow:2px 2px 2px #ddd,2px -2px 2px #ddd,-2px 2px 2px #ddd,-2px -2px 2px #ddd; 
    padding: 50px; 
    height: 350px;
}
</style>

