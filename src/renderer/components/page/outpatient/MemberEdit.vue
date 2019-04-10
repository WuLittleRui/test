<template>
  <!-- 编辑弹出框 -->
  <el-dialog :title="title" :visible.sync="editVisible" width="50%">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label='级别名称' prop='level_name'>
        <el-input v-model="form.level_name"></el-input>
      </el-form-item>
      <el-form-item label="商品折扣">
        <el-input-number v-model="form.product_discount" :precision="2" :step="0.1"></el-input-number>
      </el-form-item>
      <el-form-item label="商品包折扣">
        <el-input-number v-model="form.package_discount" :precision="2" :step="0.1"></el-input-number>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
              <el-button @click="editVisible = false">取 消</el-button>
              <el-button type="primary" @click="submitForm('form')">确 定</el-button>
          </span>
  </el-dialog>
</template>

<script>
  import * as ProgramApi from "../../../api/ProgramApi";
  import * as OauthApi from "@/api/OauthApi";
  import * as HospitalLevelDiscountApi from "../../../api/HospitalLevelDiscountApi";
  export default {
    data() {
      return {
        editVisible: false,
        title: "编辑",
        level: [],
        form: {
          level_id: "",
          product_discount: "",
          package_discount: "",
          level_name: "",
          id: ''
        },
        rules: {
          level_id: [{
            required: true,
            message: "请选择级别",
            trigger: "blur"
          }]
        }
      };
    },
    methods: {
      showNew() {
        this.title = "新增";
        this.resetForm();
        this.getLevel()
        this.editVisible = true;
      },
      async showEdit(level_id, level_name, product_discount, package_discount) {
        this.title = "编辑";
        this.resetForm();
         this.form.level_id = level_id;
        this.form.level_name = level_name;
        this.form.product_discount = product_discount;
        this.form.package_discount = package_discount;
        this.form.id = 1;
        this.editVisible = true;
      },
      getDiscount() {
        //添加
        HospitalLevelDiscountApi.getLevel(this.form.level_id).then(res => {
          if (res.error === "success") {
            this.form.package_discount = res.data.package_discount_2b;
            this.form.product_discount = res.data.product_discount_2b;
            this.form.level_name = res.data.level_name;
            this.form.level_id = res.data.level_id;
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
      getLevel() {
        //添加
        HospitalLevelDiscountApi.MemberLevel().then(res => {
          if (res.error === "success") {
            this.level = res.data;
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
            if (this.form.id) {
              HospitalLevelDiscountApi.updateShopGroup(
                this.form
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
              HospitalLevelDiscountApi.addShopGroup(this.form).then(res => {
                if (res.error === "success") {
                  this.$message({
                    type: "success",
                    message: "添加成功! "
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
        this.form.id = "";
        this.form.level_id = "";
        this.form.level_name = "";
        this.form.product_discount = "";
        this.form.package_discount = "";
      },
      getShopGroupInfo(level_id) {
        HospitalLevelDiscountApi.getShoupGroupModel(level_id).then(res => {
          if (res.error === "success") {
            this.form.package_discount = res.data.package_discount;
            this.form.product_discount = res.data.product_discount;
            this.form.level_id = res.data.level_id;
          } else if (
        res.error === "invaild_token" ||
        res.error === "not_login"
        ) {
        //判断是否认证过期
        OauthApi.logOut();
        this.$router.push("/login");
        } else {
            this.$message.error(this.$t(data.error));
          }
        });
      }
    }
  };
</script>

<style>

</style>
        
