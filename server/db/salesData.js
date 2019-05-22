let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let salesSchema = new Schema({
  name: String,
  salesData: [{}]
});
module.exports = mongoose.model('sales', salesSchema);
