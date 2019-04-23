<template>
    <!-- 编辑弹出框 -->
    <el-dialog :title="title" :visible.sync="editVisible" width="50%">
        <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="项目名称:" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
             
            <el-form-item label-width='70px' label='单价' prop='unit_price' style='width: 210px ; margin-left:32px' >
                <el-input-number v-model="form.unit_price" :min="0" :precision="2" :step="1" style="width: 130px"></el-input-number>
            </el-form-item>
            
             
            <el-form-item label='单位' prop='unit'>
                <el-select class='handle-select mr10' v-model='form.unit' placeholder="单位" prop='unit'>
                    <el-option v-for='item in unit' :key='item.name' :label='item.name' :value='item.name'>
                    </el-option>
                </el-select>
            </el-form-item>
            
            <el-form-item label='类型' prop='type_id'>
                <el-select v-model="form.type_id" clearable placeholder="请选择" style="width:180px"  >
                    <el-option v-for="item in typelist" :key='item.type_id' :label='item.name' :value='item.type_id'>
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label='是否折扣' prop='is_discount'>
                <el-radio v-model="form.is_discount" :label="false" border >否</el-radio>
                <el-radio v-model="form.is_discount" :label="true" border>是</el-radio>
            </el-form-item>

            <el-form-item label="备注" prop="remark">
                <el-input v-model="form.remark"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
              <el-button @click="editVisible = false">取 消</el-button>
              <el-button type="primary" @click="submitForm('form')">确 定</el-button>
            </span>
    </el-dialog>
</template>

<script>
    import * as HospitalChargeTypeApi from "../../../api/HospitalChargeTypeApi";
    import * as HospitalChargeApi from "../../../api/HospitalChargeApi";
    import {
        validPhone
    } from "../../../utils/validate";
    export default {
        data() {
            return {
                typelist: [],
                unit: [{
                        name: "次",
                        value: 0
                    },
                    {
                        name: "件",
                        value: 1
                    },
                    {
                        name: "套",
                        value: 2
                    },
                    {
                        name: "箱",
                        value: 3
                    },
                    {
                        name: "个",
                        value: 4
                    },
                    {
                        name: "瓶",
                        value: 5
                    }
                ],
                editVisible: false,
                title: "编辑",
                form: {
                    name: "",
                    charge_id: "",
                    unit: "",
                    type_id: "",
                    unit_price: "",
                    remark: "",
                    is_discount: false
                },
                rules: {
                    is_discount: [{
                        required: true,
                        message: "请选择是否打折",
                        trigger: "blur"
                    }],
                    name: [{
                        required: true,
                        message: "请输入收费项目名称",
                        trigger: "blur"
                    }],
                     unit: [{
                        required: true,
                        message: "请输入单位",
                        trigger: "blur"
                    }],
                   
                     type_id: [{
                        required: true,
                        message: "请选择类型",
                        trigger: "blur"
                    }],
                     unit_price: [{
                        required: true,
                        message: "请输入收费项目单价",
                        trigger: "blur"
                    }]
                     
                }
            };
        },
        created() {
            this.gettype();
        },
        methods: {
            showNew() {
                this.title = "新增";
                this.resetForm();
                this.editVisible = true;
            },
            async showEdit(charge_id) {
                this.title = "编辑";
                this.resetForm();
                this.editVisible = true;
                HospitalChargeApi.getOnePay(charge_id).then(data => {
                    this.form.name = data.data.list.name;
                    this.form.charge_id = data.data.list.charge_id;
                    this.form.remark = data.data.list.remark;
                    this.form.unit = data.data.list.unit;
                    this.form.unit_price = data.data.list.unit_price;
                    this.form.type_id = data.data.list.type_id;
                    this.form.is_discount = data.data.list.is_discount;
                });
            },
            gettype() {
                //添加
                HospitalChargeTypeApi.getAll().then(res => {
                    if (res.error === "success") {
                        this.typelist = res.data.list;
                    } else if (
                    data.error === "invaild_token" ||
                    data.error === "not_login"
                    ) {
                    //判断是否认证过期
                    OauthApi.logOut();
                    this.$router.push("/login");
                    }  else {
                        this.$message({
                            type: "error",
                            message: this.$t(res.error)
                        });
                    }
                });
            },
            submitForm(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        //修改
                        if (this.form.charge_id) {
                            HospitalChargeApi.updatePayType(
                            this.form.charge_id,
                            this.form.name,
                            this.form.unit,
                            this.form.unit_price,
                            this.form.type_id,
                            this.form.remark,
                            this.form.is_discount
                            ).then(res => {
                                if (res.error === "success") {
                                    this.$message({
                                        type: "success",
                                        message: "编辑成功!"
                                    });
                                    this.$emit("refresh");
                                    this.editVisible = false;
                                }  else if (
                                res.error === "invaild_token" ||
                                res.error === "not_login"
                                ) {
                                //判断是否认证过期
                                OauthApi.logOut();
                                this.$router.push("/login");
                                } else {
                                    this.$message({
                                        type: "error",
                                        message: this.$t(res.error)
                                    });
                                }
                            });
                        } else {
                            //添加
                            HospitalChargeApi.addPayType(
                                this.form.name,
                                this.form.unit,
                                this.form.unit_price,
                                this.form.type_id,
                                this.form.remark,
                                this.form.is_discount
                                ).then(res => {
                                if (res.error === "success") {
                                    this.$message({
                                        type: "success",
                                        message: "新增成功!"
                                    });
                                    this.$emit("refresh");
                                    this.editVisible = false;
                                } else if (
                                res.error === "invaild_token" ||
                                res.error === "not_login"
                                ) {
                                //判断是否认证过期
                                OauthApi.logOut();
                                this.$router.push("/login");
                                }  else {
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
                this.form.name = "";
                this.form.type_id = "";
                this.form.charge_id = null;
                this.form.unit = "";
                this.form.unit_price = "";
                this.form.remark = "";
                this.form.is_discount = false;
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
        
