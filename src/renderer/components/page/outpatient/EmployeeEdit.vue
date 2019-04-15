<template>
    <!-- 编辑弹出框 -->
    <el-dialog :title="title" :visible.sync="editVisible" width="50%">
        <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="form.username"  ></el-input>
            </el-form-item>
                <el-form-item v-if="this.form.id ==1"    label='密码' prop='password'>
                <el-input    v-model='form.password' type="password"  placeholder="密码不修改不用填写"></el-input>
            </el-form-item>
            <el-form-item  v-else    label='密码' prop='password'>
                <el-input    v-model='form.password' type="password"   ></el-input>
            </el-form-item>
         
            <el-form-item label="手机号" prop="mobile">
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
            <el-form-item label='部门'>
                <el-select v-model='form.group_id'  class='filter-item' >
                  <el-option v-for="item in groupTypes" :key="item.group_id" :label="item.group_name" :value="item.group_id">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label='头像'>
                <el-upload class="avatar-uploader" :action="uploadAction" :http-request="handleUploadImg" :on-preview="handlePictureCardPreview" :show-file-list="false" :on-success="uploadSuccess">
                  <img v-if="form.face" :src="form.face" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
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
import * as HospitalEmplyeeApi from "../../../api/HospitalEmplyeeApi";
import { validbuerd } from "../../../utils/validate";
import * as OauthApi from "@/api/OauthApi";
export default {
  props: {
    imageUrl: {
      type: String,
      default: ""
    },
    // temp: {
    //   type: Object,
    //   default: {}
    // },
    uploadAction: {
      // 上传路径
      type: String,
      default: ""
    }
  },
  data() {
    return {
       treeData: [],
      editVisible: false,
      title: "编辑",
      form: {
        employeeId: null,
        username: "", //用户名
        mobile: "", //手机号
        group_name: "", //岗位名称
        group_id: "",
        password: "", //密码
        face: "",
        state:"",
        id:'',
            programs: []
      },
      groupTypes: [],
      rules: {
        groupName: [
          { required: true, message: "请输入登录名", trigger: "blur" }
        ],
      
        username: [
          { required: true, message: "请输入员工名", trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "请输入员工手机号", trigger: "blur" }
        ]
      },
        defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  mounted() {
    this.getGroupTypes();
    this.getProgramList();
  },
  methods: {
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
    //查询所有岗位
    getGroupTypes() {
      HospitalEmplyeeApi.getShopGroupList().then(data => {
        if (data.error === "success") {
          this.groupTypes = data.data;
        } else if (
        data.error === "invaild_token" ||
        data.error === "not_login"
        ) {
        //判断是否认证过期
        OauthApi.logOut();
        this.$router.push("/login");
        }  else if (data.error_description) {
          this.$message.error(data.error_description);
        } else {
          this.$message.error(data.error);
        }
      });
    },
    showNew() {
      this.title = "新增";
      this.resetForm();
      this.editVisible = true;
    },
    async showEdit(employeeId) {
      this.title = "编辑";
      this.resetForm();
      this.editVisible = true;
      await this.getShopGroupInfo(employeeId);
      this.form.id= 1;
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
          if (this.form.employeeId) {
            HospitalEmplyeeApi.updateEmployee(
              this.form.username,
              this.form.password,
              this.form.mobile,
              this.form.group_id,
              this.form.face,
              this.form.employeeId,
                this.form.programs
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
        }   else {
                this.$message({
                  type: "error",
                  message: this.$t(res.error)
                });
              }
            });
          } else {
            //添加
            HospitalEmplyeeApi.addEmployee(
              this.form.username,
              this.form.password,
              this.form.mobile,
              this.form.group_id,
              this.form.face,
              this.form.programs
            ).then(res => {
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
      this.form.username = "";
      this.form.password = "";
      this.form.employeeId = null;
      this.form.mobile = "";
      this.form.group_id = "";
      this.form.face = "";
      this.form.id="";
        this.form.programs = [];
             this.$nextTick(() => {
     if (this.$refs.form !== undefined) {
     this.$refs.form.resetFields();
                    }
                });
    },

    getShopGroupInfo(employeeId) {
      HospitalEmplyeeApi.getEmployee(employeeId).then(res => {
        if (res.error === "success") {
          this.form.employeeId = res.data.list.employee_id;
          this.form.username = res.data.list.username;
          this.form.mobile = res.data.list.mobile;
          this.form.group_name = res.data.list.group_name;
          this.form.group_id = res.data.list.group_id;
          
          this.form.face = res.data.list.face;
             let checked = res.data.programs.programs.split(",");
          this.form.programs = checked;
          this.$refs.tree.setCheckedKeys([]);
          checked.forEach(element => {
            this.$refs.tree.setChecked(element, true, false);
          });
        } else if (
        res.error === "invaild_token" ||
        res.error === "not_login"
        ) {
        //判断是否认证过期
        OauthApi.logOut();
        this.$router.push("/login");
        }   else {
          this.$message.error(this.$t(data.error));
        }
      });
    },
    handleUploadImg(e) {
      const formData = new FormData();
      formData.append("upfile", e.file);
      formData.append("type", 2);
      HospitalEmplyeeApi.upload(formData).then(res => {
        if (res.error === "success") {
          this.form.face = res.data.url;
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
    },
    handlePictureCardPreview(file) {},
    uploadSuccess(response, file, fileList) {}
  }
};
</script>

<style>
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
  width: 180px;
}
.tree {
  overflow: auto;
  height: 200px;
}
</style>
        
