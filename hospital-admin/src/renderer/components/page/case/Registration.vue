 <!-- 管理员 -->
<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item><i class="el-icon-lx-calendar"></i>病患处理</el-breadcrumb-item>
              <el-breadcrumb-item>病历管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="listQuery.name" placeholder="姓名" class="handle-input mr10" style="width: 150px;"></el-input>
                <el-input v-model="listQuery.mobile" placeholder="手机号" class="handle-input mr10" style="width: 150px;"></el-input>
                <el-input v-model="listQuery.case_number" placeholder="病历号" class="handle-input mr10" style="width: 200px;"></el-input>
                <el-button type="primary" icon="el-icon-lx-search" @click="search">搜索</el-button>
            </div>
            <el-table :data="list" border class="table" empty-text="没有任何记录" element-loading-text='给我一点时间'
                v-loading='listLoading' @sort-change="hanldeSort" @selection-change="handleSelectionChange"
                 ref="multipleTable" >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="name" label="名称" header-align="center"  align="center" sortable min-width="120">
                </el-table-column>
                <el-table-column prop="mobile" label="手机号" header-align="center"  align="center" sortable min-width="120">
                </el-table-column>
                <el-table-column prop="case_number" label="病历号" header-align="center"  align="center" sortable min-width="120">
                </el-table-column>
                <el-table-column label="操作"  header-align="center" align="center"  min-width="160"  v-if="auth.SHOP_ADMIN_EDIT">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)" v-if="auth.SHOP_ADMIN_EDIT" >病历</el-button>
                    </template>
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
import * as PatientApi from "../../../api/RegistrationApi";
import * as OauthApi from "../../../api/OauthApi";
export default {
  name: "patient",
  components: {  },
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
        name: "",
        mobile: ""
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
    this.getData();
  },
  methods: {
    handleEdit(index, row) {
        this.$router.push({
                path: '/case/registration/' + row.case_number
            });
    },
    // 分页导航
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getData();
    },
    getData() {
      this.listLoading = true;
      PatientApi.list(
        this.listQuery.page,
        this.listQuery.limit,
        this.listQuery.sort,
        this.listQuery.name,
        this.listQuery.mobile,
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
    ///搜素按钮
    search() {
      this.listQuery.page = 1;
      this.getData();
    },
    hanldeSort(sort) {
      this.listQuery.sort =
        sort.prop + sort.order == "ascending" ? "" : " desc";
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
</style>
