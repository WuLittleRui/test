<!-- 物料管理 -->
<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>库存中心</el-breadcrumb-item>
        <el-breadcrumb-item>产生采购单</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
     <div class="container">
            <div class="handle-box">
                   <el-date-picker value-format="yyyy-MM-dd" v-model="listQuery.time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                <el-button type="primary" icon="el-icon-lx-search" @click="search">搜索</el-button>
                <el-button type="primary" icon="el-icon-lx-add" @click="add()" v-if="auth.MATERIALS_ADD">新增</el-button>
            </div>
            <el-table :data="list" border class="table" empty-text="没有任何记录" element-loading-text='给我一点时间'
                v-loading='listLoading' @sort-change="hanldeSort" @selection-change="handleSelectionChange"
                 ref="multipleTable" >
                <el-table-column prop="operate" label="操作人" header-align="center"  align="center" sortable min-width="120">
                </el-table-column>
                 <el-table-column prop="create_time" label="创建的时间" header-align="center"  align="center" sortable min-width="80" :formatter="formatterDate">
                </el-table-column>
                <el-table-column prop="total_price" label="总金额" header-align="center"  align="center" sortable min-width="80"  >
                </el-table-column>
                <el-table-column label="操作"  header-align="center" align="center"  min-width="160"  v-if="auth.MATERIALS_DELETE &&  auth.MATERIALS_EDIT">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)" v-if="auth.MATERIALS_EDIT" >查看</el-button>
                        <el-button type="text" icon="el-icon-delete" v-if="auth.MATERIALS_DELETE" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @size-change='handleSizeChange' @current-change='handleCurrentChange' :current-page='listQuery.page' :page-sizes='[20,30, 50]' :page-size='listQuery.limit' layout='total, sizes, prev, pager, next, jumper' :total='total'>       
                </el-pagination>
            </div>
        </div> 
              <SelectProduct ref="selectProduct"  @refresh="getData"   @submit="addToPackage" :product_type="selectProductType" :to_type="to_type" />
               <PurchasingEdit ref="PurchasingEdit" @refresh="getData" />
    </div>
</template>

<script>
  import PurchasingEdit from "./PurchasingEdit";
  import SelectProduct from "../common/SelectProduct";
  import * as PurchasingApi from "../../../api/PurchasingApi";
  import * as OauthApi from "../../../api/OauthApi";
  import {
    parseTime
  } from "../../../utils/formater";
  export default {
    name: "materials",
    components: {
      SelectProduct,
      PurchasingEdit
    },
    data() {
      return {
        to_type: 0,
        package_list: [], //商品包列表
        selectProductType: [0, 1],
        multipleSelection: [],
        typeList: [{
          name: "限时促销",
          value: 1
        }, {
          name: "拼团促销",
          value: 2
        }],
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
          time: [],
          end_time: "",
        },
        auth: {
          MATERIALS_ADD: false,
          MATERIALS_DELETE: false,
          MATERIALS_EDIT: false,
        },
      };
    },
    async mounted() {
      //初始化权限
      this.auth.MATERIALS_DELETE = await OauthApi.checkAuthorities(
        "PURCHASING"
      );
      this.auth.MATERIALS_ADD = await OauthApi.checkAuthorities(
        "PURCHASING"
      );
      this.auth.MATERIALS_EDIT = await OauthApi.checkAuthorities(
        "PURCHASING"
      );
      this.getData();
    },
    methods: {
      formatterDate(row, column, value) {
        return parseTime(value);
      },
      stockChange(id, value) {
        this.multipleSelection.forEach(function(element) {
          if (element.pid === id) {
            element.quantity = value;
          }
        }, this);
      },
      addToPackage(selection) {
        selection.forEach(row => {
          let exists = this.package_list.some(item => {
            return item.pid == row.pid;
          });
          if (!exists) {
            this.package_list.push({
              pid: row.pid,
              product_name: row.product_name,
              unit_price: row.unit_price,
              quantity: row.quantity
            });
          }
        });
        console.log("this.package_list",this.package_list);
        if (this.package_list.length>0) {
          PurchasingApi.add(
            JSON.stringify(this.package_list),
          ).then(res => {
            if (res.error === "success") {
              this.button_loading = false;
              this.$message({
                type: "success",
                message: "添加成功!"
              });
              this.$emit("refresh");
                 this.getData();
              this.editVisible = false;
            } else {
              this.$message({
                type: "error",
                message: this.$t(res.error)
              });
            }
          });
        } else {
          //添加
        
              this.$message({
                type: "error",
                message: "请勾选商品!"
              });
              this.$emit("refresh");
        
        
        }
      },
      // 分页导航
      handleCurrentChange(val) {
        this.listQuery.page = val;
        this.getData();
      },
      getData() {
        this.listLoading = true;
        PurchasingApi.list(
          this.listQuery.page,
          this.listQuery.limit,
          this.listQuery.time ?
          parseTime(this.listQuery.time[0], "{y}-{m}-{d}") :
          null,
          this.listQuery.time ?
          parseTime(this.listQuery.time[1], "{y}-{m}-{d}") :
          null,
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
        this.$refs["selectProduct"].showDialog();
      },
      hanldeSort(sort) {
        this.listQuery.sort =
          sort.prop + (sort.order == "ascending" ? "" : " desc");
        this.getData();
      },
      handleEdit(index, row) {
        this.$refs["PurchasingEdit"].showNew(row.purchase_id, row.create_time,row.total_price);
      },
      handleDelete(index, row) {
        this.$confirm(
          "此操作将永久删除, 是否继续?",
          "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        ).then(() => {
          PurchasingApi.del([row.purchase_id]).then(res => {
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
