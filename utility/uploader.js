const multer = require('multer');
const uuid = require('uuid');
const maxSize = '10 * 1024 * 1024';

class Uploader {
  constructor() {
  }

  static storageBillboards = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `./uploads/billboards`);
    },
    filename: function (req, file, cb) {
      req.avatarId = uuid.v4();
      const suffix = file.originalname.split('.').pop();
      cb(null, `${req.avatarId}.${suffix}`);
    }
  });
  static storageCategory = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `./uploads/category`);
    },
    filename: function (req, file, cb) {
      req.categoryId = uuid.v4();
      const suffix = file.originalname.split('.').pop();
      cb(null, `${req.categoryId}.${suffix}`);
    }
  });
  static storageAvatar = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `./uploads/employee`);
    },
    filename: function (req, file, cb) {
      req.avatarId = uuid.v4();
      const suffix = file.originalname.split('.').pop();
      cb(null, `${req.avatarId}.${suffix}`);
    }
  })

  static uploadBillboard = multer({storage: this.storageBillboards, limits: {fileSize: maxSize}});
  static uploadCategory = multer({storage: this.storageCategory, limits: {fileSize: maxSize}});
  static uploadAvatar = multer({storage: this.storageAvatar, limits: {fileSize: maxSize}});

}


module.exports = Uploader;