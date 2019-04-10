<template>
        <!-- 编辑弹出框 -->
    <el-dialog :title="title" :visible.sync="editVisible" width="50%">
        <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="标题" prop="title">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="类型" prop="type">
                <div style="margin-top: 20px">
                    <el-radio v-model="form.type" :label="0" border size="medium">普通短信</el-radio>
                    <el-radio v-model="form.type" :label="1" border size="medium">营销短信</el-radio>
                </div>
            </el-form-item>
            <el-form-item label="模板" prop="content">
                <el-input
                    type="textarea"
                    autosize
                    placeholder="模板示例：{1}为您的登录验证码，请于{2}分钟内填写。如非本人操作，请忽略本短信。（其中{数字}为可自定义的内容，须从1开始连续编号，如{1}、{2}等）"
                    v-model="form.content"
                    maxlength="1000">
                </el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editVisible = false">取 消</el-button>
            <el-button type="primary" :loading="buttonLoading" @click="submitForm('form')" >确 定</el-button>
        </span>
    </el-dialog>
    
</template>

<script>
import * as HospitalSetting from "@/api/HospitalSetting";
import * as OauthApi from "@/api/OauthApi";
export default {
  data() {
    return {
      buttonLoading: false,
      editVisible: false,
      title: "编辑",
      form: {
        template_id: null,
        content: "",
        title: "",
        type: 0
      },
      rules: {
        content: [
          { required: true, message: "请输入模板", trigger: "blur" }
        ],
        type: [
          { required: true, message: "请选择模板类型", trigger: "blur" }
        ],
        title: [
          { required: true, message: "请输入标题", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
      showNew() {
      this.title = "新增";
      this.resetForm();
      this.editVisible = true;
    },
    async showEdit(template_id) {
      this.title = "编辑";
      this.resetForm();
      this.editVisible = true;
      await this.getShopAdminInfo(template_id);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
            this.buttonLoading = true;
          //修改
          if (this.form.template_id) {
            HospitalSetting.editTemp(
              this.form.template_id,
              this.form.title,
              this.form.content,
              this.form.type
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
        }  else {
                this.$message({
                  type: "error",
                  message: this.$t(res.error)
                });
              }
            });
          } else {
            //添加
            HospitalSetting.addTemp(
              this.form.title,
              this.form.content,
              this.form.type
            ).then(res => {
            this.buttonLoading = false;
              if (res.error === "success") {
                this.$message({
                  type: "success",
                  message: "添加成功!"
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
          }
        } else {
          return false;
        }
      });
    },
    resetForm() {
      this.form.template_id = null;
      this.form.content = "";
      this.form.type = 0;
      this.form.title = "";
    },
    getShopAdminInfo(template_id) {
      HospitalSetting.getTemp(template_id).then(res => {
        if (res.error === "success") {
            this.form.template_id = res.data.template_id;
            this.form.content = res.data.content;
            this.form.type = res.data.type;
            this.form.title = res.data.title;
        } else if (
          res.error === "invaild_token" ||
          res.error === "not_login"
        ) {
          //判断是否认证过期
        OauthApi.logOut();
          this.$router.push("/login");
        }   else {
          this.$message.error(this.$t(res.error));
        }
      });
    }
  }
};
</script>

<style>
.tree {
  overflow: auto;
  height: 200px;
}
</style>
        
