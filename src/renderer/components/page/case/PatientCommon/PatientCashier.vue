<template>
    <div v-if="flag" :style="edit? 'height: 150px': teethHeight">
        <el-scrollbar style="height: 100%;">
            <el-table :data="list" border class="table" empty-text="没有任何记录" element-loading-text='给我一点时间'
                v-loading='listLoading' ref="multipleTable" highlight-current-row @current-change="handleTableChange">
                <el-table-column prop="state" label="状态" header-align="center"  align="center" min-width="70" :formatter="formatterState">
                </el-table-column>
                <el-table-column prop="sn" label="单据号" header-align="center"  align="center" min-width="170">
                </el-table-column>
                <el-table-column prop="docter_name" label="医生" align="center" header-align="center" min-width="70">
                </el-table-column>
                <el-table-column prop="cashier_name" label="收款员" align="center" header-align="center" min-width="70">
                </el-table-column>
                <el-table-column prop="amount" label="本次费用" align="center" header-align="center" min-width="80">
                </el-table-column>
                <el-table-column prop="receive_amount" label="实收金额" align="center" header-align="center" min-width="80">
                </el-table-column>
                <el-table-column prop="cost_amount" label="折扣金额" align="center" header-align="center" min-width="80">
                </el-table-column>
                <el-table-column prop="arrear_amount" label="欠费" align="center" header-align="center" min-width="80">
                </el-table-column>
                <el-table-column prop="nurse_name" label="护士" align="center" header-align="center" min-width="70">
                </el-table-column>
                <el-table-column prop="remark" label="备注" align="center" header-align="center" min-width="160">
                </el-table-column>
                <el-table-column prop="create_time" label="收费时间" header-align="center"  align="center" min-width="170" :formatter="formatterDate">
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @size-change='handleSizeChange' @current-change='handleCurrentChange' :current-page='listQuery.page' :page-sizes='[20,30, 50]' :page-size='listQuery.limit' layout='total, sizes, prev, pager, next, jumper' :total='total'>       
                </el-pagination>
            </div>
        </el-scrollbar>
        <div class="button">
            <el-button size="medium" type="primary" @click="payBill" v-if="!onlyShow">收费</el-button>
            <!-- <el-button size="medium" type="warning" @click="cancelBill" v-if="!onlyShow">作废</el-button> -->
            <!-- <el-button size="medium" type="danger" v-if="!onlyShow">退费</el-button> -->
        </div>

        <PatientPrice ref="PatientPrice" @refresh = "getData" />
    </div>
</template>

<script>
import PatientPrice from "./PatientCashierEdit/PatientPrice";
import * as PatientApi from "../../../../api/PatientApi";
import { parseTime } from "../../../../utils/formater";
export default {
    components: { PatientPrice },
    data() {
        return {
            edit: false,
            total: 0,
            list: [],
            listLoading: false,
            flag: false,
            selectSn: null,
            onlyShow: false,
			teethHeight: "height:" + document.body.clientWidth * 0.3 + "px",
            listQuery: {
                page: 1,
                limit: 20,
                case_number: null
            }
        }
    },
    methods: {
        handleTableChange(row) {
            this.selectSn = row;
        },
        payBill() {
            this.$refs["PatientPrice"].showAdd(this.listQuery.case_number);
        },
        cancelBill() {
            if(this.selectSn == null) {
                this.$message.error("请选择收费单!");
                return;
            }
            if(this.selectSn.state == -1) {
                this.$message.error("收费单已作废!");
                return;
            }
            PatientApi.cancelBill(this.selectSn).then(data => {
                if (data.error === "success") {
                    this.$message({
                        type: "success",
                        message: "作废成功!"
                    });
                    this.selectSn = null;
                    this.getData();
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
        formatterState(row, column, value) {
            if(row.state == 0) {
                return "未收费";
            } else if(row.state == 1) {
                return "正常收费";
            } else if(row.state == 2) {
                return "收欠款";
            } else if(row.state == -1) {
                return "已作废";
            }
        },
        formatterDate(row, column, value) {
            return parseTime(value);
        },
        showORnoshow(flag, case_number, onlyShow, edit) {
            if(edit == true) {
                this.edit = true;
            }
            this.flag = flag;
            if(case_number != null && case_number != "") {
                this.listQuery.case_number = case_number;
                if(onlyShow) {
                    this.onlyShow = true;
                } else {
                    this.onlyShow = false;
                }
			} else {
				this.onlyShow = true;
				return;
            }
            this.getData();
        },
        getData() {
            this.listLoading = true;
            PatientApi.payList(this.listQuery.page, this.listQuery.limit, this.listQuery.case_number).then(data => {
                this.listLoading = false;
                if (data.error === "success") {
                    this.list = data.data.list;
                    this.total = data.data.total;
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
        // 分页导航
        handleCurrentChange(val) {
            this.listQuery.page = val;
            this.getData();
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        handleSizeChange(val) {
            this.listQuery.limit = val;
            this.getData();
        },
        handleCurrentChange(val) {
            this.listQuery.page = val;
            this.getData();
        }
    }
}
</script>


<style scoped>

.basic_information {
    background-color: white;
    height: 660px;
}
.basic_information2{
    height: 150px;
}
</style>

