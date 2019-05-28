<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item><i class="el-icon-lx-calendar"></i>门诊管理</el-breadcrumb-item>
              <el-breadcrumb-item>收费项目管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-lx-delete" class="handle-del mr10" v-if="auth.SHOP_ADMIN_DELETE" @click="delAll">批量删除</el-button>
                  <el-select clearable class='handle-select mr10' v-model='listQuery.type_id' placeholder="项目类型">
                    <el-option v-for='item in typelist' :key="item.type_id" :label="item.name" :value="item.type_id">
                    </el-option>                          
                </el-select>  
                 <el-input v-model="listQuery.searchKey" placeholder="筛选关键字" class="handle-input mr10"></el-input>
                   <el-button type="primary" icon="el-icon-lx-search" @click="search">搜索</el-button>
                <el-button type="primary" icon="el-icon-lx-add" @click="handleCreate()" v-if="auth.SHOP_ADMIN_ADD">新增</el-button>
            </div>
            <el-table :height="tableheight" :data="list" border class="table" empty-text="没有任何记录" element-loading-text='给我一点时间'
                v-loading='listLoading' @sort-change="hanldeSort" @selection-change="handleSelectionChange"
                 ref="multipleTable" >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
               
                <el-table-column prop="name" label="收费项目名称" header-align="center"  align="center" sortable min-width="120"></el-table-column>
                   <el-table-column prop="unit_price" label="单价" header-align="center"  align="center" sortable min-width="120">
                  <template slot-scope="scope">
                    <span>{{scope.row.unit_price}}/{{scope.row.unit}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="is_discount" label="是否折扣" header-align="center"  align="center" sortable min-width="80" :formatter="formatterDiscount">
                  <template slot-scope="scope">
                    <el-tag type="success" v-if="scope.row.is_discount">是</el-tag>
                    <el-tag type="warning" v-else>否</el-tag>
                  </template>
                </el-table-column>
                <el-table-column  label="类型" header-align="center"  align="center" sortable min-width="80">
                    <template slot-scope="scope">
                      {{ scope.row.type_id | formatterState(typelist,{"name":"name","value":"type_id"})}}
                    </template>
                </el-table-column>
                   <el-table-column prop="remark" label="备注" header-align="center"  align="center" sortable min-width="120"></el-table-column>
                <el-table-column label="操作"  header-align="center" align="center"  min-width="160"  v-if="auth.SHOP_ADMIN_DELETE &&  auth.SHOP_ADMIN_EDIT">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)" v-if="auth.SHOP_ADMIN_EDIT" >编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" v-if="auth.SHOP_ADMIN_DELETE" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @size-change='handleSizeChange' @current-change='handleCurrentChange' :current-page='listQuery.page' :page-sizes='[20,30, 50]' :page-size='listQuery.limit' layout='total, sizes, prev, pager, next, jumper' :total='total'>       
                </el-pagination>
            </div>
        </div> 
        <ChargeEdit ref="ChargeEdit" @refresh="getList" /> 
    </div>
</template>

<script>
import ChargeEdit from "./ChargeEdit";
import * as OauthApi from "../../../api/OauthApi";
import { parseTime } from "../../../utils/formater";
import * as config from "../../../utils/config";
import * as HospitalChargeApi from "../../../api/HospitalChargeApi";
import * as HospitalChargeTypeApi from "../../../api/HospitalChargeTypeApi";

export default {
  name: "paytype",
  components: { ChargeEdit },
  data() {
    return {
      auth: {
        SHOP_ADMIN_ADD: false,
        SHOP_ADMIN_DELETE: false,
        SHOP_ADMIN_EDIT: false,
        SHOP_ADMIN_REST_PASSWORD: false
      },
      tableheight: document.body.clientHeight * 0.45 + "px",
      typelist:[],
      listLoading: true, //给我点时间
      tableKey: 0,
      listQuery: {
        page: 1,
        limit: 20,
        sort: null,
        searchKey: "",
        type_id: ""
      },
      list: [],
      total: null
    };
  },

  async mounted() {
    //初始化权限
    this.auth.SHOP_ADMIN_DELETE = await OauthApi.checkAuthorities(
      "CHARGE_PROJECT"
    );
    this.auth.SHOP_ADMIN_ADD = await OauthApi.checkAuthorities(
      "CHARGE_PROJECT"
    );
    this.auth.SHOP_ADMIN_EDIT = await OauthApi.checkAuthorities(
      "CHARGE_PROJECT"
    );
    this.auth.SHOP_ADMIN_REST_PASSWORD = await OauthApi.checkAuthorities(
      "CHARGE_PROJECT"
    );
    this.getList();
    this.gettype();
  },

  methods: {
    formatterDiscount(row, column, value) {
      if(row.is_discount) {
        return '是';
      } else {
        return '否';
      }
    },
    //分页所用方法
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
      ///搜素按钮
    search() {
      this.listQuery.page = 1;
      this.getList();
    },
    //初始化数据
    getList() {
      this.listLoading = true;
      HospitalChargeApi.getPayList(this.listQuery.page, this.listQuery.limit, this.listQuery.searchKey,this.listQuery.type_id).then(
        data => {
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
                }  else {
            this.$message.error(this.$t(data.error));
          }
        }
      );
    },
     gettype() {
      //添加
      HospitalChargeTypeApi.getAll().then(res => {
        if (res.error === "success") {
          this.typelist = res.data.list;
        } else if (
                data.error === "invaild_token" ||
                data.error === "not_login"
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
          adminIds.push(v.charge_id);
        });
        HospitalChargeApi.deletePayType(adminIds).then(data => {
          if (data.error === "success") {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.multipleSelection = [];
            this.getList();
          } else if (
                data.error === "invaild_token" ||
                data.error === "not_login"
                ) {
                //判断是否认证过期
                OauthApi.logOut();
                this.$router.push("/login");
                }  else {
            this.$message({
              type: "error",
              message: this.$t(data.error)
            });
          }
        });
      });
    },
    //添加方法
    handleCreate() {
      this.$nextTick(() => {
        this.$refs["ChargeEdit"].showNew();
      });
    },
    //编辑
    handleEdit(index, row) {
      this.$refs["ChargeEdit"].showEdit(row.charge_id);
    },
    //删除
    handleDelete(index, row) {
      this.$confirm("确认删除" + row.name +"吗？")
        .then(_ => {
          HospitalChargeApi.deletePayType(row.charge_id).then(data => {
            if (data.error === "success") {
              this.getList();
              this.$notify({
                title: "成功",
                message: "删除成功",
                type: "success",
                duration: 2000
              });
              this.getList();
            } else if (
                data.error === "invaild_token" ||
                data.error === "not_login"
                ) {
                //判断是否认证过期
                OauthApi.logOut();
                this.$router.push("/login");
                }  else {
              this.$message.error(this.$t(data.error));
            }
          });
        })
        .catch(_ => {});
    },
    //加载数据
    hanldeSort(sort) {
      this.listQuery.sort =
        sort.prop + sort.order == "ascending" ? "" : " desc";
      this.getList();
    },

    //加载时间
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //获取分页数量方法
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    //分页所用方法
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
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