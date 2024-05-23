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
              @keyup.enter="submitForm('param')"
            >
              <template #prepend>
                <el-button icon="el-icon-lock"></el-button>
              </template>
            </el-input>
          </el-form-item>
          <div class="login-btn">
            <el-button type="primary" @click="submitForm('param')" :loading="loading">登录</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
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
  methods: {
    async submitForm(param) {
      this.loading = true;
      this.$refs[param].validate(async (valid) => {
        if (valid) {
          try {
            const formData = {
              username: this.param.username,
              password: this.param.password,
            };
            const res = await this.$http.post("/login", formData);

            if (res.data.code === 200) {
              this.$message("登录成功");
              window.sessionStorage.setItem("username", this.param.username);
              window.sessionStorage.setItem("token", res.data.token);

              this.loading = false;
              this.$router.push("/Preliminaryexamination");
            } else {
              this.$message.error(res.data.message);
              this.loading = false;
            }
          } catch (e) {
            this.$message.error("登录失败，请重试");
            this.loading = false;//不转圆圈
          }
        } else {
          this.loading = false;
        }
      });
    },
  },
};
</script>

<style scoped>
/* 您的样式代码 */
</style>
