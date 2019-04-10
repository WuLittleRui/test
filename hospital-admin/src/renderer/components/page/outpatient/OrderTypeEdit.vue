<template>
  <!-- 编辑弹出框 -->
  <el-dialog :title="title" :visible.sync="editVisible" width="50%">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="项目名称:" prop="name">
        <el-input v-model="form.name"></el-input>
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
import { validPhone } from "../../../utils/validate";
import * as OauthApi from "@/api/OauthApi";
export default {
  data() {
    return {
      editVisible: false,
      title: "编辑",
      form: {
      name: "",
        type_id: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入收费项目名称", trigger: "blur" }
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
    async showEdit(type_id) {
      this.title = "编辑";
      this.resetForm();
      this.editVisible = true;
      HospitalOrderTypeApi.getOnePay(type_id).then(data => {
        this.form.name = data.data.list.name;
        this.form.type_id = data.data.list.typeId;
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //修改
          if (this.form.type_id) {
            HospitalOrderTypeApi.updatePayType(
              this.form.type_id,
              this.form.name
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
        }  else {
                this.$message({
                  type: "error",
                  message: this.$t(res.error)
                });
              }
            });
          } else {
            //添加
            HospitalOrderTypeApi.addPayType(this.form.name).then(res => {
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
        }  else {
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
        
