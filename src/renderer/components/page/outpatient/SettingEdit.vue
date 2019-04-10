<template>
        <!-- 编辑弹出框 -->
    <el-dialog :title="title" :visible.sync="editVisible" width="50%">
       <el-form ref="form" :rules="rules" :model="form" label-width="120px" label-position="rigth">
        <el-row>
          <el-col :span="24"  align="left">
            <div class="grid-content bg-purple-light">
              <el-form-item label='医院介绍'>
                  <el-input type="textarea"  v-model="form.remark"></el-input>
              </el-form-item>
            </div>
          </el-col>
           <el-col :span="24"  align="left">
            <div class="grid-content bg-purple-light">
              <el-form-item label='客服电话' prop="link_tel">
                <el-input v-model="form.link_tel" ></el-input>
              </el-form-item>
            </div>
          </el-col>
           <el-col :span="24"  align="lng">
            <div class="grid-content bg-purple-light">
              <el-form-item label='医院经度' prop="lng">
                <el-input v-model="form.lng" ></el-input>
              </el-form-item>
            </div>
          </el-col>
           <el-col :span="24"  align="left">
            <div class="grid-content bg-purple-light">
              <el-form-item label='医院纬度' prop="lat">
                <el-input v-model="form.lat" ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('form')" >提交</el-button>
        </span>
    </el-dialog>
</template>

<script>
import * as ProgramApi from "../../../api/ProgramApi";
import * as SettingApi from "../../../api/SettingApi";
import * as OauthApi from "@/api/OauthApi";
import { validPhone } from "../../../utils/validate";
export default {
  data() {
    return {
      editVisible: false,
      title: "营业设置",
      csTel: "", //电话
      form: {
        remark: "",
        link_tel: "",
        lng: "",
        lat: ""
      },
      rules: {
        title: [{ required: true, message: "请输入员工名", trigger: "blur" }],
        lng: [{ required: true, message: "请输入经度", trigger: "blur" }],
        lat: [{ required: true, message: "请输入纬度", trigger: "blur" }],
        link_tel: [
          { required: true, message: "请输入手机号", trigger: "blur" }
        ],
        businessStarted: [
          { required: true, message: "请输入开始时间", trigger: "blur" }
        ],
        businessEnd: [
          { required: true, message: "请输入结束时间", trigger: "blur" }
        ],
        mostTimeNum: [
          { required: true, message: "请输入预定数量", trigger: "blur" }
        ]
      }
    };
  },

  methods: {
    showNew() {
      this.title = "新增";
      this.resetForm();
      this.editVisible = true;
    },
    async showEdit() {
      this.title = "医院设置";
      this.resetForm();
      this.editVisible = true;
      await this.getList();
    },
    getList() {
      SettingApi.getShopInfo().then(data => {
        if (data.error === "success") {
          this.form.remark = data.data.remark;
          this.form.link_tel = data.data.link_tel;
          this.form.lng = data.data.lng;
          this.form.lat = data.data.lat;
        } else if (
        data.error === "invaild_token" ||
        data.error === "not_login"
        ) {
        //判断是否认证过期
        OauthApi.logOut();
        this.$router.push("/login");
        }   else {
          this.$message.error(this.$t(data.error));
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //修改
          SettingApi.updateShop(
            null,
            this.form.remark,
            this.form.link_tel,
            this.form.lng,
            this.form.lat
          ).then(res => {
            if (res.error === "success") {
              this.$message({
                type: "success",
                message: "提交成功!"
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
        }   else {
              this.$message({
                type: "error",
                message: this.$t(res.error)
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    resetForm() {
      this.form.remark = ""; //客服电话
      this.form.link_tel = "";
      this.form.lng = "";
      this.form.lat = "";
    }
  }
};
</script>

<style>
.tree {
  overflow: auto;
  height: 200px;
}
</style>
        
