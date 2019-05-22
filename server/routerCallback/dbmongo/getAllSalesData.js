let db = require('../../db/db');
let SalesInfo = require('../../db/salesData');
module.exports = (req, res) => {
  db.connect(res);
  SalesInfo.find((err, doc) => {
    if (err) {
      return db.end(res, 'findError');
    } else {
      if (!doc.length) {
        return db.end(res, 'noSalesInfo');
      } else {
        return db.end(res, {
          error: 0,
          data: doc
        })
      }
    }
  })
}
