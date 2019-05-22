let db = require('../../db/db');
let Tokens = require('../../db/tokens');
let UserInfo = require('../../db/userInfo');
module.exports = (req, res) => {
  db.connect(res);
  let query = req.query;
  Tokens.find(query, (err, doc) => {
    if (err) {
      return db.end(res, 'findError');
    } else if (doc.length) {
      UserInfo.find((err, doc) => {
        if (err) {
          return db.end(res, 'findError')
        } else {
          return db.end(res, {
            error: 0,
            data: doc.map(item => {
              return {
                username: item.username,
                pricode: item.pricode
              }
            })
          })
        }
      })
    }
  })
}
