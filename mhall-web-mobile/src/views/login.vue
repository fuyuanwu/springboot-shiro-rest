<template>
  <div class="login_container" style="display: block;">
    <div class="login_header">
      <p>欢迎<span>登录</span></p>
      <p>Welcome to login</p>
    </div>
    <form class="form-horizontal">
      <div class="form-group">
        <div class="col-xs-12">
          <input class="form-control" type="text" v-model="username" placeholder="用户名">
        </div>
      </div>
      <div class="form-group">
        <div class="col-xs-12">
          <input class="form-control" type="password" v-model="password" placeholder="密码">
        </div>
      </div>
      <div class="form-group">
        <div class="col-xs-12">
          <button type="button" :class="{'el-button':1, 'el-button--primary': 1}" @click="doLogin">登录</button>
          <button type="button" :class="{'el-button':1, 'el-button--primary': 1}" @click="doLogout">登出</button>
          <button type="button" :class="{'el-button':1, 'el-button--primary': 1}" @click="doTest">test</button>
        </div>
      </div>
    </form>
    <div class="login_footer">
      上海澎博提供技术支持 © 2017
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        password: '888888',
        username: 'admin'
      }
    },
    computed: {},
    mounted () {
    },
    methods: {
      async doLogin () {
        let data = {
          username: this.username,
          password: this.password
        }

        let result = await this.$axios.post('http://test.fyw.com:8080/login', data)
        console.log('result', result)
      },
      async doLogout () {
        let result = await this.$axios.get('http://test.fyw.com:8080/logout')
        console.log('result', result)
      },
      async doTest () {
        let result = await this.$axios.get('http://test.fyw.com:8080/test')
        console.log('result', result)
      }
    }
  }
</script>
<style>
  .login_container .login_header {
    padding-top: 150px;
    width: 100%;
    height: 355px;
    font-size: 48px;
    color: #fff;
    text-align: center;
    background: url(../assets/images/bg_01.png) no-repeat;
    background-size: cover;
  }

  .login_container .login_header p span {
    color: #ff921d;
  }

  .login_container .login_header p + p {
    font-size: 26px;
  }

  .login_container .form-horizontal {
    margin: 0 auto;
    padding: 30px 50px 20px;
    -webkit-box-shadow: 0 5px 10px 5px #e7e8eb;
    box-shadow: 0 5px 5px 5px #e7e8eb;
    width: 480px;
    background-color: #fff;
  }

  .login_container .form-control {
    border: 1px solid #b8b8b8;
    padding-left: 54px;
    height: 46px;
    font-size: 15px;
    margin-bottom: 20px;
  }

  .login_container .login_footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    font-size: 16px;
    line-height: 50px;
    text-align: center;
    color: #999;
    background-color: #f3f7fc;
  }

  .login_container #name {
    background: url(../assets/images/username.png) no-repeat 15px center;
  }

  .login_container #pwd {
    background: url(../assets/images/password.png) no-repeat 15px center;
  }

  .login_container #login_btn {
    height: 46px;
    font-size: 22px;
    background-color: #2868e8;
  }
</style>
