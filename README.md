[![CircleCI](https://circleci.com/gh/professorgilmagro/omninsta-api.svg?style=shield)](https://circleci.com/gh/professorgilmagro/omninsta-api)

# Sistema Backend NodeJS API

O backend da aplicação fornece uma API com os endpoints que é consumida pelos clients de frontend (web e mobile).
Este serve foi desenvolvido para atender aos clients provendo a consulta e persistência das informações (mongodb) além de atualizações em tempo real (Realtime via Websocket).
Um dos objetivos principais é simular a plataforma do Instagram como fins de estudo e conhecimento.

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
