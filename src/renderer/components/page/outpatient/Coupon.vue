<!-- 优惠券 -->
<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item>门诊管理</el-breadcrumb-item>
              <el-breadcrumb-item>优惠卡管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container"> 
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-lx-delete" class="handle-del mr10" v-if="auth.COUPON_DELETE" @click="delAll">批量删除</el-button>
                    
                <el-input v-model="listQuery.searchKey" placeholder="筛选关键字" class="handle-input mr10"></el-input>
                 <el-date-picker v-model="listQuery.time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>    
                <el-button type="primary" icon="el-icon-lx-search" @click="search">搜索</el-button>
                <el-button type="primary" icon="el-icon-lx-add" @click="add" v-if="auth.COUPON_ADD">新增</el-button>
            </div>
            <el-table :data="list" border class="table" empty-text="没有任何记录" element-loading-text='给我一点时间'
                v-loading='listLoading' @sort-change="hanldeSort" @selection-change="handleSelectionChange"
                 ref="multipleTable" >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="title" label="优惠券名称" header-align="center"  align="center" sortable min-width="120">
                </el-table-column>
                <el-table-column prop="quantity" label="总数量" header-align="center"  align="center" sortable min-width="120"  >
                </el-table-column>
                <el-table-column prop="start_time" label="活动开始时间" header-align="center"  align="center" sortable min-width="160" :formatter="formatterDate">
                </el-table-column>
                <el-table-column prop="end_time" label="活动结束时间" header-align="center"  align="center" sortable min-width="160" :formatter="formatterDate">
                </el-table-column>
                <el-table-column prop="create_time" label="创建时间" align="center" header-align="center"  sortable  min-width="160" :formatter="formatterDate">
                </el-table-column>
                <el-table-column label="操作"  header-align="center" align="center"  min-width="160"  v-if="auth.COUPON_EDIT &&  auth.COUPON_DELETE">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)" v-if="auth.COUPON_EDIT" >编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" v-if="auth.COUPON_DELETE" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @size-change='handleSizeChange' @current-change='handleCurrentChange' :current-page='listQuery.page' :page-sizes='[20,30, 50]' :page-size='listQuery.limit' layout='total, sizes, prev, pager, next, jumper' :total='total'>       
                </el-pagination>
            </div>
        </div> 
        <CouponEdit ref="CouponEdit" @refresh="getData" />
    </div>
</template>

<script>
import CouponEdit from "./CouponEdit"; 
import * as HospitalCouponApi from "../../../api/HospitalCouponApi";
import * as OauthApi from "../../../api/OauthApi";
import { parseTime } from "../../../utils/formater";
export default {
  name: "coupon",
  components: { CouponEdit },
  data() {
    return {
      multipleSelection: [],
      typeList: [{ name: "折扣券", value: 1 }, { name: "抵用券", value: 2 }],
      /**搜索数据 */
      list: [],
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        sort: null,
        searchKey: "",
        start_time: "",
        time:[],
        end_time:"",
      },
      auth: {
        COUPON_ADD: false,
        COUPON_DELETE: false,
        COUPON_EDIT: false,
      },
    };
  },
  async mounted() {
    //初始化权限
    this.auth.COUPON_DELETE = await OauthApi.checkAuthorities(
      "COUPON"
    );
    this.auth.COUPON_ADD = await OauthApi.checkAuthorities(
      "COUPON"
    );
    this.auth.COUPON_EDIT = await OauthApi.checkAuthorities(
      "COUPON"
    );
    this.getData();
  },
  methods: {
    // 分页导航
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getData();
    },
    formatterType(value){
      for (let i = 0; i < this.typeList.length; i++) {
        if (this.typeList[i].value == value.type) {
          return this.typeList[i].name;
        }
      }
    },
    getData() {
    //         if(this.listQuery.time.length > 0) {
    //     this.listQuery.start_time = this.listQuery.time[0];

    //     this.listQuery.end_time = this.listQuery.time[1];
    //   }
      this.listLoading = true;
      HospitalCouponApi.list(
        this.listQuery.page,
        this.listQuery.limit, 
        this.listQuery.sort,
        this.listQuery.searchKey,
       this.listQuery.time
          ? parseTime(this.listQuery.time[0], "{y}-{m}-{d}")
          : null,
        this.listQuery.rangeDate
          ? parseTime(this.listQuery.time[1], "{y}-{m}-{d}")
          : null,
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
          OauthApi.logOut();
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
      this.$refs["CouponEdit"].showNew();
    },
    formatterDate(row, column, value) {
      return parseTime(value);
    },
    hanldeSort(sort) {
      this.listQuery.sort =
        sort.prop + (sort.order == "ascending" ? "" : " desc");
      this.getData();
    },
    handleEdit(index, row) {
      this.$refs["CouponEdit"].showEdit(row.coupon_id);
    },
    handleDelete(index, row) {
      this.$confirm(
        "此操作将永久删除该优惠券[" + row.title + "], 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        HospitalCouponApi.deletes([row.coupon_id]).then(res => {
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
        const cid = [];
        await this.multipleSelection.forEach((v, i) => {
          cid.push(v.coupon_id);
        });
        HospitalCouponApi.deletes(cid).then(res => {
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
