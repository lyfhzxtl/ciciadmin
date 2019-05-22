let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let routesSchema = new Schema({
  username: {
    type: String
  },
  token: {
    type: String
  }
});
module.exports = mongoose.model('Tokens', routesSchema);
