<template>
  <div class="userMa">
    <a-table :columns="columns" :dataSource="data" bordered class="table">
      <p slot="username" slot-scope="username">
        <span>{{username}}</span>
        <span v-if="username === $store.state.main.username" :style="{color: '#0bf'}">（我自己）</span>
      </p>
      <p slot="isable" slot-scope="pricode, record">
        <a-button v-if="!pricode" type="primary" @click="pass(record)">通过</a-button>
        <a-button v-else-if="record.username === $store.state.main.username" disabled>禁用</a-button>
        <a-button v-else @click="forbid(record)">禁用</a-button>
      </p>
      <p slot="pri" slot-scope="pricode, record">
        <a-radio-group
          @change="onChange(record, $event)"
          :disabled="!pricode || record.username === $store.state.main.username"
          :defaultValue="pricode"
        >
          <a-radio :value="16">一级</a-radio>
          <a-radio :value="8">二级</a-radio>
          <a-radio :value="4">三级</a-radio>
          <a-radio :value="2">四级</a-radio>
        </a-radio-group>
      </p>
    </a-table>
  </div>
</template>

<script>
import { getAllUserHttp, userPassHttp } from '@/api/autho'
const columns = [{
  title: '用户',
  dataIndex: 'username',
  key: 'username',
  scopedSlots: { customRender: 'username' }
}, {
  title: '权限',
  dataIndex: 'pricode',
  key: 'pri',
  scopedSlots: { customRender: 'pri' }
}, {
  title: '状态',
  dataIndex: 'pricode',
  key: 'isable',
  scopedSlots: { customRender: 'isable' }
}]
export default {
  data () {
    return {
      columns,
      data: [],
      token: ''
    }
  },
  created () {
    let token = this.$store.state.main.token;
    this.token = token;
    this.getAllUser();
  },
  methods: {
    getAllUser () {
      getAllUserHttp({ token: this.token }).then(({ data }) => {
        if (data && data.error === 0) {
          let userData = data.data.map((item, index) => {
            item.key = index + 1;
            return item
          })
          this.data = userData;
        }
      })
    },
    pass (record) {
      let newUserInfo = {
        username: record.username,
        pricode: 2
      }
      userPassHttp(newUserInfo).then(() => {
        this.getAllUser();
      })
    },
    forbid (record) {
      let newUserInfo = {
        username: record.username,
        pricode: 0
      }
      userPassHttp(newUserInfo).then(() => {
        this.getAllUser();
      })
    },
    onChange (record, e) {
      let newUserInfo = {
        username: record.username,
        pricode: e.target.value
      }
      userPassHttp(newUserInfo).then(() => {
        this.getAllUser();
      })
    }
  }
}
</script>

<style lang="scss">
.userMa {
  padding: 6%;
  .table {
    width: 80%;
  }
}
</style>
