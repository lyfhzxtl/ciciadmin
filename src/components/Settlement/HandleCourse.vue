<template>
  <div>
    <a-modal
      :title="notInitial? '修改课程' : '新建课程'"
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
            'coursename',
            {
              rules: [{
                required: true, message: '不能为空',
              }],
              initialValue: notInitial ? data.coursename : ''
            }
          ]"
            autocomplete="off"
            :disabled="notInitial"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="价格">
          <a-input-number
            v-decorator="[
            'price',
            {
              rules: [{
                required: true, message: '不能为空'
              }],
              initialValue: notInitial ? data.price : ''
            }
          ]"
            autocomplete="off"
            :style="{width: '100%'}"
            :min="0"
            :max="50000"
            :precision="2"
            :step="100"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="封面图">
          <a-upload
            action="/coverpic"
            accept="image/*"
            :defaultFileList="defaultFileList"
            listType="picture"
            @change="handleChange"
          >
            <a-button v-if="uploadIsVisible">
              <a-icon type="upload"/>上传
            </a-button>
          </a-upload>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { addCourseHttp, getAllCourseHttp, modifyCourseHttp } from '@/api/settlement'
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
      courseData: [],
      confirmLoading: false,
      defaultFileList: [],
      uploadIsVisible: Boolean(Object.keys(this.data).length === 0),
      filename: ''
    }
  },
  created () {
    if (this.notInitial) {
      this.defaultFileList = [{
        uid: '-1',
        name: this.data.coverpic.split('/').pop(),
        status: 'done',
        url: this.data.coverpic,
        thumbUrl: this.data.coverpic
      }];
    }
  },
  methods: {
    handleOk () {
      const form = this.form;
      form.validateFields({ force: true }, (errors, values) => {
        if (!errors) {
          const courseInfo = {
            coursename: form.getFieldValue('coursename'),
            price: form.getFieldValue('price'),
            open: true,
            coverpic: this.filename
          }
          if (!this.notInitial) {
            this.confirmLoading = true;
            addCourseHttp(courseInfo).then(({ data }) => {
              if (data.error !== 0) {
                this.$message.warning(data.msg)
              } else {
                getAllCourseHttp().then(({ data }) => {
                  if (data.error === 0) {
                    this.courseData = data.data.map((item, index) => {
                      item.key = index + 1;
                      return item
                    });
                  }
                  this.confirmLoading = false;
                  this.$emit('modifyIsHandle', this.courseData);
                })
              }
            })
          } else {
            this.confirmLoading = true;
            modifyCourseHttp(courseInfo).then(({ data }) => {
              if (data.error !== 0) {
                this.$message.warning(data.msg)
              } else {
                getAllCourseHttp().then(({ data }) => {
                  this.courseData = data.data.map((item, index) => {
                    item.key = index + 1;
                    return item
                  });
                  this.confirmLoading = false;
                  this.$emit('modifyIsHandle', this.courseData);
                })
              }
            })
          }
        }
      })
    },
    handleCancel () {
      this.$emit('modifyIsHandle');
    },
    handleChange (info) {
      if (info.file.status !== 'uploading') {
        this.uploadIsVisible = !this.uploadIsVisible;
        this.filename = info.file.name;
      }
      if (info.file.status === 'done') {
        this.$message.success('图片上传成功');
      } else if (info.file.status === 'error') {
        this.$message.error('图片上传失败');
      }
    }
  }
}
</script>

<style lang="scss">
</style>
