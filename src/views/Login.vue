<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">机审平台</div>
      <div class="ms-kuang">
        <el-form
          :model="param"
          :rules="rules"
          ref="param"
          label-width="0px"
          class="ms-content"
          @keyup.enter.native="submitForm('param')"
        >
          <el-form-item prop="username">
            <el-input v-model="param.username" placeholder="用户名">
              <template #prepend>
                <el-button icon="el-icon-user"></el-button>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              placeholder="密码"
              v-model="param.password"
              show-password
              @keyup.enter="submitForm()"
            >
              <template #prepend>
                <el-button icon="el-icon-lock"></el-button>
              </template>
            </el-input>
          </el-form-item>
          <div class="login-btn">
            <!---->
            <el-button
              type="primary"
              @click="submitForm('param')"
              :loading="loading"
              >登录</el-button
            >
          </div>
          <!--                <p class="login-tips">Tips : 用户名和密码随便填。</p>-->
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
export default {
  data() {
    return {
      loading: false,
      newarr: [],
      param: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  created() {
    // this.$store.commit("clearTags");
  },
  methods: {
    async submitForm(param) {
      this.loading = true; //当前登陆界面--圆圈
      const token = uuidv4();
      this.$refs[param].validate(async (valid) => {
        //前端验证
        if (valid) {
          try {
            const formData = new FormData();
            formData.append("username", this.param.username);
            formData.append("password", this.param.password);
            let list = {
              username: this.param.username,
              password: this.param.password,
            };
            console.log(formData);
            const res = await this.$http.post("/user/login", formData);
            if (res.data.code == 200) {
              // this.$message("登录成功");
              this.$message({
                message: "登录成功",
                type: "success",
              });
              window.sessionStorage.setItem(
                "one",
                JSON.stringify(this.param.username)
              );
              window.sessionStorage.setItem(
                "pwd",
                JSON.stringify(this.param.password)
              );
              window.sessionStorage.setItem("token", JSON.stringify(token));
              // window.sessionStorage.setItem("isLogin", "true");

              /*  // 根据角色和权限控制页面跳转
              if (role === "SuperAdmin") {
                this.$router.push("/cases"); // 超管有所有权限
              } else if (role === "Admin") {
                this.$router.push("/cases"); // 管理员跳转，但不能看到系统管理页面
              } else if (role === "User") {
                // 普通用户根据 permissions 控制展示的模块
                if (permissions.includes("CASE")) {
                  this.$router.push("/case-module");
                } else if (permissions.includes("CASEAUDIT")) {
                  this.$router.push("/audit-module");
                } else if (permissions.includes("URLTASK")) {
                  this.$router.push("/url-task-module");
                } else if (permissions.includes("DIAOYU")) {
                  this.$router.push("/phishing-module");
                } else if (permissions.includes("DATAAUDIT")) {
                  this.$router.push("/data-audit-module");
                } else {
                  this.$message.error("没有可访问的权限");
                }
              } */

              this.loading = false;
              this.$router.push("/cases");
            } else {
              this.$message("账号或密码错误！");
              this.loading = false; //不转圆圈
            }
          } catch (e) {
            this.$message.error(e); //e---error缩写，打印问题
            this.loading = false;
          }
        } else {
          this.$message.error("请输入账号和密码");
          this.loading = false;
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.login-wrap {
  position: fixed;
  width: 100%;
  height: 100%;
  /* background-image: url(../assets/img/login-bg.jpg); */
  /* background: #ffffff00 url(../assets/img/login-bg.jpg) no-repeat fixed top; */
  background: #ffffff00 url(../assets/img/change-bg.png) center center no-repeat;
  background-size: 100% 100%;
}
.ms-title {
  width: 100%;
  text-align: center;
  font-size: 28px;
  color: rgb(69, 113, 155);
  /* color: rgb(64, 158, 255); */
  font-weight: bold; /* 加粗字体 */
  margin-top: 20px;
}
.ms-kuang {
  width: 400px; /* 设置宽度为100px */
  height: 270px; /* 设置高度为100px */
  border-radius: 10px;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  /* width: 400px; */
  transform: translate(-50%, -70%);
  border-radius: 5%;
  background: rgba(255, 255, 255, 0.6);
  overflow: hidden;
  /* box-shadow: 2px 2px 1px #000; */
}
.ms-content {
  padding: 50px 50px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 50%;
  height: 36px;
  margin-bottom: 10px;
  border-radius: 18px;
  margin-top: 20px;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
</style>
