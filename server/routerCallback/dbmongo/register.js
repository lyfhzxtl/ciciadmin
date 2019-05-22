let db = require('../../db/db');
let UserInfo = require('../../db/userInfo');
module.exports = (req, res) => {
  db.connect(res);
  let username = req.body.username;
  let password = req.body.password;
  let userInfo = new UserInfo({
    username,
    password,
    pricode: 0
  });
  userInfo.save(err => {
    if (err) {
      db.end(res, 'saveError');
    } else {
      db.end(res, 'success');
    }
  })
}
