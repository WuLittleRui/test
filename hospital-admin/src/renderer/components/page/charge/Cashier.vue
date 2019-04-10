<!-- 收银中心 -->
<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item><i class="el-icon-lx-calendar"></i>收费管理</el-breadcrumb-item>
              <el-breadcrumb-item>收银中心</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="listQuery.case_number" class="handle-input mr10" clearable placeholder="请输入病历号" />
                <el-button type="primary" icon="el-icon-lx-search" @click="search">搜索</el-button>
            </div>
            <CashierEdit ref="CashierEdit" @refresh="getData" />
        </div> 
    </div>
</template>

<script>
import CashierEdit from "./CashierEdit";
import * as CashierApi from "@/api/CashierApi";
import { parseTime } from "@/utils/formater";
export default {
    components: { CashierEdit },
    data() {
        return {
            total: 0,
            list: [],
            listLoading: false,
            flag: false,
            selectSn: null,
            onlyShow: false,
            listQuery: {
                page: 1,
                limit: 20,
                case_number: null,
                mobile: ""
            }
        }
    },
    mounted() {
        this.handleCashier();
    },
    methods: {
        handleCashier() {
            this.$refs["CashierEdit"].showAdd(this.listQuery.case_number);
        },
        search() {
            this.listQuery.page = 1;
            this.handleCashier();
        }
    }
}
</script>


<style scoped>
.handle-select {
  width: 120px;
}
.handle-box {
  margin-bottom: 20px;
}
.handle-input {
  width: 300px;
  display: inline-block;
}
</style>

