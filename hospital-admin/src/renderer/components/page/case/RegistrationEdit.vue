 <!-- 管理员 -->
<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item><i class="el-icon-lx-calendar"></i>病患处理</el-breadcrumb-item>
              <el-breadcrumb-item>病历详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-lx-search" @click="handleAddFirst">初诊</el-button>
                <el-button type="primary" icon="el-icon-lx-search" @click="handleAddReVisit">复诊</el-button>
            </div>
            <el-table :data="list" border class="table" empty-text="没有任何记录" element-loading-text='给我一点时间'
                v-loading='listLoading' @sort-change="hanldeSort" @selection-change="handleSelectionChange"
                 ref="multipleTable" >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="docter" label="类别" header-align="center"  align="center" sortable min-width="120">
                </el-table-column>
                <el-table-column prop="title" label="医生" header-align="center"  align="center" sortable min-width="120">
                </el-table-column>
                <el-table-column prop="main_illness" label="病症" header-align="center"  align="center" sortable min-width="120">
                </el-table-column>
                <el-table-column prop="create_time" label="就诊时间" header-align="center"  align="center" sortable min-width="120">
                </el-table-column>
                <el-table-column label="操作"  header-align="center" align="center"  min-width="160">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @size-change='handleSizeChange' @current-change='handleCurrentChange' :current-page='listQuery.page' :page-sizes='[20,30, 50]' :page-size='listQuery.limit' layout='total, sizes, prev, pager, next, jumper' :total='total'>       
                </el-pagination>
            </div>
        </div> 
        <AddRegistrationEdit ref="AddRegistrationEdit" @refresh="showDetail" />
    </div>
</template>

<script>
import AddRegistrationEdit from "./AddRegistrationEdit";
import * as PatientApi from "../../../api/RegistrationApi";
import * as OauthApi from "../../../api/OauthApi";
export default {
  name: "patient",
  components: { AddRegistrationEdit },
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
        case_number: ""
      },
      auth: {
        SHOP_ADMIN_EDIT: false
      }
    };
  },
  async mounted() {
    this.auth.SHOP_ADMIN_EDIT = await OauthApi.checkAuthorities(
      "REGISTRATION"
    );
    this.showDetail();
  },
  methods: {
    handleAddFirst() {
        this.$refs["AddRegistrationEdit"].first(this.listQuery.case_number);
    },
    handleAddReVisit() {
        this.$refs["AddRegistrationEdit"].revisit(this.listQuery.case_number);
    },
    handleEdit() {
        this.$refs["AddRegistrationEdit"].edit(this.listQuery.case_number);
    },
    // 分页导航
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.showDetail();
    },
    showDetail() {
      const case_number = this.$route.params && this.$route.params.id;
      this.listLoading = true;
      PatientApi.listDetail(
        this.listQuery.page,
        this.listQuery.limit,
        this.listQuery.sort,
        this.listQuery.case_number
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
    hanldeSort(sort) {
      this.listQuery.sort =
        sort.prop + sort.order == "ascending" ? "" : " desc";
      this.showDetail();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.showDetail();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.showDetail();
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
