<template>
    <!-- 编辑弹出框 -->
    <el-dialog :title="title" :visible.sync="editVisible" width="650px">
        <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="岗位名称" prop="groupName">
                <el-input v-model="form.groupName"></el-input>
            </el-form-item>
              <el-form-item label='类型' prop='type'>
            <el-radio v-model="form.type" :label="1" border size="medium">医生</el-radio>
            <el-radio v-model="form.type" :label="2" border size="medium">护士</el-radio>
            <el-radio v-model="form.type" :label="3" border size="medium">前台</el-radio>
            <el-radio v-model="form.type" :label="4" border size="medium">咨询师</el-radio>
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
import * as HospitalGroupApi from "../../../api/HospitalGroupApi";
import * as OauthApi from "../../../api/OauthApi";
export default {
  data() {
    return {
      editVisible: false,
      title: "编辑",
      form: {
        groupId: null,
        groupName: "",
        type:1,
      },
      rules: {
        groupName: [
          { required: true, message: "请输入登录名", trigger: "blur" }
        ],
           type: [
          { required: true, message: "请选择部门类型", trigger: "blur" }
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
    async showEdit(groupId) {
      this.title = "编辑";
      this.resetForm();
      this.editVisible = true;
      await this.getShopGroupInfo(groupId);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //修改
          if (this.form.groupId) {
            HospitalGroupApi.updateShopGroup(
              this.form.groupId,
              this.form.groupName,
              this.form.type
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
            HospitalGroupApi.addShopGroup(this.form.groupName,this.form.type).then(res => {
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
      this.form.groupId = null;
      this.form.groupName = "";
      this.form.type=1;
    },

    getShopGroupInfo(groupId) {
      HospitalGroupApi.getShoupGroupModel(groupId).then(res => {
        if (res.error === "success") {
          this.form.groupId = res.data.group_id;
          this.form.groupName = res.data.group_name;
            this.form.type=res.data.type;
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
        
