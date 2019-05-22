let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let rateInfoSchema = new Schema({
  ratename: String,
  rate: Number,
  open: Boolean,
  remarks: String
});
module.exports = mongoose.model('rate', rateInfoSchema);
