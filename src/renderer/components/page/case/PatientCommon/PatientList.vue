<template>
    <div :style="'background-color: #F1F3F7;' + divStyle">
        <el-input v-model="listQuery.key" style="margin-bottom:10px;width: 80%;margin-top:10px;margin-left:10px;" placeholder="病历号/手机号/姓名"></el-input>
        <el-button type="primary" icon="el-icon-lx-search" @click="search">搜索</el-button>
        <el-scrollbar style="height: 80%;"> 
            <ul class="clist">
                <li v-for="(item,index) in dlist" @click="listClick3(index)" >
                    <img style="margin-top: 4px; margin-left: 15px;" v-if="!item.isturn" src="../../../../../../static/image/right.png"/>
                    <img style="margin-top: 2px; margin-left: 15px;" v-if="item.isturn" src="../../../../../../static/image/down.png"/>
                    <span style="margin-left: 10px;" :class="{selected: item.isturn}" >{{item.title}}</span>
                    <div v-for="(di, oindx) in item.data" v-show="item.isturn" @click.stop="" :class="di.active==true?'active':''" @click="cc(index, oindx)">
                        <div @click="divSelect(di.case_number)" >
                            <p class="top" style="height: 30px;">
                            	<span class="span_name">{{di.name}}</span>
                                <span class="span_name" style="margin-left: 10px">{{di.start_time_de}} <span v-if="di.start_time_de != undefined && di.end_time_de != undefined">-</span> {{di.end_time_de}}</span>
                            	<!-- <img :title="'欠款:' + di.arrears" src="../../../../../../static/image/debt.png" alt="" style="margin-left: 5px;" v-if="di.state == 2"> -->
                            	<!-- <span class="span_img" :title="'欠款:' + di.arrears" >史</span> -->
                            	<span class="span_img" v-if="!di.is_order">约</span>
                            	<!-- <span class="bing">就医,就学,就是,久久大手大脚开会山东省计划的 手机号发动机</span> -->
                            	<span class="right">{{di.join_time}}</span>
                            </p>
                            <p class="p">
                                <span >{{di.case_number}}</span>
                                <!-- <span v-show="!di.aa"><img src="img.jpg"><img src="img.jpg"><img src="img.jpg"><img src="img.jpg"></span> -->
                                <span>{{di.docter_name}}</span>
                                <span>{{di.mobile}}</span>
                            </p>
                        </div>
                    </div>
                </li>
            </ul>
        </el-scrollbar>
        
    </div>
</template>

<script>
import * as PatientApi from "../../../../api/PatientApi";
export default {
    data() { 
        return {
        	active:false,
            listQuery: {
                name: "",
                mobile: "",
                case_number: "",
                query_time: "",
                key: ''
            },
            flag: false,
            divStyle: "height:" + document.body.clientWidth * 0.3 + "px",
            index: 1,
            dlist: [{
                    title: '今日初诊(0)',active:false,data: []
                },{
                    title: '今日复诊(0)',active:false,data: []
                }
            ],
            dlist2: []
        };
    },
    methods: {
        search() {
            this.getPatient(this.flag);
        },
        divSelect(case_number) {
            this.$emit("refresh", case_number);
        },
        listClick3(index){
            var _title = this.dlist[index].title,
                _data = this.dlist[index].data,
                _isturn = !this.dlist[index].isturn;
            this.dlist.splice(index,1,{title:_title,data:_data,isturn:_isturn});
        },
        // 移入移出
        enter(e){
            e.aa = false
        },
        leave(e){
            e.aa = true
        },
        cc(index, oindex){
            this.dlist.forEach(item => {
                item.data.forEach(one => {
                    one.active = false;
                })
            })
        	this.dlist[index].data[oindex].active = true;
        },
        getActiveIndex(index, flag) {
            this.index = index;
            this.flag = flag;
            this.getPatient(flag);
        },
        getPatient(flag) {
            if(this.index == 2) {
                PatientApi.list(this.listQuery.name, this.listQuery.mobile, this.listQuery.case_number, this.listQuery.key).then(data => {
                    if (data.error === "success") {
                        this.dlist = [];
                        data.data.list.forEach(item => {
                            item.data.forEach(one => {
                                one.aa = true;
                                one.active = false;
                            })
                            item.title = item.title + "(" + item.size + ")";
                        })
                        if(data.data.list.length > 0) {
                            data.data.list[0].active = true;
                            data.data.list[0].isturn = true;
                        }
                        this.dlist = data.data.list;

                        if(this.dlist.length > 0 && this.dlist[0].data[0] != null && this.dlist[0].data[0] != undefined) {
                            this.$emit("refresh", this.dlist[0].data[0].case_number, this.index);
                        }
                        this.$emit("refresh", "", this.index);
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
            }
            if(this.index == 1) {
                PatientApi.patients(this.listQuery.query_time, this.listQuery.key).then(data => {
                    if (data.error === "success") {
                        if(data.data.first_list.length == 0 && data.data.revisit_list.length == 0 && flag == true) {
                            this.index = 2;
                            this.getPatient();
                            return;
                        }

                        this.dlist = [];
                        var first = {};
                        first.title = "今日初诊(" + data.data.first_number + ")";
                        data.data.first_list.forEach(item => {
                            item.aa = true;
                            item.active = false;
                        })
                        first.data = data.data.first_list;
                        if(first.data.length.length > 0) {
                            first.active = true;
                            first.isturn = true;
                        }
                        this.dlist.push(first);

                        var second = {};
                        second.title = "今日复诊(" + data.data.revisit_number + ")";
                        data.data.revisit_list.forEach(item => {
                            item.aa = true;
                            item.active = false;
                        })
                        second.data = data.data.revisit_list;
                        if(first.data.length == 0 && second.data.length > 0) {
                            second.active = true;
                            second.isturn = true;
                        }
                        this.dlist.push(second);

                        var sn = "";
                        if(data.data.first_list.length > 0) {
                            sn = data.data.first_list[0].case_number;
                        } else if(data.data.revisit_list.length > 0) {
                            sn = data.data.revisit_list[0].case_number;
                        }
                        this.$emit("refresh", sn, this.index);
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
            }
        }
    }
}
</script>

<style scoped>
.clist li{
    /* width: 30%; */
    line-height: 30px;
    list-style: none;
    cursor: pointer;
}
.clist li:hover{
    columns: #8C8C8C;
}
.clist li>div{
   background: #FFFFFF;
    border: 1px solid #8C8C8C;
}
.clist li>div:hover{
    background: #C7FEB5;
    border: 1px solid #8C8C8C;
}
.clist li .active{
    background: #C7FEB5;
    border: 1px solid #8C8C8C;
}
.clist li>div>div{
    /* height: 60px; */
    border-left: 5px solid #8C8C8C;
    padding: 2px 10px;
}
.clist li>div>div p .span_name{
        float: left;
}
.clist li>div>div p .span_img{
    background: #CB1515;
    color: #FFFFFF;
    font-size: 12px;
    padding: 2px;
    border-radius:2px ;
    margin-top: 4px;
    margin-left: 5px;
    height: 12px;
    line-height: 12px;
    float: left;
}
.clist li>div>div p .span_imgs{
    background: #CB1515;
    color: #FFFFFF;
    font-size: 12px;
    padding: 2px;
    border-radius:2px ;
    margin-top: 4px;
    margin-left: 25px;
    position: absolute;
    height: 12px;
    line-height: 12px;
}

.bing{
	position: absolute;
	margin-left: 60px;
	width: 160px;
	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
	color: #6E6E6E;
	font-size: 14px;
	line-height: 26px;
}
.clist li>div>div p .right{
    float: right;
}
 .clist li>div>div p .right img{
    margin: 0 1px;
}

.clist li>div>div .p span{
    width: 30%;
}
</style>
