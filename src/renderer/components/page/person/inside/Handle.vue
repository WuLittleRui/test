<template>
    <div>
        <div class="basic_information">
			<el-scrollbar style="height: 100%;">
                <div style="margin-bottom: 10px;">
                    <el-date-picker style="width: 100%;" value-format="yyyy-MM-dd" @change="doSomething" v-model="time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                    
                </div>
                <div class="container" style="min-width: 1580px;margin-bottom: 20px; text-align: center" v-if="list.length == 0">
                    没有任何记录
                </div>
                <span v-for="item in list" v-if="list.length > 0">
                    <div class="container" style="min-width: 1580px;margin-bottom: 20px;">
                        <div class="title_style">
                            <span style="color: #B7DAFF; margin-left: 20px;">
                                2019-03-28 10:35:02
                            </span>
                            <span style="margin-left: 50px;">
                                <span style="color: #B7DAFF;">就诊类型:</span> <span style="color: white;">复诊</span>
                            </span>
                            <span style="margin-left: 50px;">
                                <span style="color: #B7DAFF;">就诊医生:</span> <span style="color: white;">高安分</span>
                            </span>
                        </div>
                        <div>
                            <el-table :data="item.tream_detail" border class="table" empty-text="没有任何记录" element-loading-text='给我一点时间'
                                v-loading='listLoading'
                                ref="multipleTable" >
                                <el-table-column label="收费项目" align="center">
                                    <el-table-column prop="title" label="项目名" header-align="center"  align="center" min-width="120">
                                    </el-table-column>
                                    <el-table-column prop="unit" label="单位" header-align="center"  align="center" min-width="60">
                                    </el-table-column>
                                    <el-table-column prop="unit_price" label="单价" header-align="center"  align="center" min-width="80">
                                    </el-table-column>
                                    <el-table-column label="牙位" align="center" header-align="center" min-width="60">
                                        <template slot-scope="scope">
                                            <span style="margin: 0 auto;">
                                                <PatientTeethPosition :ref="'PatientTeethPosition' + scope.row.prescription_id"/>
                                            </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="price" label="费用"  align="center" header-align="center" min-width="160">
                                    </el-table-column>
                                </el-table-column>
                            </el-table>
                        </div>
                        
                        <div style="margin-top: 10px;">
                            <el-table :data="item.prescription_detail" border class="table" empty-text="没有任何记录" element-loading-text='给我一点时间'
                                v-loading='prelistLoading'
                                ref="multipleTable" >
                                <el-table-column label="处方" align="center">
                                    <el-table-column prop="title" label="药品名" header-align="center"  align="center" sortable min-width="120">
                                    </el-table-column>
                                    <el-table-column prop="remark" label="用量用法" header-align="center"  align="center" sortable min-width="120">
                                    </el-table-column>
                                    <el-table-column prop="unit_price" label="单价" header-align="center"  align="center" sortable min-width="80">
                                    </el-table-column>
                                    <el-table-column prop="quantity" label="数量" align="center" header-align="center"  sortable  min-width="160">
                                    </el-table-column>
                                    <el-table-column prop="price" label="费用"  align="center" header-align="center" sortable  min-width="160">
                                    </el-table-column>
                                </el-table-column>
                            </el-table>
                        </div>
                        <div style="font-size: 30px; margin-top: 10px; text-align: right;">
                            合计: {{item.sub_amount}}
                        </div>
                    </div>
                </span>
			</el-scrollbar>
		</div>
    </div>
</template>

<script>
import PatientTeethPosition from "../../case/PatientCommon/PatientTeethPosition";
import * as PersonApi from '@/api/PersonApi';
import { accAdd, accMultiply } from "@/utils/calculation";
export default {
    components: { PatientTeethPosition },
    data() {
        return {
            list: [],
            listLoading: false,
            prelistLoading: false,
            time: [],
            code: ""
        }
    },
    methods: {
        doSomething() {
            this.getInfo(this.code);
        },
        show(code) {
            this.code = code;
            this.getInfo(code);
        },
        getInfo(code) {
            this.listLoading = true;
            this.prelistLoading = true;
            var start = "";
            var end = "";
            if(this.time.length > 0) {
                start = this.time[0];
                end = this.time[1];
            }
            PersonApi.getHandle(code, start, end).then(data => {
                if(data.error == "success") {
                    data.data.list.forEach(item => {
                        item.tream_detail.forEach(one => {
                            var cost_price = 1;
                            if(one.cost_price != 0) {
                            cost_price = one.cost_price;
                            }
                            one.price = accMultiply(accMultiply(one.unit_price, one.quantity), cost_price);
                        })

                        item.prescription_detail.forEach(one => {
                            var cost_price = 1;
                            if(one.cost_price != 0) {
                            cost_price = one.cost_price;
                            }
                            one.price = accMultiply(accMultiply(one.unit_price, one.quantity), cost_price);

                        })
                    });
                    this.list = data.data.list;
                    this.listLoading = false;
                    this.prelistLoading = false;

                    var _this = this;
                    this.$nextTick(() => {
                        data.data.list.forEach(item => {
                            item.tream_detail.forEach(one => {
                                var po = JSON.parse(one.position);
                                _this.$refs[("PatientTeethPosition" + one.prescription_id)][0].editItem(po);
                            })
                        });
                    })  
                } else {
                    this.$emit("login")
                }
            })
        }
    }
}
</script>

<style scoped>
.basic_information {
    height: 650px;
}
.title_style {
    background-color: #409EFF;
    height: 40px;
    line-height: 40px;
    margin-bottom: 10px;
}
</style>

