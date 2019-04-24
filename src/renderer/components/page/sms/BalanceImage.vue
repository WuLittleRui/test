<template>
    <el-dialog :title="title" :visible.sync="imageVisible" width="250px" :append-to-body="true">
        <div style="text-align: center; font-size: 25px;">{{price}}</div>
        <img :src="src" style="width: 200px"/>
    </el-dialog>
</template>

<script>
export default {
    data() {
        return {
            src: "",
            title: "微信支付",
            price: 0,
            imageVisible: false
        }
    },
    methods: {
        reset() {
            this.src = "";
        },
        showImage(src, price) {
            this.src = src;
            this.price = price; 
            this.imageVisible = true;
        }  
    }
}
</script>

<style scoped>

</style>

