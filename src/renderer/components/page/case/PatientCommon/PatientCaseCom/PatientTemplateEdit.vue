<template>
    <el-dialog :title="title" :visible.sync="editVisible" width="50%" :append-to-body="true">
        <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-row :gutter="20">
                <el-col :span="10">
                    <el-form-item label="疾病大类" v-if="add && !first">
                        <el-cascader
                            clearable
                            v-model="form.big_illness"
                            :props="{ checkStrictly: true }"
                            :options="options">
                        </el-cascader>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="疾病大类" prop="big_illness" v-if="add && first">
                        <el-cascader
                            clearable
                            v-model="form.big_illness"
                            :props="{ checkStrictly: true }"
                            :options="options">
                        </el-cascader>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="疾病名称" prop="illness" v-if="first">
                        <el-input v-model="form.illness" clearable></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="主诉" prop="main_illness" v-if="first">
                <el-input v-model="form.main_illness"></el-input>
            </el-form-item>
            <el-form-item label="现病史" v-if="first">
                <el-input v-model="form.present_illness"></el-input>
            </el-form-item>
            <el-form-item label="既往史" v-if="first">
                <el-input v-model="form.history"></el-input>
            </el-form-item>
            <el-form-item label="检查" v-if="first">
                <el-input v-model="form.inspect"></el-input>
            </el-form-item>
            <el-form-item label="辅助检查" v-if="first">
                <el-input v-model="form.sup"></el-input>
            </el-form-item>
            <el-form-item label="诊断" v-if="first">
                <el-input v-model="form.dia"></el-input>
            </el-form-item>
            <el-form-item label="治疗方案" v-if="first">
                <el-input v-model="form.trea_plan"></el-input>
            </el-form-item>
            <el-form-item label="治疗" v-if="first">
                <el-input v-model="form.trea"></el-input>
            </el-form-item>
            <el-form-item label="医嘱" v-if="first">
                <el-input v-model="form.advice"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editVisible = false">取 消</el-button>
            <el-button :loading="buttonLoading" type="primary" @click="submitForm('form')" v-if="!init">修 改</el-button>
            <el-button :loading="addLoading" type="primary" @click="submitFormChild('form')" v-if="insertForm">添 加</el-button>
        </span>
    </el-dialog>
</template>

<script>
import * as TemplateApi from "@/api/TemplateApi";
export default {
    data() {
        return {
            title: "编辑",
            editVisible: false,
            add: true,
            buttonLoading: false,
            addLoading: false,
            options: [],
            insertForm: true,
            first: false,
            level: 1,
            init: true,
            form: {
                teamplate_id: null,
                big_illness: 0,
                illness: "",
                main_illness: "",
                present_illness: "",
                history: "",
                inspect: "",
                sup: "",
                dia: "",
                trea_plan: "",
                trea: "",
                advice: ""
            },
            rules: {
                illness: [
                    { required: true, message: "请输入疾病名称", trigger: "blur" }
                ],
                big_illness: [
                    { required: true, message: "请选择疾病大类", trigger: "blur" }
                ]
            }
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.buttonLoading = true;
                    //修改
                    if (this.form.teamplate_id) {
                        TemplateApi.edit(
                        this.form.teamplate_id,
                        this.form.illness,
                        this.form.main_illness,
                        this.form.present_illness,
                        this.form.history,
                        this.form.inspect,
                        this.form.sup,
                        this.form.dia,
                        this.form.trea_plan,
                        this.form.trea,
                        this.form.advice
                        ).then(res => {
                        this.buttonLoading = false;
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
                        var big_illness = 0;
                        if(this.form.big_illness != "") {
                            big_illness = this.form.big_illness;
                        }
                        TemplateApi.add(
                        this.level,
                        big_illness,
                        this.form.illness,
                        this.form.main_illness,
                        this.form.present_illness,
                        this.form.history,
                        this.form.inspect,
                        this.form.sup,
                        this.form.dia,
                        this.form.trea_plan,
                        this.form.trea,
                        this.form.advice,
                        true
                        ).then(res => {
                    this.buttonLoading = false;
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
            })
        },
        submitFormChild(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.addLoading = true;
                    //添加
                    var big_illness = 0;
                    if(this.form.big_illness != "") {
                        big_illness = this.form.big_illness;
                    }
                    TemplateApi.add(
                    this.level,
                    big_illness,
                    this.form.illness,
                    this.form.main_illness,
                    this.form.present_illness,
                    this.form.history,
                    this.form.inspect,
                    this.form.sup,
                    this.form.dia,
                    this.form.trea_plan,
                    this.form.trea,
                    this.form.advice,
                    false
                    ).then(res => {
                    this.addLoading = false;
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
                } else {
                    return false;
                }
            })
        },
        getMenu() {
            TemplateApi.select().then(data => {
                if (data.error === "success") {
                    this.options = data.data[0].children;
                } else {
                    this.$message({
                        type: "error",
                        message: this.$t(data.error)
                    });
                }
            })
        },
        showAdd(id, label, level, init) {
            this.add = true;
            this.title = "添加";
            this.reset();
            this.form.big_illness = id;
            this.form.illness = label;
            this.getMenu();
            this.init = init;
            this.level = level;
            if(level == 1 ) {
                this.first = false;
            } else {
                this.first = true;
            }
            this.editVisible = true;
        },
        showEdit(id, teamplate_id, label) {
            this.add = false;
            this.title = "编辑";
            this.reset();
            this.first = true;
            this.form.illness = label;
            this.form.big_illness = id;
            this.init = false;
            this.insertForm = false;

            this.getInfo(teamplate_id);
        },
        getInfo(teamplate_id) {
            TemplateApi.getOne(teamplate_id).then(data => {
                if (data.error === "success") {
                    this.editVisible = true;
                    this.form.teamplate_id = teamplate_id;
                    this.form.main_illness = data.data.main_illness;
                    this.form.present_illness = data.data.main_illness;
                    this.form.allergy = data.data.allergy;
                    this.form.history = data.data.history;
                    this.form.inspect = data.data.inspect;
                    this.form.sup = data.data.sup;
                    this.form.dia = data.data.dia;
                    this.form.trea_plan = data.data.trea_plan;
                    this.form.trea = data.data.trea;
                    this.form.advice = data.data.advice;
                } else {
                    this.$message({
                        type: "error",
                        message: this.$t(data.error)
                    });
                }
            })
        },
        reset() {
            this.first = false;
            this.insertForm = true;
            this.level = 1;
            this.form.big_illness = 0;
            this.form.illness = '';
            this.form.teamplate_id = null;
            this.init = true;
            this.form.main_illness = '';
            this.form.present_illness = '';
            this.form.history = '';
            this.form.inspect = '';
            this.form.sup = '';
            this.form.dia = '';
            this.form.trea_plan = '';
            this.form.trea = '';
            this.form.advice = '';
        }
    }
}
</script>

<style scoped>

</style>

