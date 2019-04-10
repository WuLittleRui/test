<!-- 物料管理 -->
<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item>库存中心</el-breadcrumb-item>
              <el-breadcrumb-item>产生采购单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-lx-delete" class="handle-del mr10" v-if="auth.MATERIALS_DELETE" @click="delAll">批量删除</el-button>            
                <el-input v-model="listQuery.searchKey" placeholder="筛选关键字" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-lx-search" @click="search">搜索</el-button>
                <el-button type="primary" icon="el-icon-lx-add" @click="add" v-if="auth.MATERIALS_ADD">新增</el-button>
            </div>
            <el-table :data="list" border class="table" empty-text="没有任何记录" element-loading-text='给我一点时间'
                v-loading='listLoading' @sort-change="hanldeSort" @selection-change="handleSelectionChange"
                 ref="multipleTable" >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="projectName" label="项目名称" header-align="center"  align="center" sortable min-width="120">
                </el-table-column>
                <el-table-column prop="unit" label="单位" header-align="center"  align="center" sortable min-width="120">
                </el-table-column>
                <el-table-column prop="standard" label="规格" header-align="center"  align="center" sortable min-width="120">
                </el-table-column>
                <el-table-column label="操作"  header-align="center" align="center"  min-width="160"  v-if="auth.MATERIALS_EDIT &&  auth.MATERIALS_DELETE">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)" v-if="auth.MATERIALS_EDIT" >编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" v-if="auth.MATERIALS_DELETE" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @size-change='handleSizeChange' @current-change='handleCurrentChange' :current-page='listQuery.page' :page-sizes='[20,30, 50]' :page-size='listQuery.limit' layout='total, sizes, prev, pager, next, jumper' :total='total'>       
                </el-pagination>
            </div>
        </div> 
              <SelectProduct ref="selectProduct" @submit="addToPackage" :product_type="selectProductType" :to_type="to_type" />
    </div>
</template>

<script>
    import SelectProduct from "../common/SelectProduct";
import * as HospitalStoreProjectApi from "../../../api/HospitalStoreProjectApi";
import * as OauthApi from "../../../api/OauthApi";
import { parseTime } from "../../../utils/formater";
export default {
  name: "materials",
  components: { SelectProduct },
  data() {
    return {
     to_type:0,
     package_list: [], //商品包列表
     selectProductType: [0, 1],
      multipleSelection: [],
      typeList: [{ name: "限时促销", value: 1 }, { name: "拼团促销", value: 2 }],
      /**搜索数据 */
      list: [],
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        sort: null,
        searchKey: ""
      },
      auth: {
        MATERIALS_ADD: false,
        MATERIALS_DELETE: false,
        MATERIALS_EDIT: false,
      },
    };
  },
  async mounted() {
    //初始化权限
    this.auth.MATERIALS_DELETE = await OauthApi.checkAuthorities(
      "PURCHASING"
    );
    this.auth.MATERIALS_ADD = await OauthApi.checkAuthorities(
      "PURCHASING"
    );
    this.auth.MATERIALS_EDIT = await OauthApi.checkAuthorities(
      "PURCHASING"
    );
    this.getData();
  },
  methods: {
        addToPackage(selection) {
                selection.forEach(row => {
                    let exists = this.package_list.some(item => {
                        return item.pid == row.pid;
                    });
                    if (!exists) {
                        this.package_list.push({
                            pid: row.pid,
                            product_name: row.product_name,
                            unit_price: row.unit_price,
                            quantity: 1
                        });
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
      HospitalStoreProjectApi.listMaterials(
        this.listQuery.searchKey,
        this.listQuery.page,
        this.listQuery.limit,
        this.listQuery.sort
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
    //添加按钮
    add() {
       this.$refs["selectProduct"].showDialog();
    },
    hanldeSort(sort) {
      this.listQuery.sort =
        sort.prop + (sort.order == "ascending" ? "" : " desc");
      this.getData();
    },
    handleEdit(index, row) {
      this.$refs["SelectProduct"].showEdit(row.projectId);
    },
    handleDelete(index, row) {
      this.$confirm(
        "此操作将永久删除该促销[" + row.projectName + "], 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        HospitalStoreProjectApi.deleteMaterials([row.projectId]).then(res => {
          if (res.error === "success") {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
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
        const materials_id = [];
        await this.multipleSelection.forEach((v, i) => {
          materials_id.push(v.projectId);
        });
        HospitalStoreProjectApi.deleteMaterials(materials_id).then(res => {
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
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
</style>
