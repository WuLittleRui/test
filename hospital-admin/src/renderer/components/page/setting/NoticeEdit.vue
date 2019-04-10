<!--公告添加--编辑/添加-->
<template>
    <el-dialog :title='title' :visible.sync='editVisible'>
        <el-form :rules='rules' ref='form' :model='form' label-width='110px'>
            <el-form-item label='标题' prop='title'>
                <el-input v-model='form.title' style="width:60%"></el-input>
            </el-form-item>
            <el-form-item label='通知内容' prop='content'>
                <el-input v-model.number='form.content'></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editVisible = false">取 消</el-button>
            <el-button type="primary" :loading="button_loading" @click="submitForm('form')">确 定</el-button>
          </span>
    </el-dialog>
</template>

<script>
    import * as NoticeApi from "../../../api/NoticeApi";
    import {
        parseTime
    } from "../../../utils/formater";
    import * as config from "../../../utils//config";
    import * as uploadApi from "../../../api/UploadApi";
    import "pinyin4js";
    export default {
        data() {
            return {
                editVisible: false,
                title: "编辑",
                positionNameList: [],
                selectPosition: null,
                productList: [],
                noticeList: [],
                linkTypeList: [{
                        name: "公告",
                        value: 1
                    },
                    {
                        name: "商品/套餐",
                        value: 2
                    }
                ],
                button_loading: false,
                uploadAction: config.BASE_URL + "/api/v1/file/upload", // 上传的地址
                hospital: [],
                form: {
                    notice_id: 0,
                    title: "",
                    content: "",
                    hospital_id: "",
                    id:0
                },
                rules: {
                    title: [{
                        required: true,
                        message: "请输入标题",
                        trigger: "blur"
                    }],
                    content: [{
                        required: true,
                        message: "请写入公告内容",
                        trigger: "blur"
                    }],
                    hospital_id: [{
                        required: true,
                        message: "请选择展示时间",
                        trigger: "blur"
                    }],
                }
            };
        },
        mounted() {
           
        },
        methods: {
           
            getNotion(notice_id) {
                NoticeApi.byId(notice_id).then(res => {
                    if (res.error === "success") {
                        this.form.notice_id = res.data.notice_id;
                        this.form.title = res.data.title;
                        this.form.content = res.data.content;
                    } else {
                    }
                });
            },
            positionChange(value) {
                this.selectPosition = this.positionNameList.find(row => {
                    return row.position_id === value;
                });
            },
            linkTypeChange(value) {
                this.form.link_value = null;
            },
            showNew() {
                this.title = "新增";
                this.resetForm();
                this.typeDisable = false;
                this.editVisible = true;
            },
            async showEdit(notice_id) {
                this.title = "编辑";
                this.resetForm();
                this.form.id=0;
                this.editVisible = true;
                await this.getNotion(notice_id);
            },
            handleUploadImg(e) {
                const formData = new FormData();
                formData.append("upfile", e.file);
                formData.append("type", "image");
                uploadApi.upload(formData).then(res => {
                    if (res.error === "success") {
                        this.form.imageURL = res.data.url;
                    } else {
                        this.$message.error(this.$t(res.error));
                    }
                });
            },
            submitForm(formName) {
             
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.button_loading = true;
                        //修改
                        if ( this.form.notice_id) {
                            NoticeApi.edit(
                                this.form.notice_id,
                                this.form.title,
                                this.form.content
                            ).then(res => {
                                if (res.error === "success") {
                                    this.button_loading = false;
                                    this.$message({
                                        type: "success",
                                        message: "编辑成功!"
                                    });
                                    this.$emit("refresh");
                                    this.editVisible = false;
                                } else {
                                    this.$message({
                                        type: "error",
                                        message: this.$t(res.error)
                                    });
                                }
                            });
                        } else {
                            //添加
                            NoticeApi.add(
                                this.form.title,
                                this.form.content
                            ).then(res => {
                                this.button_loading = false;
                                if (res.error === "success") {
                                    this.$message({
                                        type: "success",
                                        message: "添加成功!"
                                    });
                                    this.$emit("refresh");
                                    this.editVisible = false;
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
                this.form.notice_id = 0;
                this.form.title = "";
                this.form.hospital_id = '';
                this.form.content = "";
                this.form.id=0;
                
                this.$nextTick(() => {
                    if (this.$refs.form !== undefined) {
                        this.$refs.form.resetFields();
                    }
                });
            },
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
</style>
        
