<template>
        <!-- 编辑弹出框 -->
    <el-dialog :title="title" :visible.sync="editVisible" width="850px">
        <el-form ref="form" :model="form" :rules="rules" label-width="100px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="病历号" prop="case_number">
                  <el-input v-model="form.case_number" :readonly="readonly"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="手机号" prop="mobile">
                  <el-input v-model="form.mobile"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="性别">
                <el-radio-group v-model="form.sex" size="small">
                  <el-radio :label="0" border>男</el-radio>
                  <el-radio :label="1" border>女</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="年龄">
                  <el-input v-model="form.age"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="生日">
                <el-date-picker
                  style="width: 150px;"
                  v-model="form.birthday"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="9">
              <el-form-item label="类别" prop="type">
                <el-radio-group v-model="form.type" size="small">
                  <el-radio :label="0" border>初诊</el-radio>
                  <el-radio :label="1" border>复诊</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
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
          </el-row>
           
          <el-form-item label="过敏史">
              <el-input v-model="form.allergy"></el-input>
          </el-form-item>
          <el-form-item label="既往史">
              <el-input v-model="form.history"></el-input>
          </el-form-item>
          <el-form-item label="联系地址">
              <el-input v-model="form.address"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button size="medium" @click="editVisible = false">取 消</el-button>
            <el-button size="medium" :loading="buttomLoading" type="primary" @click="submitForm('form')" >确 定</el-button>
        </span>
    </el-dialog>
    
</template>

<script>
import * as PatientApi from "../../../../api/PatientApi";
import {
        validPhone
    } from "@/utils/validate";
export default {
  data() {
    return {
      buttomLoading: false,
      editVisible: false,
      title: "编辑",
      levelOptions: [],
      readonly: false,
      form: {
        case_number: null,
        name: "",
        mobile: "",
        sex: 0,
        age: "",
        birthday: "",
        type: 0,
        employee_id: "",
        allergy: "",
        history: "",
        address: "",
        level: ""
      },
      options: [],
      rules: {
        case_number: [
          { required: true, message: "请输入病历号", trigger: "blur" }
        ],
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" }
        ],
        level: [
          { required: true, message: "请选择级别", trigger: "blur" }
        ],
        mobile: [{
                required: true,
                message: "请输入手机号",
                trigger: "blur"
            },
            {
                validator: (rule, value, callback) => {
                    if (value && !validPhone(value)) {
                        callback(new Error("请输入正确手机号码"));
                    } else {
                        callback();
                    }
                },
                trigger: "blur"
            }
        ],
        employee_id: [
          { required: true, message: "请选择主治医生", trigger: "blur" }
        ],
      }
    };
  },
  methods: {
      showNew() {
      this.title = "新增";
      this.resetForm();
      this.editVisible = true;
      this.readonly = false;
      this.getEmployee();
      this.getMemberLevel();
      this.getCaseNumber();
    },
    async showEdit(case_number) {
      this.readonly = true;
      this.title = "编辑";
      this.resetForm();
      this.editVisible = true;
      this.getEmployee();
      this.getMemberLevel();
      await this.getShopAdminInfo(case_number);
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
              this.form.address,
              this.form.level
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
              this.form.name,
              this.form.mobile,
              this.form.sex,
              this.form.age ,
              this.form.birthday ,
              this.form.type ,
              this.form.employee_id ,
              this.form.allergy ,
              this.form.history ,
              this.form.address,
              this.form.level
            ).then(res => {
              this.buttomLoading = false;
              if (res.error === "success") {
                this.$message({
                  type: "success",
                  message: "添加成功!"
                });
                console.log(this.form.case_number)
                this.$emit("refresh", this.form.case_number);
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
      this.form.name = "";
      this.form.mobile = "";
      this.form.sex = 0;
      this.form.age = "";
      this.form.birthday = "";
      this.form.type = 0;
      this.form.employee_id = "";
      this.form.allergy = "";
      this.form.history = "";
      this.form.address = "";
      this.form.level = "";
    },
    getCaseNumber() {
      PatientApi.getCaseNumber().then(res => {
        this.form.case_number = res;
      })
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
    getMemberLevel() {
      PatientApi.getMemberLevel().then(res => {
        if (res.error === "success") {
          this.levelOptions = res.data;
        } else {
          this.$message.error(this.$t(res.error));
        }
      })
    },
    getShopAdminInfo(case_number) {
      PatientApi.getPatientDetail(case_number).then(res => {
        if (res.error === "success") {
          this.form.case_number = res.data.case_number;
          this.form.name = res.data.name;
          this.form.mobile = res.data.mobile;
          this.form.sex = res.data.sex;
          this.form.age = res.data.age == 0? "" : res.data.age;
          this.form.birthday = res.data.birthday;
          this.form.type = res.data.type;
          this.form.employee_id = res.data.employee_id;
          this.form.allergy = res.data.allergy;
          this.form.history = res.data.history;
          this.form.address = res.data.address;
          this.form.level = res.data.level_id;
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
        
