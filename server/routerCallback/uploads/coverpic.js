let Formidable = require('formidable');
let path = require('path');
let fs = require('fs');
let consts = require('../../consts');
module.exports = (req, res) => {
  let form = new Formidable();
  let targetFile = path.join(__dirname, '../../../uploads/coverpic');
  form.uploadDir = targetFile;
  let fileArr = [];
  form.on('file', (key, value) => {
    fileArr.push(value);
  })
  form.parse(req, () => {
    fileArr.forEach(item => {
      fs.renameSync(item.path, targetFile + '/' + item.name);
      res.json(consts('success'))
    })
  })
}
