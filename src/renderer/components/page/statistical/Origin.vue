 <!-- 商品销售 -->
<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item><i class="el-icon-lx-calendar"></i>统计报表</el-breadcrumb-item>
              <el-breadcrumb-item>客户来源统计</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
          <el-row :gutter="20">
              <el-col :span="12">
                  <el-card shadow="hover">
                      <div :class="className" :id="radio" :style="{height:height,width:width}"/>
                  </el-card>
              </el-col>
              <el-col :span="12">
                  <el-card shadow="hover">
                      <div :class="className1" :id="id1" :style="{height:height,width:width}"/>
                  </el-card>
              </el-col>
          </el-row>
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
      subject:["小程序","银行","后台"],
      list: [],
      total: null,
      listLoading: true,
      className: "className",
      className1: "className1",
      data: [],
      week: [],
      pre_list: [],
      name: [],
      height: "500px",
      width: "100%",
      radio: "radio",
      id1: "id"
    };
  },
  async mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.listLoading = true;
      RecordApi.getOrgin().then(data => {
        this.listLoading = false;
        if (data.error === "success") {
          this.list = data.data.list;
          this.data = this.subject;
          this.week = data.data.month;
          this.pre_list = data.data.data;

          this.initChart();
          this.initLineChart();
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
      this.chart = echarts.init(document.getElementById(this.radio));
      this.chart.setOption({
        title: {
          text: "客户来源统计",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: {
          name: "客户来源统计",
          type: "pie",
          roseType: "angle",
          radius: "55%",
          data: this.list,
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
    },
    initLineChart() {
      this.chart = echarts.init(document.getElementById(this.id1));
      this.chart.setOption({
         title: {
            text: '每月来源统计'
        },
        tooltip: {
            trigger: 'axis',
            formatter: function(params) {
              var res = "每月来源统计";
              for (var i = 0; i < params.length; i++) {
                res += '<br/><div style="background-color: ' + params[i].color + '; width: 12px; margin-top: 6px; height: 12px;border-radius:30px;float:left;margin-right: 7px;"></div>';
                res = res + params[i].seriesName + '：'+ params[i].data;
              }
              return res;
            }
        },
        legend: {
            data:['后台','小程序','银行']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.week
        },
        yAxis: {
            type: 'value'
        },
        series: this.pre_list
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
