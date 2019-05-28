<!-- 店铺设置信息 -->
<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i>门诊管理</el-breadcrumb-item>
                <el-breadcrumb-item>基本设置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container" >
        <div class="form-box" >
          <el-form ref="form" :rules="rules" :model="shop" label-width="100px" >
            <el-form-item label='医院名称' prop='hospital_name'>
              <el-input v-model="shop.hospital_name" readonly></el-input>
            </el-form-item>
            <el-form-item label='医院logo'>
              <el-tooltip class="item" effect="dark" content="点击修改logo" placement="right-start">
                <el-upload class="avatar-uploader" :action="uploadAction" :http-request="handleUploadImg" :show-file-list="false">
                    <img v-if="shop.images" :src="shop.images" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
                </el-upload>
              </el-tooltip>
            </el-form-item>
            <el-form-item label='联系电话' prop='link_tel'>
              <el-input v-model="shop.link_tel" readonly></el-input>
            </el-form-item>

            <el-form-item label='医院地址'>
              <el-input v-model="shop.address" readonly></el-input>
            </el-form-item>
            <el-form-item > 
              <el-button type='primary' @click='getBusiness()'>门诊设置</el-button>     
            </el-form-item>
          </el-form>
      </div>
  </div>

   <SettingEdit ref="SettingEdit" @refresh="getList" />

</div>  
</template>

<script>
import SettingEdit from "./SettingEdit";
import * as OauthApi from "@/api/OauthApi";
import { parseTime } from "@/utils/formater";
import * as config from "@/utils/config";
import * as UploadApi from "@/api/UploadApi";
import * as SettingApi from "@/api/SettingApi";
export default {
  name: "setting",
  components: { SettingEdit },
  data() {
    return {
      dialogFormBusiness: false, //默认设置框不显示
      button_loading: false, //提交按钮默认值
      dialogFormShop: false, //
      rules: {},
      shop: {
        hospital_name: "",
        images: "",
        link_tel: "",
        address: ""
      },
      uploadAction: config.BASE_URL + "/api/v1/file/upload" // 上传的地址
    };
  },
  async mounted() {
    this.getList();
  },
  methods: {
    handleUploadImg(e) {
      const formData = new FormData();
      formData.append("upfile", e.file);
      formData.append("type", 1);
      UploadApi.upload(formData).then(res => {
        if (res.error === "success") {
          this.shop.images = res.data.url;
          SettingApi.updateShop(
            this.shop.images,
            null,
            null,
            null,
            null
          ).then(res => {
            if (res.error === "success") {
              this.$message({
                type: "success",
                message: "提交成功!"
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
        }   else {
              this.$message({
                type: "error",
                message: this.$t(res.error)
              });
            }
          });
        } else {
          this.$message.error(this.$t(res.error));
        }
      });
    },
    handlePictureCardPreview(file) {},
    //初始化数据方法
    getList() {
      SettingApi.getShopInfo().then(data => {
        if (data.error === "success") {
          this.shop.hospital_name = data.data.hospital_name;
          this.shop.images = data.data.images;
          this.shop.link_tel = data.data.link_tel;
          this.shop.address = data.data.address;
        } else if (
        data.error === "invaild_token" ||
        data.error === "not_login"
        ) {
        //判断是否认证过期
        OauthApi.logOut();
        this.$router.push("/login");
        }   else {
          this.$message.error(this.$t(data.error));
        }
      });
    },
    //  营销设置按钮
    getBusiness() {
      this.$refs["SettingEdit"].showEdit();
    },
    //提交按钮
    updateShop() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          SettingApi.updateShop(this.shop).then(data => {
            if (data.error === "success") {
              this.$notify({
                title: "成功",
                message: "修改成功",
                type: "success",
                duration: 2000
              });
              this.dialogFormBusiness = false;
              this.getList();
            } else if (
        data.error === "invaild_token" ||
        data.error === "not_login"
        ) {
        //判断是否认证过期
        OauthApi.logOut();
        this.$router.push("/login");
        }   else {
              this.$message.error(this.$t(data.error));
            }
          });
        }
      });
    }
  }
};
</script>

<style scoped>
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
        width: 180px !important;
    }
</style>
