  <!-- 预约 -->
<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item><i class="el-icon-lx-calendar"></i>财务管理</el-breadcrumb-item>
              <el-breadcrumb-item>收款记录</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">        
                <el-date-picker
                    v-model="listQuery.time"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
                <el-input v-model="listQuery.case_number" clearable placeholder="病历号" class="handle-input mr10"></el-input>
                <el-input v-model="listQuery.mobile" clearable placeholder="手机号" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-lx-search" @click="search">搜索</el-button>
            </div>
            <el-table :data="list" border class="table" empty-text="没有任何记录" element-loading-text='给我一点时间'
                v-loading='listLoading' ref="multipleTable" highlight-current-row @current-change="handleTableChange">
                <el-table-column prop="sn" label="单据号" header-align="center"  align="center" min-width="170">
                </el-table-column>
                <el-table-column prop="case_number" label="患者病历号" align="center" header-align="center" min-width="120">
                </el-table-column>
                <el-table-column prop="mobile" label="患者手机号" align="center" header-align="center" min-width="120">
                </el-table-column>
                <el-table-column prop="docter_name" label="医生" align="center" header-align="center" min-width="70">
                </el-table-column>
                <el-table-column prop="cashier_name" label="收款员" align="center" header-align="center" min-width="70">
                </el-table-column>
                <el-table-column prop="nurse_name" label="护士" align="center" header-align="center" min-width="70">
                </el-table-column>
                <el-table-column prop="amount" label="本次费用" align="center" header-align="center" min-width="80">
                </el-table-column>
                <el-table-column prop="receive_amount" label="实收金额" align="center" header-align="center" min-width="80">
                </el-table-column>
                <el-table-column prop="cost_amount" label="折扣金额" align="center" header-align="center" min-width="80">
                </el-table-column>
                <el-table-column prop="arrear_amount" label="欠费" align="center" header-align="center" min-width="80">
                </el-table-column>
                <el-table-column :prop="item.pay_type_name" :label="item.pay_type_name" header-align="center"  align="center" min-width="100" v-for="item in paylist">
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
    </div>
</template>
<script>
import * as ArrearsApi from '@/api/ArrearsApi';
import { parseTime } from "@/utils/formater";
import * as OauthApi from "@/api/OauthApi";
export default {
    components: {  },
    data() {
        return {
            /**搜索数据 */
            list: [],
            total: null,
            listLoading: false,
            paylist: [],
            listQuery: {
                page: 1,
                limit: 20,
                sort: null,
                time: "",
                mobile: "",
                case_number: ""
            }
        }
    },
    mounted() {
        this.getData();
    },
    methods: {
        hanldeSort(sort) {
            this.listQuery.sort =
                sort.prop + (sort.order == "ascending" ? "" : " desc");
            this.getData();
        },
        // 分页导航
        handleCurrentChange(val) {
        this.listQuery.page = val;
        this.getData();
        },
        getData() {
            this.listLoading = true;
            var start = "";
            var end = "";
            if(this.listQuery.time.length > 0) {
                start = this.listQuery.time[0];
                end = this.listQuery.time[1];
            }
            ArrearsApi.receive(
                this.listQuery.page,
                this.listQuery.limit,
                start,
                end,
                this.listQuery.mobile,
                this.listQuery.case_number
            ).then(data => {
                this.listLoading = false;
                if (data.error === "success") {
                this.total = data.data.total;
                this.list = data.data.list;
                this.paylist = data.data.paylist;
                } else if (
                data.error === "invaild_token" ||
                data.error === "not_login"
                ) {
                //判断是否认证过期
                OauthApi.logOut();
                this.$router.push("/login");
                } else if (data.error_description) {
                this.$message.error(data.error_description);
                } else {
                this.$message.error(data.error);
                }
            });
        },
        ///搜素按钮
        search() {
            this.listQuery.page = 1;
            this.getData();
        },
        formatterDate(row, column, value) {
            return parseTime(value);
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
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
</style>

