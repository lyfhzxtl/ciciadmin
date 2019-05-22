<template>
  <div class="course">
    <div class="new">
      <a-button type="primary" class="newRate" @click="createHandleRate">新建</a-button>
    </div>
    <HandleCourse v-if="isHandle" :data="initialValue" @modifyIsHandle="modifyIsHandle"></HandleCourse>
    <a-table :columns="columns" :dataSource="data" bordered class="table">
      <span slot="price" slot-scope="price">￥{{price}}</span>
      <span slot="coverpic" slot-scope="coverpic">
        <img :src="coverpic" alt="封面图" class="imgcov">
      </span>
      <div slot="edit" slot-scope="open, record">
        <p v-if="open">
          <a-button type="primary" class="editBtn" @click="modifyCourse(record)">编辑</a-button>
          <a-button @click="forbidCourse(record)">禁用</a-button>
        </p>
        <p v-else>
          <a-button type="primary" class="editBtn" @click="restoreCourse(record)">恢复</a-button>
          <a-button type="danger" @click="deleteCourse(record)">删除</a-button>
        </p>
      </div>
    </a-table>
  </div>
</template>

<script>
import HandleCourse from '@/components/Settlement/HandleCourse.vue'
import { getAllCourseHttp, modifyCourseHttp, deleteCourseHttp } from '@/api/settlement'
const columns = [{
  title: '名称',
  dataIndex: 'coursename'
}, {
  title: '价格',
  dataIndex: 'price',
  scopedSlots: { customRender: 'price' }
}, {
  title: '封面图',
  dataIndex: 'coverpic',
  scopedSlots: { customRender: 'coverpic' }
}, {
  title: '操作',
  dataIndex: 'open',
  scopedSlots: { customRender: 'edit' }
}]
export default {
  components: { HandleCourse },
  data () {
    return {
      isHandle: false,
      data: [],
      columns,
      initialValue: {}
    }
  },
  created () {
    this.getAllCourse();
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
    getAllCourse () {
      getAllCourseHttp().then(({ data }) => {
        if (data.error === 0) {
          this.data = data.data.map((item, index) => {
            item.key = index + 1;
            return item
          });
        }
      })
    },
    modifyCourse (record) {
      this.initialValue = record;
      this.isHandle = true;
    },
    modifyOpen (record, bool) {
      let _record = {};
      _record = Object.assign(_record, record);
      _record.open = bool;
      _record.coverpic = _record.coverpic.split('/').pop();
      modifyCourseHttp(_record).then(({ data }) => {
        if (data.error !== 0) {
          this.$message.warning(data.msg);
        } else {
          this.getAllCourse();
        }
      })
    },
    forbidCourse (record) {
      this.modifyOpen(record, false)
    },
    restoreCourse (record) {
      this.modifyOpen(record, true)
    },
    deleteCourse (record) {
      let coursename = record.coursename;
      deleteCourseHttp([coursename]).then(({ data }) => {
        if (data.error !== 0) {
          this.$message.warning(data.msg);
        } else {
          this.getAllCourse();
        }
      })
    }
  }

}
</script>

<style lang="scss">
.course {
  padding: 6%;
  .new {
    position: relative;
    height: 32px;
    .newRate {
      position: absolute;
      top: 0px;
      right: 120px;
      z-index: 10000;
    }
  }
  .table {
    width: 80%;
    padding-top: 20px;
    .imgcov {
      width: 100px;
    }
  }
  .editBtn {
    margin-right: 20px;
  }
}
@media screen and (max-width: 768px) {
  .course .table {
    padding-top: 45px;
    .imgcov {
      width: 40px;
    }
  }
  .course .new .newRate {
    right: 20px;
  }
}
</style>
