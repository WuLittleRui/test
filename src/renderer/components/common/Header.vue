<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="collapse-btn" @click="collapseChage">
      <i class="el-icon-menu"></i>
    </div>
    <div class="logo">口腔门诊系统</div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 全屏显示 -->
        <div class="btn-fullscreen" @click="handleFullScreen">
          <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
            <i class="el-icon-rank"></i>
          </el-tooltip>
        </div>
        <!-- 消息中心 -->
        <div class="btn-bell">
          <el-tooltip effect="dark" :content="message?`有${message}条未读消息`:`消息中心`" placement="bottom">
            <router-link to="/tabs">
              <i class="el-icon-bell"></i>
            </router-link>
          </el-tooltip>
          <span class="btn-bell-badge" v-if="message"></span>
        </div>
        <!-- 用户头像 -->
        <div class="user-avator"><img src="static/img/img.jpg"></div>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            <span :title="username">{{username}}</span> <i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <!-- <a href="http://blog.gdfengshuo.com/about/" target="_blank">
              <el-dropdown-item>关于作者</el-dropdown-item>
            </a> -->
            <el-dropdown-item divided command="changepassword">修改密码</el-dropdown-item>

            <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <el-dialog title="修改密码" :visible.sync="changeVisible" width="50%">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="登录名" prop="username">
          <span> {{username}} </span>
        </el-form-item>
        <el-form-item label="旧密码" prop="old_password">
          <el-input type="password" v-model="form.old_password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="new_password">
          <el-input type="password" v-model="form.new_password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="changeVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import bus from "../common/bus";
import * as OauthApi from "@/api/OauthApi";
import * as AdminApi from "../../api/AdminApi";
import * as MenuApi from "../../api/MenuApi";

export default {
  data() {
    return {
      items: [],
      activeIndex: null,
      collapse: false,
      fullscreen: false,
      username: "",
      message: "",
      changeVisible: false,
      treeNum: 0,
      form: {
        old_password: "",
        new_password: ""
      },
      rules: {
        old_password: [
          { required: true, message: "请输入旧密码", trigger: "blur" },
          { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
        ],
        new_password: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 用户名下拉菜单选择事件
    handleCommand(command) {
      if (command == "loginout") {
        OauthApi.logOut();
        this.$router.push("/login");
      } else if (command == "changepassword") {
        //修改密码
        this.changeVisible = true;
      }
    },
    // 侧边栏折叠
    collapseChage() {
      this.collapse = !this.collapse;
      bus.$emit("collapse", this.collapse);
    },
    // 全屏事件
    handleFullScreen() {
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    },
    handleSelect(index) {
      let item = this.items.find(item => {
        return item.index === index;
      });
      if (item.subs) {
        bus.$emit("submenu", item.subs);
      } else {
        //console.log(index);
        this.$router.push(item.index);
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          AdminApi.changePassword(
            this.form.old_password,
            this.form.new_password
          ).then(res => {
            if (res.error === "success") {
              OauthApi.logOut();
              this.$router.push("/login");
            } else if (res.error === "invalid_token") {
              OauthApi.logOut();
              self.$router.push("/login");
            } else {
              this.$message({
                type: "error",
                message: this.$t(res.error)
              });
            } 
          });
        }
      });
    },
    initMenu(data, parentIndex) {
      if (!data || !data.showInMenu) return null;
      let item = { title: data.name };
      item.index = data.url || data.id + "";
      item.parentIndex = parentIndex;
      if (data.icon) {
        item.icon = data.icon;
      }
      if (data.child && data.child.length > 0) {
        let self = this;
        for (let i = 0; i < data.child.length; i++) {
          let element = data.child[i];
          let child = self.initMenu(element, item.index);
          if (child) {
            if (!item.subs) item.subs = [];
            item.subs.push(child);
          }
        }
      }
      return item;
    },
  },
  created() {
    MenuApi.getMenu().then(res => {
      if (
        res.error === "success" &&
        res.data &&
        res.data.child &&
        res.data.child.length > 0
      ) {
        let node = this.initMenu(res.data);
        //console.log(node);
        if (node.subs && node.subs.length > 0) {
          this.activeIndex = node.subs[0].index;
          bus.$emit("submenu", node.subs);
        }
      } else if (res.error === "invalid_token") {
        OauthApi.logOut();
        self.$router.push("/login");
      }
    });
  },
  async mounted() {
    if (document.body.clientWidth < 1500) {
      this.collapseChage();
    }
    let userInfo = await OauthApi.getUserInfoFromStorage();
    if (userInfo) {
      this.username = userInfo.username;
    }
  }
};
</script>
<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #fff;
  min-width: 1020px;
}
.collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 70px;
}
.header .logo {
  float: left;
  width: 160px;
  line-height: 70px;
}
.header .menu {
  float: left;
  line-height: 70px;
  padding-top: 6px;
  color: #fff;
  max-width: calc(100vw - 530px);
}
.header .el-menu--horizontal {
  border-bottom: 0px;
}
.header-right {
  float: right;
  padding-right: 10px;
}
.header-user-con {
  display: flex;
  height: 70px;
  align-items: center;
}
.btn-fullscreen {
  transform: rotate(45deg);
  margin-right: 5px;
  font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
}
.btn-bell-badge {
  position: absolute;
  right: 0;
  top: -2px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
  color: #fff;
}
.btn-bell .el-icon-bell {
  color: #fff;
}
.user-name {
  margin-left: 10px;
}
.user-avator {
  margin-left: 20px;
}
.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}
.el-dropdown-link span {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  display: inline-block;
  max-width: 100px;
}
.el-dropdown-menu__item {
  text-align: center;
}
</style>
