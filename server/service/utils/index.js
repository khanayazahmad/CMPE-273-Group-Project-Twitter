const express = require('express');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const path = require('path');
const url = require('url');
const uuid = require('uuid/v4');

const s3 = new aws.S3({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    Bucket: process.env.S3_BUCKET_NAME
});

function checkFileType(file, cb) {

    const filetypes = /jpeg|jpg|png|gif/;

    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

const imgUpload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.S3_BUCKET_NAME,
        acl: 'public-read',
        key: function (req, file, cb) {
            cb(null, path.basename(file.originalname, path.extname(file.originalname)) + '-' + uuid() + path.extname(file.originalname))
        }
    }),
    limits: { fileSize: process.env.MAX_FILE_SIZE },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('image');

module.exports.uploadImage = function (req, res) {
    imgUpload(req, res, (error) => {
        if (error) {
            console.log('errors', error);
            res.json({ error: error });
        } else {
            if (req.file === undefined) {
                res.json('Error: No File Selected');
            } else {
                const imageName = req.file.key;
                const imageLocation = req.file.location;
                res.json({
                    image: imageName,
                    location: imageLocation
                });
            }
        }
    });
}

