# Teste Técnico - Fullstack Javascript Developer - Backend

Esse repositório contem o backend de um teste técnico para a vaga de FullStack Javascript Developer na HubLocal. Trata-se de uma interface em React com autenticação, formulários de cadastro e telas de listagem.

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
  # server
  
  ```
5. Execute `yarn start:dev` ou `npm run start:dev` para iniciar o servidor

## Documentação do processo de desenvolvimento
Abaixo, explicações sobre algumas decisões tomadas durante o desenvolvimento da aplicação
### 1. Utilização do pacote nest-typed-config
Esse pacote permite a definição de um schema para as variáveis de ambiente. Sendo assin, caso uma variável esteja faltando, o erro será lançado durante a inicialização da aplicação - permitindo uma correção antes mesmo da execução do código que utiliza a variável.
Além disso, esse pacote também define uma tipagem para as variáveis. Dessa forma, ao desenvolver, é possível saber quais variáveis existem, evitando erros de digitação ou o uso de alguma variável que ainda não foi definida no arquivo de configuração.

>  This is a challenge by [Coodesh](https://coodesh.com/)
