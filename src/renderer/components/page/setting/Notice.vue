<!-- 管理员 -->
<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item><i class="el-icon-lx-calendar"></i>系统设置</el-breadcrumb-item>
              <el-breadcrumb-item>通知公告</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-lx-delete" class="handle-del mr10" v-if="auth.SHOP_ADMIN_DELETE" @click="delAll">批量删除</el-button>
                          
                <el-input v-model="listQuery.searchKey" placeholder="筛选关键字" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-lx-search" @click="search">搜索</el-button>
                <el-button type="primary" icon="el-icon-lx-add" @click="add" v-if="auth.SHOP_ADMIN_ADD">新增</el-button>
            </div>
            <el-table :data="list" border class="table" empty-text="没有任何记录" element-loading-text='给我一点时间'
                v-loading='listLoading' @sort-change="hanldeSort" @selection-change="handleSelectionChange"
                 ref="multipleTable" >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="title" label="标题" header-align="center"  align="center" sortable min-width="120">
                </el-table-column>
                <el-table-column prop="content" label="通知内容" header-align="center"  align="center" sortable min-width="120">
                </el-table-column>
              
                <el-table-column label="操作"  header-align="center" align="center"  min-width="160"  v-if="auth.SHOP_ADMIN_DELETE &&  auth.SHOP_ADMIN_EDIT">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)" v-if="auth.SHOP_ADMIN_EDIT" >编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" v-if="auth.SHOP_ADMIN_DELETE && scope.row.username!='admin' " class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @size-change='handleSizeChange' @current-change='handleCurrentChange' :current-page='listQuery.page' :page-sizes='[20,30, 50]' :page-size='listQuery.limit' layout='total, sizes, prev, pager, next, jumper' :total='total'>       
                </el-pagination>
            </div>
        </div> 
        <NoticeEdit ref="NoticeEdit" @refresh="getData" />
    </div>
</template>

<script>
import NoticeEdit from "./NoticeEdit";
import * as HospitalApi from "../../../api/HospitalApi";
import * as NoticeApi from "../../../api/NoticeApi";
import * as OauthApi from "../../../api/OauthApi";
import { parseTime } from "../../../utils/formater";
export default {
  name: "admin",
  components: { NoticeEdit },
  data() {
    return {
      multipleSelection: [],
      stateList: [{ name: "禁用", value: 0 }, { name: "启用", value: 1 }],
      /**搜索数据 */
      list: [],
      total: null,
      hospital:[],
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
      "NOTICE"
    );
    this.auth.SHOP_ADMIN_ADD = await OauthApi.checkAuthorities(
      "NOTICE"
    );
    this.auth.SHOP_ADMIN_EDIT = await OauthApi.checkAuthorities(
      "NOTICE"
    );
    this.auth.SHOP_ADMIN_REST_PASSWORD = await OauthApi.checkAuthorities(
      "NOTICE"
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
      NoticeApi.listAd(
      
     
        this.listQuery.page,
        this.listQuery.limit,
        this.listQuery.sort,
          this.listQuery.searchKey,
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
      this.$refs["NoticeEdit"].showNew();
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
      this.$refs["NoticeEdit"].showEdit(row.notice_id);
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
        "此操作将永久删除该通知公告[" + row.title + "], 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        //console.log(row);
        NoticeApi.deleteAd([row.notice_id]).then(res => {
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
        const adminIds = [];
        await this.multipleSelection.forEach((v, i) => {
          adminIds.push(v.notice_id);
        });
        //console.log(row);
        NoticeApi.deleteAd(adminIds).then(res => {
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
