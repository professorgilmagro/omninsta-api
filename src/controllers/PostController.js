const Post = require('../models/Post');
const S3File = require('../helpers/S3File');
const md5String = require('../helpers/MD5StringParse');

module.exports = {
	async index(req, res) {
		const posts = await Post.find().sort('-createdAt');
		return res.json(posts);
	},

	async store(req, res) {
		const filename = `${md5String.parse(req.file.originalname)}.jpg`;
		const { author, place, description, hashtags } = req.body;

		await S3File.upload(req.file.path, filename, {
			resize: { width: 500, height: null }
		});

		const post = await Post.create({
			author,
			place,
			description,
			hashtags,
			image: filename
		});

		req.io.emit('post', post);
		return res.json(post);
	}
};
