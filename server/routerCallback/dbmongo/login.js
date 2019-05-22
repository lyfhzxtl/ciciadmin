let db = require('../../db/db');
let UserInfo = require('../../db/userInfo');
let Routes = require('../../db/userRoutes');
let Tokens = require('../../db/tokens');
let consts = require('../../consts');
module.exports = (req, res) => {
  db.connect(res);
  let username = req.body.username;
  let password = req.body.password;
  UserInfo.find({
    username,
    password
  }, (err, doc) => {
    if (err) {
      return db.end(res, 'findError');
    } else {
      if (doc.length) {
        let routes = [];
        let pricode = doc[0].pricode;
        if (pricode === 0) {
          return db.end(res, 'awaitConfirm');
        }
        req.session.username = username;
        let str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
        let token = '';
        for (let i = 0; i < 32; i++) {
          token += str[Math.floor(Math.random() * 62)];
        }
        Tokens.find({
          username
        }, (err, doc) => {
          if (err) {
            return db.end(res, 'findError');
          } else if (doc.length) {
            Tokens.updateOne({
              username
            }, {
              token
            }, err => {
              if (err) {
                return db.end(res, 'loginError');
              }
            })
          } else {
            let tokens = new Tokens({
              username,
              token
            });
            tokens.save(err => {
              if (err) {
                return db.end(res, 'saveError');
              }
            })
          }
        })
        Routes.find({
          username
        }, (err, doc) => {
          if (err) {
            return db.end(res, 'findError');
          } else if (doc.length === 0 || doc[0].routeData.length === 0) {
            if (pricode === 16) {
              routes = consts('routes')
              return db.end(res, {
                error: 0,
                data: {
                  username,
                  pricode,
                  token,
                  routes
                }
              });
            }
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
              token,
              routes
            }
          });
        });
        return;
      }
      db.end(res, 'noUser');
    }
  })
}
