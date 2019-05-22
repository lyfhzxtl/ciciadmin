// 安装路由中间件
// 引入页面的路由
let page = require('./page');
//引入数据库操作路由
let dbmongo = require('./dbmongo');
let uploads = require('./uploads');
// 安装路由
module.exports = (app) => {
  // 将安装路由中间件的过程放在了router模块内
  app.use(page);
  app.use(dbmongo);
  app.use(uploads)
}
