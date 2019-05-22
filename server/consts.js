const conf = {
  HTTP_PORT: 80,
  HTTPS_PORT: 443,
  success: {
    error: 0,
    msg: '操作成功'
  },
  usernameIsOK: {
    code: 0,
    msg: '该用户名可以使用'
  },
  hasUser: {
    code: 1,
    msg: '该用户名已存在'
  },
  connectError: {
    error: 1,
    msg: '数据库连接失败'
  },
  saveError: {
    error: 2,
    msg: '保存失败'
  },
  findError: {
    error: 3,
    msg: '查询失败'
  },
  noUser: {
    error: 4,
    msg: '用户名或密码错误'
  },
  awaitConfirm: {
    error: 5,
    msg: '账号等待管理员审核'
  },
  loginError: {
    error: 6,
    msg: '登录失败'
  },
  awaitConfig: {
    error: 7,
    msg: '路由待配置'
  },
  rateHas: {
    error: 8,
    msg: '此费率已存在'
  },
  noRates: {
    error: 9,
    msg: '还没有费率信息'
  },
  noRateName: {
    error: 10,
    msg: '没有此项费率'
  },
  handleIsNotSuccess: {
    error: 11,
    msg: '操作失败'
  },
  coursehas: {
    error: 12,
    msg: '此课程已存在'
  },
  noCourse: {
    error: 13,
    msg: '还没有课程信息'
  },
  noCourseName: {
    error: 14,
    msg: '没有此项课程'
  },
  noSalesInfo: {
    error: 15,
    msg: '没有销售信息'
  },
  STATICS: {
    '/dist/': './dist/',
    '/uploads/': './uploads/',
    '/intro/': './intro/'
  },
  routes: [{
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
  }]
}
module.exports = function (property) {
  return conf[property];
}
// 方便获取错误信息
/* module.exports.msg = function (id) {
  return conf.MESSAGE[id] || {}
} */
