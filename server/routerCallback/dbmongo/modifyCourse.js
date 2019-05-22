let db = require('../../db/db');
let CourseData = require('../../db/courseData');
module.exports = (req, res) => {
  db.connect(res);
  let coursename = req.body.coursename;
  let price = req.body.price;
  let open = req.body.open;
  let coverpic = req.body.coverpic;
  CourseData.find({
    coursename
  }, (err, doc) => {
    if (err) {
      return db.end(res, 'findError');
    } else {
      if (doc.length) {
        CourseData.updateOne({
          coursename
        }, {
          $set: {
            price,
            open,
            coverpic: '/coverpic/' + coverpic
          }
        }, err => {
          if (err) {
            return db.end(res, 'saveEror');
          } else {
            return db.end(res, 'success');
          }
        })
      } else {
        return db.end(res, 'noCourseName')
      }
    }
  })
}
