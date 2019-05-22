let db = require('../../db/db');
let RateInfo = require('../../db/rateInfo');
module.exports = (req, res) => {
  db.connect(res);
  let ratename = req.body.ratename;
  let rate = req.body.rate;
  let open = req.body.open;
  let remarks = req.body.remarks;
  RateInfo.find({
    ratename
  }, (err, doc) => {
    if (err) {
      return db.end(res, 'findError');
    } else {
      if (doc.length) {
        RateInfo.updateOne({
          ratename
        }, {
          $set: {
            rate,
            open,
            remarks
          }
        }, err => {
          if (err) {
            return db.end(res, 'saveEror');
          } else {
            return db.end(res, 'success');
          }
        })
      } else {
        return db.end(res, 'noRateName')
      }
    }
  })
}
