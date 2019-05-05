<template>
    <div>
        <div class="basic_information" id="CaseContent">
            <el-scrollbar style="height: 100%;">
                <div class="container">
                    <section class="section" v-for="(item, index) in list" >
                        <header>
                            <ul class="header_left">
                                <li>
                                    {{item.treat_time}}
                                </li>
                                <li>
                                    {{item.title}}
                                </li>
                                <li>
                                    {{item.docker_name}}
                                </li>
                            </ul> 
                            <div style="clear: both;"></div>
                        </header>
                        <div style="position: relative;">
                            <div class="li" v-if="item.main_illness != '' && item.title == '初诊'"> 
                                <span>主诉:</span>
                                <div class="center_right">
                                    <span>{{item.main_illness}}</span>
                                </div>
                                <div style="clear: both;"></div>
                            </div>

                            <div class="li" v-if="item.main_illness != '' && item.title == '复诊'"> 
                                <span>复诊:</span>
                                <div class="center_right">
                                    <span>{{item.main_illness}}</span>
                                </div>
                                <div style="clear: both;"></div>
                            </div>

                            <div class="li" v-if="item.present_illness != ''"> 
                                <span>现病史:</span>
                                <div class="center_right">
                                    <span>{{item.present_illness}}</span>
                                </div>
                                <div style="clear: both;"></div>
                            </div>

                            <div class="li" v-if="item.history != ''"> 
                                <span>既往史:</span>
                                <div class="center_right">
                                    <span>{{item.history}}</span>
                                </div>
                                <div style="clear: both;"></div>
                            </div>

                            <div class="li" v-if="item.allergy != ''"> 
                                <span>过敏史:</span>
                                <div class="center_right">
                                    <span>{{item.allergy}}</span>
                                </div>
                                <div style="clear: both;"></div>
                            </div>
                            
                            <div class="li" v-if="item.inspect_list.length > 0"> 
                                <span>检查:</span>
                                <div class="center_right" v-for="(one, oindex) in item.inspect_list">
                                    <div class="center" @click="shows(index)">
                                        <div>{{one.position.left}}</div>
                                        <div>{{one.position.right}}</div>
                                        <div>{{one.position.lebottom}}</div>
                                        <div>{{one.position.bottom}}</div>
                                    </div>
                                    <span class="span">{{one.remark}}</span>
                                </div>
                                <div style="clear: both;"></div>
                            </div>

                            <div class="li" v-if="item.sup_list.length > 0"> 
                                <span>辅助检查:</span>
                                <div class="center_right" v-for="(one, oindex) in item.sup_list">
                                    <div class="center" @click="shows(index)">
                                        <div>{{one.position.left}}</div>
                                        <div>{{one.position.right}}</div>
                                        <div>{{one.position.lebottom}}</div>
                                        <div>{{one.position.bottom}}</div>
                                    </div>
                                    <span class="span">{{one.remark}}</span>
                                </div>
                                <div style="clear: both;"></div>
                            </div>

                            <div class="li" v-if="item.dia_list.length > 0"> 
                                <span>诊断:</span>
                                <div class="center_right" v-for="(one, oindex) in item.dia_list">
                                    <div class="center" @click="shows(index)">
                                        <div>{{one.position.left}}</div>
                                        <div>{{one.position.right}}</div>
                                        <div>{{one.position.lebottom}}</div>
                                        <div>{{one.position.bottom}}</div>
                                    </div>
                                    <span class="span">{{one.remark}}</span>
                                </div>
                                <div style="clear: both;"></div>
                            </div>

                            <div class="li" v-if="item.trea_plan_list.length > 0"> 
                                <span>治疗方案:</span>
                                <div class="center_right" v-for="(one, oindex) in item.trea_plan_list">
                                    <div class="center" @click="shows(index)">
                                        <div>{{one.position.left}}</div>
                                        <div>{{one.position.right}}</div>
                                        <div>{{one.position.lebottom}}</div>
                                        <div>{{one.position.bottom}}</div>
                                    </div>
                                    <span class="span">{{one.remark}}</span>
                                </div>
                                <div style="clear: both;"></div>
                            </div>

                            <div class="li" v-if="item.trea_list.length > 0"> 
                                <span>治疗:</span>
                                <div class="center_right" v-for="(one, oindex) in item.trea_list">
                                    <div class="center" @click="shows(index)">
                                        <div>{{one.position.left}}</div>
                                        <div>{{one.position.right}}</div>
                                        <div>{{one.position.lebottom}}</div>
                                        <div>{{one.position.bottom}}</div>
                                    </div>
                                    <span class="span">{{one.remark}}</span>
                                </div>
                                <div style="clear: both;"></div>
                            </div>

                            <div class="li" v-if="item.advice != ''"> 
                                <span>医嘱:</span>
                                <div class="center_right">
                                    <span>{{item.advice}}</span>
                                </div>
                                <div style="clear: both;"></div>
                            </div>
                        </div>
                    </section>
                </div>
            </el-scrollbar>
        </div>
    </div>
</template>

<script>
import * as PersonApi from '@/api/PersonApi';
import { parseTime } from "@/utils/formater";
export default {
    data() {
        return {
            list: [],
            code: ""
        }
    },
    mounted() {
        document.getElementById("CaseContent").style.height = (document.body.clientHeight - 300) + "px";
    },
    methods: {
        show(code) {
            this.code = code;
            this.getInfo(code);
        },
        getInfo(code) {
            PersonApi.getCase(code).then(data => {
                if(data.error == "success") {
                    data.data.list.forEach(item => {
                        item.treat_time = parseTime(item.treat_time);
                    });
                    this.list = data.data.list;
                } else {
                    this.$emit("login")
                }
            })
        }
    }
}
</script>

<style scoped>
.small-section-title {
    color: #A0A0A0;
}
.center_right span{
    color: black !important;
}
.header {
  background: #ffffff;
}
.header li {
  float: left;
}
.header_left li {
  float: left;
  color: #505050;
  font-weight: bold;
  margin: 2px 10px;
  line-height: 40px;
  color: #969696;
  list-style:none;
}
.header_left li:nth-child(3) {
  padding-left: 60px !important;
}
.li {
	width: 720px;
}
.li span{
	display: block;
	float: left;
	margin: 5px;
	line-height: 24px;
	color: #969696;
	text-indent: 10px
}
</style>

