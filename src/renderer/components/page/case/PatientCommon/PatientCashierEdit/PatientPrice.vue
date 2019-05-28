<template>
    <!--处方-->
    <el-dialog title="收费" :visible.sync="centerDialogVisible" width="1100px" center>
      <el-form ref="form" :model="form" :rules="rules">
        <el-container>
            <el-header style="width: 100%;">
                <p style="width: 50%; line-height: 50px; font-size: 16px;">{{form.username}}
                    <span style="margin-left: 40px;">{{form.case_number}}</span>
                </p>
            </el-header>
            <el-container>
                <el-container>
                    <el-aside>
                        <el-tabs v-model="activeName" @tab-click="handleClick">
                            <el-tab-pane label="收费明细" name="first" style='min-height: 450px; '>
                            	
                            	<table class="table">
                                    <tr>
                                        <th>牙位</th>
                                        <th>处置名称</th>
                                        <th>单价</th>
                                        <th>数量</th>
                                        <th>处置折扣</th>
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
                                          {{item.unit_price}}
                                        </td>
                                        <td>
                                          {{item.quantity}}
                                        </td>
                                        <td>
                                          {{item.all_cost_price}}
                                        </td>
                                        <td>
                                          {{item.cost_price}}
                                        </td>
                                        <td>
                                          {{item.all_price}}
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
                
                <el-main style="width: 250px; margin-top: 40px; margin-left: 30px; height: 100%">
                    <p style="font-size: 18px; line-height: 60px;">上次欠款
                        <span>{{form.arrear_amount}}</span>
                    </p>
                    <p style="font-size: 18px; line-height: 60px;">本次费用
                        <span>{{form.now_price}}</span>
                    </p>
                    <p style="font-size: 18px; line-height: 60px;">合计应收
                        <span>{{form.old_sum}}</span>
                    </p> 
                    <p style="font-size: 22px; line-height: 60px;">优惠后金额:
                        <el-input-number style="width: 70px;" :controls="false" :precision="2" v-model="form.all_price" controls-position="right" :min="0" :disabled="true"></el-input-number>
                    </p>
                    <p style="font-size: 18px; line-height: 60px;">欠款:
                        <el-input-number style="width: 70px;" :readonly="true" :controls="false" :precision="2" v-model="form.arrear" controls-position="right" :min="0" :disabled="true"></el-input-number>
                    </p>
                    <p style="font-size: 18px; line-height: 60px;">找零:
                        <el-input-number style="width: 70px;" :readonly="true" :controls="false" :precision="2" v-model="form.odd_change" controls-position="right" :min="0" :disabled="true"></el-input-number>
                    </p>
                    <p style="font-size: 18px; line-height: 60px;" v-for="item in payType">{{item.pay_type_name}}
                        <el-input-number style="width: 70px;" :precision="2" :controls="false" @change="payTypeValueChange" v-model="item.amount" controls-position="right" :min="0"></el-input-number>
                    </p>
                </el-main>
            </el-container>
        </el-container>
      </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button size="medium" type="success" @click="submitForm('form')">收费</el-button>
            <el-button size="medium" type="primary" @click="submitFormAndPrint('form')">收费并打印</el-button>
        </span>
    </el-dialog> 
    <!--处方完-->
</template>

<script>
const {ipcRenderer} = require('electron');
import PatientTeethPosition from "../PatientTeethPosition";
import * as HospitalHandleApi from "../../../../../api/HospitalHandleApi";
import * as PayTypeApi from "../../../../../api/PayTypeApi";
import * as PatientApi from "../../../../../api/PatientApi";
import { accAdd, accMultiply, toDecimal2 } from "@/utils/calculation";
import { debug } from 'util';
export default {
  components: { PatientTeethPosition },
  data() {
    return {
      username: "",
      case_number: "",
      tableData4: [],
      centerDialogVisible: false,
      activeName: "first",
      payType: [],
      detail_list: [],
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
        now_price: 0,
        all_cost_per: 0,
        remark: "",
        all_price: 0,
        old_sum: 0,
        arrear: 0,
        odd_change: 0,
        arrear_amount: 0
      },
      options: [],
      optionss: []
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var sum = 0;
          this.payType.forEach(item => {
              sum = sum + item.amount;
          })
          if(sum == 0) {
              this.$message.error("实收金额不能为0!");
              return;
          }
          HospitalHandleApi.payCashier(this.form.case_number, 2, JSON.stringify(this.tableData4), this.form.nurse_id, 4, this.form.remark, JSON.stringify(this.payType), this.form.all_cost_per, this.form.docter_id).then(data => {
              if(data.error == 'success') {
                  this.$message({
                    type: "success",
                    message: "划价成功!"
                  });
                  this.centerDialogVisible = false;
                  this.$emit('refresh', true);
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
      })
    },
    submitFormAndPrint(formName) {
       this.$refs[formName].validate(valid => {
        if (valid) {
          if(this.form.docter_id == null) {
            this.$message.error("请选择医生!");
            return;
          }
          var sum = 0;
          this.payType.forEach(item => {
              sum = sum + item.amount;
          })
          if(sum == 0) {
              this.$message.error("实收金额不能为0!");
              return;
          }
          HospitalHandleApi.payCashierAndPrint(this.form.case_number, 2, JSON.stringify(this.tableData4), this.form.nurse_id, 4, this.form.remark, JSON.stringify(this.payType), this.form.all_cost_per, this.form.docter_id).then(data => {
              if(data.error == 'success') {
                  this.$message({
                    type: "success",
                    message: "划价成功!"
                  });
                  this.centerDialogVisible = false;
                  data.data.payType = this.payType;
                  ipcRenderer.send('print', data.data);
                  this.$emit('refresh', true);
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
      })
    },
    payTypeValueChange() {
        var sum = 0;
        this.payType.forEach(item => {
            sum = accAdd(sum, item.amount);
        })
        this.form.arrear = accAdd(this.form.all_price, -1 * sum);
        if(this.form.arrear <= 0) {
            this.form.odd_change = accMultiply(-1, this.form.arrear);
            this.form.arrear = 0;
        }
    },
    allCostPriceChange(value) {
      var c = 1;
      if(this.form.all_cost_per != 0) {
          c = this.form.all_cost_per;
      }
      var old = this.form.all_price;
      this.form.all_price = old * c;
      this.form.arrear = this.form.all_price;
    },
    reCalculationAllCost(index) {
      var all_cost_price = 0;
      all_cost_price = this.tableData4[index].all_cost_price;
      var handle_id = this.tableData4[index].handle_id;
      var sum = 0;
      this.tableData4.forEach(item => {
        if(item.handle_id == handle_id) {
          item.all_cost_price = all_cost_price;
        }
        var a = 1;
        if(item.cost_price != 0) {
            a = item.cost_price;
        }
        item.all_price = (item.quantity * item.unit_price) * a;
        sum = sum + item.all_price;
      })
      var co = 1;
      this.detail_list.forEach(item => {
        if(item.handle_id == handle_id) {
          if(all_cost_price == 0) {
            all_cost_price = 1;
          }
          item.cost_price = all_cost_price;
          co = all_cost_price;
        }
      })
      var c = 1;
      if(this.form.all_cost_per != 0) {
          c = this.form.all_cost_per;
      }
      this.form.all_price = sum * c * co;
      this.form.arrear = this.form.all_price;
    },
    reCalculationCost(index) {
      var sum = 0;
      var id = 0;
      this.tableData4.forEach(item => {
          id = item.handle_id;
          var a = 1;
          if(item.cost_price != 0) {
              a = item.cost_price;
          }
          item.all_price = (item.quantity * item.unit_price) * a;
          sum = sum + item.all_price;
      })
      var c = 1;
      if(this.form.all_cost_per != 0) {
          c = this.form.all_cost_per;
      }
      var co = 1;
      this.detail_list.forEach(item => {
        if(item.handle_id == id) {
          co = item.cost_price;
        }
      })
      this.form.all_price = sum * c * co;
      this.form.arrear = this.form.all_price;
    },
    reSum(index) {
      var sum = 0;
      var id = 0;
      var c = 1;
      if(this.form.all_cost_per != 0) {
          c = this.form.all_cost_per;
      }
      var co = 1;
      this.detail_list.forEach(item => {
        if(item.sum == undefined) {
          item.sum = 0;
        }
        this.tableData4.forEach(one => {
          if(item.handle_id == one.handle_id) {
            item.sum = item.sum + one.all_price;
          }
        })
      })
      this.detail_list.forEach(item => {
        sum = sum + item.sum * item.cost_price;
      })
      this.form.all_price = sum * c * co;
      this.form.arrear = this.form.all_price;
    },
    //处置打开事件
	openChange(item) {
	},
		//处置关闭事件
    closeChange(item, oindex) {
    },
    positionValueChange(index, item) {
	},
    handleClick(tab, event) {
      console.log(tab, event);
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    showAdd(case_number) {
        this.case_number = case_number
        this.getDate(case_number);
        this.getNurse();
        this.getDocter();
        this.getPayType();
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
    getPayType() {
        PayTypeApi.getAll().then(data => {
            if(data.error == "success") {
                data.data.list.forEach(item => {
                    item.amount = 0;
                    item.type = item.pay_type_id;
                })
                this.payType = data.data.list;
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
    },
    getDate(case_number) {
      HospitalHandleApi.cashierDetail(case_number).then(data => {
        this.tableData4 = [];
        if (data.error === "success") {
            this.form.case_number = data.data.case_number;
            this.form.username = data.data.username;
            data.data.handle_list.forEach(item => {
                item.name = item.prescription_id + item.title;
                if(item.position != '' && item.position != null && item.position != undefined) {
                    var position = JSON.parse(item.position);
                    item.left = position.left;
                    item.right = position.right;
                    item.bottom = position.bottom;
                    item.lebottom = position.lebottom;
                } else {
                    item.left = "";
                    item.right = "";
                    item.bottom = "";
                    item.lebottom = "";
                }
                this.tableData4.push(item);
                
                this.$nextTick(() => {
                    this.$refs[("PatientTeethPosition" + item.name)][0].editItem(item);
                })
            })
            data.data.pre_list.forEach(item => {
                item.name = item.prescription_id + item.title;
                if(item.position != '' && item.position != null && item.position != undefined) {
                    var position = JSON.parse(item.position);
                    item.left = position.left;
                    item.right = position.right;
                    item.bottom = position.bottom;
                    item.lebottom = position.lebottom;
                } else {
                    item.left = "";
                    item.right = "";
                    item.bottom = "";
                    item.lebottom = "";
                }
                this.tableData4.push(item);

                this.$nextTick(() => {
                    this.$refs[("PatientTeethPosition" + item.name)][0].editItem(item);
                })
            })
            this.detail_list = data.data.detail_list;

            this.form.arrear_amount = data.data.arrear_amount; // 上期欠款
            this.form.now_price = data.data.now_pay; //本次费用
            this.form.old_sum = this.form.arrear_amount + this.form.now_price;
            this.form.all_price = this.form.old_sum;
            this.form.arrear = this.form.all_price;
            this.form.odd_change = 0;

            this.centerDialogVisible = true;
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
  width: 800px !important;
  color: #333;
  height: 500px;
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
  width: 60px;
  /*line-height: 30px;*/
}
table tr td > input {
  line-height: 30px;
  width: 100%;
  border: 0px;
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

