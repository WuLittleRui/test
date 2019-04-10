 <!-- 商品销售 -->
<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item><i class="el-icon-lx-calendar"></i>统计中心</el-breadcrumb-item>
              <el-breadcrumb-item>销售统计</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div slot="header" class="clearfix">
                <el-select v-model="listQuery.type" placeholder="请选择" @change="changes()">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-date-picker
                v-if="listQuery.type == 1"
                v-model="listQuery.time"
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                ></el-date-picker>
                <el-date-picker
                v-if="listQuery.type == 2"
                v-model="listQuery.time"
                type="month"
                value-format="yyyy-MM"
                placeholder="选择月">
                </el-date-picker>
                <el-button type="primary" icon="el-icon-lx-search" @click="handleFilter">查询</el-button>
            </div>

            <div :class="className" :id="id" style="height:500px;width:100%;margin-top:10px;" />
        </div>
    </div>
</template>

<script>
 
import * as RecordApi from "../../../api/RecordApi";
import * as echarts from "echarts";

export default {
  name: "sort",
  components: {
    echarts
  },
  data() {
    return {
      /**搜索数据 */
      list: [],
      total: null,
      listLoading: true,
      className: "className",
      data: [],
      name: [],
      options: [{value: 1, label: '按天查'},{value: 2, label: '按月查'}],
      id: "id",
      listQuery: {
        type: 1,
        time: []
      }
    };
  },
  async mounted() {
    this.getData();
  },
  methods: {
    handleFilter() {
      this.getData();
    },
    changes(){
   this.listQuery.time=[];
    },
    getData() {
      this.listLoading = true;
      
      var start_time = null;
      var end_time = null;
      if(this.listQuery.time.length > 0 && this.listQuery.type == 1) {
          start_time = this.listQuery.time[0];
          end_time = this.listQuery.time[1];
      }
      if(this.listQuery.time.length > 0 && this.listQuery.type == 2) {
          start_time = this.listQuery.time;
          end_time = this.listQuery.time;
      }
      RecordApi.getShopSale(this.listQuery.type, start_time, end_time).then(data => {
        this.listLoading = false;
        if (data.error === "success") {
          this.data = [];
          data.data.list.forEach(item => {
              var obj = new Object();
              obj.name = item.product_name;
              obj.value = item.sell_quantity;
              this.data.push(obj);
          })
          this.initChart();
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
    
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id));
      this.chart.setOption({
        title: {
          text: "销售统计",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: {
          name: "销售统计",
          type: "pie",
          roseType: "angle",
          radius: "55%",
          data: this.data,
          itemStyle: {
            // 阴影的大小
            shadowBlur: 200,
            // 阴影水平方向上的偏移
            shadowOffsetX: 0,
            // 阴影垂直方向上的偏移
            shadowOffsetY: 0,
            // 阴影颜色
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        }
      });
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
.table-expand {
  font-size: 0;
}
.table-expand >>> label {
  width: 120px;
  color: #909399;
  font-size: 12px;
}
.table-expand >>> .el-form-item__content {
  font-size: 12px;
}
.table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 33%;
}
</style>
