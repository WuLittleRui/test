<template>
    <!--选择商品模态框-->
    <el-dialog title='选择商品' :visible.sync='editVisible'> 
        <div class="handle-box"> 
            <el-input v-model="listQuery.title" placeholder="请输入商品名称" class="handle-input mr10"></el-input>
            <el-select clearable class='handle-select mr10' v-model='listQuery.category_name' placeholder="类型">
                <el-option v-for='item in category_list' :key='item.categoryId' :label='item.categoryName' :value='item.categoryId'>
                </el-option>
            </el-select> 
            <el-button type="primary" icon="el-icon-lx-search" @click="search">搜索</el-button>
        </div>
        <el-table ref="multipleTable" :data="list" border class="table" :row-key="getRowKeys" @selection-change="handleSelectionChange" height="300" v-loading='listLoading' element-loading-text='给我一点时间'>
            <el-table-column type="selection" :reserve-selection="true" prop="pid" width="45">
            </el-table-column>
            <el-table-column  label="分类" header-align="center"  align="center" sortable min-width="120">
                <template slot-scope="scope">
                   {{ scope.row.category_id | formatterState(category_list,{"name":"categoryName","value":"categoryId"})}}
                </template>
            </el-table-column>
            <el-table-column prop="product_name" label="产品名称" header-align="center"  align="center" sortable min-width="180">
            </el-table-column>
            <el-table-column prop="unit_price" label="价格" header-align="center"  align="center" sortable min-width="100">
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination background @size-change='handleSizeChange' @current-change='handleCurrentChange' :current-page='listQuery.page' :page-sizes='[20,30, 50]' :page-size='listQuery.limit' layout='total, sizes, prev, pager, next, jumper' :total='total'>       
            </el-pagination>
        </div>

        <div slot='footer' class='dialog-footer'>
            <el-button @click='submit'>确定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import * as ProductApi from "../../../api/ProductApi";
 

export default {
  props: {
    /**商品类型 */
    product_type: { type: Array, default: [0] },
       to_type: { type: Number }
  },
  data() {
    return {
      editVisible: false,
      category_list: [], //分类列表
      list: [],
      total: 0,
      multipleSelection: [], //提交时所有选中的值
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        sort: null,
        title: "",
        category_name: "",
        state: "",
        to_type:"",
      }
    };
  }, 
  mounted() {
    this.getProductCategory();
    this.getData();
  },
  methods: {
    showDialog() {
      this.editVisible = true;
      this.multipleSelection = [];
      this.search();
      this.$nextTick(() => {
        if (this.$refs.multipleTable !== undefined) {
          this.$refs.multipleTable.clearSelection(); //取消所有勾选
        }
      });
      //debugger;
    },
    submit() {
      this.$emit("submit", this.multipleSelection);
      this.editVisible = false;
    },
    // 分页导航
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getData();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getData();
    },
    hanldeSort(sort) {
      this.listQuery.sort =
        sort.prop + (sort.order == "ascending" ? "" : " desc");
      this.getData();
    },
    getData() {
     this.listQuery.to_type=this.to_type;
      this.listLoading = true;
      ProductApi.getGoodList(
        this.listQuery
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
    getProductCategory() {
      //添加
      ProductApi.getCategoryList().then(res => {
        if (res.error === "success") {
          this.category_list = res.data.list;
        } else {
          this.$message({
            type: "error",
            message: this.$t(res.error)
          });
        }
      });
    },
    getRowKeys(row) {
      return row.pid;
    }
  }
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 10px;
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
</style>
        
