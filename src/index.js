const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const dbConf = require('./config/db');
const app = express();

// estratégia para utilização do protocolo http e socket
// necessário para desaclopar a aplicação permitindo que ele ouça tanto o http quanto o websocket
// utilizamos o socket.io para prover respostas em tempo real
const server = require('http').Server(app);
const io = require('socket.io')(server);

// define a porta para a qual a aplicação irá servir os dados
server.listen(3333);

// estabelece a conexão com o banco de dados MongoDB hospedado no MongoDB Atlas Cloud
mongoose.connect(dbConf.mongo.getString(), dbConf.mongo.options);

// cria um middleware para disponibilizar o io no request da aplicação
// o next permite que, ao interceptar esta requisição, prossiga para os demais, caso contrário, ia dá um stop aqui mesmo
app.use((req, resp, next) => {
	req.io = io;
	next();
});

// cria a rota para arquivos estáticos (images que estão na pasta upload/resized)
const static_path = path.resolve(__dirname, '..', 'upload', 'resized');
app.use('/files', express.static(static_path));

// utiliza o 'cors' para tornar a backend acessível a outros apps em dominios diferentes
app.use(cors());

// informa o arquivo onde as rotas estão configuradas
app.use(require('./routes'));
