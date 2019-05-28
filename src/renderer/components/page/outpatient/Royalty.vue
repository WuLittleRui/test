<!-- 管理员 -->
<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-calendar"></i>门诊管理</el-breadcrumb-item>
        <el-breadcrumb-item>收费项目提成</el-breadcrumb-item>
      </el-breadcrumb>
    </div> 
    <div class="container">
      <div class="handle-box">
        <el-select v-model="listQuery.type_id" clearable placeholder="请选择项目类型" class='handle-select mr10'>
          <el-option v-for="item in categoryList" :key="item.type_id" :label="item.name" :value="item.type_id">
          </el-option>
        </el-select>
        
        <el-input v-model="listQuery.searchKey" placeholder="筛选关键字" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-lx-search" @click="search">搜索</el-button>
      </div>
      <el-tabs v-model="listQuery.groupType" @tab-click="handleTabClick">
        <el-tab-pane :label="item.groupName" v-for="item in groupTypes" :key="item.groupId" :name="item.groupId"></el-tab-pane>
      </el-tabs>
      <el-table :height="tableheight" :data="list" border class="table" empty-text="没有任何记录" element-loading-text='给我一点时间' v-loading='listLoading' @sort-change="hanldeSort" @selection-change="handleSelectionChange" ref="multipleTable">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="name" label="项目名称" header-align="center" align="center" sortable min-width="120">
        </el-table-column>
        <el-table-column prop="type_id" label="类型" header-align="center" align="center" sortable min-width="120">
          <template slot-scope="scope">
                   {{ scope.row.type_id | formatterState(categoryList,{"name":"name","value":"type_id"})}}
          </template>     
        </el-table-column>
          <el-table-column prop="unit_price" label="单价" align="center" header-align="center" sortable min-width="120" >
           <template slot-scope="scope">
              {{scope.row.unit_price}}\ {{scope.row.unit}}
            </template>
          </el-table-column>
          <el-table-column prop="commission_value" label="提成标准" align="center" header-align="center" sortable min-width="160" >
            <template slot-scope="scope">
              {{scope.row.commission_value}}
              <span v-if="scope.row.type===0">{{percentage}}</span>
              <span v-if="scope.row.type===1">{{menoy}} </span>
            </template>
          </el-table-column>
          <el-table-column label="操作" header-align="center" align="center" min-width="160" v-if="auth.SERVICEPERCENTAGE_DELETE &&  auth.SERVICEPERCENTAGE_EDIT">
            <template slot-scope="scope">
              <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)" v-if="auth.SERVICEPERCENTAGE_EDIT">
                修改</el-button>
              <el-button type="text" class="red" icon="el-icon-edit-outline" @click="handleRestPassword(scope.$index, scope.row)" v-if="auth.SERVICEPERCENTAGE_DELETE">清空</el-button>
            </template>
          </el-table-column>
        </el-table>              
        <div class="pagination">
            <el-pagination background @size-change='handleSizeChange' @current-change='handleCurrentChange' :current-page='listQuery.page' :page-sizes='[10, 20,30, 50]' :page-size='listQuery.limit' layout='total, sizes, prev, pager, next, jumper' :total='total'>       
            </el-pagination>
        </div>
    </div> 
    <RoyaltyEdit ref="RoyaltyEdit"   @refresh="getData" />
  </div>
</template>

<script>
import * as HospitalChargeCommmistionApi from "../../../api/HospitalChargeCommmistionApi";
 import * as HospitalChargeTypeApi from "../../../api/HospitalChargeTypeApi";
  import * as HospitalGroupApi from "../../../api/HospitalGroupApi";
  import RoyaltyEdit from "./RoyaltyEdit";
  import * as HospitalChargeApi from "../../../api/HospitalChargeApi";
  import * as OauthApi from "../../../api/OauthApi";
  import {
    parseTime
  } from "../../../utils/formater";
  export default {
    components: {
      RoyaltyEdit
    },
    data() {
      return {
        tableheight: document.body.clientHeight * 0.45 + "px",
        menoy: "￥",
        percentage: "%",
        groupName: "",
        groupTypes: [],
        listQuery: {
          page: 1,
          limit: 10,
          type_id: "",
          groupType: null,
          product_type: 1,
          searchKey: "",
          state: "",
        },
        categoryList: [],
        multipleSelection: [],
        stateList: [{
            name: "显示",
            value: 1
          },
          {
            name: "隐藏",
            value: 0
          }
        ],
        /**搜索数据 */
        list: [],
        total: null,
        listLoading: true,
        auth: {
          SERVICEPERCENTAGE_ADD: false,
          SERVICEPERCENTAGE_DELETE: false,
          SERVICEPERCENTAGE_EDIT: false
        }
      };
    },
    async mounted() {
      //初始化权限
      this.auth.SERVICEPERCENTAGE_DELETE = await OauthApi.checkAuthorities(
        "CHARGE_PROJECT_ROYALTY"
      );
      this.auth.SERVICEPERCENTAGE_ADD = await OauthApi.checkAuthorities(
        "CHARGE_PROJECT_ROYALTY"
      );
      this.auth.SERVICEPERCENTAGE_EDIT = await OauthApi.checkAuthorities(
        "CHARGE_PROJECT_ROYALTY"
      );
    await  this.getGroupTypes();
      this.getCategory();
      this.getData();
    },
    methods: {
      //查询所有岗位
    async  getGroupTypes() {
      let data = await  HospitalGroupApi.getShopGroupList(this.listQuery.page,this.listQuery.limit).then(data => {
          if (data.error === "success") {
            this.groupTypes = data.data.list;
            data.data.list.forEach(item => {
              item.groupId = item.groupId + "";
            });
            this.listQuery.groupType = this.groupTypes[0].groupId;
          } else if (
        data.error === "invaild_token" ||
        data.error === "not_login"
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
      handleTabClick(tab, event) {
        this.getData();
        this.listQuery.groupType = tab.name;
        this.groupName = tab.label;
      },
      getData() {
        this.listLoading = true;
        HospitalChargeCommmistionApi.getPayList(this.listQuery.page,this.listQuery.limit, this.listQuery.groupType,this.listQuery.type_id,this.listQuery.searchKey).then(data => {
          if (data.error === "success") {
            this.listLoading = false;
            this.list = data.data.list;
            this.total = data.data.total;
          } else if (
        data.error === "invaild_token" ||
        data.error === "not_login"
        ) {
        //判断是否认证过期
        OauthApi.logOut();
        this.$router.push("/login");
        }  else {
            this.$message.error(data.error);
          }
        });
      },
      getCategory() {
        HospitalChargeTypeApi.getAll().then(data => {
          if (data.error === "success") {
            this.categoryList = data.data.list;
          } else if (
        data.error === "invaild_token" ||
        data.error === "not_login"
        ) {
        //判断是否认证过期
        OauthApi.logOut();
        this.$router.push("/login");
        }  else {
            this.$message.error(data.error);
          }
        });
      },
      // 分页导航
      handleCurrentChange(val) {
        this.listQuery.page = val;
        this.getData();
      },
      formatterState(value) {
        for (let i = 0; i < this.options.length; i++) {
          if (this.options[i].categoryId == value.categoryId) {
            return this.options[i].categoryName;
          }
        }
      },
      ///搜素按钮
      search() {
        this.listQuery.page = 1;
        this.getData();
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
        this.$refs["RoyaltyEdit"].showEdit(
       
          row.name,
          row.charge_id,
          this.listQuery.groupType,
        );
  
      },
      handleRestPassword(index, row) {
        
           HospitalChargeCommmistionApi.update(row.charge_id,this.listQuery.groupType,"","").then(
            res => {
              if (res.error === "success") {
                this.getData();
                this.$message({
                  type: "success",
                  message: "清空成功!"
                });
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
            }
          );
         
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
  .green {
    color: greenyellow;
  }
  .table-expand {
    font-size: 0;
  }
  .table-expand>>>label {
    width: 120px;
    color: #909399;
    font-size: 12px;
  }
  .table-expand>>>.el-form-item__content {
    font-size: 12px;
  }
  .table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 33%;
  }
</style>
