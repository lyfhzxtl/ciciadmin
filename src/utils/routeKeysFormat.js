function routeKeysFormat(arr) {
  let _arr = [];
  arr.forEach(item => {
    item.children.forEach(_item => {
      _arr.push(_item.key)
    })
  })
  return _arr;
}
export default routeKeysFormat;
