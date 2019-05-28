<template>
	<div v-if="flag">
		<div :style="edit? 'height: 150px': teethHeight">
			<el-scrollbar style="height: 100%;">
				<section class="section" v-for="(show, oindex) in list">
					<header class="header">
						<ul class="header_left">
							<li>
								<div class="block">
								    <el-date-picker
											v-model="show.create_time"
											type="datetime"
											value-format="yyyy-MM-dd hh:mm:ss"
											placeholder="选择日期时间">
										</el-date-picker>
								</div>
							</li>
							<li> 
								<el-select v-model="show.title" placeholder="请选择" style="width: 80px; padding-bottom: 10px;">
								    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"  style="margin-bottom: 10px;"> </el-option>
								</el-select>
							</li>
							<li>
								<el-select v-model="show.docter_id" placeholder="请选择" style="width: 80px;">
								    <el-option v-for="item in optionss" :key="item.employee_id" :label="item.username" :value="item.employee_id"  style="margin-bottom: 10px;"> </el-option>
								</el-select>
							</li>
							<li style="color: orange; font-size: 20px; line-height: 50px;" v-if="show.state == 1">
								待缴费
							</li>
							<li style="color: orange; font-size: 20px; line-height: 50px;" v-if="show.state == 2">
								已缴费
							</li>
						</ul>
						<ul class="header_right">
							<li>
								<el-button type="text" v-if="show.state == 0 && !onlyShow" @click="PatientPrescriptionEdit(oindex)">处方</el-button>
							</li>
							<li>
								<el-button type="text" v-if="show.state == 0 && !onlyShow" @click="PatientPriceEdit(oindex)">划价</el-button>
							</li>
						</ul>
						<div style="clear: both;"></div>
					</header>
					<div style="position: relative; display: flex;" v-for="(item, index) in show.data">
						<PatientTeethPosition :ref="'PatientTeethPosition' + oindex " :object="item" :index="index" :oindex="oindex"  @open="openChange" @close="closeChange" @value="positionValueChange"/>

						<div class="center_right">
							<input   v-model="item.name" :disabled="show.state != 0 &&  !onlyShow" placeholder="请输入内容">
							<div>
								<img
									src="../../../../../../static/img/hover_vip_addcoup.png"
									@click="PatientTeethHandle(oindex, index)"
									 v-if="show.state == 0 && !onlyShow"
									title="你是谁"
								>
							</div>
							<input class="input" type="number" :disabled="show.state != 0 &&  !onlyShow" v-model="item.unit_price" placeholder="单价" min="0" v-on:input = 'valueChange($event.target.value, index, item, oindex)'>
							<input class="input" type="number" :disabled="show.state != 0 &&  !onlyShow" v-model="item.quantity" placeholder="数量" min="1" v-on:input = 'quantityChange($event.target.value, index, item, oindex)'>
							<input class="input" type="number" :disabled="show.state != 0 &&  !onlyShow" v-model="item.all_price" placeholder="费用" min="0" v-on:input = 'priceChange($event.target.value, index, item, oindex)'>
							<div v-if="show.state == 0 && !onlyShow" @click="remove(index, oindex)">
								<img src="../../../../../../static/img/remove.png" title="你是谁">
							</div>
							<div style="clear: both;"></div>
							<input class="last_input" v-model="item.remark" v-on:blur = "remarkChnge($event.target.value, index, item, oindex)" placeholder="请输入内容">
						</div>
						<div style="clear: both;"></div>
					</div>
					<div class="chufang">
						<div class="chufang_left">处方：</div>
						<div class="chufang_right">
							<table>
									<tr>
											<th>药品名</th>
											<th>用法用量</th> 
											<th>单价</th>
											<th>数量</th>
											<th>费用</th>
									</tr>
									<tr v-for="(item, index) in show.pre">
											<td>{{item.title}}</td>
											<td>{{item.remark}}</td>
											<td>{{item.unit_price}}</td>
											<!-- <input class="input" type="number" :disabled="show.state != 0 &&  !onlyShow" v-model="item.quantity" placeholder="数量" min="1" v-on:input = 'quantityChange($event.target.value, index, item, oindex)'> -->
											<!-- <el-input-number v-model="item.quantity" :min="1" v-if="show.state == 0" @change="preChange($event, index, item, oindex)"></el-input-number> -->
											<td>{{item.quantity}}</td>
											<td>{{item.all_price}}</td>
									</tr>
							</table>
						</div>
					</div>
					
					<div style="float: right; margin-right: 70px; font-size: 21px; padding: 5px; line-height: 30px; color: #999999;">合计：<span>{{show.all_price}}</span></div>
					<div style="clear: both;"></div>
				</section>
			</el-scrollbar>
			<PatientPriceEdit ref="PatientPriceEdit" @refresh="getList"/>
			<PatientTeethHandle ref="PatientTeethHandle" @refresh="PatientTeethHandleCallback"/>
			<PatientPrescriptionEdit ref="PatientPrescriptionEdit" @refresh="PatientPrescriptionEditCallback"/>
		</div>
		<div class="button">
			<el-button size="medium" type="primary" @click="handleAddPatient" v-if="!onlyShow">新增处置</el-button>
		</div>
	</div>
</template>

<script>
import * as HospitalHandleApi from "../../../../api/HospitalHandleApi";
import * as PatientApi from "../../../../api/PatientApi";

import PatientTeethPosition from "./PatientTeethPosition";
import PatientPriceEdit from "./PatientPriceEdit";
import PatientTeethHandle from "./PatientTeethHandle";
import PatientPrescriptionEdit from "./PatientPrescriptionEdit";
import { parseTime } from "../../../../utils/formater";
import { accAdd, accMultiply, toDecimal2 } from "@/utils/calculation";
import { unlink, unlinkSync } from 'fs';

export default {
  components: { PatientTeethHandle, PatientPrescriptionEdit, PatientPriceEdit, PatientTeethPosition },
  data() {
    return {
        edit: false,
    	  options: [{
          value: '复诊',
          label: '复诊'
        }, {
          value: '初诊',
          label: '初诊'
        }],
        optionss: [{
          value: '选项1',
          label: '选项1'
        }, {
          value: '选项2',
          label: '选项2'
				}],
			teethHeight: "height:" + document.body.clientWidth * 0.3 + "px",
    	price:0,
      onlyShow: false,
			currentRow: {},
			docter_id: "",
			case_number: null,
			input: "",
			flag: false,
			oldShow: [],
			oindex: 0,
			list: [ { no:true, 'data':[{show: false,left: "",right: "",lebottom: "",bottom: "", detail_id: 0, "delete": true}], 'state': 0, 'create_time': new Date(), 'title': '复诊', 'docter_id': '', 'detail_id': 0, 'pre': [{detail_id: 0}]}
			],
      show: [
        {
          show: false,
          left: "",
          right: "",
          lebottom: "",
					bottom: ""
        }],
      allData: {
        parCheck: false,
        text: "全选"
      }
    };
  },
  methods: {
		//添加处置
		handleAddPatient() {
			var all = {};
			var data = [];
			var b = {};
			b.show = false;
			b.left = "";
			b.bottom = "";
			b.lebottom = "";
			b.right = "";
			b.detail_id = 0;
			b.delete = true;
			data.push(b);
			all.data = data;

			data = [];
			var b = {};
			all.create_time = new Date();
			all.title = "复诊";
			all.docter_id = this.docter_id;
			all.detail_id = 0;
			all.delete = true;
			b.detail_id = 0;
			data.push(b);
			all.pre = data;
			all.state = 0;
			this.list.unshift(all);
		},
		//牙位修改
		positionValueChange(index, item, oindex) {
      this.list[oindex].data[index].left = item.left;
      this.list[oindex].data[index].right = item.right;
      this.list[oindex].data[index].lebottom = item.lebottom;
			this.list[oindex].data[index].bottom = item.bottom;
		},
		//价格修改
		priceChange(value, index, item, oindex) {
			this.list[oindex].data[index].all_price = value;

			this.postData(this.list[oindex]);
		},
		//处置备注修改
		remarkChnge(value, index, item, oindex) {
			this.list[oindex].data[index].remark = value;

			this.postData(this.list[oindex]);
		},
		//处置打开事件
		openChange(index, oindex) {
			var item = this.list[oindex].data[index];
			item.show = true;
			this.$nextTick(() => {
				this.$refs[("PatientTeethPosition" + this.oindex)][index].editItem(item);
      })
		},
		//处置关闭事件
		closeChange(index, oindex) {
			var item = this.list[oindex].data[index];
			item.show = false;
			this.$nextTick(() => {
				this.$refs[("PatientTeethPosition" + this.oindex)][index].editItem(item);
			})
			this.postData(this.list[oindex]);
		},
		//单价修改
		valueChange(value, index, item, oindex) {
			if(value == '') {
				return;
			}
			this.list[oindex].data[index].unit_price = value;
			this.list[oindex].data[index].all_price = accMultiply(value, item.quantity);
			this.postData(this.list[oindex]);
			var sum = 0;
			this.list[oindex].data.forEach(item => {
				sum = accAdd(sum, item.all_price);
			})
			this.list[oindex].all_price = sum;
		},
		preChange(value, index, item, oindex) {
			var sum = 0;
			this.list[oindex].data.forEach(item => {
				if(item.unit_price != undefined && item.quantity != undefined) {
					sum = accAdd(sum, accMultiply(item.quantity, item.unit_price));
				}
			})
			this.list[oindex].pre.forEach(item => {
				if(item.unit_price != undefined && item.quantity != undefined) {
					item.all_price = accMultiply(item.quantity, item.unit_price);
					sum = accAdd(sum, accMultiply(item.quantity, item.unit_price));
				}
			})
			this.list[oindex].all_price = sum;
			this.postData(this.list[oindex]);
		},
		//数量修改
		quantityChange(value, index, item, oindex) {
			if(value == '') {
				return;
			}
			var a = [];
			this.list[oindex].data.forEach(item => {
				a.push(item);
			})
			a[index].quantity = value;
			
			
			a[index].all_price = accMultiply(item.unit_price, value);
			this.list[oindex].data = a;
			
			var sum = 0;
			this.list[oindex].data.forEach(item => {
				sum = accAdd(sum, item.all_price);
			})
			this.list[oindex].pre.forEach(item => {
				if(item.all_price != undefined) {
					sum = accAdd(sum, item.all_price);
				}
			})

			this.list[oindex].all_price = sum;

			this.list[oindex].data[index].quantity = value;
			this.postData(this.list[oindex]);
		},
		//处置记录组件回调
		PatientTeethHandleCallback(callback, index) {
			if(callback.length == 0) {
				var a = [];
				a.push({
					show: false,
          left: "",
          right: "",
          lebottom: "",
					bottom: "",
					state: 0,
				})
				a.delete = true;
				this.oldShow = a;
				this.list[this.oindex].data = a;
			} else {
				this.oldShow = callback;
				this.list[this.oindex].data.forEach(item => {
						callback.forEach(one => {
							if(item.charge_id == one.charge_id) {
								one.have = true;
							}
							
						})
				})
				// this.list[this.oindex].data = [];
				var i = [];
				this.list[this.oindex].data.forEach(item => {
						i.push(item);
				})
				this.list[this.oindex].data = [];
				i.forEach(item => {
					if(item.delete == undefined) {
						this.list[this.oindex].data.push(item);
					}
				})
				callback.forEach(one => {
					if(one.have == undefined || !one.have) {
						one.detail_id = 0;
						one.all_price = accMultiply(one.quantity, one.unit_price);
						this.list[this.oindex].data.push(one);
					}
				})
				this.$nextTick(() => {
					var size = this.list[this.oindex].data.length; 
					for(var i = 0; i < size; i++) {
						this.$refs[("PatientTeethPosition" + this.oindex)][i].editItem(this.list[this.oindex].data[i]);
					}
				})
				
			}

			var sum = 0;
			this.list[this.oindex].data.forEach(item => {
				if(item.quantity != undefined && item.quantity != null && item.quantity != "") {
					sum = accAdd(sum, accMultiply(item.quantity, item.unit_price));
				}
			})
			this.list[this.oindex].pre.forEach(item => {
				if(item.quantity != undefined && item.quantity != null && item.quantity != "") {
					sum = accAdd(sum, accMultiply(item.quantity, item.unit_price));
				}
			})
			this.list[this.oindex].all_price = sum;
			this.postData(this.list[this.oindex])
		},
		//post请求
		postData(one) {
			var handle_detail = [];
			var postData = [];
			one.data.forEach(item => {
				var a = {
					'left': item.left,
					'bottom': item.bottom,
					'right': item.right,
					'lebottom': item.lebottom
				}
				var p =  {
					'detail_id': item.detail_id,
					'position': a,
					'title': item.name,
					'remark': item.remark,
					'unit': item.unit,
					'unit_price': item.unit_price,
					'quantity': item.quantity,
					'all_price': item.all_price,
					'charge_id': item.charge_id,
					'is_discount': item.is_discount
				}
				postData.push(p);
			})
			one.pre.forEach(item => {
				var p = {
					'detail_id': item.detail_id,
					'title': item.name,
					'remark': item.remark,
					'unit': item.unit,
					'unit_price': item.unit_price,
					'quantity': item.quantity,
					'prescription_id': item.prescription_id
				}
				handle_detail.push(item);
			})
			if(postData.length == 1 && postData[0] == null) {
				if(handle_detail.length == 0) {
					return;
				}
			} else if(postData.length == 1 && postData[0].all_price == undefined) {
				if(handle_detail.length == 0) {
					return;
				}
			}
			if(one.detail_id == undefined) {
				one.detail_id = 0;
			}
			HospitalHandleApi.edit(one.detail_id, this.case_number, one.title, parseTime(new Date(one.create_time)), one.docter_id, 
			JSON.stringify(postData), JSON.stringify(handle_detail)).then(data => {
				if (data.error === "success") {
					// this.list[this.oindex].detail_id = data.data.handle_id;
					
					// data.data.handle.forEach(item => {
					// 	item.name = item.title;
					// 	item.all_price = accMultiply(item.quantity, item.unit_price);
					// 	item.remark = item.remark;
					// 	item.left = item.position.left;
					// 	item.bottom = item.position.bottom;
					// 	item.lebottom = item.position.lebottom;
					// 	item.right = item.position.right;
					// })
					// if(data.data.handle.length == 0) {
					// 	  var datal = {};
					// 		datal.shwo = false;
					// 		datal.detail_id = 0;
					// 		datal.left = "";
					// 		datal.right = "";
					// 		datal.bottom = "";
					// 		datal.lebottom = "";
					// 		datal.delete = true;

					// 		data.data.handle.push(datal);

					// }
					// this.list[this.oindex].data = data.data.handle;

					this.getList();
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
		PatientPrescriptionEditCallback(callback) {
			callback.forEach(item => {
				item.detail_id = 0;
			})
			this.list[this.oindex].pre = callback;
			var sum = 0;
			this.list[this.oindex].data.forEach(item => {
				if(item.quantity != undefined && item.quantity != null && item.quantity != "") {
					sum = accAdd(sum, accMultiply(item.quantity, item.unit_price));
				}
			})
			this.list[this.oindex].pre.forEach(item => {
				if(item.quantity != undefined && item.quantity != null && item.quantity != "") {
					sum = accAdd(sum, accMultiply(item.quantity, item.unit_price));
				}
			})
			this.list[this.oindex].all_price = sum;

			this.postData(this.list[this.oindex]);
		},
		//划价事件
    PatientPriceEdit(oindex) {
			if(this.list[oindex].pre.length == 1 && this.list[oindex].pre[0].detail_id == 0 && (this.list[oindex].pre[0].title == undefined || this.list[oindex].pre[0].title == null)) {
				if(this.list[oindex].data.length == 1 && this.list[oindex].data[0].detail_id == 0  &&  (this.list[oindex].data[0].title == undefined || this.list[oindex].data[0].title == null)) {
					this.$message.error("金额为0, 无法划价!");
					return;
				}
			}
      this.$refs["PatientPriceEdit"].showAdd(this.list[oindex].detail_id);
		},
		//处方事件
    PatientPrescriptionEdit(oindex) {
			this.oindex = oindex;
      this.$refs["PatientPrescriptionEdit"].showAdd(this.list[oindex].pre);
		},
		//处置事件
    PatientTeethHandle(oindex, index) {
			this.oindex = oindex;
      this.$refs["PatientTeethHandle"].showAdd(this.list[oindex].data[index], index);
    },
    showORnoshow(flag, case_number, onlyShow, edit) {
			this.flag = flag;
			if(edit == true) {
					this.edit = true;
			}
			if(case_number != null && case_number != "") {
				this.case_number = case_number;
				this.getList();
				if(onlyShow) {
					this.onlyShow = true;
				} else {
					this.onlyShow = false;
				}
			} else {
				this.onlyShow = true;
				return;
			}
			this.getDocter(); 
		},
		getList() {
			HospitalHandleApi.list(this.case_number).then(data => {
				if (data.error === "success") {
					this.list = [];
					
					if(data.data.docter_id != 0) {
						this.docter_id = data.data.docter_id;
					} else {
						this.docter_id = this.optionss[0].employee_id;
					}
					if(data.data.list.length > 0) {
						data.data.list.forEach(item => {
							var data = [];
							var pre = [];
							var datal = {};
							var prel = {};
							var b = {};
							var sum = 0;
							item.tream_detail.forEach(one => {
								datal = {};
								datal.shwo = false;
								var pos = {};
								if(one.position != undefined && one.position != null && one.position != "") {
									pos = JSON.parse(one.position);
								}
								datal.left = pos.left;
								datal.detail_id = one.prescription_id;
								datal.right = pos.right;
								datal.bottom = pos.bottom;
								datal.lebottom = pos.lebottom;
								datal.quantity = one.quantity;
								datal.remark = one.remark;
								datal.unit = one.unit;
								datal.unit_price = one.unit_price;
								datal.name = one.title;
								datal.all_price = accMultiply(one.quantity, one.unit_price);
								sum = accAdd(sum, datal.all_price);
								data.push(datal);
							})
							if(item.tream_detail.length == 0) {
								datal = {};
								datal.shwo = false;
								datal.detail_id = 0;
								datal.left = "";
								datal.right = "";
								datal.bottom = "";
								datal.lebottom = "";

								data.push(datal);
							}	
							item.prescription_detail.forEach(one => {
								prel = {};
								prel.detail_id = one.detail_id;
								prel.quantity = one.quantity;
								prel.remark = one.remark;
								prel.unit = one.unit;
								prel.unit_price = one.unit_price;
								prel.prescription_id = one.prescription_id;
								prel.title = one.title;
								prel.all_price = accMultiply(one.quantity, one.unit_price);
								sum = sum + prel.all_price;
								pre.push(prel);
							})

							b.create_time = new Date(item.create_time);
							b.title = item.title;
							b.docter_id = item.docker_id;
							b.detail_id = item.detail_id;
							b.data = data;
							b.pre = pre;
							b.all_price = sum;
							b.state = item.state;
							this.list.push(b);
						})
					} else {
						this.handleAddPatient();
					}
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
		getDocter() {
			PatientApi.getEmployee(1).then(res => {
        if (res.error === "success") {
          this.optionss = res.data;
        } else {
          this.$message.error(this.$t(res.error));
        }
      })
		},
    remove(index, oindex) {
      this.$confirm(
        "你确定要删除这条处置记录吗?",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
				console.log(this.list[oindex].data[index].detail_id)
				this.list[oindex].data[index].detail_id = -1 * this.list[oindex].data[index].detail_id;
				var i = 0;
				this.postData(this.list[oindex]);
				this.list[oindex].data.forEach(item => {
					if(item.detail_id < 0) {
						this.list[oindex].data.splice(i, 1);
					}
					i++;
				})
				var sum = 0;
				this.list[this.oindex].data.forEach(item => {
					if(item.quantity != undefined && item.quantity != null && item.quantity != "") {
						sum = accAdd(sum, accMultiply(item.quantity, item.unit_price));
					}
				})
				this.list[this.oindex].pre.forEach(item => {
					if(item.quantity != undefined && item.quantity != null && item.quantity != "") {
						sum = accAdd(sum, accMultiply(item.quantity, item.unit_price));
					}
				})
				this.list[this.oindex].all_price = sum;
      });
    }
  }
};
</script>


<style scoped>

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
 
input[type="number"] {
    -moz-appearance: textfield;
}
li {
  list-style: none;
}
.section {
  width: 98%;
  border-left: 10px solid #aaaaaa;
  background: #ffffff;
  margin: 10px auto;
}
.header {
  background: #ffffff;
}
.header li {
  float: left;
}
.header_left li {
  font-size: 23px;
  color: #505050;
  font-weight: bold;
  margin: 2px 10px;
  line-height: 40px;
}
.header_left li:nth-child(3) {
  padding-left: 60px !important;
}
.header_right {
  float: right;
  margin-right: 20px;
}
.header_right li {
  margin: 5px;
}

.button {
  background-color: white;
  padding-top: 10px;
}

/*空白圆圈*/
h5 {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #ffffff;
}

.center_right {
  float: left;
  padding-left: 30px;
  width: 83%;
  padding-top: 10px;
}
.center_right input:nth-child(1) {
	background: #FFFFFF;
  line-height: 20px;
  float: left;
  width: 70% !important;
  border: 0px;
  border-bottom: 1px solid #e4e4e4;
}
.last_input {
  line-height: 23px;
  display: block;
  width: 97% !important;
  border: 0px;
  border-bottom: 1px solid #e4e4e4;
}
.center_right .input {
	background: #FFFFFF;
  float: left;
  text-align: center;
  line-height: 20px;
  width: 6%;
  border: 0px;
  border-bottom: 1px solid #e4e4e4;
  margin: 0 3px;
}
.center_right img {
  float: left;
  width: 20px;
  height: 20px;
  margin: 0px 4px;
}


.chufang{
	width: 99%;
	margin: auto;
	display: flex;
	padding-bottom: 5px;
}
.chufang_left{
	text-align: center;
	font-weight: bold;
	width: 10%;
	line-height: 30px;
}
.chufang_right{
	width: 90%;
}
table {
  width: 100%;
  border-collapse: collapse;
  color: #686868;
}
table tr {
  border-bottom: 1px solid #f4f4f5;
  text-align: center;
}
table tr th{
  text-align: center;
  line-height: 30px;
}
table tr th:nth-child(1){
	width: 40% !important;
	text-align: left;
}
table tr td {
  text-align: center;
  line-height: 30px;
}
table tr td:nth-child(1){
	width: 40% !important;
	text-align: left;
}
</style>

