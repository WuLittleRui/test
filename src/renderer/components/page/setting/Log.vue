<template>
    <div class="table">
        <div class="crumbs">            
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 系统设置</el-breadcrumb-item>
                <el-breadcrumb-item>系统日志</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-lx-delete" class="handle-del mr10" v-if="auth.SHOP_ADMIN_LOG_CLEAR" @click="delAll">批量删除</el-button>
                <el-date-picker v-model="listQuery.rangeDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>           
                <el-input v-model="listQuery.searchKey" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-lx-search" @click="search">搜索</el-button>                
            </div>
            <el-table :data="list" border class="table" empty-text="没有任何记录" element-loading-text='给我一点时间'
                v-loading='listLoading' @sort-change="hanldeSort" @selection-change="handleSelectionChange"
                 ref="multipleTable" >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="username" label="登录名"  header-align="center"  align="center" sortable min-width="120">
                </el-table-column>
                <el-table-column prop="operate_type" label="类型"  header-align="center"  align="center" sortable min-width="120">
                </el-table-column>
                <el-table-column prop="status" label="状态" header-align="center"  align="center" sortable min-width="160">
                </el-table-column>
                <el-table-column prop="ip_address" label="IP" header-align="center"  align="center" sortable min-width="160">
                </el-table-column>
                <el-table-column prop="create_time" label="操作时间"  align="center" header-align="center"  sortable  min-width="160" :formatter="formatterDate">
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
import * as ShopAdminLogApi from "../../../api/LogApi";
import * as OauthApi from "../../../api/OauthApi";
import { parseTime } from "../../../utils/formater";
export default {
  name: "shopadminlog",
  data() {
    return {
      multipleSelection: [],
      /**搜索数据 */
      list: [],
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        sort: null,
        searchKey: "",
        rangeDate: null
      },
      auth: {
        SHOP_ADMIN_LOG_CLEAR: false
      }
    };
  },
  async mounted() {
    //初始化权限
    this.auth.SHOP_ADMIN_LOG_CLEAR = await OauthApi.checkAuthorities(
      "LOG"
    );

    this.getData();
  },
  methods: {
    // 分页导航
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getData();
    },
    getData() {
      this.listLoading = true;
      console.log(this.listQuery);
      ShopAdminLogApi.listShopAdminLog(
        this.listQuery.rangeDate
          ? parseTime(this.listQuery.rangeDate[0], "{y}-{m}-{d}")
          : null,
        this.listQuery.rangeDate
          ? parseTime(this.listQuery.rangeDate[1], "{y}-{m}-{d}")
          : null,
        this.listQuery.searchKey,
        this.listQuery.page,
        this.listQuery.limit
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
    hanldeSort(sort) {
      this.listQuery.sort =
        sort.prop + sort.order == "ascending" ? "" : " desc";
      this.getData();
    },
    delAll() {
      const length = this.multipleSelection.length;
      if (length == 0) {
        this.$message({ type: "error", message: "请勾选需要删除的记录！" });
        return;
      }

      this.$confirm(
        "此操作将永久删除勾选的" + length + "条记录, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(async () => {
        let log_id = [];
        await this.multipleSelection.forEach((v, i) => {
          log_id.push(v.log_id);
        });
        //console.log(row);
        ShopAdminLogApi.deleteShopAdminLog(log_id).then(res => {
          if (res.error === "success") {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.multipleSelection = [];
            this.getData();
          } else {
            this.$message({
              type: "error",
              message: this.$t(res.error)
            });
          }
        });
      });
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
.del-dialog-cnt {
  font-size: 16px;
  text-align: center;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
</style>
