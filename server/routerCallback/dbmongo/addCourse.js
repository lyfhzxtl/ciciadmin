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
        return db.end(res, 'coursehas');
      } else {
        let courseDatas = new CourseData({
          coursename,
          price,
          open,
          coverpic: '/coverpic/' + coverpic
        });
        courseDatas.save(err => {
          if (err) {
            return db.end(res, 'saveError');
          } else {
            return db.end(res, 'success');
          }
        })
      }
    }
  })
}
