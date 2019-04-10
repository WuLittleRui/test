<template>
        <!-- 编辑弹出框 -->
    <el-dialog :title="title" :visible.sync="editVisible" width="800px">
        <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="主治医生" prop="employee_id">
                        <el-select v-model="form.employee_id" placeholder="请选择">
                            <el-option
                            v-for="item in options"
                            :key="item.employee_id"
                            :label="item.username"
                            :value="item.employee_id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="就诊时间" prop="create_time">
                        <el-date-picker
                        v-model="form.create_time"
                        type="datetime"
                        placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="主诉" prop="main_illness" v-if="firstFlag == true">
                <el-input v-model="form.main_illness" :maxlength="1000"></el-input>
            </el-form-item>
            <el-form-item label="复诊" prop="main_illness" v-if="firstFlag == false">
                <el-input v-model="form.main_illness" :maxlength="1000"></el-input>
            </el-form-item>
            <el-form-item label="现病史" prop="present_illness" v-if="firstFlag == true">
                <el-input v-model="form.present_illness" :maxlength="1000"></el-input>
            </el-form-item>
            <el-form-item label="既往史" prop="history" v-if="firstFlag == true">
                <el-input v-model="form.history" :maxlength="1000"></el-input>
            </el-form-item>
            <el-form-item label="过敏史" prop="allergy" v-if="firstFlag == true">
                <el-input v-model="form.allergy" :maxlength="1000"></el-input>
            </el-form-item> 
            <el-form-item label="检查">
                <el-input v-model="form.inspect" :maxlength="1000"></el-input>
            </el-form-item> 
             
            <el-form-item label="辅助检查">
                <el-input v-model="form.supplementary_examination" :maxlength="1000"></el-input>
            </el-form-item>
             
            <el-form-item label="诊断">
                <el-input v-model="form.diagnosis" :maxlength="1000"></el-input>
            </el-form-item>
             
            <el-form-item label="治疗方案">
                <el-input v-model="form.treatment_plan" :maxlength="1000"></el-input>
            </el-form-item>
             
            <el-form-item label="治疗">
                <el-input v-model="form.treatment" :maxlength="1000"></el-input>
            </el-form-item>

             <el-form-item label="医嘱">
                <el-input v-model="form.advice" :maxlength="1000"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button size="medium" @click="editVisible = false">取 消</el-button>
            <el-button size="medium" :loading="buttomLoading" type="primary" @click="submitForm('form')" >确 定</el-button>
        </span>
    </el-dialog>
    
</template>

<script>
import * as PatientApi from "../../../api/PatientApi";
import * as RegistrationApi from "../../../api/RegistrationApi";
export default {
  data() {
    return {
      options: [],
      buttomLoading: false,
      editVisible: false,
      title: "编辑",
      firstFlag: false,
      form: {
        title: "",
        create_time: "",
        case_number: null,
        docker_id: "",
        main_illness: "",
        present_illness: "",
        history: "",
        allergy: "",
        advice: "",
        inspect: "",
        supplementary_examination: "",
        diagnosis: "",
        treatment_plan: "",
        treatment: ""
      },
      options: [],
      rules: {
        docker_id: [
          { required: true, message: "请选择检查医生", trigger: "blur" }
        ],
        create_time: [
          { required: true, message: "请选择就诊时间", trigger: "blur" }
        ],
        main_illness: [
          { required: true, message: "请输入主诉", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    first() {
      this.title = "初诊";
      this.resetForm();
      this.editVisible = true;
      this.form.title = "初诊";
      this.getEmployee();
      this.firstFlag = true;
    },
    revisit(case_number) {
      this.readonly = true;
      this.title = "复诊";
      this.resetForm();
      this.editVisible = true;
      this.form.title = "复诊";
      this.getEmployee();
      this.firstFlag = false;
    },
    edit(case_number) {
      this.readonly = true;
      this.title = "编辑";
      this.resetForm();
      this.editVisible = true;
      this.getEmployee();
    },
    getEmployee() {
      PatientApi.getEmployee(1).then(res => {
        if (res.error === "success") {
          this.options = res.data;
        } else {
          this.$message.error(this.$t(res.error));
        }
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.buttomLoading = true;

          //修改
          if (this.readonly) {
            PatientApi.edit(
              this.form.case_number,
              this.form.name,
              this.form.mobile,
              this.form.sex,
              this.form.age ,
              this.form.birthday ,
              this.form.type ,
              this.form.employee_id ,
              this.form.allergy ,
              this.form.history ,
              this.form.address ,
                this.form.title
            ).then(res => {
              this.buttomLoading = false;
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
            PatientApi.add(
                this.form.case_number,
                this.form.docker_id,
                this.form.create_time,
                this.form.main_illness,
                this.form.present_illness,
                this.form.history,
                this.form.allergy,
                this.form.advice,
                this.form.inspect,
                this.form.supplementary_examination,
                this.form.diagnosis,
                this.form.treatment_plan,
                this.form.treatment,
                this.form.title
            ).then(res => {
              this.buttomLoading = false;
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
      this.form.case_number = null;
      this.form.docker_id = null;
      this.form.create_time = "";
      this.form.main_illness = "";
      this.form.present_illness = "";
      this.form.history = "";
      this.form.allergy = "";
      this.form.advice = "";
      this.form.inspect = "";
      this.form.supplementary_examination = "";
      this.form.diagnosis = "";
      this.form.treatment_plan = "";
      this.form.treatment = "";
      this.form.title = "";
    },
    getShopAdminInfo(case_number) {
      PatientApi.byId(case_number).then(res => {
        if (res.error === "success") {
            this.form.title = res.data.title;
            this.form.case_number = res.data.case_number;
            this.form.docker_id = res.data.docker_id;
            this.form.create_time = res.data.create_time;
            this.form.main_illness = res.data.main_illness;
            this.form.present_illness = res.data.present_illness;
            this.form.history = res.data.history;
            this.form.allergy = res.data.allergy;
            this.form.advice = res.data.advice;
            this.form.inspect = res.data.inspect;
            this.form.supplementary_examination = res.data.supplementary_examination;
            this.form.diagnosis = res.data.diagnosis;
            this.form.treatment_plan = res.data.treatment_plan;
            this.form.treatment = res.data.treatment;
        } else {
          this.$message.error(this.$t(res.error));
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
        
