<template>
    <div class="basic_information" id="CashierContent">
        <el-scrollbar style="height: 100%;">
            <div class="container" style="min-width: 1580px;">
                <el-table :data="list" border class="table" empty-text="没有任何记录" element-loading-text='给我一点时间'
                    v-loading='listLoading' ref="multipleTable" highlight-current-row>
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
            </div>
        </el-scrollbar>
    </div>
</template>

<script>
import * as PersonApi from '@/api/PersonApi';
import { parseTime } from "@/utils/formater";
export default {
    data() {
        return {
            list: [],
            listLoading: false,
            code: "",
            total: 0,
            listQuery: {
                page: 1,
                limit: 20
            }
        }
    },
    mounted() {
        document.getElementById("CashierContent").style.height = (document.body.clientHeight - 300) + "px";
    },
    methods: {
        show(code) {
            this.code = code;
            this.getData(code);
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
        getData(code) {
            PersonApi.getCashier(code, this.listQuery.page, this.listQuery.limit).then(data => {
                if(data.error == "success") {
                    this.list = data.data.list;
                    this.total = data.data.total;
                } else {
                    this.$emit("login")
                }
            })
        },
        handleSizeChange(val) {
            this.listQuery.limit = val;
            this.getData(this.code);
        },
        handleCurrentChange(val) {
            this.listQuery.page = val;
            this.getData(this.code);
        }
    }
}
</script>

<style scoped>

</style>

