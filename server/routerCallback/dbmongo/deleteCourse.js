let db = require('../../db/db');
let CourseData = require('../../db/courseData');
module.exports = (req, res) => {
  db.connect(res);
  let coursename = req.query[0];
  CourseData.find({
    coursename
  }, (err, doc) => {
    if (err) {
      return db.end(res, 'findError');
    } else {
      if (doc.length) {
        CourseData.deleteOne({
          coursename
        }, err => {
          if (err) {
            return db.end(res, 'handleIsNotSuccess')
          } else {
            return db.end(res, 'success');
          }
        })
      } else {
        return db.end(res, 'noCourseName');
      }
    }
  })
}
