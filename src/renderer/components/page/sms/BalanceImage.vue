<template>
    <el-dialog :title="title" :visible.sync="imageVisible" width="250px" :append-to-body="true" @close="close">
        <div style="text-align: center; font-size: 12px;">订单号:{{orderSn}}</div>
        <div style="text-align: center; font-size: 12px;">金额{{price}}</div>
        <img :src="src" style="width: 200px"/>
    </el-dialog>
</template>

<script>
import * as ShortApi from "@/api/ShortApi";
export default {
    data() {
        return {
            src: "",
            title: "微信支付",
            price: 0,
            imageVisible: false,
            orderSn: "",
            inter: null
        }
    },
    methods: {
        reset() {
            this.src = "";
        },
        close() {
            window.clearInterval(this.inter);
        },
        showImage(src, price, orderSn) {
            this.src = src;
            this.price = price; 
            this.imageVisible = true;
            this.orderSn = orderSn;
            var _this = this;
            this.inter = self.setInterval(function(){_this.getStatus(orderSn)},1000);
        },
        getStatus(orderSn) {
            ShortApi.status(orderSn).then(data => {
                if (data.error === "success") {
                    if(data.status == 2) {
                        window.clearInterval(this.inter);
                        this.$notify({
                            title: "成功",
                            message: "支付成功",
                            type: "success",
                            duration: 2000
                        });
                        this.imageVisible = false;
                        this.$emit("refresh");
                    }
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
            })
        },
    }
}
</script>

<style scoped>

</style>

