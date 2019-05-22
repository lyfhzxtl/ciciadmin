function menuFormat(arr = []) {
  let _arr = arr.slice();
  let $arr = _arr.map(item => {
    let path = item.path;
    let _itemChildren = item.children.slice().map(_item => {
      let __item = {};
      Object.assign(__item, _item);
      __item.path = path + '/' + __item.path;
      return {
        key: __item.key,
        title: __item.title,
        path: __item.path
      }
    })
    return {
      key: item.key,
      title: item.title,
      iconType: item.iconType,
      children: _itemChildren
    }
  })
  return $arr;
}
export default menuFormat;
