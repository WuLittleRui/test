<template>
    <!-- 编辑弹出框 -->
    <el-dialog :title="title" :visible.sync="editVisible" width="50%">
        <el-form ref="form" :model="form" :rules="rules" label-width="110px">
            <el-form-item label="名称" prop="title">
                <el-input v-model="form.title" disabled></el-input>
            </el-form-item>
            <el-form-item :label="inOutTypeLabel" prop="stock_quantity">
                <el-select clearable class='handle-select mr10' v-model='form.type' placeholder="请选择类型">
                    <el-option v-for='item in typeList' :key='item.value' :label='item.name' :value='item.value'>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="库存数量" prop="stock_quantity">
                <el-input-number v-if="form.inout === 0" v-model="form.stock_quantity" :precision="0" :step="1" :min="0" :max="stock_quantity" @change="outStock"></el-input-number> <!-- 出库 -->
                <el-input-number v-if="form.inout === 1" v-model="form.stock_quantity" :precision="0" :step="1" :min="stock_quantity" @change="inStock"></el-input-number> <!-- 入库 -->
            </el-form-item>
            <el-form-item label="订单编号" prop="order_sn" v-if="form.type === 3">
                <el-input v-model="form.order_sn"></el-input>
            </el-form-item>
            <el-form-item label="备注">
                <el-input v-model="form.remark"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <div>
                <div>{{title}}:{{form.new_number}}</div>
                <div v-if="form.type === 1">{{title}}总额:{{form.amount}}</div>
            </div>
            <el-button @click="editVisible = false">取 消</el-button>
            <el-button type="primary" :loading="button_loading" @click="submitForm('form')" >确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import * as HospitalstoreInventoryApi from "../../../api/HospitalstoreInventoryApi";
import { parseTime } from "../../../utils/formater";
import { accAdd, accMultiply } from "../../../utils/calculation";

export default {
  data() {
    return {
      editVisible: false,
      title: "编辑",

      button_loading: false,
      inOutLabel: "入库",
      inOutTypeLabel: "入库类型", 
      typeList: [
        { name: "采购", value: 1 },
        { name: "借用", value: 2 },
        { name: "订单", value: 3 },
        { name: "破损", value: 4 }
      ],
      stock_quantity: 0, //原库存

      form: {
        inout: 0, // 进库还是出库
        type: 1, // 调整类型
        inventory_id: "", // 序号
        title: null, // 标题
        stock_quantity: 0, // 库存
        amount: 0, // 出入库总额
        purchase_price: 0, // 成本价
        order_sn: "", //订单编号
        remark: ""
      },
      rules: {
        title: [{ required: true, message: "请输入名称", trigger: "blur" }],
        stock_quantity: [
          { required: true, message: "请输入库存数量", trigger: "blur" }
        ],
        order_sn: [{ required: true, message: "请输入订单编号", trigger: "blur" }]
      }
    };
  },
  mounted() {},
  methods: {
    outStock(value) {
      var newVar = accAdd(this.stock_quantity, -1 * value);
      this.form.amount = accMultiply(newVar, this.form.purchase_price);
    },
    inStock(value) {
      var newVar = accAdd(value, -1 * this.stock_quantity);
      this.form.amount = accMultiply(newVar, this.form.purchase_price);
    },
    async showEdit(inventory_id, title, type) {
      this.resetForm();
      this.form.title = title;
      this.form.inout = type;
      if (type === 0) {
        this.title = "出库";
        this.inOutLabel = "出库总额";
        this.inOutTypeLabel = "出库类型";
      } else {
        this.title = "入库";
        this.inOutLabel = "入库总额";
        this.inOutTypeLabel = "入库类型";
      }
      this.editVisible = true;
      this.typeDisable = true;
      await this.getMaterialsInventory(inventory_id);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.button_loading = true;
          //修改
          var json = '[{"inventory_id": ' + this.form.inventory_id + ', "number": ' + this.form.stock_quantity + '}]'
            HospitalstoreInventoryApi.adjustStock(
              json,
              this.form.type,
              this.form.order_sn,
              this.form.remark
            ).then(res => {
                this.button_loading = false;
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
          return false;
        }
      });
    },
    resetForm() {
      this.form.purchase_price = null;
      this.form.title = "";
      this.form.inventory_id = "";
      this.form.stock_quantity = 0,
      this.form.amount = 0;
      this.form.type = 1;
      this.form.purchase_price = 0;
      this.form.order_sn = "";
      this.form.remark = "";
    },
    getMaterialsInventory(inventory_id) {
      HospitalstoreInventoryApi.getMaterialsInventory(inventory_id).then(res => {
        if (res.error === "success") {
          this.form.inventory_id = inventory_id;
          this.stock_quantity = res.data.model.stockQuantity;
          this.form.stock_quantity = res.data.model.stockQuantity;
          this.form.purchase_price = res.data.model.purchasePrice;
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
        
