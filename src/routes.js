const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');
const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');

const routes = new express.Router();
const upload = multer(uploadConfig);

routes.get('/', PostController.index);
routes.get('/api/v1/posts', PostController.index);
routes.post('/api/v1/posts', upload.single('image'), PostController.store);
routes.post('/api/v1/posts/:id/like', LikeController.store);

module.exports = routes;
