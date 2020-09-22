# DESAFIO 01

### Executando o projeto

##### Antes:
> Abra o arquivo .env na raiz do projeto e adicione a string de conexão com seu banco mongoDB, Ex: 'mongodb://localhost/nomeDoBanco'


Instale as dependências e dependências de desenvolvimento e execute o projeto.

```javascript
$ npm install
$ npm start
```

## EndPoints

> GET /users

Listagem de todos os usuários cadastrados no banco de dados.



> POST /users

>Body:
```javascript
{
    "name": String,
    "email": String,
    "senha": String,
    "telefones": [{
        "numero": String,
        "ddd": String
    }]
}
```


