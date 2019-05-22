let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let courseSchema = new Schema({
  coursename: String,
  price: Number,
  open: Boolean,
  coverpic: String
});
module.exports = mongoose.model('course', courseSchema);
