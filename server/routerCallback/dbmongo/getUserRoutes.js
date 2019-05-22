let db = require('../../db/db');
let Routes = require('../../db/userRoutes');
module.exports = (req, res) => {
  db.connect(res);
  let query = req.query;
  Routes.find(query, (err, doc) => {
    if (err) {
      return db.end(res, 'findError');
    } else if (doc.length) {
      return db.end(res, {
        error: 0,
        data: doc[0].routeData
      })
    } else {
      return db.end(res, 'awaitConfig')
    }
  })
}
