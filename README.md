# Teste Novos Devs HubLocal

Este é um desafio para que possamos ver as suas habilidades como Fullstack Developer.

### Antes de começar

- Prepare o projeto para ser disponibilizado no Github, copiando o conteúdo deste repositório para o seu (ou utilize o fork do projeto e aponte para o Github). Confirme que a visibilidade do projeto é pública (não esqueça de colocar no readme a referência a este challenge);
- Considere como deadline 5 dias a partir do início do desafio. Caso tenha sido convidado a realizar o teste e não seja possível concluir dentro deste período, avise a pessoa que o convidou para receber instruções sobre o que fazer.
- Documentar todo o processo de investigação para o desenvolvimento da atividade (README.md no seu repositório); os resultados destas tarefas são tão importantes do que o seu processo de pensamento e decisões à medida que as completa, por isso tente documentar e apresentar os seus hipóteses e decisões na medida do possível.

## Tecnologias (Front-End):

> Obs: as techs listadas abaixo fazem parte de nossos projetos diariamente.
1. Material UI - https://mui.com/material-ui/
2. Styled Component - https://styled-components.com/
3. Redux - https://redux.js.org/
4. Redux Persist - https://github.com/rt2zz/redux-persist
5. Axios - https://axios-http.com/ptbr/docs/intro

Nada impede que você utilize outras como Chakra UI e Context API em vez de um Material UI e Redux, e assim por diante.

## Tecnologias (Back-End):
Nest JS no Back-end com TypeORM e Postgres são as que utilizamos e desejamos como diferencial. No lugar de TypeORM uma boa pedida seria Prisma.


## Diferencial:
* Migrations
* Deploy em algum servidor
* React Test Library
* BDD
* TDD

## Organização:

* Separar o repositório do back do front
* Aplicação de padrões Clean Code
* Validação de chamadas assíncronas para evitar travamentos
* Deixar instruções detalhadas no README de cada projeto

## Telas/Components:

* Sign In (tela inicial)
* Sign Up
* CRUD de Empresas
* CRUD de Locais

### Validações
1. campos dos formulários, principalmente que envolvem números;
    - adicionar máscaras nos campos que precisem, no caso sendo um deles o CNPJ.
2. Controle de estados e persistência
    - Usar Redux, Context API ou qualquer outro framework;
    - Usar Redux Persist ou outro meio para persistir dados de estado.
3. Usar Lib de Feedback
    -  notistack, react-toastify.


Link do Figma: https://www.figma.com/file/aEgfeSSNgaycj2533zay6j/my-companies-teste-hublocal?node-id=0%3A1&t=tBHtjibCLR5guvHh-0

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FaEgfeSSNgaycj2533zay6j%2Fmy-companies-teste-hublocal%3Fnode-id%3D0%253A1%26t%3DIca8qwTvTG6b2Goi-1" allowfullscreen></iframe>

### Funcionalidades:

1. Logar/Criar usuários
2. Criar/Listar/Deletar/Editar empresas (usuário logado)
3. Criar/Listar/Deletar/Editar locais pertencentes a uma empresa (usuário logado)

### Entidades:

Usuários
- Colunas: Nome, Email e Senha.
- Relacionamentos: One To Many com Empresas

Empresas
- Colunas: Nome, Website e CNPJ.
- Relacionamentos: Many To One com Usuários e One To Many com Locais.

Locais
- Colunas: Nome, CEP, Rua, Número, Bairro, Cidade e Estado.
- Relacionamentos: Many To One com Empresas.

Auth
- Validar todas as rotas dos controllers com JWT;
- Ao usuário logar, o token deve ser retornado para ser guardado para as próximas requests no front-end.

## Readme do Repositório

- Deve conter o título do projeto
- Uma descrição sobre o projeto em frase
- Deve conter uma lista com linguagem, framework e/ou tecnologias usadas
- Como instalar e usar o projeto (instruções)
- Não esqueça o [.gitignore](https://www.toptal.com/developers/gitignore)
- Se está usando github pessoal, referencie que é um challenge by coodesh:  

>  This is a challenge by [Coodesh](https://coodesh.com/)

## Finalização e Instruções para a Apresentação

Avisar sobre a finalização e enviar para correção.

1. Confira se você respondeu o Scorecard da Vaga que chegou no seu email;
2. Confira se você respondeu o Mapeamento Comportamental que chegou no seu email;
3. Acesse: [https://coodesh.com/challenges/review](https://coodesh.com/challenges/review);
4. Adicione o repositório com a sua solução;
5. Grave um vídeo, utilizando o botão na tela de solicitar revisão da Coodesh, com no máximo 5 minutos, com a apresentação do seu projeto. Foque em pontos obrigatórios e diferenciais quando for apresentar.
6. Adicione o link da apresentação do seu projeto no README.md.
7. Verifique se o Readme está bom e faça o commit final em seu repositório;
8. Confira a vaga desejada;
9. Envie e aguarde as instruções para seguir no processo. Sucesso e boa sorte. =)

## Suporte

Use a [nossa comunidade](https://discord.gg/rdXbEvjsWu) para tirar dúvidas sobre o processo ou envie uma mensagem diretamente a um especialista no chat da plataforma. 


