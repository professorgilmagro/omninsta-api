const express = require('express');
const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');
const routes = new express.Router();
const multer = require('multer');

let upload = multer({ dest: 'upload/' });

routes.get('/', PostController.index);
routes.get('/api/v1/posts', PostController.index);
routes.post('/api/v1/posts', upload.single('image'), PostController.store);
routes.post('/api/v1/posts/:id/like', LikeController.store);

module.exports = routes;
