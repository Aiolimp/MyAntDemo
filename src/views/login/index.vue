<template>
  <div class="login-container">
    <div class="loginFrom-container">
      <a-form-model
        class="login-form"
        :model="loginForm"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :rules="rules"
        ref="loginForm"
      >
        <div class="title-container">
          <h3 class="title">用户登录</h3>
        </div>
        <a-form-model-item prop="username">
          <a-input
            ref="username"
            v-model="loginForm.username"
            placeholder="请输入用户名"
            name="username"
            type="text"
            ><a-icon slot="prefix" type="user" />
          </a-input>
        </a-form-model-item>
        <a-form-model-item prop="password">
          <a-input
            :type="isShowPassword ? 'input' : 'password'"
            ref="password"
            v-model="loginForm.password"
            placeholder="请输密码"
            name="password"
            @keyup.enter.native="handleLogin"
          >
            <a-icon slot="prefix" type="lock" />
            <a-icon
              slot="suffix"
              :type="isShowPassword ? 'eye' : 'eye-invisible'"
              @click="() => (isShowPassword = !isShowPassword)"
            />
          </a-input>
        </a-form-model-item>
        <a-button
          :loading="loading"
          type="primary"
          style="width: 100%; margin-bottom: 30px"
          @click.native.prevent="handleLogin"
          >登录</a-button
        >
      </a-form-model>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error("用户名不能为空"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error("密码不少于5个字符"));
      } else {
        callback();
      }
    };
    return {
      isShowPassword: false,
      loginForm: {
        username: "admin",
        password: "admin",
        role: "用户",
      },
      loading: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      rules: {
        username: [{ validator: validateUsername, trigger: "change" }],
        password: [{ validator: validatePassword, trigger: "change" }],
      },
    };
  },
  created() {},
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("Login", this.loginForm)
            .then((data) => {
              this.$message.success({
                content: "登录成功",
              });
              this.$router.push("/");
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.login-container {
  height: 100%;
  background-color: #2d3a4b;
  position: relative;
  .loginFrom-container {
    width: 500px;
    background-color: transparent;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 400px;
    transform: translate(-50%, -50%);
    /deep/ .ant-form {
      .ant-form-item {
        .ant-col-14 {
          width: 100%;
        }
        .ant-input {
          height: 50px;
        }
        .ant-form-item-children {
          .ant-btn-primary {
            height: 40px;
            width: 100%;
          }
        }
      }
    }
  }
}

.title {
  font-size: 26px;
  color: #eee;
  margin: 0px auto 40px auto;
  text-align: center;
  font-weight: bold;
}
.svg-container {
  padding: 6px 5px 6px 15px;
  color: #eee;
  vertical-align: middle;
  width: 30px;
  display: inline-block;
}
.ant-form-item {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  color: #454545;
}
.ant-input {
  background: transparent;
  border: none;
  -webkit-appearance: none;
  border-radius: 0px;
  padding: 12px 5px 12px 15px;
  color: #eee;
  height: 47px;
  caret-color: #fff;
  font-weight: 600;
  width: 450px;
}
</style>