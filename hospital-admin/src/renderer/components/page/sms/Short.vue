<!-- 管理员 -->
<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item><i class="el-icon-lx-calendar"></i>消息推送</el-breadcrumb-item>
              <el-breadcrumb-item>营销短信群发</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">            
                <el-button type="primary" icon="el-icon-lx-search" @click="allSend">全选发送</el-button>
                <el-button type="success" icon="el-icon-lx-search" @click="selectSend">选择发送</el-button>
            </div>
            <el-table :data="list" border class="table" empty-text="没有任何记录" element-loading-text='给我一点时间'
                v-loading='listLoading' @selection-change="handleSelectionChange"
                 ref="multipleTable" >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="case_number" label="病历号" header-align="center"  align="center" sortable min-width="120">
                </el-table-column>
                <el-table-column prop="mobile" label="手机" header-align="center"  align="center" sortable min-width="120">
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @size-change='handleSizeChange' @current-change='handleCurrentChange' :current-page='listQuery.page' :page-sizes='[20,30, 50]' :page-size='listQuery.limit' layout='total, sizes, prev, pager, next, jumper' :total='total'>       
                </el-pagination>
            </div>
        </div> 
        <ShortEdit ref="ShortEdit" />
    </div>
</template>

<script>
import ShortEdit from "./ShortEdit";
import * as ShortApi from "@/api/ShortApi";
import * as OauthApi from '@/api/OauthApi'
export default {
  name: "short",
  components: { ShortEdit },
  data() {
    return {
      multipleSelection: [],
      /**搜索数据 */
      list: [],
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
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
      "SHORT_MESSAGE"
    );
    this.auth.SHOP_ADMIN_ADD = await OauthApi.checkAuthorities(
      "SHORT_MESSAGE"
    );
    this.auth.SHOP_ADMIN_EDIT = await OauthApi.checkAuthorities(
      "SHORT_MESSAGE"
    );
    this.getData();
  },
  methods: {
    allSend() {
        this.$refs["ShortEdit"].showEdit([], true);
    },
    selectSend() {
        if(this.multipleSelection.length <= 0) {
            this.$message.error("请选择发送对象");
            return;
        }
        this.$refs["ShortEdit"].showEdit(this.multipleSelection, false);
    },
    // 分页导航
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getData();
    },
    getData() {
      this.listLoading = true;
      ShortApi.list(
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
