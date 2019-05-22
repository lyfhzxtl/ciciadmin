<template>
  <div class="register">
    <a-card hoverable class="card">
      <header class="header">
        <h1>cici管理系统</h1>
      </header>
      <a-form :form="form">
        <a-form-item
          v-bind="formItemLayout"
          label="用户名"
          :validate-status="validateStatus"
          has-feedback
        >
          <a-input
            v-decorator="[
            'username',
            {
              validateTrigger: 'blur',
              rules: [
                {
                  required: true,
                  message: '请输入用户名',
                },
                {
                  pattern: /^[a-zA-Z][0-9a-zA-Z]{5,11}$/,
                  message: '用户名只能包含字母和数字，6-12位，不能以数字开头'
                },
                {
                  validator: checkUsername
                }
              ]
            }
          ]"
            autocomplete="off"
            placeholder="用户名只能包含字母和数字，6-12位，不能以数字开头"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="密码">
          <a-input
            v-decorator="[
            'password',
            {
              validateTrigger: 'blur',
              rules: [{
                required: true, message: '请输入密码',
              }, {
                validator: validateToNextPassword,
              }, {
                min: 8, message: '最小长度为8位'
              }]
            }
          ]"
            type="password"
            placeholder="最小长度为8位"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="确认密码">
          <a-input
            v-decorator="[
            'confirm',
            {
              validateTrigger: 'blur',
              rules: [{
                required: true, message: '请确认密码',
              }, {
                validator: compareToFirstPassword,
              }],
            }
          ]"
            type="password"
            placeholder="密码输入请一致"
            @blur="handleConfirmBlur"
          />
        </a-form-item>
        <a-form-item class="register-form-item">
          <p class="toLogin">
            <a href="#/login">已有账号，去登录</a>
          </p>
          <a-button
            type="primary"
            html-type="submit"
            class="register-form-button"
            @click="submitRegister"
          >注册</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script>
import { checkUsernameHttp, registerHttp } from '@/api/register';
export default {
  data () {
    return {
      confirmDirty: false,
      validateStatus: '',
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 }
        }
      }
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this);
  },
  methods: {
    checkUsername (rule, value, callback) {
      const form = this.form;
      let reg = /^[a-zA-Z][0-9a-zA-Z]{5,11}$/;
      let username = form.getFieldValue('username');
      let usernameIsOk = reg.test(username);
      if (username && usernameIsOk) {
        this.validateStatus = 'validating';
        checkUsernameHttp({ username: form.getFieldValue('username') })
          .then(({ data }) => {
            if (data.code === 1) {
              this.validateStatus = 'warning';
              callback(data.msg)
            } else {
              this.validateStatus = 'success';
              callback()
            }
          })
          .catch(e => { console.log(e) })
      } else {
        this.validateStatus = 'error';
        callback();
      }
    },
    handleConfirmBlur (e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword (rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue('password')) {
        /* eslint-disable */
        callback('两次密码输入不一致');
      } else {
        callback();
      }
    },
    validateToNextPassword (rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    },
    submitRegister () {
      const form = this.form;
      form.validateFields({ force: true }, (errors, values) => {
        if (!errors) {
          const registerInfo = {
            username: form.getFieldValue('username'),
            password: this.$md5(form.getFieldValue('password'))
          };
          registerHttp(registerInfo)
            .then(({ data }) => {
              if (data.error === 0) {
                this.$message.info('注册成功，等待管理员审核')
                location.hash = '#/login';
              }
            })
        }
      });

    }
  }
}
</script>

<style lang="scss" scoped>
@import "../main.scss";
@media screen and (min-width: 768px) {
  .register {
    width: 35%;
    margin: 150px auto;
    padding: 20px 20px 0 0;
  }
}
@media screen and (max-width: 768px) {
  .register {
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
  .toLogin {
    text-align: right;
    a {
      color: $color;
    }
  }
  .register-form-item {
    text-align: center;
  }
  .register-form-button {
    width: 100%;
    max-width: 150px;
    background-color: $color;
    border-color: $color;
  }
}
</style>
