<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <img src="@/assets/img/police.png" alt />
    <div class="logo">机审平台</div>
    <!-- <div class="collapse-btn" @click="collapseChage"></div> -->
    <div class="header-right">
      <div class="header-user-con">
        <!-- 全屏 -->
        <!-- 页面全屏 -->
        <el-tooltip
          effect="dark"
          :content="isFullScreen ? '取消全屏' : '全屏浏览'"
          placement="bottom"
        >
          <i class="el-icon-rank" @click="handleFullScreen"></i>
        </el-tooltip>

        <!-- 用户头像 -->
        <div class="user-avator">
          <img src="../assets/img/img.jpg" />
        </div>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            {{ username }}
            <i class="el-icon-caret-bottom"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="upload">修改密码</el-dropdown-item>
              <el-dropdown-item divided command="loginout"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <el-dialog
      title="修改密码"
      :visible.sync="dialog"
      width="30%"
      :before-close="handleClose1"
      class="dialogInfo"
    >
      <el-form
        ref="domainSimpleVo"
        label-width="80px"
        :inline="true"
        :model="newdomainSimpleVo"
        class="demo-form-inline search_select_form"
        size="mini"
      >
        <!--  <el-form-item label="原密码">
          <el-input v-model="newdomainSimpleVo.oldpwd"></el-input>
        </el-form-item> -->
        <el-form-item label="新密码">
          <el-input v-model="newdomainSimpleVo.xinpwd"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="newdomainSimpleVo.xinpwd2"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="up" type="primary" size="mini">修 改</el-button>
        <el-button type="primary" @click="dialog = false" size="mini"
          >取 消</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      isFullScreen: false,
      newdomainSimpleVo: {
        oldpwd: "",
        xinpwd: "",
        xinpwd2: "",
      },
      dialog: false,
      fullscreen: false,
      message: 1,
      name: "",
      path: "",
      msgType: "",
      use: "",
      old: "",
    };
  },
  computed: {
    username() {
      let username = JSON.parse(window.sessionStorage.getItem("one"));
      // window.sessionStorage.setItem("userName", this.param.username);
      return username ? username : this.name;
    },
    collapse() {
      return this.$store.state.collapse;
    },
    pro() {
      return this.$store.state.webSocketMsg;
    },
  },

  methods: {
    async up() {
      if (
        this.newdomainSimpleVo.xinpwd == "" ||
        this.newdomainSimpleVo.xinpwd2 == ""
      ) {
        this.$message("请同时输入新密码和确认密码！");
        return false;
      }
      if (this.newdomainSimpleVo.xinpwd != this.newdomainSimpleVo.xinpwd2) {
        this.$message("新密码输入有误，请重试！");
        return false;
      }
      if (
        this.newdomainSimpleVo.xinpwd.length < 6 ||
        this.newdomainSimpleVo.xinpwd.length > 20
      ) {
        this.$message("密码长度必须在6-20个字符之间！");
        return false;
      }
      if (this.newdomainSimpleVo.oldpwd == this.newdomainSimpleVo.xinpwd) {
        this.$message("原密码和新密码相同，请重试！");
        return false;
      }

      let list = {
        password1: this.newdomainSimpleVo.xinpwd,
        password2: this.newdomainSimpleVo.xinpwd2,
      };
      const { data: res } = await this.$http.post("/user/change", list);
      if (res.code == 200) {
        this.dialog = false;
        this.$message(res.message);
        this.$router.push("/user/login");
      } else {
        this.$message(res.message);
        this.dialog = false;
      }
    },
    //-------------------------------------------------------------------------------------
    // 用户名下拉菜单选择事件
    async handleCommand(command) {
      if (command == "loginout") {
        // localStorage.removeItem("ms_username");
        const { data: res } = await this.$http.get("/user/logout");
        if (res.code == 200) {
          window.sessionStorage.clear();
          this.$router.push("/user/login");
          //显示登录成功信息
          // this.$message(res.message)
          this.$message({
            message: "退出登录成功",
            type: "success",
          });
          console.log(res.message);
        } else {
          //显示登录失败信息
          this.$message(res.message);
        }
      } else if (command == "upload") {
        // 显示修改密码对话框
        this.dialog = true;
        this.newdomainSimpleVo.oldpwd = JSON.parse(
          window.sessionStorage.getItem("pwd")
        );
      }
    },
    handleClose1() {
      this.dialog = false;
    },
    collapseChage() {
      this.$store.commit("hadndleCollapse", !this.collapse);
    },
    // ________________________________________全屏
    handleFullScreen() {
      if (this.isFullScreen) {
        const doc = document;
        const exitFullScreen =
          doc.exitFullscreen ||
          doc.webkitCancelFullScreen ||
          doc.mozCancelFullScreen ||
          doc.msExitFullscreen;
        if (exitFullScreen) {
          exitFullScreen.call(doc);
        }
      } else {
        const htmlDOM = document.documentElement;
        const enterFullScreen =
          htmlDOM.requestFullscreen ||
          htmlDOM.webkitRequestFullScreen ||
          htmlDOM.mozRequestFullScreen ||
          htmlDOM.msRequestFullscreen;
        if (enterFullScreen) {
          enterFullScreen.call(htmlDOM);
        } else {
          this.$message({
            type: "warning",
            message: "您的浏览器不支持全屏浏览，请升级或更换浏览器！",
          });
        }
      }
      this.isFullScreen = !this.isFullScreen;
    },
  },
  mounted() {
    if (document.body.clientWidth < 1500) {
      this.collapseChage();
    }
  },
};
</script>
<style scoped>
.item {
  position: absolute;
  top: -0.7rem;
  left: 1.4rem;
  margin-top: 0.5rem;
  margin-right: 2rem;
}
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  font-size: 22px;
  color: #fff;
  background-color: rgb(20, 124, 234);
  /* border-bottom: 1px solid #fff; */
}
.collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 70px;
}
img {
  float: left;
  width: 20px;
  height: 20px;
  margin: 15px;
}
.header .logo {
  float: left;
  width: 135px;
  line-height: 50px;
}
.header-right {
  float: right;
  padding-right: 20px;
}
.header-user-con {
  display: flex;
  height: 50px;
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
  right: -8px;
  top: -2px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
  color: #fff;
}
.btn-bell .el-icon-bell {
  position: absolute;
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
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}
.el-dropdown-menu__item {
  text-align: center;
}
</style>
