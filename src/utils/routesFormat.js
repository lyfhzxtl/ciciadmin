function routesFormat(arr = []) {
  let _arr = arr.slice();
  let $arr = _arr.map(item => {
    item.component = () => import(`@/layouts/Layouts.vue`);
    let path = item.path[1].toUpperCase() + item.path.slice(2);
    let _itemChildren = item.children.slice().map(_item => {
      let __item = {};
      Object.assign(__item, _item);
      __item.component = () => import(`@/views/${path}/${__item.path[0].toUpperCase() + __item.path.slice(1)}`);
      return {
        name: __item.name,
        path: __item.path,
        component: __item.component
      }
    })
    return {
      path: item.path,
      component: item.component,
      children: _itemChildren
    }
  })
  return $arr;
}
export default routesFormat;
