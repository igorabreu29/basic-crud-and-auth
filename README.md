# System Authenticate with basic CRUD
Projeto desenvolvido para o teste de aplicação de uma empresa, onde pode-se realizar funções básicas de um CRUD e fazer autenticação.

## Pré-requisitos
- Necessita ter Node.js instalado na máquina, versão 18 ou superior

## Instalar o projeto
```bash
    npm ci 
```

### Etapas para rodar o projeto
- Adicione um arquivo .env para poder fazer a configuração do ambiente(Siga o modelo do arquivo .env.example)
- Ter um banco de dados Postgres chamado "system_login" para funcionar o ORM prisma, ou altere na url o nome database

- Após isso reset e rode as migrations do prisma
```bash
    npx prisma migrate reset
    npx prisma migrate dev
```

- Por fim, rode o projeto local
```bash
    npm run dev
```

## Executando testes 
Dentro do projeto, existe dois tipos de testes, o unitário e o de end-to-end

### Testes unitários
```
    npm i test
```

### Testes End-to-End
```
    npm i test:e2e
```

## Rotas da aplicação
Envie os dados no formato JSON.

### CRUD
- GET /users
- POST /register
- PUT /update-user/id
- DELETE /delete-user/id

Exemplo:
```
    - GET http://localhost:3333/users

    - POST http://localhost:3333/register
    Content-Type: application/json

    {
        "name": "John",
        "lastname": "Doe",
        "email": "john@test.com",
        "password": "john22",
        "birth": "12/06/2000",
        "age": 22,
        "gender": "male",
        "father": "João Doe",
        "mother": "Joana Doe",
        "address": "Unknow Street"
    }

    - PUT http://localhost:3333/update-user/id

    {
        "name": "John",
        "lastname": "Doe",
        "email": "john22@gmail.com",
        "password": "john22",
        "birth": "12/06/2000",
        "age": 22,
        "gender": "male",
        "father": "João Doe",
        "mother": "Joana Doe",
        "address": "Know Street"
    }

    - DELETE http://localhost:3333/delete-user/id
```

### Auth
- POST /auth
- GET /resource

'/resource' é uma rota protegida, envie o token pelo HEADERS, recebido no momento da autenticação

Exemplo: 
```
    - POST http://localhost:3333/auth
    Content-Type: application/json

    {
        "email": "john@gmail.com",
        "password": "john22"
    }

    - GET http://localhost:3333/resource
    Authorization: Bearer token
```