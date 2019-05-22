<template>
  <div class="menuMa">
    <a-table :columns="columns" :dataSource="data" bordered class="table">
      <p slot="username" slot-scope="username">
        <span>{{username}}</span>
        <span v-if="username === $store.state.main.username" :style="{color: '#0bf'}">（我自己）</span>
      </p>
      <p slot="operate" slot-scope="pricode, record">
        <a-button type="primary" @click="edit(record)">编辑</a-button>
      </p>
    </a-table>
    <a-drawer title="编辑菜单" placement="right" :closable="false" @close="onClose" :visible="visible">
      <MenuData v-if="visible" :data="defaultCheckedKeys"></MenuData>
      <p :style="{position: 'absolute', left: 0, bottom: 0}">
        <a-button @click="onClose" :style="{marginLeft: '30px'}">取消</a-button>
        <a-button type="primary" @click="modifyRoute" :style="{marginLeft: '30px'}">确定</a-button>
      </p>
    </a-drawer>
  </div>
</template>

<script>
import MenuData from '@/components/Autho/MenuData.vue'
import menuKeysFormat from '@/utils/menuKeysFormat'
import routeKeysFormat from '@/utils/routeKeysFormat'
import { getAllUserHttp, getUserRoutesHttp, addRoutesHttp } from '@/api/autho'
const columns = [{
  title: '用户',
  dataIndex: 'username',
  key: 'username',
  scopedSlots: { customRender: 'username' }
}, {
  title: '操作',
  dataIndex: 'pricode',
  key: 'pri',
  scopedSlots: { customRender: 'operate' }
}]
export default {
  components: { MenuData },
  data () {
    return {
      columns,
      data: [],
      token: '',
      visible: false,
      defaultCheckedKeys: []
    }
  },
  created () {
    let token = this.$store.state.main.token;
    this.token = token;
    this.getAllUser();
  },
  methods: {
    getAllUser () {
      getAllUserHttp({
        token: this.token
      }).then(({ data }) => {
        if (data && data.error === 0) {
          let userData = data.data.map((item, index) => {
            item.key = index + 1;
            return item
          })
          this.data = userData;
        }
      }).catch(err => {
        console.log(err);
      })
    },
    edit (record) {
      this.$store.commit('setMenuOfUsername', record.username);
      getUserRoutesHttp(record).then(({ data }) => {
        if (data.error === 0) {
          this.defaultCheckedKeys = routeKeysFormat(data.data);
        }
        this.visible = true;
      }).catch(err => {
        console.log(err);
      })
    },
    onClose () {
      this.visible = false;
    },
    modifyRoute () {
      console.log(this.$store.state.autho.menuKeys);
      let newRoutes = menuKeysFormat(this.$store.state.autho.menuKeys);
      let username = this.$store.state.autho.menuOfUsername;
      console.log(username, newRoutes);
      let newRoute = {
        username,
        newRoutes
      }
      addRoutesHttp(newRoute).catch(err => {
        console.log(err);
      })
      this.visible = false;
    }
  }
}
</script>

<style lang="scss">
.menuMa {
  padding: 6%;
  .table {
    width: 80%;
  }
}
</style>
