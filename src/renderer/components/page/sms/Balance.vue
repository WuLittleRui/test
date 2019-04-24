 <!-- 管理员 -->
<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item><i class="el-icon-lx-calendar"></i>消息推送</el-breadcrumb-item>
              <el-breadcrumb-item>短信余额</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-lx-add" @click="handleAdd">购买</el-button>
                <span>剩余数量: {{balance}}</span>
            </div>
            <el-table :data="list" border class="table" empty-text="没有任何记录" element-loading-text='给我一点时间'
                v-loading='listLoading' @sort-change="hanldeSort" @selection-change="handleSelectionChange"
                 ref="multipleTable" >
                <el-table-column prop="package_name" label="套餐名" header-align="center"  align="center" min-width="120">
                </el-table-column>
                <el-table-column  label="价格" header-align="center"  align="center" min-width="120">
                  <template slot-scope="scope">
                    {{scope.row.price}}元/{{scope.row.quantity}}条
                  </template>
                </el-table-column>
                <el-table-column prop="status" label="状态" header-align="center"  align="center" min-width="120">
                  <template slot-scope="scope">
                    <span v-if="scope.row.status == 0">待付款</span>
                    <span v-if="scope.row.status == 2">付款成功</span>
                    <span v-if="scope.row.status == -1">取消付款</span>
                  </template>
                </el-table-column>
                <el-table-column prop="create_time" label="创建时间" header-align="center"  align="center" min-width="120">
                  <template slot-scope="scope">
                    {{scope.row.create_time | parseTime('{y}-{m}-{d} {h}:{i}')}}
                  </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @size-change='handleSizeChange' @current-change='handleCurrentChange' :current-page='listQuery.page' :page-sizes='[20,30, 50]' :page-size='listQuery.limit' layout='total, sizes, prev, pager, next, jumper' :total='total'>       
                </el-pagination>
            </div>
        </div> 
        <BalanceEdit ref="Balance" @refresh="getData"/>
    </div>
</template>

<script>
import BalanceEdit from "./BalanceEdit";
import * as SMSApi from "@/api/SMSApi";
import * as OauthApi from "@/api/OauthApi";
export default {
  name: "sms",
  components: { BalanceEdit },
  data() {
    return {
      /**搜索数据 */
      list: [],
      balance: 0,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        sort: null,
        searchKey: "",
        state: null
      }
    };
  },
  mounted() {
      this.getData();
  },
  methods: {
    handleAdd() {
      this.$refs["Balance"].show();
    },
    formatterPackage(row, column, value) {
        if(row.type == "0") {
            return "赠送套餐包";
        } else {
            return "购买套餐包";
        }
    },
    formatterState(row, column, value) {
        var to = new Date(Date.parse(row.to_time));;
        if(to < new Date()) {
            return "已过期";
        } else {
            return "有效";
        }
    },
    // 分页导航
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getData();
    },
    getData() {
      this.listLoading = true;
      SMSApi.Balancelist(
        this.listQuery.page,
        this.listQuery.limit
      ).then(data => {
        this.listLoading = false;
        if (data.error === "success") {
          this.total = data.data.total;
          this.list = data.data.list;
          this.balance = data.data.quantity;
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
    hanldeSort(sort) {
      this.listQuery.sort =
        sort.prop + sort.order == "ascending" ? "" : " desc";
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
};
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
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
</style>
