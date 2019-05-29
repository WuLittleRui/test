<!-- 复诊预约 -->
<template>
    <el-dialog :title="title" :visible.sync="editVisible" width="650px">
        <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="患者手机号" prop="mobile">
                <el-input v-model="form.mobile" @change="mobileChange"></el-input>
            </el-form-item>
            <el-form-item label="患者姓名" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="病历号" prop="case_number">
                <el-input v-model="form.case_number" :disabled="readonly"></el-input>
            </el-form-item>
            <el-form-item label="预约类型" prop="order_type">
                <el-select v-model="form.order_type" placeholder="预约类型" clearable="">
                    <el-option
                        v-for="item in optionType"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value">
                    </el-option>
                </el-select>
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
                <el-input v-model="form.member_remark"></el-input>
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
import * as OrderApi from "@/api/OrderApi";
import { parseTime } from "@/utils/formater";
import { validPhone } from "../../../utils/validate";
import * as OauthApi from "@/api/OauthApi";
export default {
    data() {
        return {   
            title: '预约',
            editVisible: false,
            options: [],
            optionsTime: [],
            optionType: [{ name: "初诊", value: 0 }, { name: "复诊", value: 1 }],
            readonly: false,
            buttonloading: false,
            form: {
                case_number: null,
                username: '',
                mobile: '',
                name: "",
                employee_id: null,
                time: "",
                content: '',
                date: "",
                order_type: 0,
                member_remark: ''
            },
            rules: {
                mobile: [
                    { required: true, message: "请输入患者手机号", trigger: "blur" },
                    {
                        validator: (rule, value, callback) => {
                        if (value && !validPhone(value)) {
                            callback(new Error("请输入正确的11位手机号码"));
                        } else {
                            callback();
                        }
                        },
                        trigger: "blur"
                    }
                ],
                case_number: [
                    { required: true, message: "请输入患者病历号", trigger: "blur" }
                ],
                employee_id: [
                    { required: true, message: "请选择预约医生", trigger: "blur" }
                ],
                date: [
                    { required: true, message: "请选择预约日期", trigger: "blur" }
                ],
                time: [
                    { required: true, message: "请选择预约时间", trigger: "blur" }
                ],
                content: [
                    { required: true, message: "请输入预约事项", trigger: "blur" }
                ],
                name: [
                    { required: true, message: "请输入患者姓名", trigger: "blur" }
                ]
            }
        }
    },
    methods: {
        mobileChange() {
            OrderApi.getCase(this.form.mobile).then(data => {
                if(data.error == "success") {
                    if(data.data != null && data.data.case_number != undefined) {
                        this.form.case_number = data.data.case_number;
                        this.form.name = data.data.name;
                        this.readonly = true;
                    } else {
                        this.getCaseNumber();
                        this.readonly = false;
                    }
                } else {
                    this.$message.error(this.$t(data.error));
                }
            })
        },
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
        getCaseNumber() {
            PatientApi.getCaseNumber().then(res => {
                this.form.case_number = res;
            })
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.buttonloading = true;
                    var start_time = this.form.date + " " + this.optionsTime[this.form.time].start_time + ":00";
                    var end_time = this.form.date + " " + this.optionsTime[this.form.time].end_time + ":00";

                    OrderApi.addOrder(this.form.mobile, this.form.case_number, this.form.employee_id, this.form.date, start_time, end_time, this.form.content, this.form.member_remark, this.form.order_type, this.form.name).then(data => {
                        this.buttonloading = false;
                        if(data.error == "success") {
                            this.$message({
                                type: "success",
                                message: "预约成功!"
                            });
                            this.$emit("refresh");
                            this.editVisible = false;
                        }  else if (
                            data.error === "invaild_token" ||
                            data.error === "not_login"
                        ) {
                        //判断是否认证过期
                            OauthApi.logOut();
                            this.$router.push("/login");
                        } else {
                            this.$message.error(this.$t(data.error));
                        }
                    })
                }
            })
        },
        resetForm() {
            this.form.case_number = null;
            this.form.username = '';
            this.form.name = "";
            this.form.mobile = '';
            this.form.employee_id = null;
            this.form.time = '';
            this.form.content = '';
            this.form.order_remark = '';
            this.form.date = "";
        },
        showAdd() {
            this.editVisible = true;
            this.resetForm();
            this.getEmployee();
        },
        getEmployee() {
            PatientApi.getEmployee(1).then(res => {
                if (res.error === "success") {
                    this.options = res.data;
                } else if (
                    res.error === "invaild_token" ||
                    res.error === "not_login"
                ) {
                //判断是否认证过期
                    OauthApi.logOut();
                    this.$router.push("/login");
                } else {
                    this.$message.error(this.$t(res.error));
                }
            })
        }
    }
}
</script>


<style scoped>

</style>

