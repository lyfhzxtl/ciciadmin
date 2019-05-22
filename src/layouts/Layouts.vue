<template>
  <div class="layout">
    <a-layout>
      <a-layout-header class="header">
        <h1 class="title">cici管理系统</h1>
        <div class="user">
          <a-icon type="user"/>
          <span class="username">{{$store.state.main.username}}</span>
          <div class="signOut" @click="signOut">退出登录</div>
        </div>
      </a-layout-header>
      <a-layout class="container">
        <a-layout-sider breakpoint="lg" collapsedWidth="0" class="sider">
          <a-menu mode="inline" :defaultOpenKeys="openKeys" :selectedKeys="selectedKeys">
            <a-sub-menu v-for="item in menuData" :key="item.key">
              <span slot="title">
                <a-icon :type="item.iconType"/>
                <span>{{item.title}}</span>
              </span>
              <a-menu-item
                v-for="_item in item.children"
                :key="_item.key"
                @click="triggerRoute(_item.path)"
              >{{_item.title}}</a-menu-item>
            </a-sub-menu>
          </a-menu>
        </a-layout-sider>
        <a-layout-content class="content">
          <router-view class="contentView"/>
        </a-layout-content>
      </a-layout>
      <a-layout-footer class="footer">cici management system &copy;2019 by lw</a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
export default {
  //绑定数据
  data () {
    return {
      menuData: this.$store.state.main.menuData
    }
  },
  computed: {
    openKeys () {
      let openKey = '/' + this.$route.path.split('/')[1];
      return [openKey]
    },
    selectedKeys () {
      let selectedKey = this.$route.path;
      return [selectedKey]
    }
  },
  created () {
  },
  methods: {
    signOut () {
      window.localStorage.removeItem('token');
      this.$router.push({
        path: '/login'
      })
    },
    triggerRoute (path) {
      this.$router.push({ path });
    }
  }
}
</script>

<style lang="scss">
.layout {
  .header {
    position: relative;
    color: #fff;
    .title {
      font-size: 22px;
      color: #fff;
    }
    .user {
      position: absolute;
      top: 0;
      right: 50px;
      z-index: 100;
      cursor: pointer;
      .signOut {
        display: none;
        height: 40px;
        margin-top: -10px;
        line-height: 40px;
        text-align: center;
        color: #fff;
        background-color: #001529;
      }
      .signOut:hover {
        color: #0bf;
      }
    }
    .user:hover .signOut {
      display: block;
    }
  }
  .container {
    .sider {
      position: sticky;
      top: 0;
      left: 0;
      height: 610px;
      background-color: #fff;
      // overflow: auto;
    }
    .content {
      padding: 10px;
      padding-bottom: 0;
      .contentView {
        width: 100%;
        min-height: 600px;
        background-color: #fff;
      }
    }
  }
  .footer {
    height: 10vh;
    text-align: center;
  }
}
@media screen and (min-width: 768px) {
  .layout .container .sider {
    overflow: auto;
  }
}
</style>
