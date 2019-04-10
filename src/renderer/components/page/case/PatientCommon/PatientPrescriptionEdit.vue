<template>
    <!--处方录入-->
    <el-dialog title="处方录入" :visible.sync="centerDialogVisibles" width="50%" center>
        <el-container>
                <el-main>
                    <el-container>
                        <el-main>
                            <div>
                                <el-input v-model="title" placeholder="筛选处方名" class="handle-input mr10"></el-input>
                                <el-button type="primary" icon="el-icon-lx-search" @click="search">搜索</el-button>
                            </div>
                            <el-table @cell-dblclick="handleAddDB" ref="multipleTable" :data="package_list" height="280px" border class="table">
                                <el-table-column label='处方名' align="center" header-align="center">
                                    <template slot-scope="scope">{{ scope.row.title }}</template>
                                </el-table-column>
                                <el-table-column label='单位' align="center" header-align="center">
                                    <template slot-scope="scope">{{ scope.row.unit }}</template>
                                </el-table-column>
                                <el-table-column label='单价' align="center" header-align="center">
                                    <template slot-scope="scope">
                                        {{ scope.row.unit_price }}
                                    </template>
                                </el-table-column>
                                <el-table-column label='备注' align="center" header-align="center">
                                    <template slot-scope="scope">
                                        {{ scope.row.remark }}
                                    </template>
                                </el-table-column>
                                <el-table-column label='操作' align="center"  header-align="center">
                                    <template slot-scope="scope">
                                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleAdd(scope.$index, scope.row)">添加</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-main>
                    </el-container>
                    <el-container>
                        <el-main>
                            <el-table @cell-dblclick="handleDeleteDB" ref="multipleTable" :data="sel_package_list" height="280px" border class="table">
                                <el-table-column label='处方名' align="center" header-align="center">
                                    <template slot-scope="scope">{{ scope.row.title }}</template>
                                </el-table-column>
                                <el-table-column label='单位' align="center" header-align="center">
                                    <template slot-scope="scope">{{ scope.row.unit }}</template>
                                </el-table-column>
                                <el-table-column label='单价' align="center" header-align="center">
                                    <template slot-scope="scope">
                                        {{ scope.row.unit_price }}
                                    </template>
                                </el-table-column>
                                <el-table-column label='备注' align="center" header-align="center">
                                    <template slot-scope="scope">
                                        {{ scope.row.remark }}
                                    </template>
                                </el-table-column>
                                <el-table-column label='操作' align="center"  header-align="center">
                                    <template slot-scope="scope">
                                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-main>
                    </el-container>
                </el-main>
            </el-container>
        <span slot="footer" class="dialog-footer">
            <el-button size="medium" @click="centerDialogVisibles = false">取 消</el-button>
            <el-button size="medium" type="primary" @click="submitForm">确 定</el-button>
        </span>
    </el-dialog>
    <!--处方录入完-->
</template>

<script>
import * as MedicalApi from '../../../../api/MedicalApi';
export default {
  data() {
    return {
        centerDialogVisibles: false,
        package_list: [],
        sel_package_list: [],
        title: ""
    };
  },
  methods: {
    submitForm() {
        this.sel_package_list.forEach(item => {
            item.quantity = 1;
            item.all_price = item.quantity * item.unit_price;
            item.remark = item.remark;
        })
        this.$emit("refresh", this.sel_package_list);
        this.centerDialogVisibles = false;
    },
    ///搜素按钮
    search() {
        this.getDate();
    },
    showAdd(sel_package_list) {
        this.centerDialogVisibles = true;
        if(sel_package_list.length == 1 && sel_package_list[0].title != "" && sel_package_list[0].unit!=null && sel_package_list[0].unit_price!=null && sel_package_list[0].remark!=null) {
            this.sel_package_list = sel_package_list;
        }
        this.getDate();
    },
    handleAddDB(row, column, cell, event) {
        var flag = false;
        this.sel_package_list.forEach(item => {
            if(item.prescription_id === row.prescription_id) {
                flag = true;
            }
        })
        if(!flag) {
            this.sel_package_list.push(row);
        }
    },
    handleAdd(index, row) {
        var flag = false;
        this.sel_package_list.forEach(item => {
            if(item.prescription_id === row.prescription_id) {
                flag = true;
            }
        })
        if(!flag) {
            this.sel_package_list.push(row);
        }
    },
    handleDeleteDB(row, column, cell, event) {
        var a = [];
        this.sel_package_list.forEach(item => {
            if(item.prescription_id !== row.prescription_id) {
                a.push(item);
            }
        })
        this.sel_package_list = a;
    },
    handleDelete(index, row) {
        this.sel_package_list.splice(index, 1);
    },
    getDate() {
        MedicalApi.listAll(this.title).then(data => {
            if (data.error === "success") {
                this.package_list = data.data;
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
};
</script>


<style scoped>
.handle-input {
    width: 300px;
    display: inline-block;
}
.el-main {
    padding: 10px !important;
    background-color: #E9EEF3;
    color: #333;
}
</style>

