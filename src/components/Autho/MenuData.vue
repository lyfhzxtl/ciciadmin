<template>
  <div>
    <a-tree checkable @check="onCheck" :treeData="menuData" :defaultCheckedKeys="data"></a-tree>
  </div>
</template>

<script>
import menuData from '@/common/allMenuData'
export default {
  props: ['data'],
  data () {
    return {
      menuData
    }
  },
  methods: {
    onCheck (checkedKeys, info) {
      let keys = checkedKeys.concat(info.halfCheckedKeys);
      this.$store.commit('setMenuKeys', keys);
    }
  }
}
</script>
