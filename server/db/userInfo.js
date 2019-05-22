let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let userSchema = new Schema({
  username: {
    type: String
  },
  password: {
    type: String
  },
  pricode: {
    type: Number
  }
});
module.exports = mongoose.model('Admin', userSchema);
