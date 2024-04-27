<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">审核系统</div>
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

          <!-- <el-button icon="el-icon-user" class="ic"></el-button>

          <el-select v-model="param.username" placeholder="用户名" style="width:17.6875rem">
            <el-option label="sadmin(超级)" value="sadmin"></el-option>
            <el-option label="admin(管理员)" value="admin"></el-option>
            <el-option label="bob(操作员)" value="bob）"></el-option>
          </el-select> -->
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
          <el-button type="primary"  @click="submitForm('param')" :loading="loading"
            >登录</el-button
          >
        </div>
        <!--                <p class="login-tips">Tips : 用户名和密码随便填。</p>-->
      </el-form>
    </div>
  </div>
</template>

<script>
import {v4 as uuidv4} from 'uuid'
export default {
  data() {
    return {
      loading:false,
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
    submitForm(param) {
      // this.$router.push("/welcome"); // 跳转主页welcome
      // submit(param) {
        // console.log(1);
        this.loading = true
        const token = uuidv4()
      this.$refs[param].validate(async (valid) => {
        if (valid) {
          try {
            const formData = new FormData();
            formData.append("username", this.param.username);
            formData.append("password", this.param.password);
            const res = await this.$http.post("/user/login", formData);
            // const res = await this.$http.get("/covid");
            if (res.data.code == 200) {
              this.$message("登录成功");
              window.sessionStorage.setItem(
                "one",
                JSON.stringify(this.param.username)
              );
              window.sessionStorage.setItem(
                "pwd",
                JSON.stringify(this.param.password)
              );
              window.sessionStorage.setItem(
                "token",
                JSON.stringify(token)
              );
              // window.sessionStorage.setItem("isLogin", "true");

              this.loading = false
              this.$router.push("/welcome");
            } else {
              this.$message("账号或密码错误！");
              this.loading = false
            }
          } catch (e) {
            this.$message.error(e);
            this.loading = false
          }
        } else {
          this.$message.error("请输入账号和密码");
          this.loading = false
          return false;
        }
      });
    },
 
  },
};
</script>

<style scoped>
.login-wrap {
  /* position: relative; */
  position: fixed;
  width: 100%;
  height: 100%;
  /* background-image: url(../assets/img/login-bg.jpg); */
  /* background: #ffffff00 url(../assets/img/login-bg.jpg) no-repeat fixed top; */
  background: #ffffff00 url(../assets/img/login-bg.jpg) center center no-repeat;
  background-size: 100% 100%;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 400px;
  transform: translate(-50%, -70%);
  /* margin: -190px 0 0 -175px; */
  /* margin: -190px 0 0 -140px; */
  border-radius: 5%;
  background: rgba(255, 255, 255, 0.2);
  overflow: hidden;
  box-shadow: 2px 2px 1px #000;
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
 
}
</style>
