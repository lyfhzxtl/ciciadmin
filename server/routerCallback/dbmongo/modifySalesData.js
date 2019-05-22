let db = require('../../db/db');
let SalesInfo = require('../../db/salesData');
module.exports = (req, res) => {
  db.connect(res);
  let salesData = req.body.salesData;
  SalesInfo.find((err, doc) => {
    if (err) {
      return db.end(res, 'findError');
    } else {
      if (doc.length) {
        SalesInfo.updateOne({
          name: 'salesData'
        }, {
          $set: {
            salesData
          }
        }, err => {
          if (err) {
            return db.end(res, 'saveEror');
          } else {
            return db.end(res, 'success');
          }
        })
      } else {
        let salesDataInfo = new SalesInfo({
          name: 'salesData',
          salesData
        });
        salesDataInfo.save(err => {
          if (err) {
            return db.end(res, 'saveError');
          } else {
            return db.end(res, 'success');
          }
        })
      }
    }
  })
}
