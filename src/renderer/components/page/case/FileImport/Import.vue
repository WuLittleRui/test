<template>
    <!-- 编辑弹出框 -->
    <el-dialog :title="title" :visible.sync="editVisible" width="50%">
        <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="导入示例" prop="username">
                <el-button size="small" type="primary" @click="download">点击下载</el-button>
            </el-form-item>
            <el-form-item label="导入" prop="username">
                <el-upload :http-request="handleUploadImgs" :action="uploadAction" :file-list="fileList" :limit="1" :on-exceed="exceed">
                    <el-button size="small" type="primary" class="pload">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传Excel文件，且不超过2M, 每次只能上传一个文件,下载完成后会有导入结果下载按钮</div>
                    <div slot="tip" class="el-upload__tip">确定导入请点击确定按钮，关闭页面请点击关闭按钮</div>
                </el-upload>
            </el-form-item>
            <el-form-item label="导入结果下载" prop="username" v-if="showResult == true">
                <el-button size="small" type="primary" @click="downloadFile">点击下载</el-button>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editVisible = false">关 闭</el-button>
            <el-button type="primary"  :loading="buttonLoading" @click="submitForm('form')" >确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import * as config from "@/utils/config";
import * as ImportApi from "@/api/ImportApi";
import * as uploadApi from "@/api/uploadApi";
export default {
    data() {
        return {
            editVisible: false,
            uploadAction: config.BASE_URL + "/api/v1/file/upload", // 上传的地址
            fileList: [],
            title: "导入患者处置记录",
            showResult: false,
            buttonLoading: false,
            form: {
                url: '',
                type: 1
            },
            rules: {

            }
        }
    },
    methods: {
        exceed() {
            this.$message({
                type: "error",
                message: "目前只支持一个文件上传"
            });
        },
        show(type) {
            this.editVisible = true;
            this.form.type = type;

            this.fileList = [];
            this.showResult = false;
        },
        downloadFile() {
            window.location.href = this.form.url;
        },
        download() {
            if(this.form.type == 1) {
                window.location.href = config.BASE_URL + "/病患导入例子.xlsx";
            } else if(this.form.type == 2) {
                window.location.href = config.BASE_URL + "/病例导入例子.xlsx";
            } else {
                window.location.href = config.BASE_URL + "/处置记录导入例子.xlsx";
            }
        },
        submitForm() {
            this.buttonLoading = true;
            ImportApi.importFile(this.form.url, this.form.type).then(data => {
                this.buttonLoading = false;
                if (data.error === "success") {
                    this.showResult = true;
                    this.$message({
                        type: "success",
                        message: "上传成功!"
                    });
                    this.$emit("refresh");
                    // this.editVisible = false;
                } else {
                    this.$message({
                        type: "error",
                        message: this.$t(data.error)
                    });
                }
            })
        },
        handleUploadImgs(e) {
            const formData = new FormData();
            formData.append("upfile", e.file);
            formData.append("type", "file");
            uploadApi.uploadLocal(formData).then(res => {
                if (res.error === "success") {
                    this.fileList = [];
                    this.fileList.push({
                        name: res.data.name,
                        url: res.data.url
                    });
                    this.form.url = res.data.url;
                } else {
                    this.$message.error(this.$t(res.error));
                }
            });
        },
    }
}
</script>

<style scoped>
.editor-container {
    min-height: 500px;
    margin: 0 0 30px;
}
</style>

