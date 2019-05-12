<template>
    <!--处方-->
    <el-dialog title="划价" :visible.sync="centerDialogVisible" width="1100px" center>
      <el-form ref="form" :model="form" :rules="rules">
        <el-container>
            <el-header style="width: 100%;">
                <p style="width: 50%; line-height: 50px; font-size: 16px;">{{form.username}}
                    <span style="margin-left: 40px;">{{form.case_number}}</span>
                </p>
            </el-header> 
            <el-container>
                <el-container>
                    <el-aside width="800px" >
                        <el-tabs v-model="activeName">
                            <el-tab-pane label="明细收费" name="first" style='min-height: 450px; overflow: scroll;'>
                            	
                            	<table class="table">
                                    <tr>
                                        <th>牙位</th>
                                        <th>处置名称</th>
                                        <th>单价</th>
                                        <th>数量</th>
                                        <th>折扣</th>
                                        <th>总价</th>
                                    </tr>

                                    <tr v-for="(item, index) in tableData4">
                                        <td>
                                        	<div>
                                        		 <PatientTeethPosition :ref="'PatientTeethPosition' + item.name" :index="item" @open="openChange" @close="closeChange" @value="positionValueChange"/>
                                        	</div>
                                        </td>
                                        <td>
                                          {{item.title}}
                                        </td>
                                        <td>
                                          <el-input-number style="width: 80px;" :controls="false" v-model="item.unit_price" controls-position="right" :min="0" @change="reCalculation(index)"></el-input-number>
                                        </td>
                                        <td>
                                          <el-input-number style="width: 80px;" :controls="false" v-model="item.quantity" controls-position="right" :min="0" @change="reCalculation(index)"></el-input-number>
                                        </td>
                                        <td>
                                          <el-input-number style="width: 80px;" :controls="false" v-model="item.cost_price" controls-position="right" :min="0" @change="reCalculationCost(index)"></el-input-number>
                                        </td>
                                        <td>
                                          <el-input-number style="width: 80px;" :controls="false" v-model="item.all_price" controls-position="right" :min="0" @change="reSum(index)"></el-input-number>
                                        </td>
                                    </tr>
                                    
                                </table>
                            </el-tab-pane>
                        </el-tabs>
                    </el-aside>
                    <el-footer>
                        <div style="margin: 15px 0;">医生：
                            <el-select v-model="form.docter_id" prop="docter_id" placeholder="请选择" style="width: 20%;">
                                <el-option
                                    v-for="item in options"
                                    :key="item.employee_id"
                                    :label="item.username"
                                    :value="item.employee_id"
                                ></el-option>
                            </el-select>
                            <div style="float: right; width: 40%;">折扣：
                                <el-input-number :controls="false" v-model="form.all_cost_per" controls-position="right" :min="0" @change="allCostPriceChange"></el-input-number>
                            </div>
                        </div>
                        <div>护士：
                            <el-select v-model="form.nurse_id" placeholder="请选择" style="width: 20%;">
                                <el-option
                                    v-for="item in optionss"
                                    :key="item.employee_id"
                                    :label="item.username"
                                    :value="item.employee_id"
                                ></el-option>
                            </el-select>&nbsp;&nbsp;备注：
                            <el-input v-model="form.remark" placeholder="请输入内容" style="width: 60%;"></el-input>
                        </div>
                    </el-footer>
                </el-container>
                
                <el-main style="width: 250px; margin-top: 40px; margin-left: 30px;">
                    <p style="font-size: 18px; line-height: 60px;">合计应收
                        <span>{{form.old_sum}}</span>
                    </p>
                    <p style="font-size: 22px; line-height: 60px;">优惠后金额:
                        <el-input-number :controls="false" v-model="form.all_price" controls-position="right" :min="0"></el-input-number>
                    </p>
                </el-main>
            </el-container>
        </el-container>
      </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button size="medium" type="primary" :loading="buttonloading" @click="submitForm('form')">确 定</el-button>
            <el-button size="medium" type="primary" @click="submitFormAndPrint('form')">确定并打印</el-button>
        </span>
    </el-dialog>
    <!--处方完-->
</template>

<script>
const {ipcRenderer} = require('electron');
import PatientTeethPosition from "./PatientTeethPosition";
import * as HospitalHandleApi from "../../../../api/HospitalHandleApi";
import * as PatientApi from "../../../../api/PatientApi";
import { accAdd, accMultiply, toDecimal2 } from "@/utils/calculation";
import { debug } from 'util';
export default {
  components: { PatientTeethPosition },
  data() {
    return {
      username: "",
      case_number: "",
      tableData4: [],
      oldData: [],
      detail_id: 0,
      buttonloading: false,
      centerDialogVisible: false,
      activeName: "first",
      value: "",
      input: "",
      rules: {
        docter_id: [
          { required: true, message: "请选择医生", trigger: "blur" }
        ]
      },
      form: {
        docter_id: null,
        nurse_id: "",
        all_cost_per: 0,
        remark: "",
        all_price: 0,
        old_sum: 0
      },
      options: [],
      optionss: []
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if(this.form.docter_id == null) {
            this.$message.error("请选择医生!");
            return;
          }
          this.buttonloading = true;
          HospitalHandleApi.payBill(this.detail_id, JSON.stringify(this.tableData4), this.form.remark, this.form.docter_id, this.form.all_cost_per).then(data => {
            this.buttonloading = false;
           if (data.error === "success") {
              this.$message({
                  type: "success",
                  message: "划价成功!"
                });
              this.centerDialogVisible = false;
              this.$emit("refresh", true);
            } else {
              this.$message.error(this.$t(data.error));
            }
          })
        }
      })
    },
    submitFormAndPrint(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if(this.form.docter_id == null) {
            this.$message.error("请选择医生!");
            return;
          }
          this.buttonloading = true;
          HospitalHandleApi.payBillAndPrint(this.detail_id, JSON.stringify(this.tableData4), this.form.remark, this.form.docter_id, this.form.all_cost_per).then(data => {
            this.buttonloading = false;
            if (data.error === "success") {
              this.$message({
                type: "success",
                message: "划价成功!"
              });
              ipcRenderer.send('print', data.data);
              this.centerDialogVisible = false;
              this.$emit("refresh", true);
            } else {
              this.$message.error(this.$t(data.error));
            }
          })
        }
      })
    },
    allCostPriceChange(value) {
      if(value == 0) {
        value = 1;
      }
      var discount = 0;
      var no_discount = 0;
      this.tableData4.forEach(item => {
        var cost_price = 1;
        if(item.cost_price != 0) {
          cost_price = item.cost_price;
        }
        var cac = accMultiply((accMultiply(item.quantity, item.unit_price)), (cost_price / 1));
        item.all_price = cac;
        if(item.is_discount) {
          discount = accAdd(discount, cac);
        } else {
          no_discount = accAdd(no_discount, cac);
        }
      })
      this.form.all_price = accAdd(no_discount, accMultiply(discount, value));
      // this.form.all_price = accMultiply(this.form.all_price, value);
    },
    reCalculationCost(index) {
      var discount = 0;
      var no_discount = 0;
      this.tableData4.forEach(item => {
        var cost_price = 1;
        if(item.cost_price != 0) {
          cost_price = item.cost_price;
        }
        var cac = accMultiply((accMultiply(item.quantity, item.unit_price)), (cost_price / 1));
        item.all_price = cac;
        if(item.is_discount) {
          discount = accAdd(discount, cac);
        } else {
          no_discount = accAdd(no_discount, cac);
        }
      })
      this.form.all_price = accAdd(no_discount, accMultiply(discount, this.form.all_cost_per));
      // this.form.all_price = sum;
    },
    reCalculation(index) {
      var discount = 0;
      var no_discount = 0;
      this.tableData4.forEach(item => {
        var cost_price = 1;
        if(item.cost_price != 0) {
          cost_price = item.cost_price;
        }
        var cac = accMultiply((accMultiply(item.quantity, item.unit_price)), (cost_price / 1));
        item.all_price = cac;
        if(item.is_discount) {
          discount = accAdd(discount, cac);
        } else {
          no_discount = accAdd(no_discount, cac);
        }
      })
      this.form.all_price = accAdd(no_discount, accMultiply(discount, this.form.all_cost_per));
      this.old_sum = accAdd(no_discount, accMultiply(discount, this.form.all_cost_per));
    },
    reSum(index) {
      var sum = 0;
      var cost_pri = 1;
      if(this.form.all_cost_per != 0) {
        cost_pri = this.form.all_cost_per;
      }
      this.tableData4.forEach(item => {
        sum = accAdd(sum, item.all_price);
      })
      sum = accMultiply(sum, cost_pri);
      this.form.all_price = sum;
    },
    //处置打开事件
		openChange(item) {
      item.show = true;
			this.$nextTick(() => {
        this.$refs[("PatientTeethPosition" + item.name)][0].editItem(item);
      })
		},
		//处置关闭事件
		closeChange(item, oindex) {
			item.show = false;
			this.$nextTick(() => {
        this.$refs[("PatientTeethPosition" + item.name)][0].editItem(item);
      })
		},
    positionValueChange(index, item) {
      this.tableData4.forEach(one => {
        if(one.name == index.name) {
          one.left = item.left;
          one.right = item.right;
          one.bottom = item.bottom;
          one.lebottom = item.lebottom;
        }
      })
		},
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    showAdd(detail_id) {
      this.detail_id = detail_id;
      this.getDate(detail_id);
      this.getDocter();
      this.getNurse();

      this.centerDialogVisible = true;
    },
		getDocter() {
			PatientApi.getEmployee(1).then(res => {
        if (res.error === "success") {
          this.options = res.data;
        } else {
          this.$message.error(this.$t(res.error));
        }
      })
    },
    getNurse() {
			PatientApi.getEmployee(2).then(res => {
        if (res.error === "success") {
          this.optionss = res.data;
        } else {
          this.$message.error(this.$t(res.error));
        }
      })
		},
    getDate(detail_id) {
      HospitalHandleApi.payList(detail_id).then(data => {
        this.tableData4 = [];
        if (data.error === "success") {
          var sum = 0;
          var discount = 0;
          var no_discount = 0;
          data.data.prescription_detail.forEach(item => {
            var i = 1;
            if(item.cost_price != 0) {
              i = item.cost_price;
            }
            var sub_amount = 0;
            if(item.sub_amount != '' != '' && item.sub_amount != undefined && item.sub_amount != null) {
              sub_amount = item.sub_amount;
            }
            item.all_price = accMultiply(accMultiply(item.quantity, item.unit_price), accAdd(i, -1 * sub_amount));
            item.cost_per = 0;
            item.prescription_id = item.prescription_id;
            item.show = false;
            item.left = "";
            item.bottom = "";
            item.lebottom = "";
            item.right = "";
            item.name = item.prescription_id + item.title;
            this.tableData4.push(item);

            this.$nextTick(() => {
              this.$refs[("PatientTeethPosition" + item.name)][0].editItem(item);
            })
           discount = accAdd(discount, item.all_price);
          });
          data.data.tream_detail.forEach(item => {
            var i = 1;
            if(item.cost_price != 0) {
              i = item.cost_price;
            }
            var sub_amount = 0;
            if(item.sub_amount != '' && item.sub_amount != undefined && item.sub_amount != null) {
              sub_amount = item.sub_amount;
            }
            item.all_price = accMultiply(accMultiply(item.quantity, item.unit_price), accAdd(i, -1 * sub_amount));
            item.cost_per = 0;
            item.show = false;
            item.name = item.detail_id + item.title;
            if(item.position != null && item.position != undefined && item.position != "") {
              var position = JSON.parse(item.position);
              item.left = position.left;
              item.right = position.right;
              item.bottom = position.bottom;
              item.lebottom = position.lebottom;
            } else {
              item.left = "";
              item.bottom = "";
              item.lebottom = "";
              item.right = "";
            }
            this.tableData4.push(item);
            this.$nextTick(() => {
              this.$refs[("PatientTeethPosition" + item.name)][0].editItem(item);
            })
            //如果是折扣记录
            if(item.is_discount) {
              discount = accAdd(discount, item.all_price);
            } else {
              no_discount = accAdd(no_discount, item.all_price);
            }
            //非折扣
            // sum = sum + item.all_price;
          });

          this.form.employee_id = data.data.employee_id;
          this.form.old_sum = sum;
          this.form.all_cost_per = data.data.cost_price;
          this.form.username = data.data.username;
          this.form.case_number = data.data.case_number;
          var i = 1;
          if(this.form.all_cost_per != null && this.form.all_cost_per != undefined && this.form.all_cost_per != "") {
            i = this.form.all_cost_per;
          }

          discount = accMultiply(discount, this.form.all_cost_per);
          sum = accAdd(discount, no_discount);
          this.form.all_price = sum;

          data.data.prescription_detail.forEach(item => {
            this.oldData.push(item);
          });
          data.data.tream_detail.forEach(item => {
            this.oldData.push(item);
          });
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
      })
    }
  }
};
</script>


<style scoped>

.block {
  float: right;
  line-height: 60px;
}

.el-footer {
  width: 850px;
  color: #333;
  padding: 0;
}
.el-header {
  width: 100%;
  height: 30px;
  background-color: #ffffff;
  color: #333;
  display: flex;
  border-top: 1px solid #f4f4f5;
  border-bottom: 1px solid #f4f4f5;
  line-height: 60px;
}

.el-aside {
  width: 600px;
  color: #333;
}

.el-main {
  width: 300px;
  height: 320px;
  border: 1px solid #e9eef3;
  color: #333;
  margin-top: 10px;
}
body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}



table {
  width: 800px;
  
  border: 1px solid #f4f4f5;
  border-collapse: collapse;
  color: #686868;
}
table tr {
  border: 1px solid #f4f4f5;
  width: 800px;
  text-align: center;
}

table tr th {
  border: 1px solid #f4f4f5;
  text-align: center;
  width: 60px;
  line-height: 30px;
}
table tr td {
  border: 1px solid #f4f4f5;
  text-align: center;
  width: 300px;
  /*line-height: 30px;*/
}
table tr td > input {
  line-height: 30px;
  width: 100%;
  border: 0px;
  text-align: center;
}

.table {
  width: 800px;
  border-collapse: collapse;
  color: #686868;
}
.table>tr {
  width: 800px;
  text-align: center;
  
}
.table>tr th {
	color: #909399;
  border: 0px;
  text-align: center;
  width: 60px;
  font-size: 12px;
}
.table>tr th:nth-child(1) {
  text-align: left !important;
  text-indent: 24px;
   width: 110px;
  
}
.table>tr td {
height: 100px;
  border: 0px;
  text-align: center;
  width: 60px;
  font-size: 12px;
}
.table>tr td:nth-child(1) {
  border: 0px;
  text-align: left !important;
  padding: 15px 0 0 10px ;
  position: absolute;
}
.table>tr button {
  border: 0px;
  text-align: center;
  width: 60px;
  background: #FFFFFF;
  color: #20A0FF;
  outline: none;
}

</style>

