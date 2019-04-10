<!-- 预约 -->
<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item><i class="el-icon-lx-calendar"></i>收费管理</el-breadcrumb-item>
              <el-breadcrumb-item>预付款管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">        
                <el-input v-model="listQuery.mobile" class="handle-input mr10" placeholder="请输入手机号"></el-input>
                <el-button type="primary" icon="el-icon-lx-search" @click="search">搜索</el-button>
                <el-button type="success" icon="el-icon-edit" @click="handleAdd()">添加</el-button>
            </div>
            <el-table :data="list" border class="table" empty-text="没有任何记录" element-loading-text='给我一点时间'
                v-loading='listLoading' @sort-change="hanldeSort" @selection-change="handleSelectionChange"
                 ref="multipleTable" >
               <el-table-column prop="case_number" label="病历号" header-align="center"  align="center" sortable min-width="120">
                </el-table-column>
               <el-table-column prop="mobile" label="手机" header-align="center"  align="center" sortable min-width="120">
                </el-table-column>
                <el-table-column prop="balance" label="金额" header-align="center"  align="center" sortable min-width="80">
                </el-table-column>
                <el-table-column label="操作"  header-align="center" align="center"  min-width="160">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleDele(scope.$index, scope.row)">扣款</el-button>
                        <el-button type="text" icon="el-icon-edit" @click="handleAddAmount(scope.$index, scope.row)">充值</el-button>
                        <el-button type="text" icon="el-icon-edit" @click="handleDetail(scope.$index, scope.row)">日志</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @size-change='handleSizeChange' @current-change='handleCurrentChange' :current-page='listQuery.page' :page-sizes='[20,30, 50]' :page-size='listQuery.limit' layout='total, sizes, prev, pager, next, jumper' :total='total'>       
                </el-pagination>
            </div>
        </div> 
        <PaymentEdit ref="PaymentEdit" @refresh="getData"/>
        <PaymentDetail ref="PaymentDetail" @refresh="getData"/>
    </div>
</template>

<script>
import PaymentDetail from './PaymentDetail';
import PaymentEdit from './PaymentEdit';
import * as OauthApi from "@/api/OauthApi";
import * as MemberCurrencyApi from '@/api/MemberCurrencyApi';
import { parseTime } from "@/utils/formater";
export default {
    components: { PaymentEdit, PaymentDetail },
    data() {
        return {
            /**搜索数据 */
            list: [],
            total: null,
            listLoading: false,
            listQuery: {
                page: 1,
                limit: 20,
                sort: null,
                mobile: '',
                mobile: '',
                case_number: ''
            }
        }
    },
    mounted() {
        this.getData();
    },
    methods: {
        handleAdd() {
            this.$refs["PaymentEdit"].showAdd();
        },
        handleAddAmount(index, row) {
            this.$refs["PaymentEdit"].showEdit(row.mid, 1);
        },
        handleDele(index, row) {
            this.$refs["PaymentEdit"].showEdit(row.mid, 0);
        },
        handleDetail(index, row) {
            this.$refs["PaymentDetail"].showEdit(row.mid);
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
            MemberCurrencyApi.list(
                this.listQuery.page,
                this.listQuery.limit,
                this.listQuery.sort,
                this.listQuery.mobile,
                this.listQuery.case_number
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

