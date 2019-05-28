<!-- 库存列表 -->
<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item>库存中心</el-breadcrumb-item>
              <el-breadcrumb-item>库存列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">           
                <el-input v-model="listQuery.searchKey" placeholder="筛选关键字" class="handle-input mr10"></el-input>
                <el-select clearable class='handle-select mr10' v-model='listQuery.type' placeholder="请选择类型">
                    <el-option v-for='item in typeList' :key='item.value' :label='item.name' :value='item.value'>
                    </el-option>
                </el-select>     
                <el-button type="primary" icon="el-icon-lx-search" @click="search">搜索</el-button>
                <el-button type="primary" icon="el-icon-download" @click="handleDownload" :loading="downloadLoading">导出表格</el-button>
                <el-button type="primary" icon="el-icon-edit" @click="handleBatch">批量调整</el-button>
            </div>
            <el-table :height="tableheight" :data="list" border class="table" empty-text="没有任何记录" element-loading-text='给我一点时间'
                v-loading='listLoading' @sort-change="hanldeSort" @selection-change="handleSelectionChange"
                 ref="multipleTable" >
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="table-expand">
                            <el-form-item label="进货总数">
                                <span v-if="props.row.total_purchases !== undefined">{{ props.row.total_purchases }}</span>
                                <span v-else>0</span>
                            </el-form-item>
                            <el-form-item label="进货总额">
                                <span v-if="props.row.purchase_amount !== undefined">{{ props.row.purchase_amount }}</span>
                                <span v-else>0</span>
                            </el-form-item>
                            <el-form-item label="出库总数">
                                <span v-if="props.row.total_deliver !== undefined">{{ props.row.total_deliver }}</span>
                                <span v-else>0</span>
                            </el-form-item>
                            <el-form-item label="出库总额">
                                <span v-if="props.row.deliver_amount !== undefined">{{ props.row.deliver_amount }}</span>
                                <span v-else>0</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column prop="title" label="名称" header-align="center"  align="center" sortable min-width="120">
                </el-table-column>
                <el-table-column prop="materials_type" label="类型" header-align="center"  align="center" sortable min-width="120" :formatter="formatterType">
                </el-table-column>
                <el-table-column label="库存数量" header-align="center"  align="center" sortable min-width="120">
                  <template slot-scope="scope">
                    <span v-if="scope.row.stock_quantity !== undefined">{{ scope.row.stock_quantity }}</span>
                    <span v-else>0</span>
                  </template>
                </el-table-column>
                <el-table-column label="成本价" header-align="center"  align="center" sortable min-width="120">
                  <template slot-scope="scope">
                    <span v-if="scope.row.purchase_price !== undefined">{{ scope.row.purchase_price }}</span>
                    <span v-else>0</span>
                  </template>
                </el-table-column>
                <el-table-column label="预警数量" header-align="center"  align="center" sortable min-width="120">
                  <template slot-scope="scope">
                    <span v-if="scope.row.warning_quantity !== undefined">{{ scope.row.warning_quantity }}</span>
                    <span v-else>0</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作"  header-align="center" align="center"  min-width="160"  v-if="auth.STOCKLIST_EDIT &&  auth.STOCKLIST_EDIT">
                  <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)" v-if="auth.STOCKLIST_EDIT" >设置成本价</el-button>
                  </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @size-change='handleSizeChange' @current-change='handleCurrentChange' :current-page='listQuery.page' :page-sizes='[20,30, 50]' :page-size='listQuery.limit' layout='total, sizes, prev, pager, next, jumper' :total='total'>       
                </el-pagination>
            </div>
        </div> 
        <ListEdit ref="ListEdit" @refresh="getData" />

        <!-- 出入库 -->
        <MaterialsInventoryInOrOut ref="MaterialsInventoryInOrOut" @refresh="getData" />

        <!-- 批量出入库 -->
        <MaterialsInventoryBatchInOrOut ref="MaterialsInventoryBatchInOrOut" @refresh="getData" />
    </div>
</template>

<script>
import ListEdit from "./ListEdit";
import MaterialsInventoryBatchInOrOut from "./MaterialsInventoryBatchInOrOut";
import MaterialsInventoryInOrOut from "./MaterialsInventoryInOrOut";
import * as HospitalstoreInventoryApi from "../../../api/HospitalstoreInventoryApi";
import * as OauthApi from "../../../api/OauthApi";
import { parseTime } from "../../../utils/formater";
export default {
  name: "MaterialsInventory",
  components: {
    ListEdit,
    MaterialsInventoryInOrOut,
    MaterialsInventoryBatchInOrOut
  },
  data() {
    return {
      tableheight: document.body.clientHeight * 0.45 + "px",
      multipleSelection: [],
      typeList: [{ name: "商品", value: 1 }, { name: "物料", value: 2 }],
      /**搜索数据 */
      list: [],
      downloadLoading: false,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        sort: null,
        searchKey: "",
        type: ""
      },
      auth: {
        STOCKLIST_ADD: false,
        STOCKLIST_EDIT: false
      }
    };
  },
  async mounted() {
    this.auth.STOCKLIST_ADD = await OauthApi.checkAuthorities("STOCK_LIST");
    this.auth.STOCKLIST_EDIT = await OauthApi.checkAuthorities("STOCK_LIST");
    this.getData();
  },
  methods: {
    //导出表格
    handleDownload() {
      this.downloadLoading = true;
      HospitalstoreInventoryApi.exportExcel().then(data => {
        this.downloadLoading = false;
        if (data.error === "success") {
          var elemIF = document.createElement("iframe");
          elemIF.src = data.data.path;
          elemIF.style.display = "none";
          document.body.appendChild(elemIF);
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
    // 分页导航
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getData();
    },
    getData() {
      this.listLoading = true;
      HospitalstoreInventoryApi.listStock(
        this.listQuery.page,
        this.listQuery.limit,
        this.listQuery.sort,
        this.listQuery.searchKey,
        this.listQuery.type
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
    hanldeSort(sort) {
      this.listQuery.sort =
        sort.prop + (sort.order == "ascending" ? "" : " desc");
      this.getData();
    },
    formatterType(value) {
      for (let i = 0; i < this.typeList.length; i++) {
        if (this.typeList[i].value == value.materials_type) {
          return this.typeList[i].name;
        }
      }
    },
    handleEdit(index, row) {
      this.$refs["ListEdit"].showEdit(
        row.mp_id,
        row.title,
        row.materials_type
      );
    },
    handleBatch() {
      this.$refs["MaterialsInventoryBatchInOrOut"].showEdit();
    },
    handleOperate(index, row, type) {
      this.$refs["materialsInventoryInOrOut"].showEdit(
        row.inventory_id,
        row.title,
        type
      );
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
