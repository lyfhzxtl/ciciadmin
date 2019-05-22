<template>
  <div class="volume">
    <a-button class="editable-add-btn" @click="handleAdd">新增</a-button>
    <a-table :columns="columns" :dataSource="data" bordered class="table">
      <template v-for="col in ['months', 'sales']" :slot="col" slot-scope="text, record">
        <div :key="col">
          <a-input
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            @change="e => handleChange(e.target.value, record.key, col)"
          />
          <template v-else>{{text}}</template>
        </div>
      </template>
      <template slot="operation" slot-scope="text, record">
        <div class="editable-row-operations">
          <span v-if="record.editable">
            <a-button type="primary" style="marginRight: 20px" @click="() => save(record.key)">保存</a-button>
            <a-popconfirm
              title="确定取消？"
              okText="确认"
              cancelText="取消"
              @confirm="() => cancel(record.key)"
            >
              <a-button>取消</a-button>
            </a-popconfirm>
          </span>
          <span v-else>
            <a-button type="primary" style="marginRight: 20px" @click="() => edit(record.key)">编辑</a-button>
            <a-popconfirm
              v-if="data.length"
              title="确定删除？"
              okText="确认"
              cancelText="取消"
              @confirm="() => onDelete(record.key)"
            >
              <a-button type="danger">删除</a-button>
            </a-popconfirm>
          </span>
        </div>
      </template>
    </a-table>
    <a-button type="primary" style="marginRight: 30px" @click="modifySales">保存</a-button>
    <a-button type="primary" @click="changeChartVisible">可视化</a-button>
    <div v-show="chartVisible" ref="salechart" style="width: 400px;height: 400px;marginTop: 30px;"></div>
  </div>
</template>

<script>
import { modifySalesDataHttp, getAllSalesDataHttp } from '@/api/salesVolume'
const columns = [{
  title: '年月',
  dataIndex: 'months',
  width: '35%',
  scopedSlots: { customRender: 'months' }
}, {
  title: '业绩',
  dataIndex: 'sales',
  width: '35%',
  scopedSlots: { customRender: 'sales' }
},
{
  title: '操作',
  dataIndex: 'operation',
  width: '30%',
  scopedSlots: { customRender: 'operation' }
}]

const data = []
export default {
  data () {
    this.cacheData = data.map(item => ({ ...item }))
    return {
      data,
      columns,
      monthsData: [],
      salesData: [],
      chartVisible: false,
      count: 0
    }
  },
  created () {
    this.getAllSalesData()
  },
  mounted () {
  },
  methods: {
    handleAdd () {
      const { count, data } = this;
      const newData = {
        key: this.data.length + 1,
        months: '',
        sales: ''
      }
      this.data = [...data, newData]
      this.count = count + 1
    },
    onDelete (key) {
      let data = [...this.data]
      data = data.filter(item => item.key !== key)
      this.data = data.map((item, index) => {
        item.key = index + 1;
        return item;
      })
    },
    handleChange (value, key, column) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target[column] = value
        this.data = newData
      }
    },
    edit (key) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target.editable = true
        this.data = newData
      }
    },
    save (key) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        delete target.editable
        this.data = newData
        this.cacheData = newData.map(item => ({ ...item }))
      }
    },
    cancel (key) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        Object.assign(target, this.cacheData.filter(item => key === item.key)[0])
        delete target.editable
        this.data = newData
      }
    },
    getAllSalesData () {
      getAllSalesDataHttp().then(({ data }) => {
        if (data.error === 0) {
          this.data = data.data[0].salesData;
          this.monthsData = this.data.map(item => item.months);
          this.salesData = this.data.map(item => parseInt(item.sales));
        }
      })
    },
    modifySales () {
      modifySalesDataHttp({ salesData: this.data })
    },
    changeChartVisible () {
      this.chartVisible = !this.chartVisible;
      if (!this.count) {
        this.count = 1;
        setTimeout(() => {
          let myChart;
          if (myChart) {
            myChart.dispose();
          }
          myChart = window.echarts.init(this.$refs.salechart)
          let option = {
            title: {
              text: '各月份销售额分布图'
            },
            tooltip: {},
            legend: {
              data: ['销量']
            },
            xAxis: {
              data: this.monthsData
            },
            yAxis: {},
            series: [{
              name: '销量',
              type: 'bar',
              data: this.salesData
            }]
          };
          myChart.setOption(option);
        }, 0)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.volume {
  padding: 60px;
  .table {
    width: 80%;
    padding-top: 20px;
    margin-bottom: 30px;
  }
}
@media screen and (max-width: 768px) {
  .volume .table {
    padding-top: 80px;
  }
}
</style>
