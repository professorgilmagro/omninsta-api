const express = require('express');
const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');
const routes = new express.Router();
const multer = require('multer');
const S3File = require('./helpers/S3File');

// cria uma rota para obtenção das images no S3
routes.get('/files/:filename', function(req, res) {
	S3File.fetchFromS3(req.params.filename, res);
});

routes.get('/', PostController.index);
routes.get('/api/v1/posts', PostController.index);

const upload = multer({ dest: 'upload/' });
routes.post('/api/v1/posts', upload.single('image'), PostController.store);
routes.post('/api/v1/posts/:id/like', LikeController.store);

module.exports = routes;
