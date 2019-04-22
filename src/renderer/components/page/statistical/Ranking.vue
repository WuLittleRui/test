 <!-- 商品销售 -->
<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item><i class="el-icon-lx-calendar"></i>统计中心</el-breadcrumb-item>
              <el-breadcrumb-item>项目销售排行榜</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">        
            <el-date-picker
                v-model="listQuery.time"
                value-format="yyyy-MM-dd"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
            <el-button type="primary" icon="el-icon-lx-search" @click="search">搜索</el-button>
        </div>
        <div class="container">
            <el-table :data="list" border class="table" empty-text="没有任何记录" element-loading-text='给我一点时间'
                v-loading='listLoading' @sort-change="hanldeSort"
                 ref="multipleTable" >
                <el-table-column prop="name" label="项目名称" header-align="center"  align="center" min-width="120">
                </el-table-column>
                <el-table-column prop="unit_price" label="单价" header-align="center"  align="center" min-width="160">
                </el-table-column>
                <el-table-column prop="sell_quantity" label="销售数量" header-align="center"  align="center" min-width="160">
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
 
import * as RecordApi from "../../../api/RecordApi";

export default {
  name: "sort",
  components: { },
  data() {
    return {
      /**搜索数据 */
      list: [],
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        sort: null,
        time: []
      }
    };
  },
  async mounted() {
    this.getData();
  },
  methods: {
    search() {
        this.listQuery.page = 1;
        this.getData();
    },
    // 分页导航
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getData();
    },
    handleShow(row, stock) {
      this.$refs["ServiceEdit"].showNew(row);
    },
    getData() {
      var start = "";
      var end = "";
      if(this.listQuery.time.length > 0) {
          start = this.listQuery.time[0];
          end = this.listQuery.time[1];
      }
      this.listLoading = true;
      RecordApi.getShopSaleSort(this.listQuery.page, this.listQuery.limit, this.listQuery.sort, start, end).then(data => {
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
    hanldeSort(sort) {
      this.listQuery.sort =
        sort.prop + (sort.order == "ascending" ? "" : " desc");
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
.table-expand {
  font-size: 0;
}
.table-expand >>> label {
  width: 120px;
  color: #909399;
  font-size: 12px;
}
.table-expand >>> .el-form-item__content {
  font-size: 12px;
}
.table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 33%;
}
</style>
