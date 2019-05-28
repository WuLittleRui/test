<!-- 管理员 -->
<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item><i class="el-icon-lx-calendar"></i>系统设置</el-breadcrumb-item>
              <el-breadcrumb-item>管理员列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-lx-delete" class="handle-del mr10" v-if="auth.SHOP_ADMIN_DELETE" @click="delAll">批量删除</el-button>
                <el-select clearable class='handle-select mr10' v-model='listQuery.state' placeholder="请选择状态">
                    <el-option v-for='item in stateList' :key='item.value' :label='item.name' :value='item.value'>
                    </el-option>
                </el-select>            
                <el-input v-model="listQuery.searchKey" placeholder="筛选关键字" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-lx-search" @click="search">搜索</el-button>
                <el-button type="primary" icon="el-icon-lx-add" @click="add" v-if="auth.SHOP_ADMIN_ADD">新增</el-button>
            </div>
            <el-table :height="tableheight" :data="list" border class="table" empty-text="没有任何记录" element-loading-text='给我一点时间'
                v-loading='listLoading' @sort-change="hanldeSort" @selection-change="handleSelectionChange"
                 ref="multipleTable" >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="username" label="登录名" header-align="center"  align="center" sortable min-width="120">
                </el-table-column>
                <el-table-column prop="mobile" label="手机" header-align="center"  align="center" sortable min-width="120">
                </el-table-column>
                <el-table-column prop="state" label="状态" header-align="center"  align="center" sortable min-width="80" :formatter="formatterState">
                </el-table-column>
                <el-table-column prop="join_time" label="加入时间" align="center" header-align="center"  sortable  min-width="160" :formatter="formatterDate">
                </el-table-column>
                <el-table-column prop="last_login_time" label="最后登录"  align="center" header-align="center" sortable  min-width="160" :formatter="formatterDate">
                </el-table-column>
                <el-table-column label="操作"  header-align="center" align="center"  min-width="160"  v-if="auth.SHOP_ADMIN_DELETE &&  auth.SHOP_ADMIN_EDIT">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)" v-if="auth.SHOP_ADMIN_EDIT" >编辑</el-button>
                        <el-button type="text" icon="el-icon-edit-outline" @click="handleRestPassword(scope.$index, scope.row)" v-if="auth.SHOP_ADMIN_REST_PASSWORD" >重置密码</el-button>
                        <el-button type="text" icon="el-icon-delete" v-if="auth.SHOP_ADMIN_DELETE && scope.row.root_admn == false " class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @size-change='handleSizeChange' @current-change='handleCurrentChange' :current-page='listQuery.page' :page-sizes='[20,30, 50]' :page-size='listQuery.limit' layout='total, sizes, prev, pager, next, jumper' :total='total'>       
                </el-pagination>
            </div>
        </div> 
        <ShopAdminEdit ref="shopAdminEdit" @refresh="getData" />
    </div>
</template>

<script>
import ShopAdminEdit from "./AdminEdit";
import * as ShopAdminApi from "../../../api/AdminApi";
import * as OauthApi from "../../../api/OauthApi";
import { parseTime } from "../../../utils/formater";
export default {
  name: "admin",
  components: { ShopAdminEdit },
  data() {
    return {
      multipleSelection: [],
      tableheight: document.body.clientHeight * 0.45 + "px",
      stateList: [{ name: "禁用", value: 0 }, { name: "启用", value: 1 }],
      /**搜索数据 */
      list: [],
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        sort: null,
        searchKey: "",
        state: null
      },
      auth: {
        SHOP_ADMIN_ADD: false,
        SHOP_ADMIN_DELETE: false,
        SHOP_ADMIN_EDIT: false,
        SHOP_ADMIN_REST_PASSWORD: false
      },
      firstpassword: "123456" //初始密码
    };
  },
  async mounted() {
    //初始化权限
    this.auth.SHOP_ADMIN_DELETE = await OauthApi.checkAuthorities(
      "ADMIN"
    );
    this.auth.SHOP_ADMIN_ADD = await OauthApi.checkAuthorities(
      "ADMIN"
    );
    this.auth.SHOP_ADMIN_EDIT = await OauthApi.checkAuthorities(
      "ADMIN"
    );
    this.auth.SHOP_ADMIN_REST_PASSWORD = await OauthApi.checkAuthorities(
      "ADMIN"
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
      ShopAdminApi.listShopAdmin(
        this.listQuery.searchKey,
        this.listQuery.state,
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
    //添加按钮
    add() {
      this.$refs["shopAdminEdit"].showNew();
    },
    formatterDate(row, column, value) {
      return parseTime(value);
    },
    formatterState(row, column, value) {
      for (let i = 0; i < this.stateList.length; i++) {
        if (this.stateList[i].value == value) {
          return this.stateList[i].name;
        }
      }
    },
    hanldeSort(sort) {
      this.listQuery.sort =
        sort.prop + sort.order == "ascending" ? "" : " desc";
      this.getData();
    },
    handleEdit(index, row) {
      this.$refs["shopAdminEdit"].showEdit(row.admin_id);
    },
    handleDelete(index, row) {
      if (row.username === "admin") {
        this.$message({
          type: "error",
          message: "超级管理员不能删除"
        });
        return;
      }
      this.$confirm(
        "此操作将永久删除该管理员[" + row.username + "], 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        //console.log(row);
        ShopAdminApi.deleteShopAdmin([row.admin_id]).then(res => {
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
    handleRestPassword(index, row) {
      this.$confirm(
        "此操作将重置该管理员[" +
          row.username +
          "]的密码为" +
          this.firstpassword +
          ", 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        ShopAdminApi.resetPassword(row.admin_id, this.firstpassword).then(
          res => {
            if (res.error === "success") {
              this.$message({
                type: "success",
                message: "重置成功!"
              });
            } else {
              this.$message({
                type: "error",
                message: this.$t(res.error)
              });
            }
          }
        );
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
        const adminIds = [];
        await this.multipleSelection.forEach((v, i) => {
          if (v.username != "admin") adminIds.push(v.admin_id);
        });
        //console.log(row);
        ShopAdminApi.deleteShopAdmin(adminIds).then(res => {
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
