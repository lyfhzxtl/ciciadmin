<template>
  <div class="login">
    <a-card hoverable class="card">
      <header class="header">
        <h1>cici管理系统</h1>
      </header>
      <a-form :form="form">
        <a-form-item>
          <a-input
            v-decorator="[
          'username',
          { rules: [{ required: true, message: '请输入用户名' }] }
        ]"
            placeholder="Username"
          >
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)"/>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            v-decorator="[
          'password',
          { rules: [{ required: true, message: '请输入密码' }] }
        ]"
            type="password"
            placeholder="Password"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)"/>
          </a-input>
        </a-form-item>
        <a-form-item class="login-form-item">
          <p class="toRegister">
            <a href="#/register">没有账号，去注册</a>
          </p>
          <a-button
            type="primary"
            html-type="submit"
            class="login-form-button"
            @click="submitLogin"
          >登录</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script>
import routesFormat from '@/utils/routesFormat';
import menuFormat from '@/utils/menuFormat';
import { loginHttp } from '@/api/login';
export default {
  data () {
    return {
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this);
  },
  methods: {
    submitLogin () {
      const form = this.form;
      let loginInfo = {
        username: form.getFieldValue('username'),
        password: this.$md5(form.getFieldValue('password'))
      };
      loginHttp(loginInfo)
        .then(({ data }) => {
          if (data.error === 0) {
            this.$store.commit('setToken', data.data.token);
            this.$store.commit('setUser', data.data.username);
            let routesData = routesFormat(data.data.routes);
            let menuData = menuFormat(data.data.routes);
            this.$router.addRoutes(routesData);
            this.$router.options.routes.push(...routesData);
            console.log(111, this.$router);
            this.$store.commit('setRoutes', routesData);
            this.$store.commit('setMenu', menuData);
            this.$store.commit('setPricode', data.data.pricode);
            this.$router.push({ path: data.data.routes[0].children[0].key });
          } else {
            this.$message.warning(data.msg);
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../main.scss";
@media screen and (min-width: 768px) {
  .login {
    width: 35%;
    margin: 150px auto;
    padding: 20px 20px 0 0;
  }
}
@media screen and (max-width: 768px) {
  .login {
    width: 90%;
    margin: 100px auto;
  }
}
.card {
  width: 100%;
  padding-top: 65px;
  border-radius: 10px;
  position: relative;
  .header {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 60px;
    line-height: 60px;
    border-radius: 10px 10px 0 0;
    text-align: center;
    background-color: $color;
    h1 {
      font-size: 20px;
      color: #fff;
    }
  }
  .toRegister {
    text-align: right;
    a {
      color: $color;
    }
  }
  .login-form-item {
    text-align: center;
  }
  .login-form-button {
    width: 100%;
    max-width: 150px;
    background-color: $color;
    border-color: $color;
  }
}
</style>
