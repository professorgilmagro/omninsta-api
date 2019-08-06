const Post = require('../models/Post');

module.exports = {
	async index(req, res) {
		const posts = await Post.find().sort('-createdAt');
		return res.json(posts);
	},

	async store(req, res) {
		const { id } = req.params;

		const post = await Post.findById(id);
		post.likes++;
		await post.save();

		req.io.emit('like', post);
		return res.json(post);
	}
};
