<!-- 入库记录 -->
<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item><i class="el-icon-lx-calendar"></i>库存中心</el-breadcrumb-item>
              <el-breadcrumb-item>入库记录</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-date-picker value-format="yyyy-MM-dd" v-model="listQuery.time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                <el-button type="primary" icon="el-icon-lx-search" @click="search">搜索</el-button>
                <el-button type="primary" icon="el-icon-download" @click="handleDownload" :loading="downloadLoading">导出表格</el-button>
            </div>
            <el-table :height="tableheight" :data="list" border class="table" empty-text="没有任何记录" element-loading-text='给我一点时间'
                v-loading='listLoading' @sort-change="hanldeSort"
                 ref="multipleTable" >
                 <el-table-column type="expand">
                  <template slot-scope="props">
                        <el-form label-position="left" inline class="table-expand">
                          <el-form-item label="入库类型">
                                <span>{{ props.row.operate_type | formatterState(typeList) }}</span>
                            </el-form-item>
                          <el-form-item label="入库成本">
                                <span>{{ props.row.purchase_price }}</span>
                            </el-form-item>
                            <el-form-item label="订单流水号" v-if="props.row.order_sn !== null && props.row.order_sn !== '' && props.row.order_sn !== undefined">
                                <span>{{ props.row.order_sn }}</span>
                            </el-form-item>
                        </el-form>
                  </template>
                </el-table-column>
                <el-table-column prop="sn" label="流水号" header-align="center"  align="center" sortable min-width="120">
                </el-table-column>
                <el-table-column prop="name" label="名称" header-align="center"  align="center" sortable min-width="120">
                </el-table-column>
                <el-table-column prop="number" label="入库数量" header-align="center"  align="center" sortable min-width="80">
                </el-table-column>
                <el-table-column prop="operator_name" label="操作人" header-align="center"  align="center" sortable min-width="80">
                </el-table-column>
                <el-table-column prop="create_time" label="日志时间" align="center" header-align="center"  sortable  min-width="160" :formatter="formatterDate">
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
import * as HodpitalStoreLogDetailApi from "../../../api/HodpitalStoreLogDetailApi";
import * as OauthApi from "../../../api/OauthApi";
import { parseTime } from "../../../utils/formater";
export default {
  name: "In_Materials",
  data() {
    return {
      type:1,
      multipleSelection: [],
      tableheight: document.body.clientHeight * 0.45 + "px",
      typeList: [
        { name: "采购", value: 1 },
        { name: "借用", value: 2 },
        { name: "订单", value: 3 },
        { name: "报损", value: 4 }
      ],
      /**搜索数据 */
      list: [],
      total: null,
      listLoading: true,
      downloadLoading: false,
      listQuery: {
        page: 1,
        limit: 20,
        sort: null,
        searchKey: "",
        state: null,
        time: [],
        start_time: "",
        end_time: ""
      }
    };
  },
  async mounted() {
    this.getData();
  },
  methods: {
    //导出表格
    handleDownload() {
      if(this.listQuery.time.length === 0) {
        this.$message.error("请选择时间范围");
        return;
      }
     //导出表格
   
      this.downloadLoading = true
      var fileName = "出库信息";
      import('../../../vendor/Export2Excel').then(excel => {    
      const tHeader = ['流水号', '物料名称', '入库数量', '入库类型', '入库成本','操作人', '订单流水号', '日志时间']
        const filterVal = ['materials_sn', 'materials_name', 'number', 'operate_type', 'purchase_price', 'operator_name','order_sn','create_time']
        
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: fileName
        })
        this.downloadLoading = false
        
      })
    
    },
       formatJson(filterVal, jsonData) {
       return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "create_time") {
            return parseTime(v[j]);
          } else if (j === "operate_type") {
            for (let i = 0; i < this.typeList.length; i++) {
              if (this.typeList[i].value == v[j]) {
                return this.typeList[i].name;
              }
            }
          } else {
            return v[j];
          }
        })
      );
    },
    // 分页导航
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getData();
    },
    getData() {
      if(this.listQuery.time.length > 0) {
        this.listQuery.start_time = this.listQuery.time[0];

        this.listQuery.end_time = this.listQuery.time[1];
      }
      this.listLoading = true;
      HodpitalStoreLogDetailApi.listOutMaterialsLogApi(
        this.type,
        this.listQuery.searchKey,
        this.listQuery.page,
        this.listQuery.limit,
        this.listQuery.sort,
        this.listQuery.start_time,
        this.listQuery.end_time
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
    formatterType(value) {
      for (let i = 0; i < this.typeList.length; i++) {
        if (this.typeList[i].value == value.operate_type) {
          return this.typeList[i].name;
        }
      }
    },
    formatterDate(row, column, value) {
      return parseTime(value);
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
