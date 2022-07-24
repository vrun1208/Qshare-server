const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const File = require('../models/file');
const {v4: uuid4} = require('uuid');
const qrcode = require('qrcode')

let storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename:  (req, file, cb) => {
        const uniname = `${Date.now()}-${Math.round(Math.random()*  1E9)}${path.extname(file.originalname)}`;
        cb(null, uniname);
    }
});

let upload = multer({
    storage,
    limits: {fileSize: 1000000 * 100},
}).single('Myfile');

router.post('/', (req, res) => {

    upload(req, res, async (err) => {
        if (!req.file) {
            return res.json({error: 'required fields'});
        }

        if(err) {
             return res.status(500).send({error: err.message})
        }

        const file = new File({
            filename: req.file.filename,
            uuid: uuid4(),
            path: req.file.path,
            size: req.file.size
        });

        const response = await file.save();
        return res.json({file: `${process.env.APP_BASE_URL}/files/${response.uuid}`})

        // https://localhost:3000/files/sahbdxeoedi_djsn   download-link
    });


});

module.exports =  router;

