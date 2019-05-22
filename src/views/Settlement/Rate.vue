<template>
  <div class="rate">
    <div class="new">
      <a-button type="primary" class="newRate" @click="createHandleRate">新建</a-button>
    </div>
    <HandleRate v-if="isHandle" :data="initialValue" @modifyIsHandle="modifyIsHandle"></HandleRate>
    <a-table :columns="columns" :dataSource="data" bordered class="table">
      <span slot="rate" slot-scope="rate">{{rate}}%</span>
      <div slot="edit" slot-scope="open, record">
        <p v-if="open">
          <a-button type="primary" class="editBtn" @click="modifyRate(record)">编辑</a-button>
          <a-button @click="forbidRate(record)">禁用</a-button>
        </p>
        <p v-else>
          <a-button type="primary" class="editBtn" @click="restoreRate(record)">恢复</a-button>
          <a-button type="danger" @click="deleteRate(record)">删除</a-button>
        </p>
      </div>
    </a-table>
  </div>
</template>

<script>
import HandleRate from '@/components/Settlement/HandleRate.vue'
import { getAllRatesHttp, modifyRateInfoHttp, deleteRateInfoHttp } from '@/api/settlement'
const columns = [{
  title: '名称',
  dataIndex: 'ratename'
}, {
  title: '费率',
  dataIndex: 'rate',
  scopedSlots: { customRender: 'rate' }
}, {
  title: '备注',
  dataIndex: 'remarks'
}, {
  title: '操作',
  dataIndex: 'open',
  scopedSlots: { customRender: 'edit' }
}]
export default {
  components: { HandleRate },
  data () {
    return {
      isHandle: false,
      data: [],
      columns,
      initialValue: {}
    }
  },
  created () {
    this.getAllRates();
  },
  methods: {
    createHandleRate () {
      this.initialValue = {};
      this.isHandle = true;
    },
    modifyIsHandle (rateData) {
      if (rateData && rateData.length) {
        this.data = rateData;
      }
      this.isHandle = false;
    },
    getAllRates () {
      getAllRatesHttp().then(({ data }) => {
        if (data.error === 0) {
          this.data = data.data.map((item, index) => {
            item.key = index + 1;
            return item
          });
        }
      })
    },
    modifyRate (record) {
      this.initialValue = record;
      this.isHandle = true;
    },
    modifyOpen (record, bool) {
      let _record = {};
      _record = Object.assign(_record, record);
      _record.open = bool;
      modifyRateInfoHttp(_record).then(({ data }) => {
        if (data.error !== 0) {
          this.$message.warning(data.msg);
        } else {
          this.getAllRates();
        }
      })
    },
    forbidRate (record) {
      this.modifyOpen(record, false)
    },
    restoreRate (record) {
      this.modifyOpen(record, true)
    },
    deleteRate (record) {
      let ratename = record.ratename;
      deleteRateInfoHttp([ratename]).then(({ data }) => {
        if (data.error !== 0) {
          this.$message.warning(data.msg);
        } else {
          this.getAllRates();
        }
      })
    }
  }

}
</script>

<style lang="scss">
.rate {
  padding: 6%;
  .new {
    position: relative;
    height: 32px;
    .newRate {
      position: absolute;
      top: 0px;
      right: 120px;
    }
  }
  .table {
    width: 80%;
    padding-top: 20px;
  }
  .editBtn {
    margin-right: 20px;
  }
}
@media screen and (max-width: 768px) {
  .rate .table {
    padding-top: 45px;
  }
  .rate .new .newRate {
    right: 20px;
  }
}
</style>
