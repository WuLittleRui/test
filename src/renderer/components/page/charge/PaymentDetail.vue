<template>
    <!-- 编辑弹出框 -->
    <el-dialog :title="title" :visible.sync="editVisible" width="50%">
        <div class="handle-box">  
            <el-date-picker
                clearable
                v-model="listQuery.date"
                value-format="yyyy-MM-dd"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
            <el-select clearable v-model="listQuery.seq_flag" placeholder="请选择操作类型">
                <el-option
                v-for="item in seqFlag"
                :key="item.value"
                :label="item.name"
                :value="item.value">
                </el-option>
            </el-select>
            <el-select clearable v-model="listQuery.type" placeholder="请选择类型"> 
                <el-option
                v-for="item in type"
                :key="item.value"
                :label="item.name"
                :value="item.value">
                </el-option>
            </el-select>
            <el-button type="primary" icon="el-icon-lx-search" @click="search">搜索</el-button>
        </div>
        <el-table :data="list" border class="table" empty-text="没有任何记录" element-loading-text='给我一点时间'
            v-loading='listLoading' @sort-change="hanldeSort" @selection-change="handleSelectionChange"
                ref="multipleTable" >
            <el-table-column prop="mobile" label="手机号" header-align="center"  align="center" sortable min-width="120">
            </el-table-column>
            <el-table-column prop="surplus" label="操作金额" header-align="center"  align="center" sortable min-width="120">
            </el-table-column>
            <el-table-column prop="amount" label="结余余额" header-align="center"  align="center" sortable min-width="80">
            </el-table-column>
            <el-table-column prop="operate_type" label="类型" header-align="center"  align="center" sortable min-width="80" :formatter="formatterType">
            </el-table-column>
            <el-table-column prop="pay_type_name" label="支付方式" header-align="center"  align="center" sortable min-width="80">
            </el-table-column>
            <el-table-column prop="seq_flag" label="操作类型" header-align="center"  align="center" sortable min-width="80" :formatter="formatterSeqFlag">
            </el-table-column>
            <el-table-column prop="create_time" label="操作时间" header-align="center"  align="center" sortable min-width="80" :formatter="formatterDate">
            </el-table-column>
            <el-table-column prop="remark" label="备注" header-align="center"  align="center" sortable min-width="80">
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination background @size-change='handleSizeChange' @current-change='handleCurrentChange' :current-page='listQuery.page' :page-sizes='[20,30, 50]' :page-size='listQuery.limit' layout='total, sizes, prev, pager, next, jumper' :total='total'>       
            </el-pagination>
        </div>

        <span slot="footer" class="dialog-footer">
            <el-button @click="editVisible = false">确 定</el-button>
        </span>
    </el-dialog>
    
</template>

<script>
import * as MemberCurrencyApi from '@/api/MemberCurrencyApi';
import { parseTime } from "@/utils/formater";
import * as OauthApi from "@/api/OauthApi";
export default {
    data() {
        return {
            editVisible: false,
            title: "日志",
            list: [],
            seqFlag: [{"name": '进账', value : 1}, {"name": '出账', value : 0}],
            type: [{"name": '储值卡', value : 1}, {"name": '赠送', value : 2}, {"name": '订单交易', value : 3}, {"name": '管理员调账', value : 4}, {"name": '其他', value : 5}],
            total: null,
            listLoading: false,
            mid: null,
            listQuery: {
                page: 1,
                limit: 20,
                sort: null,
                date: "",
                seq_flag: "",
                type: ""
            }
        }
    },
    methods: {
        formatterDate(row, column, value) {
            return parseTime(value);
        },
        formatterSeqFlag(row, column, value) {
            for (let i = 0; i < this.seqFlag.length; i++) {
                if (this.seqFlag[i].value == value) {
                return this.seqFlag[i].name;
                }
            }
        },
        formatterType(row, column, value) {
            for (let i = 0; i < this.type.length; i++) {
                if (this.type[i].value == value) {
                return this.type[i].name;
                }
            }
        },
        formatterState(row, column, value) {
            for (let i = 0; i < this.stateList.length; i++) {
                if (this.stateList[i].value == value) {
                return this.stateList[i].name;
                }
            }
        },
        search() {
            this.listQuery.page = 1;
            this.getData(this.mid);
        },
        showEdit(mid) {
            this.getData(mid);
            this.editVisible = true;
        },
         // 分页导航
        handleCurrentChange(val) {
            this.listQuery.page = val;
            this.getData(this.mid);
        },
        getData(mid) {
            this.listLoading = true;
            var s = "";
            var e = "";
            if(this.listQuery.date.length > 0) {
                s = this.listQuery.date[0];
                e = this.listQuery.date[1];
            }
            MemberCurrencyApi.detail(mid, this.listQuery.page, this.listQuery.limit, this.listQuery.sort, s, e, this.listQuery.seq_flag, this.listQuery.type).then(data => {
                this.listLoading = false;
                if(data.error == "success") {
                    this.mid = mid;
                    this.list = data.data.list;
                    this.total = data.data.total;
                } else if (
                    data.error === "invaild_token" ||
                    data.error === "not_login"
                ) {
                //判断是否认证过期
                    OauthApi.logOut();
                    this.$router.push("/login");
                }  else {
                    this.$message.error(data.error);
                }
            })
        },
        hanldeSort(sort) {
            this.listQuery.sort =
                sort.prop + (sort.order == "ascending" ? "" : " desc");
            this.getData(this.mid);
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        handleSizeChange(val) {
            this.listQuery.limit = val;
            this.getData(this.mid);
        },
        handleCurrentChange(val) {
            this.listQuery.page = val;
            this.getData(this.mid);
        }
    }
}
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

</style>
