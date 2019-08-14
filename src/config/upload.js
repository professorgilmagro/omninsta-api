'use strict';

require('dotenv').config();

const sharp = require('sharp');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

aws.config.update({
	secretAccessKey: process.env.AWS_SECRET_ACESS_KEY,
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	region: process.env.AWS_REGION
});

// define o nome e o destino dos arquivos recebidos via upload
module.exports = {
	storage: multerS3({
		s3: new aws.S3(),
		bucket: process.env.AWS_BUCKET_NAME,
		contentType: multerS3.AUTO_CONTENT_TYPE,
		acl: 'public-read',
		metadata: function(req, file, cb) {
			cb(null, { fieldName: file.fieldname });
		},
		key: function(req, file, cb) {
			cb(null, `${Date.now().toString()}-${file.originalname}`);
		}
	})
};
