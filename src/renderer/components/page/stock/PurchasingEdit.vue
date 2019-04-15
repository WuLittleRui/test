<template>
    <!-- 编辑弹出框 -->
    <el-dialog title='采购单详情' :visible.sync='editVisible' width='85%'>
        <div style="height:30px">
            <div style="float:left; ">
                <label>采购时间：{{this.create_time}}</label>
            </div>
        </div>
        <el-table :data='orderDetails' v-loading='listLoading'>
            <el-table-column property='product_name' label='商品名' align="center"></el-table-column>
            <el-table-column property='unit_price' label='单价' align="center"></el-table-column>
            <el-table-column property='quality' label='数量' align="center"></el-table-column>
        </el-table>
           <div>
          
         <el-row :gutter="24">
          <el-col :span="6" :offset="19"><div class="grid-content bg-purple">
            <label style="color:#FF4040;font-size:18px;">总金额：{{this.total}}</label>    
          </div></el-col>
        </el-row>
      </div>
    </el-dialog>
</template>

<script>
    import * as PurchasingApi from "../../../api/PurchasingApi";
      import {
    parseTime
  } from "../../../utils/formater";
    import {
        accAdd,
        accMultiply
    } from "@/utils/calculation";
    export default {
        data() {
            return {
            total:'',
               create_time:"",
                editVisible: false,
                orderDetails: [],
                listLoading: false,
                disabled: false
            };
        },
        methods: {
            showNew(purchase_id,create_time,total_price) {
                this.editVisible = true;
                     this.create_time=  parseTime(create_time, "{y}-{m}-{d}")
              this.total= total_price;
                this.getData(purchase_id);
            },
            getData(purchase_id) {
                PurchasingApi.byId(purchase_id).then(data => {
                    this.listLoading = false;
                    if (data.error === "success") {
                        this.orderDetails = data.data.list;
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
            }
        }
    };
</script>
