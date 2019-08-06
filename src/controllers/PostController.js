const Post = require('../models/Post');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports = {
	async index(req, res) {
		const posts = await Post.find().sort('-createdAt');
		return res.json(posts);
	},

	async store(req, res) {
		const { author, place, description, hashtags } = req.body;
		const { filename: image } = req.file;
		const [name] = image.split('.');
		const newFileName = `${name}.jpg`;

		// redimenciona a imagem e salva na pasta 'resized'
		await sharp(req.file.path)
			.resize(500)
			.jpeg({ quality: 70 })
			.toFile(path.resolve(req.file.destination, 'resized', newFileName));

		// apaga o arquivo original depois que ele foi redimensionado
		fs.unlinkSync(req.file.path);

		const post = await Post.create({
			author,
			place,
			description,
			hashtags,
			image: newFileName
		});

		req.io.emit('post', post);
		return res.json(post);
	}
};
