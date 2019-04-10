 <!-- 员工管理 -->
<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item><i class="el-icon-lx-calendar"></i>店面管理</el-breadcrumb-item>
              <el-breadcrumb-item>员工管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-lx-delete" class="handle-del mr10" v-if="auth.SHOP_ADMIN_DELETE" @click="delAll">批量删除</el-button>
                <el-select clearable class='handle-select mr10' v-model='listQuery.group_id' placeholder="岗位名称">
                    <el-option v-for='item in groupTypes' :key="item.group_id" :label="item.group_name" :value="item.group_id">
                    </el-option>                          
                </el-select>            
                <el-input v-model="listQuery.searchKey" placeholder="用户名/手机号" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-lx-search" @click="search">搜索</el-button>
                <el-button type="primary" icon="el-icon-lx-add" @click="add" v-if="auth.SHOP_ADMIN_ADD">新增</el-button>
            </div>
            <el-table :data="list" border class="table" empty-text="没有任何记录" element-loading-text='给我一点时间'
                v-loading='listLoading' @sort-change="hanldeSort" @selection-change="handleSelectionChange"
                 ref="multipleTable" >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="group_name" label="用户名" header-align="center"  align="center" sortable min-width="120">
                  <template slot-scope="scope">
                    <span>{{scope.row.username}}({{scope.row.mobile}})-{{scope.row.group_name}}</span>
                  </template>
                </el-table-column>
                
                <el-table-column prop="join_time" label="加入时间" align="center" header-align="center"  sortable  min-width="140" :formatter="formatterDate">
                </el-table-column>
                <el-table-column prop="state" label="状态" header-align="center"  align="center" sortable min-width="80" :formatter="formatterState">
                  <template slot-scope='scope'>
                  <el-tag :type='scope.row.state | statusFilter' class="green" v-if='scope.row.state === 1'>正常</el-tag>
                  <el-tag :type='scope.row.state | statusFilter' class="red" v-if='scope.row.state === 0'>冻结</el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="操作"  header-align="center" align="center"  min-width="200"  v-if="auth.SHOP_ADMIN_DELETE &&  auth.SHOP_ADMIN_EDIT">
                    <template slot-scope="scope">
                        <el-button type="text" v-if="scope.row.state === 1 && auth.SHOP_ADMIN_EDIT" class="red"  icon='el-icon-setting' @click='handleModifyStatus(scope.row, 0)' >锁定
                        </el-button>
                        <el-button  type="text" v-if="scope.row.state === 0 && auth.SHOP_ADMIN_EDIT "  class="green" icon='el-icon-setting' @click='handleModifyStatus(scope.row, 1)' >解锁
                        </el-button>
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)" v-if="auth.SHOP_ADMIN_EDIT" >编辑</el-button>
                        <el-button type="text" icon="el-icon-delete"  v-if="auth.SHOP_ADMIN_DELETE && scope.row.group_name !== '店主'"  class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @size-change='handleSizeChange' @current-change='handleCurrentChange' :current-page='listQuery.page' :page-sizes='[20,30, 50]' :page-size='listQuery.limit' layout='total, sizes, prev, pager, next, jumper' :total='total'>       
                </el-pagination>
            </div>
        </div> 
         <EmployeeEdit ref="EmployeeEdit" @refresh="getData" />
    </div>
</template>

<script>
import EmployeeEdit from "./EmployeeEdit";
import * as HospitalEmplyeeApi from "../../../api/HospitalEmplyeeApi";
import * as OauthApi from "../../../api/OauthApi";
import { parseTime } from "../../../utils/formater";
export default {
  name: "shopadmin",
  components: { EmployeeEdit },
  data() {
    return {
      groupTypes: null,
      multipleSelection: [],
      stateList: [{ name: "禁用", value: 0 }, { name: "启用", value: 1 }],
      /**搜索数据 */
      list: [],
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        sort: null,
        state: "",
        searchKey: "", //关键字
        group_id: null //状态
      },
      auth: {
        SHOP_ADMIN_ADD: false,
        SHOP_ADMIN_DELETE: false,
        SHOP_ADMIN_EDIT: false
      }
    };
  },

  async mounted() {
    //初始化权限
    this.auth.SHOP_ADMIN_DELETE = await OauthApi.checkAuthorities(
      "EMPLOYEE"
    );
    this.auth.SHOP_ADMIN_ADD = await OauthApi.checkAuthorities(
      "EMPLOYEE"
    );
    this.auth.SHOP_ADMIN_EDIT = await OauthApi.checkAuthorities(
      "EMPLOYEE"
    );
    this.getData();
    this.getGroupTypes();
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        true: "success",
        false: "danger"
      };
      return statusMap[status];
    }
  },
  methods: {
    // 分页导航
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getData();
    },

    getData() {
      this.listLoading = true;
      HospitalEmplyeeApi.getemployeeList(
        this.listQuery.searchKey,
        this.listQuery.state,
        this.listQuery.page,
        this.listQuery.limit,
        this.listQuery.sort,
        this.listQuery.group_id
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
      this.$refs["EmployeeEdit"].showNew();
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
        sort.prop + (sort.order == "ascending" ? "" : " desc");
      this.getData();
    },
    handleEdit(index, row) {
      this.$refs["EmployeeEdit"].showEdit(row.employee_id);
    },
    //修改员工账号状态
    handleModifyStatus(row, status) {
      this.$confirm("确认更改吗？")
        .then(() => {
          HospitalEmplyeeApi.lockOrUnlockEmployee(row.employee_id, status).then(
            data => {
              this.listLoading = false;
              if (data.error === "success") {
                this.getData();
                this.$notify({
                  title: "成功",
                  message: "修改成功",
                  type: "success",
                  duration: 2000
                });
              } else if (
                    res.error === "invaild_token" ||
                    res.error === "not_login"
                    ) {
                    //判断是否认证过期
                    OauthApi.logOut();
                    this.$router.push("/login");
                    }  else if (data.error_description) {
                this.$message.error(data.error_description);
              } else {
                this.$message.error(data.error);
              }
            }
          );
        })
        .catch(_ => {});
    },
    handleDelete(index, row) {
      this.$confirm("确认删除" + row.username + "吗?").then(() => {
        HospitalEmplyeeApi.delEmployee(row.employee_id).then(res => {
          if (res.error === "success") {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.getData();
          } else if (
            res.error === "invaild_token" ||
            res.error === "not_login"
            ) {
            //判断是否认证过期
            OauthApi.logOut();
            this.$router.push("/login");
            }  else {
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
        const employee_id = [];
        await this.multipleSelection.forEach((v, i) => {
          employee_id.push(v.employee_id);
        });
        HospitalEmplyeeApi.delEmployee(employee_id).then(res => {
          if (res.error === "success") {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.multipleSelection = [];
            this.getData();
          } else if (
            res.error === "invaild_token" ||
            res.error === "not_login"
            ) {
            //判断是否认证过期
            OauthApi.logOut();
            this.$router.push("/login");
            }  else {
            this.$message({
              type: "error",
              message: this.$t(res.error)
            });
          }
        });
      });
    },
    //查询所有岗位
    getGroupTypes() {
      HospitalEmplyeeApi.getShopGroupList().then(data => {
        if (data.error === "success") {
          this.groupTypes = data.data;
        } else if (
        res.error === "invaild_token" ||
        res.error === "not_login"
        ) {
        //判断是否认证过期
        OauthApi.logOut();
        this.$router.push("/login");
        }  else if (data.error_description) {
          this.$message.error(data.error_description);
        } else {
          this.$message.error(data.error);
        }
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
