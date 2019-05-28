<template>
    <el-dialog :title="title" :visible.sync="editVisible" width="50%">
        <el-container style="height: 660px;">
            <el-aside width="200px">
                <el-container>
                    <el-header>处置大类</el-header>
                    <el-main>
                        <div style="height: 200px;">
                            <el-scrollbar style="height: 100%;" class="handleType">
                                <div v-for="(item, index) in handleType" @click="handleTypeSelect(item, index)" :class="item.typeSelect? 'handleTypeSelect': 'handleTypeNoSelect'">
                                    {{item.name}}
                                </div>
                            </el-scrollbar>
                        </div>
                    </el-main>
                </el-container>
                <el-container>
                    <el-header>牙位</el-header>
                    <el-main>
                        <PatientTeethPosition ref="PatientTeethPosition" :object="item" :index="index"  @open="openChange" @close="closeChange" @value="positionValueChange"/>
                    </el-main>
                </el-container>
            </el-aside>
            <el-container>
                <el-main>
                    <el-container>
                        <el-main>
                            <div>
                                <el-input v-model="name" placeholder="筛选项目名" class="handle-input mr10"></el-input>
                                <el-button type="primary" icon="el-icon-lx-search" @click="search">搜索</el-button>
                            </div>
                            <el-table style="width: 680px" ref="multipleTable" :data="package_list" height="280px" border class="table">
                                <el-table-column label='项目名' align="center" header-align="center">
                                    <template slot-scope="scope">{{ scope.row.name }}</template>
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
                            <el-table style="width: 680px" ref="multipleTable" :data="sel_package_list" height="280px" border class="table">
                                <el-table-column label='项目名' align="center" header-align="center">
                                    <template slot-scope="scope">{{ scope.row.name }}</template>
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
        </el-container>

        <span slot="footer" class="dialog-footer"> 
            <el-button size="medium" @click="editVisible = false">取 消</el-button>
            <el-button size="medium" type="primary" @click="submitForm()" >确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import PatientTeethPosition from "./PatientTeethPosition";
import * as HospitalChargeTypeApi from "../../../../api/HospitalChargeTypeApi";
import * as HospitalChargeApi from "../../../../api/HospitalChargeApi";
import { post } from '../../../../utils/request';
export default {
    components: { PatientTeethPosition },
    data() {
        return {
            name: "",
            type_id: null,
            title: "处置选择",
            editVisible: false,
            handleType: [],
            package_list: [],
            sel_package_list: [],
            position: {},
            item: {
                show: false,
                left: "",
                right: "",
                lebottom: "",
                bottom: ""
            },
            index: 0
        }
    },
    methods: {
		positionValueChange(index, item) {
            this.item.left = item.left;
            this.item.right = item.right;
            this.item.lebottom = item.lebottom;
            this.item.bottom = item.bottom;
		},
		openChange(index) { 
            this.item.show = true;
            this.$refs["PatientTeethPosition"].editItem(this.item);
		},
		closeChange(index) {
			this.item.show = false;
		},
        submitForm() {
            if(this.sel_package_list.length == 0) {
                this.$message.error("请选择至少一项处置!");
                return;
            }
            this.sel_package_list.forEach(item => {
                item.show = false;
                item.left = this.item.left;
                item.right = this.item.right;
                item.lebottom = this.item.lebottom;
                item.bottom = this.item.bottom;

                item.quantity = 1;
                item.is_discount = item.is_discount;
                item.all_price = item.quantity * item.unit_price;
                item.remark = "";
            })
            this.$emit("refresh", this.sel_package_list, this.index);
            this.editVisible = false;
        },
        ///搜素按钮
        search() {
            this.getCharge(this.type_id);
        },
        resetDate() {
            this.name = "";
            this.type_id = null;
            this.handleType = [];
            this.package_list = [];
            this.sel_package_list = [];
        },
        handleDeleteDB(row, column, cell, event) {
            var a = [];
            this.sel_package_list.forEach(item => {
                if(item.charge_id !== row.charge_id) {
                    a.push(item);
                }
            })
            this.sel_package_list = a;
        },
        handleDelete(index, row) {
            this.sel_package_list.splice(index, 1);
        },
        handleAdd(index, row) {
            this.sel_package_list.push(row);
        },
        showAdd(post_list, index) {
            this.editVisible = true;
            this.resetDate();
            if(post_list != undefined && post_list != null && post_list != '' && post_list.detail_id > 0) {
                this.sel_package_list = [];
                this.item.left = post_list.left;
                this.item.bottom = post_list.bottom;
                this.item.lebottom = post_list.lebottom;
                this.item.right = post_list.right;
                this.item.show = false;
                
                this.$nextTick(() => {
                    this.$refs["PatientTeethPosition"].editItem(this.item);
                })

                this.sel_package_list.push(post_list);
            } else {
                this.sel_package_list = [];
            }
            this.getChargeType();
        },
        getCharge(type_id) {
            if(type_id != null) {
                HospitalChargeApi.getAllList(type_id, this.name).then(data => {
                    if (data.error === "success") {
                        this.package_list = data.data.list;
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
        },
        getChargeType() {
            HospitalChargeTypeApi.getAll().then(data => {
                if (data.error === "success") {
                    data.data.list.forEach(item => {
                        item.typeSelect = false;
                    })
                    if(data.data.list.length > 0) {
                        data.data.list[0].typeSelect = true;
                        this.type_id = data.data.list[0].type_id;
                    } else {
                        this.type_id = null;
                    }
                    this.handleType = data.data.list;

                    this.getCharge(this.type_id);
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
        handleTypeSelect(item, index) {
            this.handleType.forEach(i => {
                i.typeSelect = false;
            })
            this.type_id = this.handleType[index].type_id;
            this.handleType[index].typeSelect = true;
            this.getCharge(this.handleType[index].type_id);
        }
    }
}
</script>


<style scoped>
.handle-input {
  width: 300px;
  display: inline-block;
}
.el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
  }
  
  .el-main {
    padding: 10px !important;
    background-color: #E9EEF3;
    color: #333;
  }

  .handleType div {
      font-size: 16px;
  }

  .handleTypeSelect {
      background-color: #C7FEB5 !important;
      line-height: 25px;
      height: 25px;
  }

  .handleTypeNoSelect {
      line-height: 25px;
      height: 25px;
  }

  .handleType div:hover {
      cursor: pointer;
      background-color: rgb(221, 255, 223);
  }
</style>

