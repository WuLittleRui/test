<template>
    <!-- 编辑弹出框 -->
    <el-dialog   title="库存日志" :visible.sync="editVisible" width="80%">
        <el-form ref="form" :model="form" :rules="rules" label-width="110px">
            <el-form-item :label="inOutTypeLabel" prop="stock_quantity">{{this.title}}
                
            </el-form-item>
            <el-form-item label="商品库存日志">
                <el-table :height="tableheight" ref="multipleTable" :data="productsList" tooltip-effect="dark" border style="width: 100%"  height="200" v-loading='productlistLoading' element-loading-text='给我一点时间'>
                
                  <el-table-column label='项目sn'>
                    <template slot-scope="scope">{{ scope.row.project_sn }}</template>
                  </el-table-column>
                  <el-table-column label='记录类型'>
                    <template slot-scope="scope"><span v-if="scope.row.ref_sn == 0">出</span><span v-else>进</span></template>
                  </el-table-column>
                  <el-table-column label='数量'>
                          <template slot-scope="scope">{{ scope.row.number }}</template>
                  </el-table-column>
                      <el-table-column prop="create_time" label="创建时间"  >
                             <template slot-scope="scope">
                                  <span>{{ scope.row.create_time | parseTime('{y}-{m}-{d}') }}</span>
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
            <el-button type="primary" :loading="button_loading"  @click="editVisible = false" >确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import * as HospitalStoreCheckApi from "../../../api/HospitalStoreCheckApi";
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
      tableheight: document.body.clientHeight * 0.45 + "px",
      multipleSelection: [],
      inOutTypeLabel: "商品名称:",
      typeList: [
        { name: "采购", value: 1 },
        { name: "借用", value: 2 },
        { name: "订单", value: 3 },
        { name: "破损", value: 4 }
      ],
      stock_quantity: 0, //原库存
      title:"",
      form: {
        inout: 0, // 进库还是出库
        type: 1, // 调整类型
        inventory_id: "", // 序号
        title: null, // 标题
        stock_quantity: 0, // 库存
        amount: 0, // 出入库总额
        real_quantity: 0, // 成本价
        order_sn: "", //订单编号
        remark: ""
      },
      rules: {
        title: [{ required: true, message: "请输入名称", trigger: "blur" }],
        real_quantity: [
          { required: true, message: "请输入实际数量", trigger: "blur" }
        ],
        
      }
    };
  },
  methods: {
    formatterDate(row, column, value) {
      return parseTime(value);
    },
     stockChanges(id, value) {
      this.multipleSelection.forEach(function(element) {
        if (element.inventory_id === id) {
          element.remark = value;
        }
      }, this);
    },
    stockChange(id, value) {
      this.multipleSelection.forEach(function(element) {
        if (element.inventory_id === id) {
          element.real_quantity = value;
        }
      }, this);
    },
    async showEdit(inventory_id,title) {
      this.resetForm();
      this.title=title;
      this.editVisible = true;
      this.typeDisable = true;
      await this.getData(inventory_id);
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
          HospitalStoreCheckApi.adjustquality(
            JSON.stringify(this.multipleSelection),
            this.form.type,
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
    getData(inventory_id) {
      this.listLoading = true;
      HospitalStoreCheckApi.getStoreLogDetail(inventory_id).then(data => {
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
        
