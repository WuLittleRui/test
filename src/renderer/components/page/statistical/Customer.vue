 <!-- 商品销售 -->
<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item><i class="el-icon-lx-calendar"></i>统计报表</el-breadcrumb-item>
              <el-breadcrumb-item>客户统计</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div :class="className" :id="id" :style="{height:height,width:width}"/>
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
      height: "500px",
      width: "100%",
      id: "id"
    };
  },
  async mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.listLoading = true;
      RecordApi.getMenber().then(data => {
        this.listLoading = false;
        if (data.error === "success") {
          this.data = data.data.month;
          this.list = data.data.list;

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
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        toolbox: {
            feature: {
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        legend: {
            data:['客户统计']
        },
        xAxis: {
            type: 'category',
            data: this.data,
            name:"月份"
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: this.list,
            type: 'line',
            name:'数量'
        }]
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
