<template>
        <!-- 编辑弹出框 -->
    <el-dialog :title="title" :visible.sync="editVisible" width="50%">
        <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="名称" prop="title">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="规格">
                <el-input v-model="form.spec"></el-input>
            </el-form-item>
            <el-form-item label="单位" prop="unit">
                <el-input v-model="form.unit"></el-input>
            </el-form-item>
            <el-form-item label="单价" prop="unit_price">
                <el-input-number v-model="form.unit_price" :precision="2" :step="1" :min="0"></el-input-number>
            </el-form-item>
            <el-form-item label="使用方法">
                <el-input v-model="form.remark"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editVisible = false">取 消</el-button>
            <el-button :loading="buttomLoading" type="primary" @click="submitForm('form')" >确 定</el-button>
        </span>
    </el-dialog>
    
</template>

<script>
import * as MedicalApi from "../../../api/MedicalApi";
export default {
  data() {
    return {
      buttomLoading: false,
      editVisible: false,
      title: "编辑",
      form: {
        prescription_id: null,
        spec: "",
        unit: "",
        unit_price: "",
        remark: "",
        title: ""
      },
      rules: {
        title: [
          { required: true, message: "请输入名称", trigger: "blur" }
        ],
        unit: [
          { required: true, message: "请输入单位", trigger: "blur" }
        ],
        unit_price: [
          { required: true, message: "请输入单价", trigger: "blur" }
        ],
      }
    };
  },
  methods: {
      showNew() {
      this.title = "新增";
      this.resetForm();
      this.editVisible = true;
    },
    async showEdit(prescription_id) {
      this.title = "编辑";
      this.resetForm();
      this.editVisible = true;
      await this.getShopAdminInfo(prescription_id);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.buttomLoading = true;

          //修改
          if (this.form.prescription_id) {
            MedicalApi.edit(
              this.form.prescription_id,
              this.form.title,
              this.form.spec,
              this.form.unit,
              this.form.unit_price,
              this.form.remark
            ).then(res => {
              this.buttomLoading = false;
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
            MedicalApi.add(
              this.form.title,
              this.form.spec,
              this.form.unit,
              this.form.unit_price,
              this.form.remark 
            ).then(res => {
              this.buttomLoading = false;
              if (res.error === "success") {
                this.$message({
                  type: "success",
                  message: "添加成功!"
                });
                this.$emit("refresh");
                this.editVisible = false;
              } else {
                console.log(res)
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
      this.form.prescription_id = null;
      this.form.spec = "";
      this.form.unit = "";
      this.form.unit_price = "";
      this.form.remark = "";
      this.form.title = "";
    },
    getShopAdminInfo(prescription_id) {
      MedicalApi.byId(prescription_id).then(res => {
        if (res.error === "success") {
          this.form.prescription_id = res.data.prescription_id;
          this.form.spec = res.data.spec;
          this.form.unit = res.data.unit;
          this.form.unit_price = res.data.unit_price;
          this.form.remark = res.data.remark;
          this.form.title = res.data.title;
         
        } else {
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
        
