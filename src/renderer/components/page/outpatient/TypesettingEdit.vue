<template>
    <el-dialog :title="title" :visible.sync="editVisible" width="720px">
        <el-form ref="form" :model="form" :rules="rules" label-width="100px" label-position="top">
            <el-row :gutter="20">
                <el-col :span="6" v-for="item in list">
                    <el-form-item :label="item.start_time + ' - ' + item.end_time">
                        <el-input-number v-model="item.people_number" :min="0"></el-input-number>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editVisible = false">取 消</el-button>
            <el-button type="primary" :loading="buttongLoading" @click="submitForm('form')" >确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import * as TypeSettingApi from "@/api/TypeSettingApi";
import * as OauthApi from "@/api/OauthApi";
export default {
    data() {
        return {
            title: "排班",
            editVisible: false,
            list: [],
            buttongLoading: false,
            form: {
                date: "",
                employee_id: ""
            },
            rules: {

            }
        }
    },
    methods: {
        showEdit(date, employee_id) {
            this.getTime(employee_id, date);
            this.editVisible = true;
        },
        getTime(employee_id, date){
            TypeSettingApi.getTime(employee_id, date).then(res => {
                if(res.error == "success") {
                    this.form.employee_id = employee_id;
                    this.form.date = date;
                    this.list = res.data;
                } else if (
                    data.error === "invaild_token" ||
                    data.error === "not_login"
                ) {
                    //判断是否认证过期
                    OauthApi.logOut();
                    this.$router.push("/login");
                }  else if (data.error_description) {
                    this.$message.error(data.error_description);
                } else {
                    this.$message.error(data.error);
                }
            })
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.buttongLoading = true;

                    TypeSettingApi.postTime(
                        this.form.employee_id, 
                        this.form.date,
                        JSON.stringify(this.list)
                    ).then(res => {
                        this.buttongLoading = false;
                        if(res.error == "success") {
                            this.$message({
                                type: "success",
                                message: "修改成功!"
                            });
                            this.$emit("refresh");
                            this.editVisible = false;
                        } else if (
                            data.error === "invaild_token" ||
                            data.error === "not_login"
                        ) {
                            //判断是否认证过期
                            OauthApi.logOut();
                            this.$router.push("/login");
                        }  else if (data.error_description) {
                            this.$message.error(data.error_description);
                        } else {
                            this.$message.error(data.error);
                        }
                    })
                }
            })
        }
    }
}
</script>

<style scoped>

</style>

