<template>
        <!-- 编辑弹出框 -->
    <el-dialog :title="title" :visible.sync="editVisible" width="1200px">
      <div class="container">
          <el-row :gutter="20"> 
            <el-col :span="13">
              <div class="grid-content bg-purple">
                <el-menu background-color="#d3dce6" :default-active="patientActiveIndex" class="sidebar-el-menu" mode="horizontal" @select="patientNavSelect">
                  <el-menu-item index="1" style="width: 20%; text-align: center;">患者信息</el-menu-item>
                  <el-menu-item index="2" style="width: 20%; text-align: center;">处置记录</el-menu-item>
                  <el-menu-item index="3" style="width: 20%; text-align: center;">收费信息</el-menu-item>
                  <el-menu-item index="4" style="width: 20%; text-align: center;">病历信息</el-menu-item>
                  <el-menu-item index="5" style="width: 20%; text-align: center;">回访信息</el-menu-item>
                </el-menu> 
                <PatientDetail ref="PatientDetail" />
                <PatientTeeth ref="PatientTeeth" class="patientTeeth"/>
                <PatientCashier ref="PatientCashier" />
                <PatientCase ref="PatientCase" />
                <PatientRevisit ref="PatientRevisit" />

                <PatientDetailEdit ref="PatientDetailEdit" @refresh="showPatientList" />
              </div>
            </el-col>
            
            <el-col :span="11">
        <div style="height: 520px;">
			<el-scrollbar style="height: 100%;">
              <el-form ref="form" :model="form" :rules="rules" label-width="100px"> 
                <el-form-item label="主治医生" prop="docter_id">
                    <el-select v-model="form.docter_id" placeholder="请选择">
                        <el-option
                        v-for="item in optionss"
                        :key="item.employee_id"
                        :label="item.username"
                        :value="item.employee_id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="就诊时间" prop="treat_time">
                    <el-date-picker
                        style="width: 200px;"
                        v-model="form.treat_time"
                        type="datetime"
                        value-format="yyyy-MM-dd hh:mm:ss"
                        placeholder="选择日期时间">
                        </el-date-picker>
                </el-form-item>
                <el-form-item label="主诉" v-if="type == 1" prop="main_illness">
                    <el-input type="textarea" autosize v-model="form.main_illness" :maxlength="1000" style="width: 80%;"></el-input>
                </el-form-item>
                <el-form-item label="复诊" v-if="type == 2">
                    <el-input type="textarea" autosize v-model="form.main_illness" :maxlength="1000" style="width: 80%;"></el-input>
                </el-form-item>
                <el-form-item label="现病史" v-if="type == 1">
                    <el-input type="textarea" autosize v-model="form.present_illness" :maxlength="1000" style="width: 80%;"></el-input>
                </el-form-item>
                <el-form-item label="既往史" v-if="type == 1">
                    <el-input type="textarea" autosize v-model="form.history" :maxlength="1000" style="width: 80%;"></el-input>
                </el-form-item>
                <el-form-item label="过敏史" v-if="type == 1">
                    <el-input type="textarea" autosize v-model="form.allergy" :maxlength="1000" style="width: 80%;"></el-input>
                </el-form-item>
                <el-row :gutter="20" v-for="(item, index) in inspect">
                    <el-col :span="6">
                      <el-form-item label="检查">
                            <PatientTeethPosition style="height: 20px;" :ref="'PatientTeethPositioninspect' + index" :object="item" :oindex="'inspect'" :index="index"  @open="openChange" @close="closeChange" @value="positionValueChange"/>
                      </el-form-item>
                    </el-col>
                    <el-col :span="16">
                      <el-form-item>
                            <el-input :rows="3" type="textarea" v-model="item.remark" :maxlength="1000" style="width: 80%;"></el-input>
                            <el-button v-if="index == 0" type="primary" icon="el-icon-plus" circle @click="handleAdd('inspect')"></el-button>
                            <el-button v-if="index > 0" type="primary" icon="el-icon-delete" circle @click="handleDelete('inspect')"></el-button>
                      </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20" v-for="(item, index) in sup">
                    <el-col :span="6">
                      <el-form-item label="辅助检查">
                            <PatientTeethPosition style="height: 20px;" :ref="'PatientTeethPositionsup' + index" :object="item" :oindex="'sup'" :index="index"  @open="openChange" @close="closeChange" @value="positionValueChange"/>
                      </el-form-item>
                    </el-col>
                    <el-col :span="16">
                      <el-form-item>
                            <el-input :rows="3" type="textarea" v-model="item.remark" :maxlength="1000" style="width: 80%;"></el-input>
                            <el-button v-if="index == 0" type="primary" icon="el-icon-plus" circle @click="handleAdd('sup')"></el-button>
                            <el-button v-if="index > 0" type="primary" icon="el-icon-delete" circle @click="handleDelete('sup')"></el-button>
                      </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20" v-for="(item, index) in dia">
                    <el-col :span="6">
                      <el-form-item label="诊断">
                            <PatientTeethPosition style="height: 20px;" :ref="'PatientTeethPositiondia' + index" :object="item" :oindex="'dia'" :index="index"  @open="openChange" @close="closeChange" @value="positionValueChange"/>
                      </el-form-item>
                    </el-col>
                    <el-col :span="16">
                      <el-form-item>
                            <el-input :rows="3" type="textarea" v-model="item.remark" :maxlength="1000" style="width: 80%;"></el-input>
                            <el-button v-if="index == 0" type="primary" icon="el-icon-plus" circle @click="handleAdd('dia')"></el-button>
                            <el-button v-if="index > 0" type="primary" icon="el-icon-delete" circle @click="handleDelete('dia')"></el-button>
                      </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20" v-for="(item, index) in trea_plan">
                    <el-col :span="6">
                      <el-form-item label="治疗方案">
                            <PatientTeethPosition style="height: 20px;" :ref="'PatientTeethPositiontrea_plan' + index" :object="item" :oindex="'trea_plan'" :index="index"  @open="openChange" @close="closeChange" @value="positionValueChange"/>
                      </el-form-item>
                    </el-col>
                    <el-col :span="16">
                      <el-form-item>
                            <el-input :rows="3" type="textarea" v-model="item.remark" :maxlength="1000" style="width: 80%;"></el-input>
                            <el-button v-if="index == 0" type="primary" icon="el-icon-plus" circle @click="handleAdd('trea_plan')"></el-button>
                            <el-button v-if="index > 0" type="primary" icon="el-icon-delete" circle @click="handleDelete('trea_plan')"></el-button>
                      </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20" v-for="(item, index) in trea">
                    <el-col :span="6">
                      <el-form-item label="治疗">
                            <PatientTeethPosition style="height: 20px;" :ref="'PatientTeethPositiontrea' + index" :object="item" :oindex="'trea'" :index="index"  @open="openChange" @close="closeChange" @value="positionValueChange"/>
                      </el-form-item>
                    </el-col>
                    <el-col :span="16">
                      <el-form-item>
                            <el-input :rows="3" type="textarea" v-model="item.remark" :maxlength="1000" style="width: 80%;"></el-input>
                            <el-button v-if="index == 0" type="primary" icon="el-icon-plus" circle @click="handleAdd('trea')"></el-button>
                            <el-button v-if="index > 0" type="primary" icon="el-icon-minus" circle @click="handleDelete('trea')"></el-button>
                      </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="医嘱">
                    <el-input type="textarea" autosize v-model="form.advice" :maxlength="1000" style="width: 80%;"></el-input>
                </el-form-item>
            </el-form>
			</el-scrollbar>
        </div>

        </el-col>
          </el-row>
        </div>

        <span slot="footer" class="dialog-footer">
            <el-button size="medium" @click="editVisible = false">取 消</el-button>
            <el-button size="medium" type="primary" @click="submitForm('form')" >确 定</el-button>
        </span>
        
        </div>
    </el-dialog>
     
</template>

<script>
import PatientDetailEdit from "../PatientDetailEdit";
import PatientCashier from "../PatientCashier";
import PatientDetail from "../PatientDetail";
import PatientList from "../PatientList";
import PatientTeeth from "../PatientTeeth";
import PatientCase from "./PatientCaseRe";
import PatientTeethPosition from "../PatientTeethPosition";
import PatientRevisit from "../PatientRevisitCom/PatientRevisitRe";

import * as ShopAdminApi from "@/api/HospitalHandleApi";
import * as PatientApi from "@/api/PatientApi";
import { parseTime } from "@/utils/formater";
export default {
  components: { PatientRevisit, PatientTeethPosition, PatientList, PatientTeeth, PatientDetail, PatientCashier, PatientDetailEdit, PatientCase },
  data() {
    return {
      type: 1,
      editVisible: false,
      title: "编辑",
      optionss: [],
      patientActiveIndex: "1",
      inspect: [{"position": {"left": '', 'bottom': "", 'lebottom': "", 'right': "", show: false}, "remark": ""}],
      sup: [{"position": {"left": '', 'bottom': "", 'lebottom': "", 'right': "", show: false}, "remark": ""}],
      dia: [{"position": {"left": '', 'bottom': "", 'lebottom': "", 'right': "", show: false}, "remark": ""}],
      trea_plan: [{"position": {"left": '', 'bottom': "", 'lebottom': "", 'right': "", show: false}, "remark": ""}],
      trea: [{"position": {"left": '', 'bottom': "", 'lebottom': "", 'right': "", show: false}, "remark": ""}],
      form: {
        handle_id: null,
        docter_id: null,
        main_illness: "",
        case_number: null,
        present_illness: "",
        history: 1,
        allergy: "",
        treat_time: "",
        advice: "",
        title: ""
      },
      rules: {
        main_illness: [
          { required: true, message: "请输入主诉", trigger: "blur" }
        ],
        docter_id: [
          { required: true, message: "请选择主治医生", trigger: "blur" }
        ],
        treat_time: [
          { required: true, message: "请选择就诊时间", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
  },
  methods: {
    handleAdd(title) {
      if("inspect" == title) {
        var a = {"position": {"left": '', 'bottom': "", 'lebottom': "", 'right': "", show: false}, "remark": ""};
        this.inspect.push(a);
      }
      if("sup" == title) {
        var a = {"position": {"left": '', 'bottom': "", 'lebottom': "", 'right': "", show: false}, "remark": ""};
        this.sup.push(a);
      }
      if("dia" == title) {
        var a = {"position": {"left": '', 'bottom': "", 'lebottom': "", 'right': "", show: false}, "remark": ""};
        this.dia.push(a);
      }
      if("trea_plan" == title) {
        var a = {"position": {"left": '', 'bottom': "", 'lebottom': "", 'right': "", show: false}, "remark": ""};
        this.trea_plan.push(a);
      }
      if("trea" == title) {
        var a = {"position": {"left": '', 'bottom': "", 'lebottom': "", 'right': "", show: false}, "remark": ""};
        this.trea.push(a);
      }
    },
    handleDelete(title) {
      if("inspect" == title) {
        this.inspect.splice(this.inspect.length - 1, 1);
      }
      if("sup" == title) {
        this.sup.splice(this.sup.length - 1, 1);
      }
      if("dia" == title) {
        this.dia.splice(this.dia.length - 1, 1);
      }
      if("trea_plan" == title) {
        this.trea_plan.splice(this.trea_plan.length - 1, 1);
      }
      if("trea" == title) {
        this.trea.splice(this.trea.length - 1, 1);
      }
    },
    openChange(index, title) {
      if("inspect" == title) {
        this.inspect[index].position.show = true;
        this.$refs[("PatientTeethPosition" + title + index)][0].editItem(this.inspect[index].position);
      }
      if("sup" == title) {
        this.sup[index].position.show = true;
        this.$refs[("PatientTeethPosition" + title + index)][0].editItem(this.sup[index].position);
      }
      if("dia" == title) {
        this.dia[index].position.show = true;
        this.$refs[("PatientTeethPosition" + title + index)][0].editItem(this.dia[index].position);
      }
      if("trea_plan" == title) {
        this.trea_plan[index].position.show = true;
        this.$refs[("PatientTeethPosition" + title + index)][0].editItem(this.trea_plan[index].position);
      }
      if("trea" == title) {
        this.trea[index].position.show = true;
        this.$refs[("PatientTeethPosition" + title + index)][0].editItem(this.trea[index].position);
      }
    },
    closeChange(index, title) {
      if("inspect" == title) {
        this.inspect[index].position.show = false;
        this.$refs[("PatientTeethPosition" + title + index)][0].editItem(this.inspect[index].position);
      }
      if("sup" == title) {
        this.sup[index].position.show = false;
        this.$refs[("PatientTeethPosition" + title + index)][0].editItem(this.sup[index].position);
      }
      if("dia" == title) {
        this.dia[index].position.show = false;
        this.$refs[("PatientTeethPosition" + title + index)][0].editItem(this.dia[index].position);
      }
      if("trea_plan" == title) {
        this.trea_plan[index].position.show = false;
        this.$refs[("PatientTeethPosition" + title + index)][0].editItem(this.trea_plan[index].position);
      }
      if("trea" == title) {
        this.trea[index].position.show = false;
        this.$refs[("PatientTeethPosition" + title + index)][0].editItem(this.trea[index].position);
      }
    },
    positionValueChange(index, item, title) {
      if("inspect" == title) {
        this.inspect[index].position.left = item.left;
        this.inspect[index].position.bottom = item.bottom;
        this.inspect[index].position.lebottom = item.lebottom;
        this.inspect[index].position.right = item.right;
      }
      if("sup" == title) {
        this.sup[index].position.left = item.left;
        this.sup[index].position.bottom = item.bottom;
        this.sup[index].position.lebottom = item.lebottom;
        this.sup[index].position.right = item.right;
      }
      if("dia" == title) {
        this.dia[index].position.left = item.left;
        this.dia[index].position.bottom = item.bottom;
        this.dia[index].position.lebottom = item.lebottom;
        this.dia[index].position.right = item.right;
      }
      if("trea_plan" == title) {
        this.trea_plan[index].position.left = item.left;
        this.trea_plan[index].position.bottom = item.bottom;
        this.trea_plan[index].position.lebottom = item.lebottom;
        this.trea_plan[index].position.right = item.right;
      }
      if("trea" == title) {
        this.trea[index].position.left = item.left;
        this.trea[index].position.bottom = item.bottom;
        this.trea[index].position.lebottom = item.lebottom;
        this.trea[index].position.right = item.right;
      }
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
    showNew(case_number, type) {
      this.type = type;
      if(type == 1) {
        this.form.title = '初诊'
      } else {
        this.form.title = '复诊'
      }
      this.title = "新增";
      this.resetForm();
      this.editVisible = true;
      this.getDocter();
      this.$nextTick(() => {
        this.form.case_number = case_number;
        this.patientNavSelect("1");
      })
    },
    async showEdit(case_number, handle_id) {
      this.title = "编辑";
      this.resetForm();
      this.editVisible = true;
      this.getDocter();
      this.$nextTick(() => {
        this.form.case_number = case_number;
        this.patientNavSelect("1");
      })
      await this.getShopAdminInfo(handle_id);
    },
    showPatientList() {
      case_number = this.form.case_number;
      this.$refs["PatientList"].getActiveIndex(1);
      this.$refs["PatientDetail"].showORnoshow(true, case_number, true, true);
      this.$refs["PatientTeeth"].showORnoshow(false, true);
      this.$refs["PatientCashier"].showORnoshow(false, null, true); 
      this.$refs["PatientCase"].showORnoshow(false, null, true, true);
    },
    patientNavSelect(key) {
      this.patientActive = key;
      if(key == "1") {
        this.$refs["PatientDetail"].showORnoshow(true, this.form.case_number, true, true);
        this.$refs["PatientTeeth"].showORnoshow(false, this.form.case_number, true, true);
        this.$refs["PatientCashier"].showORnoshow(false, this.form.case_number, true, true);
        this.$refs["PatientCase"].showORnoshow(false, this.form.case_number, true, true);
        this.$refs["PatientRevisit"].showORnoshow(false, this.case_number, true, true);
      }
      if(key == "2") {
        this.$refs["PatientDetail"].showORnoshow(false, this.form.case_number, true, true);
        this.$refs["PatientTeeth"].showORnoshow(true, this.form.case_number, true, true);
        this.$refs["PatientCashier"].showORnoshow(false, this.form.case_number, true, true);
        this.$refs["PatientCase"].showORnoshow(false, this.form.case_number, true, true);
        this.$refs["PatientRevisit"].showORnoshow(false, this.case_number, true, true);
      }
      if(key == "3") {
        this.$refs["PatientDetail"].showORnoshow(false, this.form.case_number, true, true);
        this.$refs["PatientTeeth"].showORnoshow(false, this.form.case_number, true, true);
        this.$refs["PatientCashier"].showORnoshow(true, this.form.case_number, true, true);
        this.$refs["PatientCase"].showORnoshow(false, this.form.case_number, true, true);
        this.$refs["PatientRevisit"].showORnoshow(false, this.case_number, true, true);
      }
      if(key == "4") {
        this.$refs["PatientDetail"].showORnoshow(false, this.form.case_number, true, true);
        this.$refs["PatientTeeth"].showORnoshow(false, this.form.case_number, true, true);
        this.$refs["PatientCashier"].showORnoshow(false, this.form.case_number, true, true);
        this.$refs["PatientCase"].showORnoshow(true, this.form.case_number, true, true);
        this.$refs["PatientRevisit"].showORnoshow(false, this.case_number, true, true);
      }
      if(key == "5") {
        this.$refs["PatientDetail"].showORnoshow(false, this.form.case_number, true, true);
        this.$refs["PatientTeeth"].showORnoshow(false, this.form.case_number, true, true);
        this.$refs["PatientCashier"].showORnoshow(false, this.form.case_number, true, true);
        this.$refs["PatientCase"].showORnoshow(false, this.form.case_number, true, true);
        this.$refs["PatientRevisit"].showORnoshow(true, this.case_number, true, true);
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //修改
            var i = []
            if(this.inspect.length == 1 && this.inspect[0].position.left == "" && this.inspect[0].position.bottom == "" && this.inspect[0].position.lebottom == "" && this.inspect[0].position.right == "" && this.inspect[0].remark == "") {
              i = [];
            } else {
              i = this.inspect;
            }
            var p = [];
            if(this.sup.length ==1 && this.sup[0].position.left == "" && this.sup[0].position.bottom == "" && this.sup[0].position.lebottom == "" && this.sup[0].position.right == "" && this.sup[0].remark == "") {
              p = [];
            } else {
              p = this.sup
            }
            var z = [];
            if(this.dia.length == 1 && this.dia[0].position.left == "" && this.dia[0].position.bottom == "" && this.dia[0].position.lebottom == "" && this.dia[0].position.right == "" && this.dia[0].remark == "") {
              z = [];
            } else {
              z = this.dia;
            }
            var x = [];
            if(this.trea_plan.length == 1 && this.trea_plan[0].position.left == "" && this.trea_plan[0].position.bottom == "" && this.trea_plan[0].position.lebottom == "" && this.trea_plan[0].position.right == "" && this.trea_plan[0].remark == "") {
              x = [];
            } else {
              x = this.trea_plan;
            }
            var y = [];
            if(this.trea.length == 1&& this.trea[0].position.left == "" && this.trea[0].position.bottom == "" && this.trea[0].position.lebottom == "" && this.trea[0].position.right == "" && this.trea[0].remark == "") {
              y = [];
            } else {
              y = this.trea;
            }
          if (this.form.handle_id) {
            ShopAdminApi.editcase(
              this.form.handle_id,
              JSON.stringify(this.form),
              JSON.stringify(i),
              JSON.stringify(p),
              JSON.stringify(z),
              JSON.stringify(x),
              JSON.stringify(y),
            ).then(res => {
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
            ShopAdminApi.addcase(
              this.form.case_number,
              JSON.stringify(this.form),
              JSON.stringify(i),
              JSON.stringify(p),
              JSON.stringify(z),
              JSON.stringify(x),
              JSON.stringify(y),
            ).then(res => {
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
      this.form.employee_id = null;
      this.form.handle_id = null;
      this.form.main_illness = "";
      this.form.case_number = null;
      this.form.present_illness = null;
      this.form.history = null;
      this.form.allergy = null;
      this.form.advice = null;

      this.inspect = [{"position": {"left": '', 'bottom': "", 'lebottom': "", 'right': "", show: false}, "remark": ""}];
      this.sup = [{"position": {"left": '', 'bottom': "", 'lebottom': "", 'right': "", show: false}, "remark": ""}];
      this.dia = [{"position": {"left": '', 'bottom': "", 'lebottom': "", 'right': "", show: false}, "remark": ""}];
      this.trea_plan = [{"position": {"left": '', 'bottom': "", 'lebottom': "", 'right': "", show: false}, "remark": ""}];
      this.trea = [{"position": {"left": '', 'bottom': "", 'lebottom': "", 'right': "", show: false}, "remark": ""}];
    },
    getShopAdminInfo(adminId) {
      ShopAdminApi.queryOnecase(adminId).then(data => {
        if (data.error === "success") {
								data.data.dia.forEach(item => {
                  item.position = JSON.parse(item.position);
                  this.dia.push(item);
								});
								data.data.inspect.forEach(item => {
									item.position = JSON.parse(item.position);
                  this.inspect.push(item);
								});
								data.data.supp.forEach(item => {
									item.position = JSON.parse(item.position);
                  this.sup.push(item);
								});
								data.data.trea.forEach(item => {
									item.position = JSON.parse(item.position);
                  this.trea.push(item);
								});
								data.data.trea_plan.forEach(item => {
									item.position = JSON.parse(item.position);
                  this.trea_plan.push(item);
								});
              this.form.handle_id = data.data.handle_id;
              this.form.docter_id = data.data.docker_id;
              this.form.main_illness = data.data.main_illness;
              this.form.case_number = data.data.ref_case_number;
              this.form.present_illness = data.data.present_illness;
              this.form.history = data.data.history;
              this.form.allergy = data.data.allergy;
              this.form.treat_time = parseTime(data.data.treat_time);
              this.form.advice = data.data.advice;
              this.form.title = data.data.title;
        } else {
          this.$message.error(this.$t(data.error));
        }
      });
    }
  }
};
</script>

<style>
.bg-purple {
  background: #F1F3F7;
}
.grid-content {
  border-radius: 4px;
}
.patientTeeth {
  height: 520px !important;
}
</style>
        
