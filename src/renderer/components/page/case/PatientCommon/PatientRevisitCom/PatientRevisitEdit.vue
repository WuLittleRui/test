<template>
        <!-- 编辑弹出框 -->
    <el-dialog :title="title" :visible.sync="editVisible" width="1200px">
        
        <div class="container">
          <el-row :gutter="20">
            <el-col :span="17">
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
            
            <el-col :span="6">
              <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                <el-form-item label="回访时间" prop="return_time">
                    <el-date-picker
                          v-model="form.return_time"
                          type="datetime"
                          value-format="yyyy-MM-dd hh:mm:ss"
                          placeholder="选择日期时间">
                        </el-date-picker>
                </el-form-item>
                <el-form-item label="回访人员" prop="return_people">
                    <el-select v-model="form.return_people" placeholder="请选择">
                    <el-option
                      v-for="item in optionss"
                      :key="item.employee_id"
                      :label="item.username"
                      :value="item.employee_id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="主治医生">
                  <el-select v-model="form.employee_id" placeholder="请选择">
                    <el-option
                      v-for="item in optionss"
                      :key="item.employee_id"
                      :label="item.username"
                      :value="item.employee_id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="回访状态" prop="state">
                    <el-radio v-model="form.state" :label="1">已回访</el-radio>
                    <el-radio v-model="form.state" :label="2">做计划</el-radio>
                    <el-radio v-model="form.state" :label="3">待跟进</el-radio>
                </el-form-item>
                <el-form-item label="回访内容">
                    <el-input v-model="form.content"></el-input>
                </el-form-item>
                <el-form-item label="回访结果">
                    <el-input v-model="form.result"></el-input>
                </el-form-item>
            </el-form>
          </el-col>
          </el-row>
        </div>

        
        <span slot="footer" class="dialog-footer">
            <el-button size="medium" @click="editVisible = false">取 消</el-button>
            <el-button size="medium" type="primary" @click="submitForm('form')" >确 定</el-button>
        </span>
    </el-dialog>
    
</template>

<script>
import PatientDetailEdit from "../PatientDetailEdit";
import PatientCashier from "../PatientCashier";
import PatientDetail from "../PatientDetail";
import PatientList from "../PatientList";
import PatientTeeth from "../PatientTeeth";
import PatientCase from "../PatientCaseCom/PatientCase";
import PatientRevisit from "./PatientRevisitRe";

import * as ShopAdminApi from "@/api/HospitalHandleApi";
import * as PatientApi from "@/api/PatientApi";
import { parseTime } from "@/utils/formater";
export default {
  components: { PatientRevisit, PatientList, PatientTeeth, PatientDetail, PatientCashier, PatientDetailEdit, PatientCase },
  data() {
    return {
      editVisible: false,
      title: "编辑",
      optionss: [],
      patientActiveIndex: "1",
      form: {
        return_time: null,
        return_people: "",
        case_number: null,
        employee_id: "",
        state: 1,
        content: "",
        result: "",
        return_id: null
      },
      rules: {
        return_time: [
          { required: true, message: "请选择回访时间", trigger: "blur" }
        ],
        return_people: [
          { required: true, message: "请选择回访人员", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
  },
  methods: {
		  getDocter() {
			  PatientApi.getEmployee(1).then(res => {
          if (res.error === "success") {
            this.optionss = res.data;
          } else {
            this.$message.error(this.$t(res.error));
          }
        })
      },
      getNurse() {
			  PatientApi.getEmployee(2).then(res => {
          if (res.error === "success") {
            res.data.forEach(item => {
              this.optionss.push(item);
            })
          } else {
            this.$message.error(this.$t(res.error));
          }
        })
      },
      showNew(case_number) {
      this.title = "新增";
      this.resetForm();
      this.editVisible = true;
      this.getDocter();
      this.getNurse();
      this.$nextTick(() => {
        this.form.case_number = case_number;
        this.patientNavSelect("1");
      })
    },
    async showEdit(case_number, adminId) {
      this.title = "编辑";
      this.resetForm();
      this.editVisible = true;
      this.getDocter();
      this.$nextTick(() => {
        this.form.case_number = case_number;
        this.patientNavSelect("1");
      })
      await this.getShopAdminInfo(adminId);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //修改
          if (this.form.return_id) {
            ShopAdminApi.editRevisit(
              this.form.return_id,
              parseTime(this.form.return_time),
              this.form.return_people,
              this.form.employee_id,
              this.form.state,
              this.form.content,
              this.form.result
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
            ShopAdminApi.addRevisit(
              this.form.case_number,
              parseTime(this.form.return_time),
              this.form.return_people,
              this.form.employee_id,
              this.form.state,
              this.form.content,
              this.form.result
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
      this.form.return_time = null;
      this.form.return_people = "";
      this.form.case_number = "";
      this.form.employee_id = null;
      this.form.state = null;
      this.form.content = null;
      this.form.result = null;
      this.form.return_id = null;
    },
    getShopAdminInfo(adminId) {
      ShopAdminApi.queryOneRevisit(adminId).then(res => {
        if (res.error === "success") {
          this.form.case_number = adminId;
          this.form.return_time = new Date(res.data.return_time);
          this.form.return_people = res.data.return_people;
          this.form.employee_id = res.data.employee_id;
          this.form.state = res.data.state;
          this.form.content = res.data.content;
          this.form.result = res.data.result;
          this.form.return_id = res.data.return_id;

        } else {
          this.$message.error(this.$t(res.error));
        }
      });
    },
    
    showPatientList() {
      case_number = this.form.case_number;
      console.log(this.$refs)
      this.$refs["PatientList"].getActiveIndex(1);
      this.$refs["PatientDetail"].showORnoshow(true, case_number, true);
      this.$refs["PatientTeeth"].showORnoshow(false, true);
      this.$refs["PatientCashier"].showORnoshow(false, null, true); 
      this.$refs["PatientCase"].showORnoshow(false, null, true);
      this.$refs["PatientRevisit"].showORnoshow(false, null, true);
    },
    patientNavSelect(key) {
      this.patientActive = key;
      console.log(this.$refs)
      if(key == "1") {
        this.$refs["PatientDetail"].showORnoshow(true, this.form.case_number, true);
        this.$refs["PatientTeeth"].showORnoshow(false, this.form.case_number, true);
        this.$refs["PatientCashier"].showORnoshow(false, this.form.case_number, true);
        this.$refs["PatientCase"].showORnoshow(false, this.form.case_number, true);
        this.$refs["PatientRevisit"].showORnoshow(false, this.case_number, true);
      }
      if(key == "2") {
        this.$refs["PatientDetail"].showORnoshow(false, this.form.case_number, true);
        this.$refs["PatientTeeth"].showORnoshow(true, this.form.case_number, true);
        this.$refs["PatientCashier"].showORnoshow(false, this.form.case_number, true);
        this.$refs["PatientCase"].showORnoshow(false, this.form.case_number, true);
        this.$refs["PatientRevisit"].showORnoshow(false, this.case_number, true);
      }
      if(key == "3") {
        this.$refs["PatientDetail"].showORnoshow(false, this.form.case_number, true);
        this.$refs["PatientTeeth"].showORnoshow(false, this.form.case_number, true);
        this.$refs["PatientCashier"].showORnoshow(true, this.form.case_number, true);
        this.$refs["PatientCase"].showORnoshow(false, this.form.case_number, true);
        this.$refs["PatientRevisit"].showORnoshow(false, this.case_number, true);
      }
      if(key == "4") {
        this.$refs["PatientDetail"].showORnoshow(false, this.form.case_number, true);
        this.$refs["PatientTeeth"].showORnoshow(false, this.form.case_number, true);
        this.$refs["PatientCashier"].showORnoshow(false, this.form.case_number, true);
        this.$refs["PatientCase"].showORnoshow(true, this.form.case_number, true);
        this.$refs["PatientRevisit"].showORnoshow(false, this.case_number, true);
      }
      if(key == "5") {
        this.$refs["PatientDetail"].showORnoshow(false, this.form.case_number, true);
        this.$refs["PatientTeeth"].showORnoshow(false, this.form.case_number, true);
        this.$refs["PatientCashier"].showORnoshow(false, this.form.case_number, true);
        this.$refs["PatientCase"].showORnoshow(false, this.form.case_number, true);
        this.$refs["PatientRevisit"].showORnoshow(true, this.case_number, true);
      }
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
        
