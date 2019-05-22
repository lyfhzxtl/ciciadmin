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
        return db.end(res, 'rateHas');
      } else {
        let rateDatas = new RateInfo({
          ratename,
          rate,
          open,
          remarks
        });
        rateDatas.save(err => {
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
