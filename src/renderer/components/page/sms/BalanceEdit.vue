<template>
    <el-dialog :title="title" :visible.sync="editVisible" width="924px">
        <el-table :data="list" border class="table" empty-text="没有任何记录" element-loading-text='给我一点时间'
            v-loading='listLoading' ref="multipleTable" >
            <el-table-column prop="name" label="名称" header-align="center"  align="center" min-width="120">
            </el-table-column>
            <el-table-column prop="price" label="价格" header-align="center"  align="center" min-width="120">
                <template slot-scope="scope">
                    {{scope.row.price}}元/{{scope.row.quantity}}条
                </template>
            </el-table-column>
            <el-table-column prop="is_discount" label="打折" header-align="center"  align="center" min-width="80" :formatter="formatterDiscount">
                <template slot-scope="scope">
                    <el-tag type="success" v-if="scope.row.is_discount">是</el-tag>
                    <el-tag type="warning" v-else>否</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="cost_price" label="折扣" header-align="center"  align="center" min-width="80">
            </el-table-column>
            <el-table-column prop="remark" label="备注" header-align="center"  align="center" min-width="200">
            </el-table-column>
            <el-table-column label="操作" header-align="center" align="center" min-width="80">
                <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-edit" @click="handleDetail(scope.$index, scope.row)">购买</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="pagination">
            <el-pagination background @size-change='handleSizeChange' @current-change='handleCurrentChange' :current-page='listQuery.page' :page-sizes='[20,30, 50]' :page-size='listQuery.limit' layout='total, sizes, prev, pager, next, jumper' :total='total'>       
            </el-pagination>
        </div>

        <BalanceImage ref="BalanceImage" @refresh="success"/>
    </el-dialog>
</template>

<script>
import * as SMSApi from "@/api/SMSApi";
import BalanceImage from "./BalanceImage"
export default {
    components: { BalanceImage },
    data() {
        return {
            listLoading: false,
            list: [],
            total: null,
            title: '购买',
            editVisible: false,
            listQuery: {
                page: 1,
                limit: 20
            }
        }
    },
    methods: {
        formatterDiscount(row, column, value) {
            if(row.is_discount) {
                return '是';
            } else {
                return '否';
            }
        },
        show() {
            this.editVisible = true;
            this.getInfo();
        },
        getInfo() {
            SMSApi.packageList(this.listQuery.page, this.listQuery.limit).then(data => {
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
            })
        },
        success() {
            this.editVisible = false;
            this.$emit("refresh");
        },
        handleDetail(index, row) {
            SMSApi.buyer(row.package_id).then(data => {
                if(data.error == "success") {
                    SMSApi.wxUniformOrders(data.data.orderSn).then(res => {
                        if(res.error == "success") {
                            this.$refs["BalanceImage"].showImage(res.data.url, res.data.total_fee, res.data.orderSn);
                        } else {
                            this.$message.error(res.error);
                        }
                    })
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
            })
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

</style>
