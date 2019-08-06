const mongoose = require('mongoose');
const paginate = require('mongoose-paginate');

// abstração da tabela no banco de dados
const PostSchema = new mongoose.Schema(
	{
		author: String,
		place: String,
		description: String,
		hashtags: String,
		image: String,
		likes: {
			type: Number,
			default: 0
		}
	},
	{
		timestamps: true
	}
);

PostSchema.plugin(paginate);
module.exports = mongoose.model('Post', PostSchema);
