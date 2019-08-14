require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const dbConf = require('./config/db');
const request = require('request');
const bodyParser = require('body-parser');
const app = express();

// estratégia para utilização do protocolo http e socket
// necessário para desaclopar a aplicação permitindo que ele ouça tanto o http quanto o websocket
// utilizamos o socket.io para prover respostas em tempo real
const server = require('http').Server(app);
const io = require('socket.io')(server);

// define a porta para a qual a aplicação irá servir os dados
server_port = process.env.PORT || 3333;
server.listen(server_port, function() {
	console.log('Listening on port %d', server_port);
});

// estabelece a conexão com o banco de dados MongoDB hospedado no MongoDB Atlas Cloud
mongoose.connect(dbConf.mongo.getString(), dbConf.mongo.options);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// cria um middleware para disponibilizar o io no request da aplicação
// o next permite que, ao interceptar esta requisição, prossiga para os demais, caso contrário, ia dá um stop aqui mesmo
app.use((req, resp, next) => {
	req.io = io;
	next();
});

const static_path = path.resolve(__dirname, '..', 'upload', 'resized');
app.get('/files/:filename', function(req, res) {
	const url = `${process.env.AWS_S3_OBJECT_BASE_URL}/${req.params.filename}`;
	request(url).pipe(res);
});

// cria a rota para arquivos estáticos de images que estão no AWS S3
app.all('*.(svg|png|jpg|jpeg|ico)', function(req, res) {
	const url = process.env.AWS_S3_OBJECT_BASE_URL + req.url;
	request(url).pipe(res);
});

// utiliza o 'cors' para tornar a backend acessível a outros apps em dominios diferentes
app.use(cors());

// informa o arquivo onde as rotas estão configuradas
app.use(require('./routes'));
