<!-- 预约 -->
<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item><i class="el-icon-lx-calendar"></i>收费管理</el-breadcrumb-item>
              <el-breadcrumb-item>预约</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">        
                <el-date-picker v-model="listQuery.date" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
                <el-select v-model="listQuery.order_type" placeholder="预约类型" clearable="">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-lx-search" @click="search">搜索</el-button>
                <el-button type="primary" icon="el-icon-lx-add" @click="add">新增</el-button>
            </div>
            <el-table :data="list" border class="table" empty-text="没有任何记录" element-loading-text='给我一点时间'
                v-loading='listLoading' @sort-change="hanldeSort" @selection-change="handleSelectionChange"
                 ref="multipleTable" >
               <el-table-column prop="case_number" label="病历号" header-align="center"  align="center" sortable min-width="120">
                </el-table-column>
               <el-table-column prop="mobile" label="手机" header-align="center"  align="center" sortable min-width="120">
                </el-table-column>
                <el-table-column prop="docter_name" label="预约医生" header-align="center"  align="center" sortable min-width="80">
                </el-table-column>
                <el-table-column prop="order_type" label="就诊类型" align="center" header-align="center"  sortable  min-width="160" :formatter="formatterState">
                </el-table-column>
                <el-table-column prop="start_time" label="预约开始时间"  align="center" header-align="center" sortable  min-width="160" :formatter="formatterDate">
                </el-table-column>
                <el-table-column prop="end_time" label="预约结束时间"  align="center" header-align="center" sortable  min-width="160" :formatter="formatterDate">
                </el-table-column>
                <el-table-column prop="content" label="预约事项"  align="center" header-align="center" sortable  min-width="160">
                </el-table-column>
                <el-table-column prop="member_remark" label="预约备注"  align="center" header-align="center" sortable  min-width="160">
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @size-change='handleSizeChange' @current-change='handleCurrentChange' :current-page='listQuery.page' :page-sizes='[20,30, 50]' :page-size='listQuery.limit' layout='total, sizes, prev, pager, next, jumper' :total='total'>       
                </el-pagination>
            </div>
        </div> 
        <AppointEdit ref="AppointEdit" @refresh="getData"/>
    </div>
</template>

<script>
import AppointEdit from './AppointEdit';
import * as OrderApi from '@/api/OrderApi';
import { parseTime } from "@/utils/formater";
export default {
    components: { AppointEdit },
    data() {
        return {
            /**搜索数据 */
            list: [],
            options: [{ name: "初诊", value: 0 }, { name: "复诊", value: 1 }],
            total: null,
            listLoading: false,
            listQuery: {
                page: 1,
                limit: 20,
                sort: null,
                date: new Date(),
                order_type: ""
            }
        }
    },
    mounted() {
        this.getData();
    },
    methods: {
        add() {
            this.$refs["AppointEdit"].showAdd();
        },
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
        formatterState(row, column, value) {
            for (let i = 0; i < this.options.length; i++) {
                if (this.options[i].value == value) {
                return this.options[i].name;
                }
            }
        },
        getData() {
            this.listLoading = true;
            var year = (new Date(this.listQuery.date)).getFullYear();
            var month = (new Date(this.listQuery.date)).getMonth();
            if(month < 10) {
                month = "0" + (month + 1);
            }
            var day = (new Date(this.listQuery.date)).getDate();
            if(day < 10) {
                day = "0" + day;
            }
            OrderApi.listOrder(
                this.listQuery.page,
                this.listQuery.limit,
                this.listQuery.sort,
                year+"-"+month+"-"+day,
                this.listQuery.order_type
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

