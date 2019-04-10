<template>
  <!-- 编辑弹出框 -->
  <el-dialog :title="title" :visible.sync="editVisible" width="50%">
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="已选项目" prop="title">
        <el-input v-model="form.name" :readonly="titleameReadonly"></el-input>
      </el-form-item>
      <div class="grid-content bg-purple">
        <el-form-item>
          <span style="font-size:15px;">提成</span>
          <el-radio-group style="padding-left:15px" v-model="form.type">
            <el-radio   :label="1">金额:
              <el-input  v-model="form.commissionValueAmount" style="width:80px;height:15px"></el-input><span style="font-size:20px;"> ￥</span>
            </el-radio>
            <el-radio :label="0" style="margin-left:20rpx;">比例:
              <el-input v-model="form.commissionValuePer" style="width:80px;height:15px"></el-input><span style="font-size:20px; "> %</span>
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
                  <el-button @click="editVisible = false">取 消</el-button>
                  <el-button   v-if="par == -1" type="primary" @click="submitFormacard('form')" >确 定</el-button>
                  <el-button   v-else type="primary" @click="submitForma('form')" >确 定</el-button>

              </span>
  </el-dialog>
</template>

<script>
  import * as HospitalChargeCommmistionApi from "../../../api/HospitalChargeCommmistionApi";
  import * as OauthApi from "@/api/OauthApi";
  import {
    validPhone
  } from "../../../utils/validate";
  export default {
    data() {
      return {
           menoy:"￥",
        percentage: "%",
        par:"",
        shop_id: "",
        titleameReadonly: true,
        editVisible: false,
        title: "提成设置",
        editFlag: false,
        groupName: '',
        form: {
          charge_id: "",
          name: "",
          state: "",
          unit: "",
          group_id: "",
          type: 0,
          commission_value: "",
          commissionValueAmount: "",
          commissionValuePer: "",
        }
      };
    },
    mounted() {
      this.form.commissionValueAmount = "";
      this.form.commissionValuePer = "";
      //this.getData();
    },
    methods: {
      showNew() {
        this.title = "新增";
        this.titleameReadonly = false;
        this.editVisible = true;
        //该方法必须显示后才能调用 ,不知道为什么
        setTimeout(() => {
          this.$refs.tree.setCheckedKeys([]);
        }, 500);
      },
      async showEdit( name, charge_id, groupId,par) {
        this.form.commissionValueAmount = "";
        this.form.commissionValuePer = "";
        this.title = "提成设置";
        this.titleameReadonly = true;
        this.editVisible = true;
        this.par=par;
        this.form.name = name;
           this.form.charge_id = charge_id;
        this.groupName= name;
        this.form.group_id = groupId;
       
        if(this.par === -1){
              this.getCard();
        }else{
          this.getData();
        }
        
      
      },
      submitFormacard(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            //修改
            if (this.editFlag) {
         
              if (this.form.type === 0) {
                this.form.commission_value = this.form.commissionValuePer;
              } else if (this.form.type === 1) {
                this.form.commission_value = this.form.commissionValueAmount;
              }
              HospitalChargeCommmistionApi.update(
                this.form.charge_id,
                this.form.group_id,
                this.form.type,
                this.form.commission_value,
              ).then(res => {
                if (res.error === "success") {
                  this.$message({
                    type: "success",
                    message: "编辑成功!"
                  });
                  this.$emit("refresh");
                  this.editVisible = false;
                } else if (
        res.error === "invaild_token" ||
        res.error === "not_login"
        ) {
        //判断是否认证过期
        OauthApi.logOut();
        this.$router.push("/login");
        }  else {
                  this.$message({
                    type: "error",
                    message: this.$t(res.error)
                  });
                }
              });
            } else {
              //添加
              if (this.form.type === 0) {
                this.form.commission_value = this.form.commissionValuePer;
              } else {
                this.form.commission_value = this.form.commissionValueAmount;
              }
              MemberCurrencyPromotionAPi.add(
                this.form.charge_id,
                this.form.group_id,
                this.form.type,
                this.form.commission_value,
              ).then(res => {
                if (res.error === "success") {
                  this.$message({
                    type: "success",
                    message: "添加成功!"
                  });
                  this.$emit("refresh");
                  this.editVisible = false;
                } else if (
        res.error === "invaild_token" ||
        res.error === "not_login"
        ) {
        //判断是否认证过期
        OauthApi.logOut();
        this.$router.push("/login");
        }  else {
                  this.$message({
                    type: "error",
                    message: this.$t(res.error)
                  });
                }
              });
            }
          } else {
            return false;
          }
        });
      },
        submitForma(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            //修改
            if (this.editFlag) {
              if (this.form.type === 0) {
                this.form.commission_value = this.form.commissionValuePer;
              } else if (this.form.type === 1) {
                this.form.commission_value = this.form.commissionValueAmount;
              }
              HospitalChargeCommmistionApi.update(
                this.form.charge_id,
                this.form.group_id,
                this.form.type,
                this.form.commission_value,
              ).then(res => {
                if (res.error === "success") {
                  this.$message({
                    type: "success",
                    message: "编辑成功!"
                  });
                  this.$emit("refresh");
                  this.editVisible = false;
                } else if (
        res.error === "invaild_token" ||
        res.error === "not_login"
        ) {
        //判断是否认证过期
        OauthApi.logOut();
        this.$router.push("/login");
        }  else {
                  this.$message({
                    type: "error",
                    message: this.$t(res.error)
                  });
                }
              });
            } else {
              //添加
              if (this.form.type === 0) {
                this.form.commission_value = this.form.commissionValuePer;
              } else {
                this.form.commission_value = this.form.commissionValueAmount;
              }

              HospitalChargeCommmistionApi.add(
                this.form.charge_id,
                this.form.group_id,
                this.form.type,
                this.form.commission_value,
              ).then(res => {
                if (res.error === "success") {
                  this.$message({
                    type: "success",
                    message: "添加成功!"
                  });
                  this.$emit("refresh");
                  this.editVisible = false;
                } else if (
        res.error === "invaild_token" ||
        res.error === "not_login"
        ) {
        //判断是否认证过期
        OauthApi.logOut();
        this.$router.push("/login");
        }  else {
                  this.$message({
                    type: "error",
                    message: this.$t(res.error)
                  });
                }
              });
            }
          } else {
            return false;
          }
        });
      },
      getData() {
        HospitalChargeCommmistionApi.getOnePay(this.form.charge_id, this.form.group_id).then(response => {
          if (response.error === "success") {
            if (response.data.list !== null) {
                 this.form.group_id = response.data.list.group_id;
                this.form.charge_id = response.data.list.charge_id
              this.form.type = response.data.list.type;
              this.form.commission_value = response.data.list.commission_value;
              this.editFlag = true;
              if (this.form.type === 0) {
                this.form.commissionValuePer = this.form.commission_value;
              } else {
                this.form.commissionValueAmount = this.form.commission_value;
              }
            } else if (response.data.list == null) {
             
              this.form.commissionValueAmount = "";
              this.form.commissionValuePer = "";
              this.editFlag = false;
            }
          } else if (
        response.error === "invaild_token" ||
        response.error === "not_login"
        ) {
        //判断是否认证过期
        OauthApi.logOut();
        this.$router.push("/login");
        }  else {
            this.$message.error(response.error);
          }
        });
      },
       getCard(){
        MemberCurrencyPromotionAPi.getCommissionById(this.form.charge_id, this.form.group_id).then(response => {
          if (response.error === "success") {
            if (response.data.list !== null) {
              this.form.type = response.data.list.type;
              this.form.commission_value = response.data.list.commission_value;
              this.editFlag = true;
              if (this.form.type === 0) {
                this.form.commissionValuePer = this.form.commission_value;
              } else {
                this.form.commissionValueAmount = this.form.commission_value;
              }
            } else if (response.data.list == null) {
              this.form.commissionValueAmount = "";
              this.form.commissionValuePer = "";
              this.editFlag = false;
            }
          } else if (
        response.error === "invaild_token" ||
        response.error === "not_login"
        ) {
        //判断是否认证过期
        OauthApi.logOut();
        this.$router.push("/login");
        }   else {
            this.$message.error(response.error);
          }
        });
      }
    
    },
    
  };
</script>

<style>
  .tree {
    overflow: auto;
    height: 200px;
  }
</style>
        
