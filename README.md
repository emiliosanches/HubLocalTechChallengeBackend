# Teste Técnico - Fullstack Javascript Developer - Backend

Esse repositório contem o backend de um teste técnico para a vaga de FullStack Javascript Developer na HubLocal. Trata-se de um CRUD de duas entidades (empresas e locais) relacionadas, desenvolvido em NestJS, com autenticação (login e cadastro).

## Tecnologias utilizadas

- NestJS
- TypeScript
- TypeORM
- PostgreSQL

## Como instalar e executar o projeto

Pré requisitos:

- Possuir um banco de dados (preferencialmente PostgreSQL) configurado.

Passo a passo:

1. Clone o repositório
2. Entre no diretório do projeto utilizando um terminal (`cd path/to/repo`)
3. Execute `yarn` ou `npm i` para instalar as dependências
4. Adicione um arquivo .env nesse diretório, com o formato abaixo, substituindo os valores de acordo com o seu ambiente de execução

```shell
DB_HOST=db_hostname
DB_PORT=5432
DB_USER=dbuser
DB_PASSWORD=D4T4B4S3_P455
DB_NAME=database_name

JWT_SECRET=jwt_secret
```

5. Execute `yarn start:dev` ou `npm run start:dev` para iniciar o servidor

## Documentação do processo de desenvolvimento

Abaixo, explicações sobre algumas decisões tomadas durante o desenvolvimento da aplicação

### 1. Utilização do pacote nest-typed-config

Esse pacote permite a definição de um schema para as variáveis de ambiente. Sendo assin, caso uma variável esteja faltando, o erro será lançado durante a inicialização da aplicação - permitindo uma correção antes mesmo da execução do código que utiliza a variável.
Além disso, esse pacote também define uma tipagem para as variáveis. Dessa forma, ao desenvolver, é possível saber quais variáveis existem, evitando erros de digitação ou o uso de alguma variável que ainda não foi definida no arquivo de configuração.

### 2. Problemas com typeorm 0.3.12

Após ter problemas com as migrations do typeorm (e passar algumas horas tentando resolvê-lo), descobri que havia um problema com a versão 0.3.12, que utiliza a versão 8.1.0 do pacote `glob`.
Portanto, precisei fixar a versão do typeorm em 0.3.11.
Informei a causa do problema e como resolvê-lo [em um comentário de uma issue do typeorm](https://github.com/typeorm/typeorm/issues/9840#issuecomment-1464948483).

### 3. Segurança de senha

Para ter uma maior segurança na senha, o bcrypt foi escolhido para gerar o hash armazenado no banco de dados, com 15 salt rounds, e foram definidos os seguintes requisitos para a sua composição:

- 8 caracteres
- Uma letra maiúscula
- Uma letra minúscula
- Um número
- Um símbolo

### 4. Login

A funcionalidade de login é feita por meio de JWT. O servidor recebe a requisição de login, procura pelo usuário que possua o e-mail e senha informados e, caso encontre, gera um JWT com as informações desse usuário.

### 5. CRUD de empresas

O módulo `companies` (empresas) possui 5 métodos que desempenham as funcionalidades de um CRUD: criação, leitura (listagem e busca por ID), atualização e remoção.
Os métodos foram implementados de forma simples, similar ao que existe na documentação do NestJS (e TypeORM).

### 6. Autorização

Para realizar a autorização dos endpoints (verificar se o usuário logado - autenticado - possui permissão para realizar a ação), foi utilizado o conceito de Guards do NestJS. Com isso, evitamos a duplicação de código e abstraímos uma funcionalidade comum (verificação de permissão) para uma outra classe.

#### 6.1. CompanyAccessGuard

Esse guard acessa o parâmetro de rota companyId e verifica se o usuário logado (informado no JWT) é o proprietário daquela empresa.
Caso o id informado no companyId não exista no banco, o endpoint é permitido para que o service retorne um 404 (NotFoundException), ao invés de um 401 (UnauthorizedException)

### 7. CRUD de locais

O CRUD de locais possui uma única diferença do CRUD de empresas: o caminho.
Ele foi definido na rota `/companies/{companyId}/places` pois, dessa forma, o companyId pode ser utilizado para autorização com o mesmo guard do CRUD de empresas (CompanyAccessGuard).
Isso é possível pois os locais possuem relacionamento ManyToOne com as empresas. Portanto, o usuário possui acesso aos locais de uma empresa que seja sua.
O guard valida se o companyId na rota é pertencente ao usuário logado, e o service retorna apenas locais relacionados ao companyId informado.

> This is a challenge by [Coodesh](https://coodesh.com/)
