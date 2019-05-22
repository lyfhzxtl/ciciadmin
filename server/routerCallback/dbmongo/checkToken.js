let db = require('../../db/db');
let Tokens = require('../../db/tokens');
let Routes = require('../../db/userRoutes');
let UserInfo = require('../../db/userInfo');
let consts = require('../../consts');
module.exports = (req, res) => {
  db.connect(res);
  let query = req.query;
  Tokens.find(query, (err, doc) => {
    if (err) {
      return db.end(res, 'findError');
    } else if (doc.length) {
      let username = doc[0].username;
      let routes = [];
      let pricode = 0;
      UserInfo.find({
        username
      }, (err, doc) => {
        if (!err && doc.length) {
          pricode = doc[0].pricode;
        }
      })
      Routes.find({
        username
      }, (err, doc) => {
        if (err) {
          return db.end(res, 'findError');
        } else if (doc.length === 0 || doc[0].routeData.length === 0) {
          return db.end(res, 'awaitConfig')
        } else {
          routes = doc[0].routeData;
          let hasAutho = routes.some(item => item.path === '/autho');
          if (pricode === 16 && !hasAutho) {
            routes = consts('routes').concat(routes);
          }
        }
        return db.end(res, {
          error: 0,
          data: {
            username,
            pricode,
            routes
          }
        });
      });
    }
  })
}
