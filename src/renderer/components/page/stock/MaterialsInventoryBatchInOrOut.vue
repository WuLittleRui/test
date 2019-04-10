<template>
    <!-- 编辑弹出框 -->
    <el-dialog title="库存" :visible.sync="editVisible" width="50%">
        <el-form ref="form" :model="form" :rules="rules" label-width="110px">
            <el-form-item :label="inOutTypeLabel" prop="stock_quantity">
                <el-select clearable class='handle-select mr10' v-model='form.type' placeholder="请选择类型">
                    <el-option v-for='item in typeList' :key='item.value' :label='item.name' :value='item.value'>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="订单编号" prop="order_sn" v-if="form.type === 3">
                <el-input v-model="form.order_sn"></el-input>
            </el-form-item>
            <el-form-item label="备注">
                <el-input v-model="form.remark"></el-input>
            </el-form-item>
            <el-form-item label="商品库存">
                <el-table ref="multipleTable" :data="productsList" tooltip-effect="dark" border style="width: 100%" @selection-change="changeFun" height="200" v-loading='productlistLoading' element-loading-text='给我一点时间'>
                  <el-table-column type="selection" @selection-change="changeFun">
                  </el-table-column>
                  <el-table-column label='名称'>
                    <template slot-scope="scope">{{ scope.row.title }}</template>
                  </el-table-column>
                  <el-table-column label='成本价'>
                    <template slot-scope="scope"><span v-if="scope.row.purchase_price !== undefined">{{ scope.row.purchase_price }}</span><span v-else>0</span></template>
                  </el-table-column>
                  <el-table-column label='库存数量'>
                    <template slot-scope="scope">
                      <el-input-number v-model="scope.row.number" :precision="0" :step="1" @change="stockChange(scope.row.mp_id, $event)"></el-input-number>
                    </template>
                    
                  </el-table-column>
                </el-table>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <!-- <div>
                <div>{{title}}:{{form.new_number}}</div>
                <div v-if="form.type === 1">{{title}}总额:{{form.amount}}</div>
            </div> -->
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
      productlistLoading: false,

      inOutLabel: "入库",
      productsList: [],
      multipleSelection: [],
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
        order_sn: [
          { required: true, message: "请输入订单编号", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    changeFun(val) {
      let arr = [];
      val.forEach(function(element) {
        arr.push({
          mp_id: element.mp_id,
          number: element.number,
          type: element.materials_type
        });
      }, this);
      this.multipleSelection = arr;
    },
    stockChange(id, value) {
      this.multipleSelection.forEach(function(element) {
        if (element.mp_id === id) {
          element.number = value;
        }
      }, this);
    },
    async showEdit() {
      this.resetForm();
      this.editVisible = true;
      this.typeDisable = true;
      await this.getData();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const length = this.multipleSelection.length;
          if (length == 0) {
            this.$message({ type: "error", message: "请勾选需要调整库存的记录！" });
            return;
          }
          if(this.form.type==2 || this.form.type ==4){
          
          }

          this.button_loading = true;
          //修改
          HospitalstoreInventoryApi.adjustStock(
            JSON.stringify(this.multipleSelection),
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
    getData() {
      this.listLoading = true;
      HospitalstoreInventoryApi.listStockAll().then(data => {
        this.listLoading = false;
        if (data.error === "success") {
          this.productsList = data.data.list;
        } else if (
          data.error === "invaild_token" ||
          data.error === "not_login"
        ) {
          //判断是否认证过期
          this.$router.push("/login");
        } else if (data.error_description) {
          this.$message.error(data.error_description);
        } else {
          this.$message.error(data.error);
        }
      });
    },
    resetForm() {
      this.form.purchase_price = null;
      this.form.title = "";
      this.form.inventory_id = "";
      (this.form.stock_quantity = 0), (this.form.amount = 0);
      this.form.type = 1;
      this.form.purchase_price = 0;
      this.form.order_sn = "";
      this.form.remark = "";
      this.multipleSelection = [];
      this.$nextTick(() => {
        if(this.$refs.multipleTable !== undefined){
          this.$refs.multipleTable.clearSelection(); //取消所有勾选
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
        
