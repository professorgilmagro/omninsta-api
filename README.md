[![CircleCI](https://circleci.com/gh/professorgilmagro/omninsta-api.svg?style=shield)](https://circleci.com/gh/professorgilmagro/omninsta-api)

# Sistema Backend NodeJS API

O backend da aplicação fornece uma API com os endpoints que é consumido pelos clients de frontend (web e mobile).
Este serve foi desenvolvido para atender aos clients provendo a consulta e persistência das informações ([MongoDB Cloud](https://www.mongodb.com/cloud/atlas)) além de atualizações em tempo real (Realtime via Websocket).
Um dos objetivos principais é simular a plataforma do Instagram para fins de estudo e conhecimento.

### Instalação

#### 1. Instalação das dependências

```ssh
$ cd omninsta-api
$ yarn install
```

#### 2. Execução do servidor

```ssh
$ yarn start
```

3. Acesso do endpoint de posts pode ser obtido em:
   http://localhost:3333/api/v1/posts

## Endpoints

-   Exibe a lista com todos posts : `GET /api/v1/posts/`
-   Cria um novo post : `POST /api/v1/posts/`
-   Exibe dados de um único post : `GET /api/v1/posts/:pk/`

## Heroku

Este projeto está disponível no Heroku:

https://omninsta-api.herokuapp.com/

## Libs utilizadas

#### Depedências

-   axios: 0.19.0
-   boundingbox: 1.2.0
-   dotenv: 8.0.0
-   express: 4.17.1
-   node-cache: 4.2.0
-   mongoose 5.5.15
-   mongoose-paginate ^5.0.3
-   multer ^1.4.1
-   sharp ^0.22.1
-   socket.io ^2.2.0

#### Desenvolvimento

-   babel/core: 7.5.0
-   babel/preset-env: 7.5.0
-   babel-jest: 24.8.0
-   jest: 24.8.0
-   nodemon: 1.19.1
