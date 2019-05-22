<template>
  <div>
    <a-modal
      :title="notInitial? '修改费率' : '新建费率'"
      v-model="visible"
      @ok="handleOk"
      @cancel="handleCancel"
      :confirmLoading="confirmLoading"
      okText="确认"
      cancelText="取消"
    >
      <a-form :form="form">
        <a-form-item v-bind="formItemLayout" label="名称">
          <a-input
            v-decorator="[
            'ratename',
            {
              rules: [{
                required: true, message: '不能为空',
              }],
              initialValue: notInitial ? data.ratename : ''
            }
          ]"
            autocomplete="off"
            :disabled="notInitial"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="费率">
          <a-input-number
            v-decorator="[
            'rate',
            {
              rules: [{
                required: true, message: '不能为空'
              }],
              initialValue: notInitial ? data.rate : ''
            }
          ]"
            autocomplete="off"
            :style="{width: '100%'}"
            :min="0"
            :max="100"
            :precision="2"
            :formatter="value => `${value}%`"
            :parser="value => value.replace('%', '')"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="备注">
          <a-input
            v-decorator="[
            'remarks',
            {
              rules: [{
                required: true, message: '不能为空',
              }],
              initialValue: notInitial ? data.remarks : ''
            }
          ]"
            autocomplete="off"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { addRateInfoHttp, getAllRatesHttp, modifyRateInfoHttp } from '@/api/settlement'
export default {
  props: ['data'],
  data () {
    return {
      visible: true,
      form: this.$form.createForm(this),
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 18 }
        }
      },
      notInitial: Boolean(Object.keys(this.data).length),
      rateData: [],
      confirmLoading: false
    }
  },
  methods: {
    handleOk () {
      const form = this.form;
      form.validateFields({ force: true }, (errors, values) => {
        if (!errors) {
          const rateInfo = {
            ratename: form.getFieldValue('ratename'),
            rate: form.getFieldValue('rate'),
            open: true,
            remarks: form.getFieldValue('remarks')
          }
          if (!this.notInitial) {
            this.confirmLoading = true;
            addRateInfoHttp(rateInfo).then(({ data }) => {
              if (data.error !== 0) {
                this.$message.warning(data.msg)
              } else {
                getAllRatesHttp().then(({ data }) => {
                  this.rateData = data.data.map((item, index) => {
                    item.key = index + 1;
                    return item
                  });
                  this.confirmLoading = false;
                  this.$emit('modifyIsHandle', this.rateData);
                })
              }
            })
          } else {
            this.confirmLoading = true;
            modifyRateInfoHttp(rateInfo).then(({ data }) => {
              if (data.error !== 0) {
                this.$message.warning(data.msg)
              } else {
                getAllRatesHttp().then(({ data }) => {
                  this.rateData = data.data.map((item, index) => {
                    item.key = index + 1;
                    return item
                  });
                  this.confirmLoading = false;
                  this.$emit('modifyIsHandle', this.rateData);
                })
              }
            })
          }
        }
      })
    },
    handleCancel () {
      this.$emit('modifyIsHandle');
    }
  }
}
</script>

<style lang="scss">
</style>
