<template>
        <!-- 编辑弹出框 -->
    <el-dialog :title="title" :visible.sync="editVisible" width="50%">
        <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="登录名" prop="username">
                <el-input v-model="form.username" :readonly="usernameReadonly"></el-input>
            </el-form-item>
            <el-form-item label="手机" prop="mobile">
                <el-input v-model="form.mobile"></el-input>
            </el-form-item>
            <el-form-item label="权限">
                <el-tree class="tree"
                  :data="treeData"
                  show-checkbox
                  default-expand-all
                  node-key="id"
                  ref="tree"
                  highlight-current                                      
                  :props="defaultProps">
                </el-tree>                    
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('form')" >确 定</el-button>
        </span>
    </el-dialog>
    
</template>

<script>
import * as ProgramApi from "../../../api/ProgramApi";
import * as ShopAdminApi from "../../../api/AdminApi";
import { validPhone } from "../../../utils/validate";
export default {
  data() {
    return {
      editVisible: false,
      title: "编辑",
      form: {
        adminId: null,
        username: "",
        firstpassword: "123456",
        mobile: "",
        programs: []
      },
      rules: {
        username: [
          { required: true, message: "请输入登录名", trigger: "blur" },
          { min: 4, max: 20, message: "长度在 4 到 20 个字符", trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (value && !validPhone(value)) {
                callback(new Error("请输入正确的11位手机号码"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ]
      },
      treeData: [],
      usernameReadonly: false,
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  mounted() {
    this.getProgramList();
  },
  methods: {
      showNew() {
      this.title = "新增";
      this.usernameReadonly = false;
      this.resetForm();
      this.editVisible = true;
      //该方法必须显示后才能调用 ,不知道为什么
      setTimeout(() => {
        this.$refs.tree.setCheckedKeys([]);
      }, 500);
    },
    async showEdit(adminId) {
      this.title = "编辑";
      this.usernameReadonly = true;
      this.resetForm();
      this.editVisible = true;
      await this.getShopAdminInfo(adminId);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //获取tree Checked 和半选的 keys
          let checked = this.$refs.tree
            .getCheckedKeys(false)
            .concat(this.$refs.tree.getHalfCheckedKeys());
          this.form.programs = checked;

          //修改
          if (this.form.adminId) {
            ShopAdminApi.editShopAdmin(
              this.form.adminId,
              this.form.mobile,
              this.form.programs
            ).then(res => {
              if (res.error === "success") {
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
            ShopAdminApi.addShopAdmin(
              this.form.username,
              this.form.firstpassword,
              this.form.mobile,
              this.form.programs
            ).then(res => {
              if (res.error === "success") {
                this.$message({
                  type: "success",
                  message: "添加成功!初始密码 " + this.form.firstpassword
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
      this.form.adminId = null;
      this.form.username = "";
      this.form.mobile = "";
      this.form.programs = [];
         this.$nextTick(() => {
                    if (this.$refs.form !== undefined) {
                        this.$refs.form.resetFields();
                    }
                });

    },
    getProgramList() {
      ProgramApi.getProgramList().then(data => {
        if (data.error === "success") {
          //console.log(data.data);
          this.treeData = data.data;
        } else {
          this.$message.error(this.$t(data.error));
        }
      });
    },
    getShopAdminInfo(adminId) {
      ShopAdminApi.getShopAdmin(adminId).then(res => {
        if (res.error === "success") {
          this.form.adminId = res.data.admin_id;
          this.form.username = res.data.username;
          this.form.mobile = res.data.mobile;
          let checked = res.data.programs.split(",");
          this.form.programs = checked;
          this.$refs.tree.setCheckedKeys([]);
          checked.forEach(element => {
            this.$refs.tree.setChecked(element, true, false);
          });
        } else {
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
        
