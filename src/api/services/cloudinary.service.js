const multer = require('multer');
const dotenv = require('dotenv')

dotenv.config()

const DIR = './public/uploads/';
const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, DIR)
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    return cb(null, fileName)
  }
});

let upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('File types allowed .jpeg, .jpg and .png!'));
        }
    }
}).single('image');

module.exports = {upload};
