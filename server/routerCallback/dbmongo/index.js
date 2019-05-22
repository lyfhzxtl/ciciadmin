let register = require('./register');
let login = require('./login');
let checkUserName = require('./checkUserName');
let checkToken = require('./checkToken');
let getAllUser = require('./getAllUser');
let userModify = require('./userModify');
let addRoutes = require('./addRoutes');
let getUserRoutes = require('./getUserRoutes');
let addRateInfo = require('./addRateInfo');
let getAllRates = require('./getAllRates');
let modifyRateInfo = require('./modifyRateInfo');
let deleteRateInfo = require('./deleteRateInfo');
let addCourse = require('./addCourse');
let getAllCourse = require('./getAllCourse');
let modifyCourse = require('./modifyCourse');
let deleteCourse = require('./deleteCourse');
let modifySalesData = require('./modifySalesData');
let getAllSalesData = require('./getAllSalesData');
//暴露接口
module.exports = {
  register,
  login,
  checkUserName,
  checkToken,
  getAllUser,
  userModify,
  addRoutes,
  getUserRoutes,
  addRateInfo,
  getAllRates,
  modifyRateInfo,
  deleteRateInfo,
  addCourse,
  getAllCourse,
  modifyCourse,
  deleteCourse,
  modifySalesData,
  getAllSalesData
}
