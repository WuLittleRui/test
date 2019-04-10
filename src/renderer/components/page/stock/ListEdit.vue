<template>
    <!-- 编辑弹出框 -->
    <el-dialog :title="title" :visible.sync="editVisible" width="50%">
        <el-form ref="form" :model="form" :rules="rules" label-width="110px">
            <el-form-item label="名称" prop="title">
                <el-input v-model="form.title" disabled></el-input>
            </el-form-item>
            <el-form-item label="成本价" prop="purchase_price">
                <el-input-number v-model="form.purchase_price" :precision="2" :step="1" :min="0"></el-input-number>
            </el-form-item>
            <el-form-item label="预警数量" prop="warning_quantity">
                <el-input-number v-model="form.warning_quantity" :precision="0" :step="1" :min="0"></el-input-number>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editVisible = false">取 消</el-button>
            <el-button type="primary" :loading="button_loading" @click="submitForm('form')" >确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import * as HospitalstoreInventoryApi from "../../../api/HospitalstoreInventoryApi";
import { parseTime } from "../../../utils/formater";
export default {
  data() {
    return {
      editVisible: false,
      title: "编辑",

      button_loading: false,

      form: {
        mp_id: "",
        title: null,
        purchase_price: "",
        warning_quantity: "",
        materials_type: ""
      },
      rules: {
        title: [
          { required: true, message: "请输入名称", trigger: "blur" }
        ],
        purchase_price: [
          { required: true, message: "请输入成本价", trigger: "blur" }
        ],
        warning_quantity: [
          { required: true, message: "请输入预警数量", trigger: "blur" }
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
    async showEdit(mp_id, title, type) {
      this.title = "编辑";
      this.resetForm();
      this.form.title = title;
      this.form.materials_type = type
      this.editVisible = true;
      this.typeDisable = true;
      await this.getMaterialsInventory(mp_id);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.button_loading = true;
          //修改
          if (this.form.mp_id) {
            HospitalstoreInventoryApi.editPurchasePrice(
              this.form.mp_id,
              this.form.purchase_price,
              this.form.warning_quantity,
              this.form.materials_type
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
          }
        } else {
          return false;
        }
      });
    },
    resetForm() {
      this.form.purchase_price = null;
      this.form.title = "";
      this.form.mp_id = "";
      this.form.materials_type = "";
    },
    getMaterialsInventory(mp_id) {
      HospitalstoreInventoryApi.getMaterialsInventory(mp_id).then(res => {
        if (res.error === "success") {
          this.form.mp_id = mp_id;
          if(res.data.model !== null && res.data.model.purchasePrice !== null) {
            this.form.purchase_price = res.data.model.purchasePrice;
          }
          if(res.data.model !== null && res.data.model.warningQuantity !== null) {
            this.form.warning_quantity = res.data.model.warningQuantity;
          }
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
        
