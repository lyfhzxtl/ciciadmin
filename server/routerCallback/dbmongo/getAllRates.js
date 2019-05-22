let db = require('../../db/db');
let RateInfo = require('../../db/rateInfo');
module.exports = (req, res) => {
  db.connect(res);
  RateInfo.find((err, doc) => {
    if (err) {
      return db.end(res, 'findError');
    } else {
      if (!doc.length) {
        return db.end(res, 'noRates');
      } else {
        return db.end(res, {
          error: 0,
          data: doc
        })
      }
    }
  })
}
