'use strict';

require('dotenv').config();

const sharp = require('sharp');
const aws = require('aws-sdk');
const fs = require('fs');

class S3File {
	constructor() {
		this.config = {
			apiVersion: '2019-08-16',
			secretAccessKey: process.env.AWS_SECRET_ACESS_KEY,
			accessKeyId: process.env.AWS_ACCESS_KEY_ID,
			region: process.env.AWS_REGION,
			ACL: 'public-read-write',
			ContentType: 'image/jpeg'
		};

		this.s3 = new aws.S3(this.config);
	}

	sentToS3(params, filepath, resolve) {
		let res = { filepath, data: [] };
		this.s3.putObject(params, (e, d) => {
			if (e) reject(e);
			d.name = params.Key;
			res.data.push(d);
			resolve(res);
		});
	}

	upload(filepath, name, options) {
		return new Promise((resolve, reject) => {
			let fileBinaryString = fs.readFileSync(filepath, null);
			let params = {
				Body: fileBinaryString,
				Bucket: process.env.AWS_BUCKET_NAME,
				Key: name
			};

			if (options === undefined || !options.resize == undefined) {
				this.sentToS3(params, filepath, resolve);
				return true;
			}

			let width = options.resize.width;
			let height = options.resize.height;
			let quality = 80;
			if (typeof options.quality == 'number') {
				quality = options.quality;
			}

			sharp(filepath)
				.resize(width, height)
				.jpeg({ quality })
				.toBuffer()
				.then(buffer => {
					params.Body = buffer;
					this.sentToS3(params, filepath, resolve);
				});
		});
	}
}

module.exports = new S3File();
