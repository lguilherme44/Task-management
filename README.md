# Task-Management - Projeto FullStack

Construído em NodeJs no Backend e ReactJs no Frontend.

Em breve termino o Mobile, esta sendo construído em React Native.

## Tecnologias

[ReactJs](https://pt-br.reactjs.org/)
[NodeJs](https://nodejs.org/en/)
[Sequelize](https://sequelize.org/)
[MySQL](https://dev.mysql.com/downloads/mysql/)
[JWTToken](https://jwt.io/)

## Tarefas concluídas

- [x] Migrar DB de mongo para mysql
- [x] Migrar mongoose para sequelize
- [x] Implementação de JWT Token

## Tarefas a azer

- [x] Privatizar rotas no Frontend
- [ ] Desenvolver Mobile

# Screenshots

### Register.js

![Home - ToDo](https://i.imgur.com/bjttNMt.png)

### Login.js

![Login - ToDo](https://i.imgur.com/BFhVi06.png)

### Home.js

![Home - ToDo](https://i.imgur.com/jDfDJHT.png)

### Task.js

![Home - ToDo](https://i.imgur.com/5TXUlfY.png)

## Como rodar a aplicação

### Backend
Config database in: ./src/config/database.js

```1 - yarn```

```2 - yarn sequelize db:create && yarn sequelize db:migrate```

```3 - yarn dev```

### Frontend
Config IP in api file: ./src/services/api.js

```1 - yarn```

```2 - yarn start```

#### Dúvidas e/ou sugestões? 
[Guilherme Lellis](mailto:lguilherme44@gmail.com)
