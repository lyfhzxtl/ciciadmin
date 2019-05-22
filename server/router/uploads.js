// 引入模块
let express = require('express');
// 引入处理接口的回调函数
let uploads = require('../routerCallback/uploads');
// 定义路由中间件
let router = new express.Router();

router.post('/coverpic', uploads.coverpic)
// 暴露接口
module.exports = router;
