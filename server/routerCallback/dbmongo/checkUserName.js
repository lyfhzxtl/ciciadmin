let db = require('../../db/db');
let UserInfo = require('../../db/userInfo');
module.exports = (req, res) => {
  db.connect(res);
  let username = req.body.username;
  UserInfo.find({
    username
  }, (err, doc) => {
    if (err) {
      db.end(res, 'findError');
    } else {
      if (doc.length) {
        return db.end(res, 'hasUser');
      }
      db.end(res, 'usernameIsOK');
    }
  })
}
