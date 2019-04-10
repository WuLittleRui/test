<template>
    <!-- 编辑弹出框 -->
    <el-dialog :title="title" :visible.sync="editVisible" width="50%">
        <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="项目名称:" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="项目备注:" prop="remark">
                <el-input v-model="form.remark"></el-input>
            </el-form-item>
            <el-form-item label="项目图片:" prop="images">
                <el-upload class="avatar-uploader" :action="uploadAction" :http-request="handleUploadImg" :show-file-list="false">
                    <img v-if="form.images" :src="form.images" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label='类型' prop='type_id'>
                <el-select v-model="form.type_id" clearable placeholder="请选择" style="width:180px">
                    <el-option v-for="item in typelist" :key='item.type_id' :label='item.name' :value='item.type_id'>
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
                          <el-button @click="editVisible = false">取 消</el-button>
                          <el-button type="primary" @click="submitForm('form')">确 定</el-button>
                        </span>
    </el-dialog>
</template>

<script>
    import * as HospitalOrderTypeApi from "../../../api/HospitalOrderTypeApi";
    import * as HospitalOrderItemApi from "../../../api/HospitalOrderItemApi";
    import * as config from "@/utils/config";
    import * as OauthApi from "@/api/OauthApi";
    import * as UploadApi from "@/api/UploadApi";

    import {
        validPhone
    } from "../../../utils/validate";
    export default {
        data() {
            return {
                uploadAction: config.BASE_URL + "/api/v1/file/upload", // 上传的地址
                typelist: [],
                editVisible: false,
                title: "编辑",
                form: {
                    name: "",
                    item_id: '',
                    type_id: "",
                    images: "",
                    remark: ""
                },
                rules: {
                    images: [{
                        required: true,
                        message: "请选择图片",
                        trigger: "blur"
                    }],
                    name: [{
                        required: true,
                        message: "请输入项目名称",
                        trigger: "blur"
                    }],
                    type_id: [{
                        required: true,
                        message: "请选择类型",
                        trigger: "blur"
                    }],
                }
            };
        },
        created() {
            this.gettype();
        },
        methods: {
            handleUploadImg(e) {
                const formData = new FormData();
                formData.append("upfile", e.file);
                formData.append("type", 1);
                UploadApi.upload(formData).then(res => {
                    if (res.error === "success") {
                        this.form.images = res.data.url;
                    } else if (
        res.error === "invaild_token" ||
        res.error === "not_login"
        ) {
        //判断是否认证过期
        OauthApi.logOut();
        this.$router.push("/login");
        }  else {
                        this.$message.error(this.$t(res.error));
                    }
                });
            },
            showNew() {
                this.title = "新增";
                this.resetForm();
                this.editVisible = true;
            },
            async showEdit(charge_id) {
                this.title = "编辑";
                this.resetForm();
                this.editVisible = true;
                HospitalOrderItemApi.getOnePay(charge_id).then(data => {
                    this.form.name = data.data.list.name;
                    this.form.item_id = data.data.list.item_id;
                    this.form.type_id = data.data.list.type_id;
                    this.form.remark = data.data.list.remark;
                    this.form.images = data.data.list.images;
                });
            },
            gettype() {
                //添加
                HospitalOrderTypeApi.getAll().then(res => {
                    if (res.error === "success") {
                        this.typelist = res.data.list;
                    } else if (
        data.error === "invaild_token" ||
        data.error === "not_login"
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
            submitForm(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        //修改
                        if (this.form.item_id) {
                            HospitalOrderItemApi.updatePayType(
                                this.form.item_id,
                                this.form.name,
                                this.form.type_id,
                                this.form.remark,
                                this.form.images
                            ).then(res => {
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
                            HospitalOrderItemApi.addPayType(
                                this.form.name,
                                this.form.type_id,
                                this.form.remark,
                                this.form.images
                            ).then(res => {
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
                this.form.name = "";
                this.form.type_id = "";
                this.form.item_id = "";
                this.form.images = "";
                this.form.remark = "";
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
    width: 178px;
    height: 178px;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
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
</style>
        
