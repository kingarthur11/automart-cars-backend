const express = require('express');
const httpStatus = require('http-status');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const routes = require('../api/routes/v1');
const { errorConverter, errorHandler } = require('../api/middleware/error');
const ApiError = require('../api/utils/ApiError');

const multer = require('multer');

const dotenv = require('dotenv')

dotenv.config()

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors())
app.use(express.static(__dirname+'/public'));

app.post('/upload', (req, res, next) => {

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

  const upload = multer({ storage }).single('image')
  upload(req, res, function(err) {
    if (err) {
      return res.send(err)
    }
    console.log('file uploaded to server')
    console.log(req.file)

    // SEND FILE TO CLOUDINARY
    const cloudinary = require('cloudinary').v2
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET
    })
    
    const path = req.file.path
    const uniqueFilename = new Date().toISOString()

    cloudinary.uploader.upload(
      path,
      { public_id: `blog/${uniqueFilename}`, tags: `blog` }, // directory and tags are optional
      function(err, image) {
        if (err) return res.send(err)
        console.log('file uploaded to Cloudinary')
        // remove file from server
        const fs = require('fs')
        fs.unlinkSync(path)
        // return image details
        res.json(image)
      }
    )
  })
})

app.use('/api', routes);

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

app.use(errorConverter);

app.use(errorHandler);

module.exports = app;
