<template>
    <div v-if="flag">
        <div :style="edit? 'height: 150px': teethHeight">
				<el-scrollbar style="height: 100%;" >
					<section class="section" v-for="(item, index) in list" >
						<header class="header">
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
							<ul class="header_right">
								<li>
									<el-button type="text" @click="handleEdit(item)" v-if=" !onlyShow" >编辑</el-button>
								</li>
								<li>
									<el-button type="text"  @click="handleDelete(item)" v-if=" !onlyShow">删除</el-button>
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
				</el-scrollbar>
			
				<div class="button">
					<el-button size="medium" type="primary" @click="handleFirst" v-if=" !onlyShow">初诊</el-button>
					<el-button size="medium" type="success" @click="handleReturn" v-if=" !onlyShow">复诊</el-button>
				</div>

			</div>
        <PatientCaseEdit ref="PatientCaseEdit" @refresh="getData" />
    </div>
</template>

<script>
import PatientTeethPosition from "../PatientTeethPosition";
import PatientCaseEdit from './PatientCaseEdit';
import * as HospitalHandleApi from "@/api/HospitalHandleApi";
import { parseTime } from "@/utils/formater";
export default {
		name: "PatientCase",
    components: { PatientCaseEdit, PatientTeethPosition },
    data() {
        return {
						teethHeight: "height:" + document.body.clientWidth * 0.3 + "px",
            edit: false,
            flag: false,
						case_number: null,
						onlyShow: false,
            list: []
        }
    },
    methods: {
        showORnoshow(flag, case_number, onlyShow, edit) {
					if(edit == true) {
                this.edit = true;
            }
						this.flag = flag;
						if(case_number != null) {
							this.case_number = case_number;
							if(onlyShow) {
									this.onlyShow = true;
							} else {
								this.onlyShow = false;
							}
						} else {
							this.onlyShow = true;
							return;
						}
						
						this.getData();
				},
				handleDelete(row) {
				this.$confirm(
        "此操作将永久删除该病历记录, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        HospitalHandleApi.deletecase([row.handle_id]).then(res => {
          if (res.error === "success") {
            this.$message({ 
              type: "success",
              message: "删除成功!"
            });
            this.getData();
          } else {
            this.$message({
              type: "error",
              message: this.$t(res.error)
            });
          }
        });
      });
				},
				handleEdit(row) {
					this.$refs['PatientCaseEdit'].showEdit(this.case_number, row.handle_id);
				},
				handleFirst() {
					this.$refs['PatientCaseEdit'].showNew(this.case_number, 1);
				},
				handleReturn() {
					this.$refs['PatientCaseEdit'].showNew(this.case_number, 2);
				},
				getData() {
					HospitalHandleApi.caseList(this.case_number).then(data => {
						if(data.error == "success") {
							data.data.list.forEach(item => {
								item.dia_list.forEach(item => {
									item.position = JSON.parse(item.position);
								});
								item.trea_plan_list.forEach(item => {
									item.position = JSON.parse(item.position);
								});
								item.inspect_list.forEach(item => {
									item.position = JSON.parse(item.position);
								});
								item.sup_list.forEach(item => {
									item.position = JSON.parse(item.position);
								});
								item.trea_list.forEach(item => {
									item.position = JSON.parse(item.position);
								});
								item.treat_time = parseTime(item.treat_time);
							})
							this.list = data.data.list;
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
</script>

<style scoped>
/*表格数据*/
.center {
  /* margin: 2px 10px; */
  float: left;
  position: relative;
  /* width: 100px; */
  height: 30px;
  cursor: pointer;
}
.center div {
  width: 26px;
  height: 12px;
  float: left;
  color: #000;
  font-size: 12px;
  padding: 1px 2px;
}
.center div:nth-child(1) {
  border-right: 1px solid #000;
  text-align: right !important;
  direction: rtl;
  unicode-bidi: bidi-override;
  
}
.center div:nth-child(4) {
  border-left: 1px solid #000;
  border-top: 1px solid #000;
}
.center div:nth-child(3) {
  border-top: 1px solid #000;
  text-align: right !important;
  direction: rtl;
  unicode-bidi: bidi-override;
}
.li{
	width: 720px;
}
.li span{
	display: block;
	float: left;
	margin: 5px;
	line-height: 24px;
	color: #969696;
	width: 80px;
	text-indent: 10px;
	
}
.center_right{
	margin-left: -8px;
	float: left;
	display: flex;
}
.center_right .span{
	margin-left: -15px;
	color: #000000 !important;
}
.center_right span{
	color: #000000 !important;
	width: 100%
}
.basic_information {
    height: 650px;
}
.basic_information2{
    height: 150px;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
input[type="number"] {
    -moz-appearance: textfield;
}
li {
  list-style: none;
}
.section {
  width: 98%;
  border-left: 10px solid #aaaaaa;
  border-bottom: 3px solid #aaaaaa;
  border-top: 3px solid #aaaaaa;
  border-right: 3px solid #aaaaaa;
  background: #ffffff;
  margin: 10px auto;
}
.header {
  background: #ffffff;
}
.header li {
  float: left;
}
.header_left li {
  font-size: 23px;
  color: #505050;
  font-weight: bold;
  margin: 2px 10px;
  line-height: 40px;
  color: #969696;
}
.header_left li:nth-child(3) {
  padding-left: 60px !important;
}
.header_right {
  float: right;
  margin-right: 20px;
}
.header_right li {
  margin: 5px;
}
.button {
  background-color: white;
  padding-top: 10px;
}
</style>

