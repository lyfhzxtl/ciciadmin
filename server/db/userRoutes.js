let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let routesSchema = new Schema({
  username: String,
  routeData: [{}]
});
module.exports = mongoose.model('Routes', routesSchema);
