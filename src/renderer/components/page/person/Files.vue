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
            
            <el-tabs v-model="tabValue" type="border-card" @tab-click="patientNavSelectTab" style="margin-top: 10px;">
                <el-tab-pane label="病例信息">
                    <Case ref="Case" v-show="activity == 'Case'" @login="returnLogin"/>
                </el-tab-pane>
                <el-tab-pane label="处置记录">
                    <Handle ref="Handle" v-show="activity == 'Handle'" />
                </el-tab-pane>
                <el-tab-pane label="收费信息">
                    <Cashier ref="Cashier" v-show="activity == 'Cashier'" />
                </el-tab-pane>
            </el-tabs>
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
            tabValue: "",
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
            this.$refs["Case"].show(callback);
        },
        patientNavSelectTab() {
            var key = "";
            if(this.tabValue == 0) {    
                this.activity = "Case";
                key = "Case";
            }
            if(this.tabValue == 1) {
                this.activity = "Handle";
                key = "Handle";
            }
            if(this.tabValue == 2) {
                this.activity = "Cashier";
                key = "Cashier";
            }
            this.$refs[key].show(this.code);
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

