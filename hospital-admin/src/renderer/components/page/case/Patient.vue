 <!-- 管理员 -->
<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i>病患处理
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container" style="min-width: 1580px;">
      <el-row :gutter="20">
        <el-col style="width: 20%; min-width: 350px;">
          <div class="grid-content bg-purple1">
            <el-menu background-color="#d3dce6" :default-active="activeIndex" class="sidebar-el-menu" mode="horizontal" @select="navSelect">
              <el-menu-item index="1" style="width: 50%; text-align: center;">当天工作</el-menu-item>
              <el-menu-item index="2" style="width: 50%; text-align: center;">全部患者</el-menu-item>
            </el-menu>
            <div class="patient">
              <PatientList ref="PatientList" @refresh="patientListCallBack"/>
            </div>
            <div class="button">
              <el-button size="medium" type="primary" @click="handleAddPatient">新增患者</el-button>
              <el-button size="medium" type="success" @click="handleOrder">复诊预约</el-button>
            </div>
          </div>
        </el-col>
        <el-col style="width: 78%;">
          <div class="grid-content bg-purple">
            <el-menu background-color="#d3dce6" :default-active="patientActiveIndex" class="sidebar-el-menu" mode="horizontal" @select="patientNavSelect">
              <el-menu-item index="1" style="width: 20%; text-align: center;">患者信息</el-menu-item>
              <el-menu-item index="2" style="width: 20%; text-align: center;">处置记录</el-menu-item>
              <el-menu-item index="3" style="width: 20%; text-align: center;">收费信息</el-menu-item>
              <el-menu-item index="4" style="width: 20%; text-align: center;">病历信息</el-menu-item>
              <el-menu-item index="5" style="width: 20%; text-align: center;">回访信息</el-menu-item>
            </el-menu>
            <PatientDetail ref="PatientDetail" />
            <PatientTeeth ref="PatientTeeth" />
            <PatientCashier ref="PatientCashier" />
            <PatientRevisit ref="PatientRevisit" />
            <PatientCase ref="PatientCase" />

            <PatientDetailEdit ref="PatientDetailEdit" @refresh="showPatientList" />

            <Order ref="Order" />
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import PatientDetailEdit from "./PatientCommon/PatientDetailEdit";
import PatientCashier from "./PatientCommon/PatientCashier";
import PatientDetail from "./PatientCommon/PatientDetail";
import PatientList from "./PatientCommon/PatientList";
import PatientTeeth from "./PatientCommon/PatientTeeth";
import PatientRevisit from "./PatientCommon/PatientRevisitCom/PatientRevisit";
import PatientCase from "./PatientCommon/PatientCaseCom/PatientCase";
import Order from "./Order";
export default {
  name: "Patient",
  components: { PatientList, PatientTeeth, PatientDetail, PatientCashier, PatientDetailEdit, PatientRevisit, PatientCase, Order },
  data() {
    return {
      key: 12,
      activeIndex: "1",
      case_number: "",
      patientActiveIndex: "1",
      patientActive: "1"
    };
  },
  async mounted() {
    this.showPatientList(null, true);
  },
  methods: {
    handleOrder() {
      this.$refs["Order"].showAdd(this.case_number);
    },
    showPatientList(case_number, flag) {
      this.case_number = case_number;
      this.$refs["PatientList"].getActiveIndex(1, flag);
      this.$refs["PatientDetail"].showORnoshow(true, case_number, false);
      this.$refs["PatientTeeth"].showORnoshow(false, case_number, false);
      this.$refs["PatientCashier"].showORnoshow(false, case_number, false);
      this.$refs["PatientRevisit"].showORnoshow(false, case_number, false);
      this.$refs["PatientCase"].showORnoshow(false, case_number, false);
    },
    handleAddPatient() {
      this.$refs["PatientDetailEdit"].showNew();
    },
    patientListCallBack(case_number, index) {
      this.case_number = case_number; 
      this.activeIndex = index + "";
      this.patientNavSelect("1");
    },
    patientNavSelect(key) {
      this.patientActive = key;
      if(key == "1") {
        this.$refs["PatientDetail"].showORnoshow(true, this.case_number, false);
        this.$refs["PatientTeeth"].showORnoshow(false, this.case_number, false);
        this.$refs["PatientCashier"].showORnoshow(false, this.case_number, false);
        this.$refs["PatientRevisit"].showORnoshow(false, this.case_number, false);
        this.$refs["PatientCase"].showORnoshow(false, this.case_number, false);
      }
      if(key == "2") {
        this.$refs["PatientDetail"].showORnoshow(false, this.case_number, false);
        this.$refs["PatientTeeth"].showORnoshow(true, this.case_number, false);
        this.$refs["PatientCashier"].showORnoshow(false, this.case_number, false);
        this.$refs["PatientRevisit"].showORnoshow(false, this.case_number, false);
        this.$refs["PatientCase"].showORnoshow(false, this.case_number, false);
      }
      if(key == "3") {
        this.$refs["PatientDetail"].showORnoshow(false, this.case_number, false);
        this.$refs["PatientTeeth"].showORnoshow(false, this.case_number, false);
        this.$refs["PatientCashier"].showORnoshow(true, this.case_number, false);
        this.$refs["PatientRevisit"].showORnoshow(false, this.case_number, false);
        this.$refs["PatientCase"].showORnoshow(false, this.case_number, false);
      }
      if(key == "4") {
        this.$refs["PatientDetail"].showORnoshow(false, this.case_number, false);
        this.$refs["PatientTeeth"].showORnoshow(false, this.case_number, false);
        this.$refs["PatientCashier"].showORnoshow(false, this.case_number, false);
        this.$refs["PatientRevisit"].showORnoshow(false, this.case_number, false);
        this.$refs["PatientCase"].showORnoshow(true, this.case_number, false);
      }
      if(key == "5") {
        this.$refs["PatientDetail"].showORnoshow(false, this.case_number, false);
        this.$refs["PatientTeeth"].showORnoshow(false, this.case_number, false);
        this.$refs["PatientCashier"].showORnoshow(false, this.case_number, false);
        this.$refs["PatientRevisit"].showORnoshow(true, this.case_number, false);
        this.$refs["PatientCase"].showORnoshow(false, this.case_number, false);
      }
    },
    navSelect(key, keyPath) {
      if(key == "1") {
        this.$refs["PatientList"].getActiveIndex(1, false);
      } else if(key == "2") {
        this.$refs["PatientList"].getActiveIndex(2, false);
      }
    }
  }
};
</script>
<style scoped>
.bg-purple {
  background: #F1F3F7;
}
.grid-content {
  border-radius: 4px;
}
.button {
  background-color: white;
  text-align: center;
  padding-top: 10px;
  padding-bottom: -100px;
}
</style>
