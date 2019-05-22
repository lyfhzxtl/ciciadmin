let db = require('../../db/db');
let UserInfo = require('../../db/userInfo');
module.exports = (req, res) => {
  db.connect(res);
  let newUserInfo = req.body;
  let username = newUserInfo.username;
  let pricode = newUserInfo.pricode;
  UserInfo.updateOne({
    username
  }, {
    $set: {
      pricode
    }
  }, err => {
    if (err) {
      return db.end(res, 'saveEror');
    } else {
      return db.end(res, 'success');
    }
  })
}
