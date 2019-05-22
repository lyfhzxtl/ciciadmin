let db = require('../../db/db');
let Routes = require('../../db/userRoutes');
module.exports = (req, res) => {
  db.connect(res);
  let username = req.body.username;
  let routeData = req.body.newRoutes;
  Routes.find({
    username
  }, (err, doc) => {
    if (err) {
      return db.end(res, 'findError');
    } else {
      if (doc.length) {
        Routes.updateOne({
          username
        }, {
          username,
          routeData
        }, err => {
          if (err) {
            return db.end(res, 'saveEror');
          } else {
            return db.end(res, 'success');
          }
        })
      } else {
        let routeDatas = new Routes({
          username,
          routeData
        });
        routeDatas.save(err => {
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
