<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i>个人档案 > {{title}}
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div> 
        
        <Login ref="Login" v-show="activity == 'Login'" @refresh="LoginSuccess"/>

        <div class="grid-content bg-purple" v-show="activity != 'Login'">
            <el-input v-model="listQuery.searchKey" placeholder="请输入搜索内容" class="handle-input mr10 input"></el-input>
            <el-button type="primary" icon="el-icon-lx-search" @click="search">搜索</el-button>
            
            <el-menu background-color="#F0F0F0" :default-active="activity" class="el-menu-demo" mode="horizontal" @select="patientNavSelect" style="min-width: 645px; max-width: 645px;">
                <el-menu-item index="Case" style="width: 20%; text-align: center;">病例信息</el-menu-item>
                <el-menu-item index="Handle" style="width: 20%; text-align: center;">处置记录</el-menu-item>
                <el-menu-item index="Cashier" style="width: 20%; text-align: center;">收费信息</el-menu-item>
            </el-menu>
            <div class="grid-content bg-purple content">
                <Case ref="Case" v-show="activity == 'Case'" @login="returnLogin"/>
                <Handle ref="Handle" v-show="activity == 'Handle'" />
                <Cashier ref="Cashier" v-show="activity == 'Cashier'" />
            </div>
        </div>
    </div>
</template>

<script>
import Login from "./inside/Login";
import Case from "./inside/Case";
import Handle from "./inside/Handle";
import Cashier from "./inside/Cashier";

export default {
    components: { Login, Case, Handle, Cashier },
    data() {
        return {
            activity: "Case",
            code: null,
            title: '登录',
            listQuery: {
                searchKey: ""
            }
        }
    },
    mounted() {
        if(this.code == null) {
            this.activity = 'Login';
            this.title = '登录';
        } else {
            this.activity = 'Case';
        }
    },
    methods: {
        LoginSuccess(callback) {
            this.code = callback;
            this.activity = "Case";
            console.log(callback)
            this.$refs["Case"].show(callback);
        },
        patientNavSelect(key) {
            this.activity = key;
            this.$refs[key].show(this.code);
        },
        search() {

        },
        returnLogin() {
            this.activity = "Login";
        }
    }
}
</script>

<style scoped>
.handle-box {
    display: inline;
}
.input {
    width: 247px;
    margin-top: 13px;
}
.el-menu.el-menu--horizontal {
    border-bottom: 0 !important;
}
</style>

