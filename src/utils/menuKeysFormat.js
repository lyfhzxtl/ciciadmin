import menuData from '@/common/allMenuData'

function menuKeysFormat(arr) {
  let oneMenuData = menuData.map(item => {
    if (arr.indexOf(item.key) >= 0) {
      let children = item.children.filter(_item => {
        return arr.indexOf(_item.key) >= 0;
      })
      let newItem = {};
      Object.assign(newItem, item, {
        children
      })
      return newItem;
    } else {
      return undefined;
    }
  })
  let _oneMenuData = oneMenuData.filter(item => item)
  return _oneMenuData;
}
export default menuKeysFormat;
