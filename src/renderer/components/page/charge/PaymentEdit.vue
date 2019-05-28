<template>
    <!-- 编辑弹出框 -->
    <el-dialog :title="title" :visible.sync="editVisible" width="20%">
        <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="患者手机号" prop="mobile" v-if="add">
                <el-input v-model="form.mobile"></el-input>
            </el-form-item>
            <el-form-item label="金额" prop="ope_balance">
                <el-input-number v-model="form.ope_balance" :precision="2" :step="1" :min="1"></el-input-number>
            </el-form-item>
            <el-form-item label="支付类型" prop="type">
                <el-select v-model="form.type" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.pay_type_id"
                    :label="item.pay_type_name"
                    :value="item.pay_type_id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="操作人" prop="operator">
                <el-input v-model="form.operator"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
                <el-input v-model="form.remark"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('form')" >确 定</el-button>
        </span>
    </el-dialog>
    
</template>

<script>
import * as MemberCurrencyApi from '@/api/MemberCurrencyApi';
import * as PayTypeApi from "@/api/PayTypeApi";
import * as OauthApi from "@/api/OauthApi";

export default {
    data() {
        return {
            title: '调整',
            editVisible: false,
            add: false,
            options: [],
            rules: {
                ope_balance: [
                    { required: true, message: "请输入金额", trigger: "blur" },
                ],
                operator: [
                    { required: true, message: "请输入操作人名称", trigger: "blur" },
                ],
                mobile: [
                    { required: true, message: "请输入患者手机号", trigger: "blur" },
                ],
                type: [
                    { required: true, message: "请选择支付方式", trigger: "blur" },
                ]
            }, 
            form: {
                seq_flag: 1,
                mobile: '',
                balance: '',
                ope_balance: "",
                operator: "",
                remark: "",
                mid: null,
                type: ""
            }
        }
    },
    methods: {
        showAdd() {
            this.resetForm(); 
            this.add = true;
            this.editVisible = true;
            this.getType();
        },
        getType() {
            PayTypeApi.getAll().then(data => {
                if(data.error == "success") {
                    this.options = data.data.list;
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
        async showEdit(mid, seq_flag) {
            this.resetForm()
            this.getInfo(mid);
            this.getType();
            this.add = false;
            this.form.seq_flag = seq_flag;
            if(seq_flag) {
                this.title = "充值";
            } else {
                this.title = "扣款";
            }
            this.editVisible = true;
        },
        resetForm() {
            this.form.mid = null;
            this.form.ope_balance = "";
            this.form.operator = "";
            this.form.remark = "";
            this.form.seq_flag = true;
            this.form.type = "";
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    if(this.form.seq_flag == 0 && this.form.ope_balance > this.form.balance) {
                        this.$message.error("扣款金额不能大于余额,余额为" + this.form.balance);
                        return;
                    }
                    if(this.form.mid) {
                        MemberCurrencyApi.adjust(this.form.mid, this.form.ope_balance, this.form.operator, this.form.remark, this.form.seq_flag, this.form.type).then(data => {
                            if(data.error == "success") {
                                this.$message({
                                    type: "success",
                                    message: "编辑成功!"
                                });
                                this.$emit("refresh", true);
                                this.editVisible = false;
                            }  else if (
                                data.error === "invaild_token" ||
                                data.error === "not_login"
                            ) {
                            //判断是否认证过期
                                OauthApi.logOut();
                                this.$router.push("/login");
                            } else {
                                this.$message.error(data.error);
                            }
                        })
                    } else {
                        MemberCurrencyApi.add(this.form.mobile, this.form.ope_balance, this.form.operator, this.form.remark, this.form.type).then(data => {
                            if(data.error == "success") {
                                this.$message({
                                    type: "success",
                                    message: "添加成功!"
                                });
                                this.$emit("refresh", true);
                                this.editVisible = false;
                            }  else if (
                                data.error === "invaild_token" ||
                                data.error === "not_login"
                            ) {
                            //判断是否认证过期
                                OauthApi.logOut();
                                this.$router.push("/login");
                            }  else {
                                this.$message.error(data.error);
                            }
                        })
                    }
                }
            })
        },
        getInfo(mid) {
            MemberCurrencyApi.get(mid).then(data => {
                if(data.error == "success") {
                    this.form.mid = mid;
                    this.form.balance = data.data.balance;
                }  else if (
                    data.error === "invaild_token" ||
                    data.error === "not_login"
                ) {
                //判断是否认证过期
                    OauthApi.logOut();
                    this.$router.push("/login");
                }  else {
                    this.$message.error(data.error);
                }
            })
        }
    }
}
</script>
