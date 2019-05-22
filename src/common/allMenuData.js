const routes = [{
  path: '/autho',
  component: 'Layout',
  key: '/autho',
  title: '权限管理',
  iconType: 'security-scan',
  children: [{
    name: 'user',
    path: 'user',
    component: 'User',
    key: '/autho/user',
    title: '用户审核'
  }, {
    name: 'menu',
    path: 'menu',
    component: 'Menu',
    key: '/autho/menu',
    title: '菜单管理'
  }]
}, {
  path: '/settlement',
  component: 'Layout',
  key: '/settlement',
  title: '结算管理',
  iconType: 'bar-chart',
  children: [{
    name: 'course',
    path: 'course',
    component: 'Course',
    key: '/settlement/course',
    title: '课程明细'
  }, {
    name: 'rate',
    path: 'rate',
    component: 'Rate',
    key: '/settlement/rate',
    title: '费率设置'
  }]
}, {
  path: '/salesVolume',
  component: 'Layout',
  key: '/salesVolume',
  title: '销量管理',
  iconType: 'dollar',
  children: [{
    name: 'volume',
    path: 'volume',
    component: 'Volume',
    key: '/salesVolume/volume',
    title: '销售额'
  }]
}]
export default routes;
