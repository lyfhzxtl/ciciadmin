let express = require('express');
// 引入页面处理的回调函数
let home = require('../routerCallback/page');
// 路由也可以作为中间件定义
let router = new express.Router();

// pc端与移动端页面路由
router.get('/admin.html', home)
  .get('/intro.html', (req, res) => {
    res.render('intro.html')
  })

module.exports = router;
