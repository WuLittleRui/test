<template>
    <div v-if="flag">
        <div :style="teethHeight">
            <el-scrollbar style="height: 100%;">
                <el-tree :accordion="true" :data="data" node-key="id" :props="defaultProps" @node-click="handleNodeClick">
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                        <span>{{ node.label }}</span>
                        <span>
                        <el-button
                            v-if="data.teamplate_id != undefined"
                            type="text"
                            size="mini"
                            @click="() => append(data)">
                            添加
                        </el-button>
                        <el-button
                            type="text"
                            size="mini"
                            @click="() => appendEdit(node, data)">
                            编辑
                        </el-button>
                        </span>
                    </span>
                </el-tree>

                <el-form ref="form" :model="form" label-width="100px" v-if="showForm">
                    <el-form-item label="主诉">
                        {{form.main_illness}}
                    </el-form-item>
                    <el-form-item label="现病史">
                        {{form.present_illness}}
                    </el-form-item>
                    <el-form-item label="既往史">
                        {{form.history}}
                    </el-form-item>
                    <el-form-item label="检查">
                        {{form.inspect}}
                    </el-form-item>
                    <el-form-item label="辅助检查">
                        {{form.sup}}
                    </el-form-item>
                    <el-form-item label="诊断">
                        {{form.dia}}
                    </el-form-item>
                    <el-form-item label="治疗方案">
                        {{form.trea_plan}}
                    </el-form-item>
                    <el-form-item label="治疗">
                        {{form.trea}}
                    </el-form-item>
                    <el-form-item label="医嘱">
                        {{form.advice}}
                    </el-form-item>
                </el-form>
            </el-scrollbar>
        </div>

        <PatientTemplateEdit ref="PatientTemplateEdit" @refresh="showMenu"/>
    </div>
</template>

<script>
import * as TemplateApi from "@/api/TemplateApi";
import PatientTemplateEdit from "./PatientTemplateEdit";
export default {
    components: {PatientTemplateEdit},
    data() {
        return {
            flag: false,
            case_number: null,
            onlyShow: false,
            edit: false,
            showForm: false,
            form: {
                main_illness: "",
                present_illness: "",
                allergy: "",
                history: "",
                inspect: "",
                sup: "",
                dia: "",
                trea_plan: "",
                trea: "",
                advice: ""
            },
            teethHeight: "height:" + document.body.clientHeight * 0.4 + "px",
            data: [],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        }
    },
    methods: {
        showORnoshow(flag, case_number, onlyShow, edit) {
            this.flag = flag;
            this.case_number = case_number;
            this.onlyShow = onlyShow;
            this.edit = edit;

            this.showMenu();
        },
        showMenu() {
            TemplateApi.menu().then(data => {
                if (data.error === "success") {
                    if(data.data[0].children == undefined) {
                        var a = {
                            id: 0,
                            label: '添加'
                        }
                        data.data[0].children = [];
                        data.data[0].children.push(a);
                    }
                    this.reset();
                    this.data = data.data[0].children;
                } else {
                    this.$message({
                        type: "error",
                        message: this.$t(data.error)
                    });
                }
            })
        },
        appendEdit(node, data) {
            if(node.level == 1 || node.level == 2) {
                var init = true;
                if(data.id != 0) {
                    init = false;
                }
                var label = "";
                if(data.id != 0) {
                    label = data.label;
                }
                this.$refs["PatientTemplateEdit"].showAdd(data.id, label, node.level, init);
            } else {
                this.$refs["PatientTemplateEdit"].showEdit(data.id, data.teamplate_id, data.label);
            }
        },
        append(data) {
            this.$emit("refresh", data);
        },
        reset() {
            this.form.main_illness = "";
            this.form.present_illness = "";
            this.form.allergy = "";
            this.form.history = "";
            this.form.inspect = "";
            this.form.sup = "";
            this.form.dia = "";
            this.form.trea_plan = "";
            this.form.trea = "";
            this.form.advice = "";
            this.showForm = false;
        },
        handleNodeClick(data) {
            if(data.teamplate_id != undefined) {
                TemplateApi.getOne(data.teamplate_id).then(data => {
                    if (data.error === "success") {
                        this.showForm = true;
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
            } else {
                this.reset();
            }
        }
    }
}
</script>

<style scoped>
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
}
</style>

