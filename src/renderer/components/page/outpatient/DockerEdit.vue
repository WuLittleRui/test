<template>
    <!-- 编辑弹出框 -->
    <el-dialog :title="title" :visible.sync="editVisible" width="850px">
        <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item  v-if="this.form.id == 2"  label='员工' prop='employee_id'>
                <el-select   v-model="form.employee_id" clearable  placeholder="请选择"   style="width:180px">
                    <el-option v-for="item in typelist" :key='item.employee_id' :label='item.username' :value='item.employee_id'  >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item  v-if="this.form.id == 1" label='员工' prop='employee_id'>
                <el-select v-model="form.employee_id" clearable  disabled  placeholder="请选择" style="width:180px">
                    <el-option v-for="item in typelist" :key='item.employee_id' :label='item.username' :value='item.employee_id'>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label='性别' prop='sex'>
                <el-radio-group v-model='form.sex'>
                    <el-radio-button :label="0">男</el-radio-button>
                    <el-radio-button :label="1">女</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="手机号:" prop="mobile">
                <el-input v-model="form.mobile"></el-input>
            </el-form-item>
            <el-row :gutter="20">
                <el-col :span="10">
                    <el-form-item label='头像' prop="face">
                        <el-upload class="avatar-uploader" :action="uploadAction" :http-request="handleUploadImg" :on-preview="handlePictureCardPreview" :show-file-list="false" :on-success="uploadSuccess">
                            <img v-if="form.face" :src="form.face" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
                        </el-upload>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label='资格证' prop="certified">
                        <el-upload class="avatar-uploader" :action="uploadAction" :http-request="handleUploadCertifiedImg" :on-preview="handlePictureCardPreview" :show-file-list="false" :on-success="uploadSuccess">
                            <img v-if="form.face" :src="form.certified" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
                        </el-upload>
                    </el-form-item>
                </el-col>
            </el-row>
            
            <el-row :gutter="20">
                <el-col :span="10">
                    <el-form-item label='是否推荐' prop='recommend'>
                        <el-radio-group v-model="form.recommend" size="small">
                            <el-radio :label="true" border>是</el-radio>
                            <el-radio :label="false" border>否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label='评分个人简介' prop='score'>
                        <el-rate
                            v-model="form.score"
                            :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
                        </el-rate>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-form-item label='个人简介' prop='description'>
                <quill-editor ref="myTextEditor" v-model="form.description" :options="editorOption"></quill-editor>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editVisible = false">取 消</el-button>
            <el-button type="primary" :loading="buttonLoading" @click="submitForm('form')">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
import * as HospitalEmplyeeApi from "../../../api/HospitalEmplyeeApi";
import * as HospitalDockerApi from "../../../api/HospitalDockerApi";
import * as OauthApi from "../../../api/OauthApi";
import { validPhone } from "../../../utils/validate";
    export default {
        components: { quillEditor },
        props: {
            uploadAction: {
                // 上传路径
                type: String,
                default: ""
            }
        },
        data() {
            return {
                editorOption: {
                    placeholder: "个人简介"
                },
                buttonLoading: false,
                typelist: [],
                editVisible: false,
                title: "编辑",
                certified: [],
                form: {
                    face: "",
                    employee_id: "",
                    mobile: "",
                    sex: 0,
                    description: "",
                    id:2,
                    recommend: true,
                    score: 0,
                    certified: ""
                },
                rules: {
                    certified: [{
                        required: true,
                        message: "请上传医生资格证",
                        trigger: "blur"
                    }],
                    face: [{
                        required: true,
                        message: "请上传医生相片",
                        trigger: "blur"
                    }],
                    name: [{
                        required: true,
                        message: "请输入收费项目名称",
                        trigger: "blur"
                    }],
                    mobile: [{
                            required: true,
                            message: "请输入手机号",
                            trigger: "blur"
                        },
                        {
                            validator: (rule, value, callback) => {
                                if (value && !validPhone(value)) {
                                    callback(new Error("请输入正确的11位手机号码"));
                                } else {
                                    callback();
                                }
                            },
                            trigger: "blur"
                        }
                    ],
                    employee_id: [{
                        required: true,
                        message: "请选择员工",
                        trigger: "blur"
                    }],
                    sex: [{
                        required: true,
                        message: "请选择性别",
                        trigger: "blur"
                    }]
                }
            };
        },
        created() {
            this.gettype();
        },
        methods: {
            showNew() {
                this.title = "新增";
                this.resetForm();
                this.editVisible = true;
            },
            async showEdit(employee_id) {
                this.title = "编辑";
                this.resetForm();
                this.editVisible = true;
                HospitalDockerApi.getOnePay(employee_id).then(data => {
                    this.form.face = data.data.list.face;
                    this.form.employee_id = data.data.list.employeeId;
                    this.form.mobile = data.data.list.mobile;
                    this.form.sex = data.data.list.sex;
                    this.form.description = data.data.list.description;
                    this.form.recommend = data.data.list.recommend;
                    this.form.score = data.data.list.score;
                    this.form.certified = data.data.list.certified;
                });
                this.form.id=1;
            },
            gettype() {
                //添加
                HospitalEmplyeeApi.getAll().then(res => {
                    if (res.error === "success") {
                        this.typelist = res.data;
                    } else if (
                    res.error === "invaild_token" ||
                    res.error === "not_login"
                    ) {
                    //判断是否认证过期
                    OauthApi.logOut();
                    this.$router.push("/login");
                    } else {
                        this.$message({
                            type: "error",
                            message: this.$t(res.error)
                        });
                    }
                });
            },
            handleUploadImg(e) {
                const formData = new FormData();
                formData.append("upfile", e.file);
                formData.append("type", 1);
                HospitalEmplyeeApi.upload(formData).then(res => {
                    if (res.error === "success") {
                        this.form.face = res.data.url;
                    } else if (
                    res.error === "invaild_token" ||
                    res.error === "not_login"
                    ) {
                    //判断是否认证过期
                    OauthApi.logOut();
                    this.$router.push("/login");
                    } else {
                        this.$message.error(this.$t(res.error));
                    }
                });
            },
            handleUploadCertifiedImg(e) {
                const formData = new FormData();
                formData.append("upfile", e.file);
                formData.append("type", 1);
                HospitalEmplyeeApi.upload(formData).then(res => {
                    if (res.error === "success") {
                        this.form.certified = res.data.url;
                    } else if (
                    res.error === "invaild_token" ||
                    res.error === "not_login"
                    ) {
                    //判断是否认证过期
                    OauthApi.logOut();
                    this.$router.push("/login");
                    } else {
                        this.$message.error(this.$t(res.error));
                    }
                });
            },
            handlePictureCardPreview(file) {},
            uploadSuccess(response, file, fileList) {},
            submitForm(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.buttonLoading = true;
                        //修改
                        if (this.form.id==1) {
                            HospitalDockerApi.updatePayType(
                                this.form.employee_id,
                                this.form.face,
                                this.form.mobile,
                                this.form.sex,
                                this.form.description,
                                this.form.recommend,
                                this.form.score,
                                this.form.certified
                            ).then(res => {
                                this.buttonLoading = false;
                                if (res.error === "success") {
                                    this.$message({
                                        type: "success",
                                        message: "编辑成功!"
                                    });
                                    this.$emit("refresh");
                                    this.editVisible = false;
                                } else if (
                                res.error === "invaild_token" ||
                                res.error === "not_login"
                                ) {
                                //判断是否认证过期
                                OauthApi.logOut();
                                this.$router.push("/login");
                                } else {
                                    this.$message({
                                        type: "error",
                                        message: this.$t(res.error)
                                    });
                                }
                            });
                        } else {
                            //添加
                            HospitalDockerApi.addPayType(
                                this.form.employee_id,
                                this.form.face,
                                this.form.mobile,
                                this.form.sex,
                                this.form.description,
                                this.form.recommend,
                                this.form.score,
                                this.form.certified
                            ).then(res => {
                                this.buttonLoading = false;
                                if (res.error === "success") {
                                    this.$message({
                                        type: "success",
                                        message: "新增成功!"
                                    });
                                    this.$emit("refresh");
                                    this.editVisible = false;
                                } else if (
                                res.error === "invaild_token" ||
                                res.error === "not_login"
                                ) {
                                //判断是否认证过期
                                OauthApi.logOut();
                                this.$router.push("/login");
                                } else {
                                    this.$message({
                                        type: "error",
                                        message: this.$t(res.error)
                                    });
                                }
                            });
                        }
                    } else {
                        return false;
                    }
                });
            },
            resetForm() {
                this.form.employee_id = "";
                this.form.face = "";
                this.form.mobile = "";
                this.form.sex = 0;
                this.form.description = "";
                this.form.id = 2;
                this.form.recommend = true;
                this.form.score = 0;
                this.form.certified = "";
            }
        }
    };
</script>

<style>
    .tree {
        overflow: auto;
        height: 200px;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409eff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
    .el-upload--text {
        width: 180px;
    }
</style>
        
