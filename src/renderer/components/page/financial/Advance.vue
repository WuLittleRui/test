<!-- 预付款统计 -->
<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item><i class="el-icon-lx-calendar"></i>财务管理</el-breadcrumb-item>
              <el-breadcrumb-item>预存款统计</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover">
                    <div :class="className" :id="id" :style="{height:height,width:width}"/>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="hover">
                    <div :class="className" :id="detailid" :style="{height:height,width:width}"/>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="hover">
                    <div :class="className" :id="detailOutid" :style="{height:height,width:width}"/>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import * as AdvanceApi from "../../../api/AdvanceApi";
import * as echarts from "echarts";
import * as OauthApi from "@/api/OauthApi";

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
      id: "id",
      in_list: [],
      out_list: [],
      detailid: "detailid",
      detailOutid: "detailOutid"
    };
  },
  async mounted() {
    this.getData();
    this.getDetailData();
  },
  methods: {
    getData() {
      this.listLoading = true;
      AdvanceApi.currency().then(data => {
        this.listLoading = false;
        if (data.error === "success") {
          this.data = data.data.day;
          this.list = data.data.in;

          this.initChart();
        }  else if (
            data.error === "invaild_token" ||
            data.error === "not_login"
        ) {
        //判断是否认证过期
            OauthApi.logOut();
            this.$router.push("/login");
        } else if (data.error_description) {
          this.$message.error(data.error_description);
        } else {
          this.$message.error(data.error);
        }
      });
    },
    getDetailData() {
      this.listLoading = true;
      AdvanceApi.currencyDetail().then(data => {
        this.listLoading = false;
        if (data.error === "success") {
          this.data = data.data.day;
          this.in_list = data.data.in;
          this.out_list = data.data.out;

          this.initDetailChart();
          this.initDetailOutChart();
        } else if (
          data.error === "invaild_token" ||
          data.error === "not_login"
        ) {
          //判断是否认证过期
          OauthApi.logOut();
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
        title: {
            text: '预存款统计'
        },
        toolbox: {
            feature: {
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        legend: {
            data:['预存款统计']
        },
        xAxis: {
            type: 'category',
            data: this.data,
              name:'时间'
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: this.list,
            type: 'line',
            name:'期末金额'
        }]
      });
    },
    initDetailChart() {
      this.chart = echarts.init(document.getElementById(this.detailid));
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
        title: {
            text: '进账'
        },
        toolbox: {
            feature: {
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        legend: {
            data:['预存款详情统计']
        },
        xAxis: {
            type: 'category',
            data: this.data,
              name:'时间'
        },
        yAxis: {
            type: 'value'
        },
        series: this.in_list
      });
    },
    initDetailOutChart() {
      this.chart = echarts.init(document.getElementById(this.detailOutid));
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
        title: {
            text: '出账'
        },
        toolbox: {
            feature: {
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        legend: {
            data:['预存款详情统计']
        },
        xAxis: {
            type: 'category',
            data: this.data,
              name:'时间'
        },
        yAxis: {
            type: 'value'
        },
        series: this.out_list
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

