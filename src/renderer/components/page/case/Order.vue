<!-- 复诊预约 -->
<template>
    <el-dialog :title="title" :visible.sync="editVisible" width="1024px">
        <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="患者" prop="username">
                <el-input v-model="form.username" :readonly="true"></el-input>
            </el-form-item>
            <el-form-item label="病历号" prop="case_number">
                <el-input v-model="form.case_number" :readonly="true"></el-input>
            </el-form-item>
            <el-form-item label="预约医生" prop="employee_id">
                <el-select v-model="form.employee_id" placeholder="请选择" @change="docterChange">
                    <el-option
                      v-for="item in options"
                      :key="item.employee_id"
                      :label="item.username"
                      :value="item.employee_id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="预约日期" prop="date">
                        <el-date-picker
                            @change="docterChange"
                            v-model="form.date"
                            value-format="yyyy-MM-dd"
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="预约时间" prop="time">
                        <el-select v-model="form.time" placeholder="请选择">
                            <el-option
                            v-for="(item, index) in optionsTime"
                            :key="index"
                            :disabled="item.people_number == 0? true: false"
                            :label="item.start_time + ' - ' + item.end_time + ' 可预约:'  + item.people_number "
                            :value="index">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="预约事项" prop="content">
                <el-input v-model="form.content"></el-input>
            </el-form-item>
            <el-form-item label="预约备注">
                <el-input v-model="form.order_remark"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editVisible = false">取 消</el-button>
            <el-button type="primary" :loading="buttonloading" @click="submitForm('form')" >确 定</el-button>
        </span>
    </el-dialog>
</template>

<script> 
import * as PatientApi from "@/api/PatientApi";
import { parseTime } from "@/utils/formater";
import * as OrderApi from "@/api/OrderApi";
import * as OauthApi from "@/api/OauthApi";
export default {
    data() {
        return {   
            title: '预约',
            editVisible: false,
            options: [],
            optionsTime: [],
            buttonloading: false,
            form: {
                case_number: null,
                username: '',
                date: "",
                mobile: '',
                employee_id: null,
                time: [],
                content: '',
                order_remark: ''
            },
            rules: {
                date: [
                    { required: true, message: "请选择预约时间", trigger: "blur" }
                ],
                username: [
                    { required: true, message: "请输入患者名称", trigger: "blur" }
                ],
                case_number: [
                    { required: true, message: "请输入患者病历号", trigger: "blur" }
                ],
                employee_id: [
                    { required: true, message: "请选择预约医生", trigger: "blur" }
                ],
                time: [
                    { required: true, message: "请选择预约时间", trigger: "blur" }
                ],
                content: [
                    { required: true, message: "请输入预约事项", trigger: "blur" }
                ]
            }
        }
    },
    methods: {
        docterChange(value) {
            if(this.form.employee_id == null) {
                this.$message('请选择医生!');
                return;
            }
            if(this.form.date == '') {
                this.$message('请选择日期!');
                return;
            }
            OrderApi.getTime(this.form.employee_id, this.form.date).then(data => {
                if(data.error == "success") {
                    this.optionsTime = data.data;
                } else {
                    this.$message.error(this.$t(data.error));
                }
            })
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.buttonloading = true;
                    var start_time = this.form.date + " " + this.optionsTime[this.form.time].start_time + ":00";
                    var end_time = this.form.date + " " + this.optionsTime[this.form.time].end_time + ":00";

                    PatientApi.addOrder(this.form.case_number, this.form.employee_id, start_time, end_time, this.form.content, this.form.order_remark).then(data => {
                        this.buttonloading = false;
                        if(data.error == "success") {
                            this.$message({
                                type: "success",
                                message: "预约成功!"
                            });
                            this.$emit("refresh");
                            this.editVisible = false;
                        } else {
                            this.$message.error(this.$t(data.error));
                        }
                    })
                }
            })
        },
        showAdd(case_number) {
            if(case_number == '') {
                this.$message.error('请选择患者');
                return;
            }
            this.editVisible = true;

            this.resetForm();
            this.getEmployee();
            this.getData(case_number);
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
        resetForm() {
            this.form.case_number = null;
            this.form.username = '';
            this.form.mobile = '';
            this.form.employee_id = null;
            var start = new Date();
            var end = new Date();
            this.form.time = "";
            this.form.content = '';
            this.form.order_remark = '';
            this.form.date = "";
        },
        getData(case_number) {
            PatientApi.getPatientDetail(case_number).then(data => {
                if (data.error === "success") {
                    this.form.username = data.data.name;
                    this.form.case_number = case_number;
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
        }
    }
}
</script>


<style scoped>

</style>

