<template>
        <!-- 编辑弹出框 -->
    <el-dialog :title="title" :visible.sync="editVisible" width="50%">
        <el-form ref="form" :model="form" :rules="rules" label-width="110px">
            <el-form-item label="项目名称" prop="project_name">
                <el-input v-model="form.project_name"></el-input>
            </el-form-item>
            <el-form-item label="单位">
                <el-input v-model="form.unit"></el-input>
            </el-form-item>
            <el-form-item label="项目规格">
                <el-input v-model="form.standard"></el-input>
            </el-form-item>
            <el-form-item label="描述">
                <el-input v-model="form.description"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editVisible = false">取 消</el-button>
            <el-button type="primary" :loading="button_loading" @click="submitForm('form')" >确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import * as HospitalStoreProjectApi from "../../../api/HospitalStoreProjectApi";
import { parseTime } from "../../../utils/formater";
export default {
  data() {
    return {
      editVisible: false,
      title: "编辑",

      button_loading: false,

      form: {
        project_id: null,
        project_name: "",
        unit: 0,
        standard: 1,
        description: ""
      },
      rules: {
        project_name: [
          { required: true, message: "请输入项目名称", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {},
  methods: {
    showNew() {
      this.title = "新增";
      this.resetForm();
      this.typeDisable = false;
      this.editVisible = true;
    },
    async showEdit(projectId) {
      this.title = "编辑";
      this.resetForm();
      this.editVisible = true;
      this.typeDisable = true;
      await this.getMaterials(projectId);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.button_loading = true;
          //修改
          if (this.form.project_id) {
            HospitalStoreProjectApi.editMaterials(
              this.form.project_id,
              this.form.project_name,
              this.form.unit,
              this.form.standard,
              this.form.description
            ).then(res => {
              if (res.error === "success") {
                this.button_loading = false;
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
            HospitalStoreProjectApi.addMaterials(
              this.form.project_name,
              this.form.unit,
              this.form.standard,
              this.form.description
            ).then(res => {
              this.button_loading = false;
              if (res.error === "success") {
                this.$message({
                  type: "success",
                  message: "添加成功!"
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
      this.form.project_id = null;
      this.form.project_name = "";
      this.form.unit = "";
      this.form.standard = "";
      this.form.description = "";
    },
    getMaterials(projectId) {
      HospitalStoreProjectApi.getMaterials(projectId).then(res => {
        if (res.error === "success") {
          this.form.project_id = res.data.shopMaterials.project_id;
          this.form.project_name = res.data.shopMaterials.project_name;
          this.form.unit = res.data.shopMaterials.unit;
          this.form.standard = res.data.shopMaterials.standard;
          this.form.description = res.data.shopMaterials.description;
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
        
