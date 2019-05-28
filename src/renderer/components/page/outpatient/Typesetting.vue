<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item><i class="el-icon-lx-calendar"></i>门诊管理</el-breadcrumb-item>
              <el-breadcrumb-item>排班计划</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button icon="el-icon-arrow-left" size="mini" @click="subTime" circle></el-button>
                <el-button icon="el-icon-arrow-right" size="mini" @click="addTime" circle></el-button>
                <span>{{week[0].date}} - {{week[6].date}}</span>
            </div>
            <el-table :height="tableheight" :data="list" border class="table" empty-text="没有任何记录" element-loading-text='给我一点时间'
                v-loading='listLoading'  @cell-click="cellClick" ref="multipleTable" >
               
                <el-table-column prop="username" label="医生名称" header-align="center"  align="center" min-width="120"></el-table-column>

                <el-table-column :label="item.date" v-for="item in week" header-align="center"  align="center" min-width="120">
                    <el-table-column :prop="item.date" :label="item.week" header-align="center"  align="center" min-width="120"></el-table-column>
                </el-table-column>
                
            </el-table>
            <div class="pagination">
                <el-pagination background @size-change='handleSizeChange' @current-change='handleCurrentChange' :current-page='listQuery.page' :page-sizes='[20,30, 50]' :page-size='listQuery.limit' layout='total, sizes, prev, pager, next, jumper' :total='total'>       
                </el-pagination>
            </div>
        </div> 
        <TypesettingEdit ref="TypesettingEdit" @refresh="getList" /> 
    </div>
</template>

<script>
import TypesettingEdit from "./TypesettingEdit";
import * as TypesettingApi from "@/api/TypesettingApi";

export default {
  name: "Typesetting",
  components: { TypesettingEdit },
  data() {
    return {
      tableheight: document.body.clientHeight * 0.45 + "px",
      listLoading: true, //给我点时间
      tableKey: 0,
      listQuery: {
        page: 1,
        limit: 20,
        time: 0
      },
      list: [],
      week: [],
      total: null
    };
  },

  async mounted() {
    this.getList();
  },

  methods: {
    addTime() {
        this.listQuery.time += 6;
        this.getList();
    },
    subTime() {
        this.listQuery.time -= 6;
        this.getList();
    },
    cellClick(row, column, cell, event) {
      if("username" != column.property) {
        this.$refs["TypesettingEdit"].showEdit(column.property, row.employee_id);
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
      TypesettingApi.list(this.listQuery.page, this.listQuery.limit, this.listQuery.time).then(
        data => {
          this.listLoading = false;
          if (data.error === "success") {
            this.total = data.data.total;
            this.list = data.data.list;
            this.week = data.data.week;
          } else if (
        data.error === "invaild_token" ||
        data.error === "not_login"
        ) {
        this.$router.push("/login");
        } else {
            this.$message.error(this.$t(data.error));
          }
        }
      );
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