<template>
  <!-- 编辑弹出框 -->
  <el-dialog :title="title" :visible.sync="editVisible" width="50%">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="支付方式 :" prop="pay_type_name">
        <el-input v-model="form.pay_type_name"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="editVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm('form')">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import * as PayTypeApi from "../../../api/PayTypeApi";
import { validPhone } from "../../../utils/validate";
import * as OauthApi from "@/api/OauthApi";
export default {
  data() {
    return {
      editVisible: false,
      title: "编辑",
      form: {
        pay_type_name: "",
        pay_type_id: ""
      },
      rules: {
        pay_type_name: [
          { required: true, message: "请输入支付方式", trigger: "blur" }
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
    async showEdit(pay_type_id) {
      this.title = "编辑";
      this.resetForm();
      this.editVisible = true;
      PayTypeApi.getOnePay(pay_type_id).then(data => {
        this.form.pay_type_name = data.data.paytype.payTypeName;
        this.form.pay_type_id = data.data.paytype.payTypeId;
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //修改
          if (this.form.pay_type_id) {
            PayTypeApi.updatePayType(
              this.form.pay_type_id,
              this.form.pay_type_name
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
            PayTypeApi.addPayType(this.form.pay_type_name).then(res => {
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
      this.form.pay_type_name = "";
      this.form.pay_type_id = "";
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
        
