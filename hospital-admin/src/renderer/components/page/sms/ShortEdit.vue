<template>
        <!-- 编辑弹出框 -->
    <el-dialog :title="title" :visible.sync="editVisible" width="30%">
        <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="营销模板" prop="template_id">
                <el-select v-model="form.template_id">
                    <el-option
                        v-for="item in options"
                        :key="item.tel_id"
                        :label="item.title"
                        :value="item.tel_id"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="模板参数">
                <el-input v-model="form.params" placeholder="多个参数请以','隔开"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editVisible = false">取 消</el-button>
            <el-button type="primary" :loading="buttonLoading" @click="submitForm('form')" >确 定</el-button>
        </span>
    </el-dialog>
    
</template>

<script>
import * as ShortApi from "@/api/ShortApi";
import * as OauthApi from "@/api/OauthApi";
export default {
  data() {
    return {
      editVisible: false,
      options: [],
      title: "编辑",
      buttonLoading: false,
      form: {
        template_id: null,
        user: [],
        params: ""
      },
      rules: {
        template_id: [
          { required: true, message: "请选择模板", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.getProgramList();
  },
  methods: {
    async showEdit(user, flag) {
        if(flag) {
            this.title = "全选发送营销短信";
        } else {
           this.title = "选择发送营销短信"; 
        }
      this.form.user = user;
      this.editVisible = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
            this.buttonLoading = true;
            ShortApi.sendTemplate(
              this.form.template_id,
              JSON.stringify(this.form.user),
              this.form.params
            ).then(res => {
                this.buttonLoading = false;
              if (res.error === "success") {
                this.$message({
                  type: "success",
                  message: "发送成功!"
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
          return false;
        }
      });
    },
    resetForm() {
      this.form.template_id = null;
      this.form.user = [];

    },
    getProgramList() {
      ShortApi.templateList().then(data => {
        if (data.error === "success") {
          this.options = data.data;
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
  }
};
</script>

<style>
.tree {
  overflow: auto;
  height: 200px;
}
</style>
        
