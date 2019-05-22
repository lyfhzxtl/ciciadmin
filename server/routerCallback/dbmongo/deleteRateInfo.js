let db = require('../../db/db');
let RateInfo = require('../../db/rateInfo');
module.exports = (req, res) => {
  db.connect(res);
  let ratename = req.query[0];
  RateInfo.find({
    ratename
  }, (err, doc) => {
    if (err) {
      return db.end(res, 'findError');
    } else {
      if (doc.length) {
        RateInfo.deleteOne({
          ratename
        }, err => {
          if (err) {
            return db.end(res, 'handleIsNotSuccess')
          } else {
            return db.end(res, 'success');
          }
        })
      } else {
        return db.end(res, 'noRateName');
      }
    }
  })
}
