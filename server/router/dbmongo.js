// 引入模块
let express = require('express');
// 引入处理接口的回调函数
let dbmongo = require('../routerCallback/dbmongo');
// 定义路由中间件
let router = new express.Router();

router
  //注册
  .post('/register', dbmongo.register)
  // 登录
  .post('/login', dbmongo.login)
  //检测用户名
  .post('/checkUsername', dbmongo.checkUserName)
  .get('/checkToken', dbmongo.checkToken)
  .get('/getAllUser', dbmongo.getAllUser)
  .put('/userPass', dbmongo.userModify)
  .post('/addRoutes', dbmongo.addRoutes)
  .get('/getUserRoutes', dbmongo.getUserRoutes)
  .post('/addRateInfo', dbmongo.addRateInfo)
  .put('/modifyRateInfo', dbmongo.modifyRateInfo)
  .get('/getAllRates', dbmongo.getAllRates)
  .delete('/deleteRateInfo', dbmongo.deleteRateInfo)
  .post('/addCourse', dbmongo.addCourse)
  .get('/getAllCourse', dbmongo.getAllCourse)
  .put('/modifyCourse', dbmongo.modifyCourse)
  .delete('/deleteCourse', dbmongo.deleteCourse)
  .put('/modifySalesData', dbmongo.modifySalesData)
  .get('/getAllSalesData', dbmongo.getAllSalesData)
// 暴露接口
module.exports = router;
