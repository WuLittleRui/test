<template>
    <div :style="heightStyle">
      <el-form ref="form" :model="form" :rules="rules">
        <el-container>
            <el-header style="width: 100%;">
                <p style="width: 50%; line-height: 50px; font-size: 16px;">{{form.username}}
                    <span style="margin-left: 40px;">{{form.case_number}}</span>
                </p>
            </el-header>
            <el-container>
                <el-container>
                    <el-aside :style="asideHeight">
                        <el-tabs v-model="activeName">
                            <el-tab-pane label="收费明细" name="first">
                            	
                            	<table class="table" :style="widthStyle">
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
                                        		 <PatientTeethPosition :ref="'PatientTeethPosition' + item.name" :index="item"/>
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
                        <div style="margin: 15px 0;">医生： <span>{{form.docter_id }}</span>
                        </div>
                        <div>护士： <span v-if="form.nurse_id != ''">{{form.nurse_id }}</span><span v-else>无</span>
                            &nbsp;&nbsp;备注：
                            <el-input v-model="form.remark" placeholder="请输入内容" style="width: 326px;"></el-input>
                        </div>
                        <el-container style="margin-top: 20px;" v-show="show">
                          <el-button type="primary" @click="submitForm('form')">收费</el-button>
                          <el-button size="medium" type="primary" @click="submitFormAndPrint('form')">收费并打印</el-button>
                        </el-container> 
                    </el-footer>
                </el-container>
                
                <el-main style="width: 250px; margin-top: 40px; margin-left: 30px; height: 350px">
                  <el-scrollbar style="height: 100%;"> 
                    <span :style="'font-size: 16px;'  + lineHeight">上次欠款
                      <span>{{form.arrear_amount}}</span>
                    </span>
                    <span :style="'font-size: 16px;'  + lineHeight">本次费用
                      <span>{{form.now_price}}</span>
                    </span>
                    <p :style="'font-size: 17px;'  + lineHeight">合计应收
                      <span>{{form.old_sum}}</span>
                    </p>
                    <p :style="'font-size: 22px;'  + lineHeight">优惠后金额:
                      <span>{{form.all_price}}</span>
                    </p>
                    <span :style="'font-size: 18px;'  + lineHeight">欠款:
                      <span>{{form.arrear}}</span>
                    </span>
                    <span :style="'font-size: 18px;'  + lineHeight">找零:
                      <span>{{form.odd_change}}</span>
                    </span>
                    <p :style="'font-size: 18px;'+ lineHeight" v-for="item in payType">{{item.pay_type_name}}<span v-if="item.pay_type_amount != null && item.pay_type_amount !=undefined">({{ item.pay_type_amount }}元)</span>
                        <el-input-number style="width: 70px;" :precision="2" :controls="false" @change="payTypeValueChange" v-model="item.amount" controls-position="right" :min="0"></el-input-number>
                    </p>
                  </el-scrollbar>
                </el-main>
            </el-container>
        </el-container>
      </el-form>
    <!--处方完-->
    </div>
</template>

<script>
const {ipcRenderer} = require('electron');
import PatientTeethPosition from "../case/PatientCommon/PatientTeethPosition";
import * as HospitalHandleApi from "@/api/HospitalHandleApi";
import * as PayTypeApi from "@/api/PayTypeApi";
import * as PatientApi from "@/api/PatientApi";
import * as OauthApi from "@/api/OauthApi";
import { accAdd, accMultiply, toDecimal2 } from "@/utils/calculation";
import { debug } from 'util';
export default {
  components: { PatientTeethPosition },
  data() {
    return {
      username: "",
      case_number: "",
      coupon_id: "",
      tableData4: [],
      heightStyle: "height:" + document.body.clientHeight * 0.59 + "px",
      asideHeight: "height:" + document.body.clientHeight * 0.35 + "px; width:" + document.body.clientWidth * 0.6 + "px",
      widthStyle: "width:" + document.body.clientWidth * 0.6 + "px",
      lineHeight: "line-height: 40px", 
      centerDialogVisible: false,
      activeName: "first",
      payType: [],
      detail_list: [],
      value: "",
      show: false,
      input: "",
      rules: {
        docter_id: [
          { required: true, message: "请选择医生", trigger: "blur" }
        ]
      },
      form: {
        docter_id: null,
        nurse_id: "",
        mid: null,
        now_price: 0,
        all_cost_per: 0,
        coupon_id: null,
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
                  data.data.pay = sum;
                  data.data.arrears = accAdd(data.data.all_price, -1 * sum);
                  ipcRenderer.send('print', data.data);
                  this.$emit('refresh', true);
              } else if (
                data.error === "invaild_token" ||
                data.error === "not_login"
            ) {
                //判断是否认证过期
                this.$router.push("/login");
            } else if (data.error_description) {
                this.resetForm();
                this.show = false;
                this.$message.error(data.error_description);
            } else {
                this.resetForm();
                this.$emit('error', true);
                this.$message.error(data.error);
            }
          })
        }
      })
    },
    submitForm(formName) {
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
          HospitalHandleApi.payCashier(this.form.case_number, 2, JSON.stringify(this.tableData4), this.form.nurse_id, 4, this.form.remark, JSON.stringify(this.payType), this.form.all_cost_per, this.form.docter_id).then(data => {
              
              if(data.error == 'success') {
                  this.$message({
                    type: "success",
                    message: "收费成功!"
                  });
                  this.show = false;
                  this.$emit('refresh', true);
              } else if (
                data.error === "invaild_token" ||
                data.error === "not_login"
            ) {
                //判断是否认证过期
                this.$router.push("/login");
            } else if (data.error_description) {
                this.resetForm();
                this.show = false;
                this.$message.error(data.error_description);
            } else {
                this.resetForm();
                this.show = false;
                this.$message.error(data.error);
            }
          })
        }
      })
    },
    resetForm() {
      this.case_number = "";
      this.form.docter_id = null;
      this.form.nurse_id = null;
      this.form.mid = null;
      this.form.now_price = 0;
      this.form.all_cost_per = 0;
      this.form.remark = "";
      this.form.all_price = 0;
      this.form.old_sum = 0;
      this.form.arrear_amount = 0;
      this.form.odd_change = 0;
      this.form.arrear = 0;
      this.form.coupon_id = null;
      this.show = false;
    },
    payTypeValueChange() {
        var sum = 0;
        this.payType.forEach(item => {
            sum = accAdd(sum, item.amount);
        })
        this.form.arrear = accAdd(this.form.all_price, -1 * sum);
        if(this.form.arrear <= 0) {
            this.form.odd_change = -1 * this.form.arrear;
            this.form.arrear = 0;
        } else {
           this.form.odd_change = 0;
        }
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    showAdd(case_number, coupon_id) {
        if(case_number != null) {
          this.case_number = case_number;
          this.coupon_id = coupon_id;
          this.getDate(case_number, coupon_id);
        }
        this.getNurse();
        this.getDocter();

        this.centerDialogVisible = true;
    },
    getDocter() {
		  PatientApi.getEmployee(1).then(res => {
            if (res.error === "success") {
                this.options = res.data;
            }  else if (
                  data.error === "invaild_token" ||
                  data.error === "not_login"
            ) {
              //判断是否认证过期
                  OauthApi.logOut();
                  this.$router.push("/login");
            } else {
              this.$message.error(this.$t(res.error));
            }
        })
    },
    getNurse() {
		  PatientApi.getEmployee(2).then(res => {
          if (res.error === "success") {
            this.optionss = res.data;
          }  else if (
            data.error === "invaild_token" ||
            data.error === "not_login"
          ) {
          //判断是否认证过期
            OauthApi.logOut();
            this.$router.push("/login");
          } else {
            this.$message.error(this.$t(res.error));
          }
        })
    },
    getPayType() {
        PayTypeApi.getAll(this.form.mid).then(data => {
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
                OauthApi.logOut();
                this.$router.push("/login");
            } else if (data.error_description) {
                this.$message.error(data.error_description);
            } else {
                this.$message.error(data.error);
            }
        })
    },
    getDate(case_number, coupon_id) {
      HospitalHandleApi.cashierDetail(case_number, coupon_id).then(data => {
        this.tableData4 = [];
        if (data.error === "success") {
            this.form.case_number = data.data.case_number;
            this.form.username = data.data.username;
            this.form.mid = data.data.mid;
            this.form.docter_id = data.data.docter_name;
            this.form.nurse_id = data.data.nurse_name;
            
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

            if(this.detail_list.length > 0) {
              this.show = true;
            }
            this.form.arrear_amount = data.data.arrear_amount; // 上期欠款
            this.form.now_price = data.data.now_pay; //本次费用
            this.form.old_sum = accAdd(this.form.now_price, this.form.arrear_amount);
            this.form.all_price = this.form.old_sum;
            this.form.arrear = this.form.all_price;
            this.form.odd_change = 0;

            this.getPayType();
        } else if (
            data.error === "invaild_token" ||
            data.error === "not_login"
        ) {
            //判断是否认证过期
            OauthApi.logOut();
            this.$router.push("/login");
        } else if (data.error_description) {
                this.resetForm();
                this.show = false;
            this.$message.error(data.error_description);
        } else {
                this.resetForm();
                this.show = false;
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
  width: 564px;
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
  width: 60px;
  /*line-height: 30px;*/
}
table tr td > input {
  line-height: 30px;
  width: 100%;
  border: 0px;
}

.table {
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

