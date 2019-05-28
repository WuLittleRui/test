  <!-- 预约 -->
<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item><i class="el-icon-lx-calendar"></i>统计中心</el-breadcrumb-item>
              <el-breadcrumb-item>医生收款统计</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">       
                <el-date-picker v-model="listQuery.time" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker> 
                <el-input style="width: 220px" v-model="listQuery.docter_name" class="handle-input mr10" clearable placeholder="请输入医生姓名"></el-input>
                <el-input style="width: 220px" v-model="listQuery.docter_mobile" class="handle-input mr10" clearable placeholder="请输入医生手机号"></el-input>
                <el-button type="primary" icon="el-icon-lx-search" @click="search">搜索</el-button>
                <el-button type="primary" icon="el-icon-lx-search" :loading="downloadLoading" @click="print">EXCEL</el-button>
            </div>
            <el-table :height="tableheight" :data="list" border class="table" empty-text="没有任何记录" element-loading-text='给我一点时间'
                v-loading='listLoading' @sort-change="hanldeSort" @selection-change="handleSelectionChange"
                 ref="multipleTable" >
               <el-table-column prop="docter_name" label="医生姓名" header-align="center"  align="center" sortable min-width="120">
                </el-table-column>
               <el-table-column prop="docter_mobile" label="医生手机号" header-align="center"  align="center" sortable min-width="120">
                </el-table-column>
                <el-table-column prop="amount" label="总金额" header-align="center"  align="center" sortable min-width="80">
                </el-table-column>
                <el-table-column prop="cost_amount" label="总折扣金额" header-align="center"  align="center" sortable min-width="80">
                </el-table-column>
                <el-table-column prop="receive_amount" label="总实收金额" header-align="center"  align="center" sortable min-width="80">
                </el-table-column>
                <el-table-column prop="arrear_amount" label="总欠费" header-align="center"  align="center" sortable min-width="80">
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
import * as DocterCollectApi from '@/api/DocterCollectApi';
import { parseTime } from "@/utils/formater";
import * as OauthApi from "@/api/OauthApi";
export default {
    components: {  },
    data() {
        return {
            /**搜索数据 */
            list: [],
            downloadLoading: false,
            tableheight: document.body.clientHeight * 0.45 + "px",
            total: null,
            listLoading: false,
            listQuery: {
                page: 1,
                limit: 20,
                sort: null,
                docter_mobile: "",
                docter_name: "",
                time: []
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
        print(){
            var start_time = "";
            var end_time = "";
            if(this.listQuery.time.length > 0) {
                start_time = this.listQuery.time[0];
                end_time = this.listQuery.time[1];
            }
            DocterCollectApi.all(
                this.listQuery.page,
                this.listQuery.limit,
                this.listQuery.sort,
                this.listQuery.docter_mobile,
                this.listQuery.docter_name,
                start_time,
                end_time
            ).then(data => {
                if (data.error === "success") {
                    this.downLoad(data.data);
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
                    console.log(data)
                    this.$message.error(data.error);
                }
            });
        },
        downLoad(problem) {
            this.downloadLoading = true;
            import("@/utils/vendor/Export2Excel").then(excel => {
                var vip = false;
                const tHeader = [
                "医生姓名",
                "医生手机号",
                "总金额",
                "总折扣金额",
                "总实收金额",
                "总欠费"
                ];

                const filterVal = [
                "docter_name",
                "docter_mobile",
                "amount",
                "cost_amount",
                "receive_amount",
                "arrear_amount"
                ];
                const data = this.formatJson(filterVal, problem);
                excel.export_json_to_excel({
                    header: tHeader,
                    data,
                    filename: "医生收款统计"
                });
                this.downloadLoading = false;
            });
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v =>
                filterVal.map(j => {
                if (j === "timestamp") {
                    return parseTime(v[j]);
                } else {
                    return v[j];
                }
                })
            );
        },
        getData() {
            this.listLoading = true;
            var start_time = "";
            var end_time = "";
            if(this.listQuery.time.length > 0) {
                start_time = this.listQuery.time[0];
                end_time = this.listQuery.time[1];
            }
            DocterCollectApi.list(
                this.listQuery.page,
                this.listQuery.limit,
                this.listQuery.sort,
                this.listQuery.docter_mobile,
                this.listQuery.docter_name,
                start_time,
                end_time
            ).then(data => {
                this.listLoading = false;
                if (data.error === "success") {
                    this.total = data.data.total;
                    this.list = data.data.list;
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
                    console.log(data)
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

