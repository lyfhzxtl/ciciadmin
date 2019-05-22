let db = require('../../db/db');
let CourseData = require('../../db/courseData');
module.exports = (req, res) => {
  db.connect(res);
  CourseData.find((err, doc) => {
    if (err) {
      return db.end(res, 'findError');
    } else {
      if (!doc.length) {
        return db.end(res, 'noCourse');
      } else {
        return db.end(res, {
          error: 0,
          data: doc
        })
      }
    }
  })
}
