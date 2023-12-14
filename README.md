# short_url

### Descrição

Esse projeto foi construido para ser um encurtador de URL, ou seja é fornecido uma URL completa e o software irá encurtar ela para uma nova URL de no máximo 6 caracteres. Segue o exemplo:

URL de origem: https://www.google.com.br/?hl=pt-BR
URL encurtada: http://localhost:8080/a63ma8

Esse projeto também conta com criação e login de usuário, para poder acessar rotas autenticadas.

### Banco de dados

Nesse projeto foi utilizado um banco relacional o mysql, foram criadas 2 tabelas nesse banco, uma para armazenar os usuários e outra para armazenar as URL quer foram encurtadas, segue a baixo o modelo dessas tabelas:

##### User:

| Colunas   |  Tipo   |  PK   | AllowNull | Unique |
| :-------- | :-----: | :---: | :-------: | :----: |
| Id        | INTEGER | TRUE  |   FALSE   |  TRUE  |
| Email     | STRING  | FALSE |   FALSE   |  TRUE  |
| Password  | STRING  | FALSE |   FALSE   | FALSE  |
| CreatedAt |  DATE   | FALSE |   FALSE   | FALSE  |
| UpdatedAt |  DATE   | FALSE |   FALSE   | FALSE  |

##### ShortenedURL:

| Colunas      |  Tipo   |  PK   | AllowNull | Unique |
| ------------ | :-----: | :---: | :-------: | :----: |
| Id           | INTEGER | TRUE  |   FALSE   |  TRUE  |
| OriginalUrl  | STRING  | FALSE |   FALSE   | FALSE  |
| ShortenedUrl | STRING  | FALSE |   FALSE   |  TRUE  |
| ClickCount   | INTEGER | FALSE |   FALSE   | FALSE  |
| CreatedAt    |  DATE   | FALSE |   FALSE   | FALSE  |
| UpdatedAt    |  DATE   | FALSE |   FALSE   | FALSE  |
| ExcludeAt    |  DATE   | FALSE |   TRUE    | FALSE  |
| UserId       | INTEGER | FALSE |   TRUE    | FALSE  |

##### Observações:

Temos alguns pontos importantes a se destacar:

- A exclusão de uma URL no banco é feito logicamente, ou seja, o dado não será excluído e sim irá receber um valor para a coluna ExcludeAt, sendo assim caso o valor seja null significa que o dado ainda é valido, caso possua um valor isso significância que o dado foi excluído e dessa forma não poderá ocorrer nenhuma leitura nem edição desse dado.
- A coluna UserId representa o id, ou seja é uma chave estrangeira para a outra tabela, do usuário que criou essa URL, como pode ser criado uma URL encurtada tanto por um usuário autenticado como por um usuário não autenticado esse campo pode ser null, para caso o usuário não esteja logado no sistema.

### Variável de ambiente

Dentro desse projeto temos algumas variáveis de ambiente que devemos configurar antes de rodar o projeto localmente, segue a lista dessas variáveis e o motivo por ser variável de ambiente:

- MYSQL_HOST: Por ser o endereço do banco de dados que esta sendo utilizado, transformar ela em uma variável de ambiente serve para facilitar a alteração dessa variável sem a necessidade de mexer no código-fonte.
- DB_USER: O nome do usuário do banco de dado é uma informação extremamente sensível, sendo assim adicionar ela como uma variável de ambiente traz uma camada a mais de segurança para o projeto, pois você tira do código-fonte que pode ser acessado facilmente por qualquer um, visto que o código se encontra no GitHub.
- DB_PASSWORD: Assim como o DB_USER, essa variável é extremamente sensível, sendo assim adicionar ela como variável de segurança traz uma camada a mais de segurança.
- DB_DATA_BASE:Essa variável não é tão sensível, porem adicionar ela como variável de ambiente pode facilitar muito a troca de um banco para outro, visto que não é necessário trocar no código-fonte o nome do banco de dados.
- MYSQL_PORT: Essa variável representa a porta pela qual se conecta com o banco de dados, sendo assim utilizá-la como variável de ambiente permite a fácil troca dessa porta caso haja a necessidade. 
- JWT_SECRET: Esse valor representa o segredo utilizado para gerar os tokens JWT, sendo assim utilizar como variável de ambiente permite uma camada de segurança a mais, visto que se o token vazar é capaz de comprometer o sistema inteiro.

### Framework utilizados:

Durante o desenvolvimento dessa aplicaçào foi utilizado alguns frameworks:

- Sequelize
- Winston
- Express
- Swagger

### Documentação da API

Foi feita a documentação da API utilizando Open API e Swagger, para acessar essa documentação basta rodar o código localmente e ir no seu navegador e buscar pela seguinte URL: http://localhost:8080/api-docs Fazendo isso você será direcionado para a pagina do Swagger contendo as documentações das rotas.

### Rodar localmente

Segue um passo a passo de como executar o código localmente:

1. Faça um clone do repositório para a sua maquina local

2. Certifique-se que tem o mysql instalado

3. Com  o repositório já na sua maquina navegue ate a pasta onde ele se encontra e crie um arquivo .env na raiz do projeto, seguindo o seguinte modelo:

   ```
   MYSQL_HOST=localhost
   DB_USER=
   DB_PASSWORD=
   DB_DATA_BASE=
   MYSQL_PORT=
   JWT_SECRET=secret
   ```

4. Dica para preencher esses valores:

   1. MYSQL_HOST pode deixar como localhost
   2. DB_USER é o nome do seu usuário no mysql
   3. DB_PASSWORD é a senha do usuário informado na variável de cima
   4. DB_DATA_BASE é o nome do banco de dados, pode informar o banco que desejar, visto que o código irá criar-lo caso haja a necessidade.
   5. MYSQL_PORT é a porta em que o sql está executando, geralmente essa porta é a 3306, mas ai depende de máquina para máquina
   6. JWT_TOKEN é o valor que será usado para gerar os tokens JWT para a autenticação, então pode ser qualquer valor

5. Abra o terminal na pasta raiz do projeto e instale as dependências necessárias utilizando um dos seguintes comandos:

   ```
   yarn
   ou
   npm i
   ```

6. Por fim basta iniciar o projeto utilizando um dos seguintes comandos:

   ```
   yarn start 
   ou 
   npm start
   ```

### Pontos de melhoria - Escalabilidade Horizontal

Um ponto que pode ser melhorado para esse projeto é a capacidade de se escalar horizontalmente, ou seja,   adicionar instâncias de execução do código, fazendo com que não só uma máquina rode, isso faz com que não haja sobrecarga do sistema.

Para a implantação de uma escalabilidade horizontal gera uma lista de desafios entre eles: 

- Consistência de dados
- Comunicação
- Balanceamento de carga.
- Banco de dados escalável 

Esses são alguns dos pontos que devemos ter atenção ao fazer um sistema escalável horizontal

### Ponto de melhoria - Geral

Podemos ainda melhorar algumas coisa nesse projeto, segue uma lista delas:

- Montar um frontend para a aplicação
- Nova tabela para manter os logs
- Fazer o deploy
