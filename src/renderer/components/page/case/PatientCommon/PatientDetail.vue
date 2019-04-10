<template> 
    <div v-if="flag">
        <div :class="edit?'basic_information2': 'basic_information'">
            <el-collapse v-model="activeName">
                <el-collapse-item name="1">
                    <template slot="title">
                        <div class="collapse-item-title">基本信息</div>
                    </template>
                    <el-row :gutter="20" style="margin-left: 10px;">
                        <el-col :span="6">
                            <div class="small-section-title">患者姓名:</div>
                            <div>{{patient.name}}</div>
                        </el-col>
                        <el-col :span="6">
                            <div class="small-section-title">患者性别:</div>
                            <div v-if="patient.sex == 0">男</div>
                            <div v-if="patient.sex == 1">女</div>
                        </el-col>
                        <el-col :span="6">
                            <div class="small-section-title">手机号:</div>
                            <div>{{patient.mobile}}</div>
                        </el-col>
                    </el-row>

                    <el-row :gutter="20" style="margin-left: 10px;">
                        <el-col :span="6">
                            <div class="small-section-title">病历号:</div>
                            <div>{{patient.case_number}}</div>
                        </el-col>
                        <el-col :span="6">
                            <div class="small-section-title">出生年月:</div>
                            <div>{{patient.birthday}}</div>
                        </el-col>
                        <el-col :span="6">
                            <div class="small-section-title">年龄:</div>
                            <div>{{patient.age}}</div>
                        </el-col>
                    </el-row>

                    <el-row :gutter="20" style="margin-left: 10px;">
                        <el-col :span="6">
                            <div class="small-section-title">会员等级:</div>
                            <div>{{patient.level_name}}</div>
                        </el-col>
                    </el-row>

                    <el-row :gutter="20" style="margin-left: 10px;padding-bottom: 20px;">
                        <el-col :span="20">
                            <div class="small-section-title">联系地址:</div>
                            <div>{{patient.address}}</div>
                        </el-col>  
                    </el-row>

                    <el-row :gutter="20" style="margin-left: 10px;">
                        <el-col :span="6">
                            <div class="small-section-title">初诊医生</div>
                            <div>{{patient.first_docter_name}}</div>
                        </el-col>
                        <el-col :span="6">
                            <div class="small-section-title">初诊时间</div>
                            <div>{{patient.first_time}}</div>
                        </el-col>
                        </el-col>
                    </el-row>

                    <el-row :gutter="20" style="margin-left: 10px;">
                        <el-col :span="6">
                            <div class="small-section-title">复诊医生</div>
                            <div>{{patient.revisit_docter_name}}</div>
                        </el-col>
                        <el-col :span="6">
                            <div class="small-section-title">复诊时间</div>
                            <div>{{patient.revisit_time}}</div>
                        </el-col>
                    </el-row>

                    <el-row :gutter="20" style="margin-left: 10px;">
                        <el-col :span="20">
                            <div class="small-section-title">过敏史</div>
                            <div>{{patient.allergy}}</div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" style="margin-left: 10px;">
                        <el-col :span="20">
                            <div class="small-section-title">既往史</div>
                            <div>{{patient.history}}</div>
                        </el-col>
                    </el-row>
                </el-collapse-item>
            </el-collapse>
        </div>
        
        <PatientDetailEdit ref="PatientDetailEdit" @refresh="getData"/>
        
        <div class="button">
            <el-button size="medium" type="primary" @click="handleEdit" v-if="!onlyShow">修改信息</el-button>
        </div>
    </div>
</template>

<script>
import PatientDetailEdit from "./PatientDetailEdit";
import * as PatientApi from "../../../../api/PatientApi";
import { parseTime } from "@/utils/formater";
export default {
    components: { PatientDetailEdit },
    data() {
        return { 
            edit: false,
            activeName: "1",
            flag: false,
            case_number: null,
            patient: {},
            onlyShow: false
        }
    },
    methods: {
        showORnoshow(flag, case_number, onlyShow, edit) {
            if(edit == true) {
                this.edit = true;
            }
            this.flag = flag;
            if(case_number != null && case_number != undefined && case_number != '') { 
                this.case_number = case_number;
                this.getData();
                if(onlyShow) {
                    this.onlyShow = true;
                } else {
                    this.onlyShow = false;
                }
            } else {
                this.onlyShow = true;
            }
        },
        handleEdit() {
            this.$refs["PatientDetailEdit"].showEdit(this.case_number);
        },
        getData() {
            PatientApi.getPatientDetail(this.case_number).then(data => {
                if (data.error === "success") {
                    data.data.first_time = parseTime(data.data.first_time);
                    data.data.revisit_time = parseTime(data.data.revisit_time);
                    this.patient = data.data;
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
}
</script>


<style scoped>
.basic_information {
    height: 650px;
}
.basic_information2{
    height: 150px;
}
.small-section-title {
    float: left; 
    margin-right:10px;
}
.collapse-item-title {
    margin-left: 10px; 
    font-weight: bold; 
    font-size: 15px;
}
.button {
  background-color: white;
  padding-top: 10px;
}
</style>

