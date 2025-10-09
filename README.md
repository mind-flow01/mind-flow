Projeto Backend - [Nome do seu Projeto]
Uma breve descrição sobre o que este projeto faz, seus principais objetivos e a tecnologia utilizada.

📜 Sumário
Pré-requisitos

Como Começar

Configuração do Banco de Dados com Prisma

Rodando a Aplicação

Scripts Disponíveis

Estrutura do Projeto

🔧 Pré-requisitos
Antes de começar, você vai precisar ter as seguintes ferramentas instaladas em sua máquina:

Node.js (versão 18.x ou superior)

NPM ou Yarn

Git

Um banco de dados compatível com o Prisma (ex: PostgreSQL, MySQL, etc.) rodando em sua máquina ou em um container Docker.

🚀 Como Começar
Siga os passos abaixo para configurar e rodar o ambiente de desenvolvimento.

1. Clone o repositório:

Bash

git clone https://seu-repositorio-git.com/seu-projeto.git
cd seu-projeto
2. Instale as dependências:
Usando NPM:

Bash

npm install
Ou usando Yarn:

Bash

yarn install
3. Configure as variáveis de ambiente:
O projeto utiliza um arquivo .env para gerenciar as variáveis de ambiente. Você pode criar o seu a partir do arquivo de exemplo:

Bash

# Na raiz do projeto
cp .env.example .env
Agora, abra o arquivo .env e adicione as credenciais do seu banco de dados e outras informações sensíveis. Principalmente, configure a DATABASE_URL.

Exemplo para PostgreSQL:

Fragmento do código

# .env
DATABASE_URL="postgresql://USUARIO:SENHA@HOST:PORTA/NOME_DO_BANCO?schema=public"

# Exemplo:
# DATABASE_URL="postgresql://docker:docker@localhost:5432/meu_banco?schema=public"

# Outras variáveis, como JWT_SECRET, etc.
JWT_SECRET=SEU_SEGREDO_SUPER_SECRETO
🗃️ Configuração do Banco de Dados com Prisma
O Prisma é utilizado como nosso ORM para interagir com o banco de dados. Os comandos a seguir são essenciais para manter o schema do banco de dados sincronizado com o seu código.

1. Gerar o Prisma Client:
Este comando lê o seu schema.prisma e gera o cliente TypeScript tipado para que você possa fazer queries ao banco de dados. Execute-o sempre que houver uma alteração no schema.

Bash

npx prisma generate
2. Executar as Migrations:
Este comando irá comparar o seu schema.prisma com o estado atual do banco de dados e criar (se for a primeira vez) ou aplicar os arquivos de migração SQL necessários para sincronizar tudo.

Atenção: Este comando também aplica as migrations pendentes e cria o banco de dados se ele não existir.

Bash

npx prisma migrate dev
Ao executar, o Prisma pedirá um nome para a nova migração (ex: init ou add-user-table).

▶️ Rodando a Aplicação
Para iniciar o servidor de desenvolvimento, siga os passos:

1. Navegue até a pasta da API:

Bash

cd apps/api
2. Inicie o servidor:
O servidor irá iniciar em modo de desenvolvimento com hot-reload.

Bash

npm run dev
Ou, se preferir usar o comando do NestJS CLI:

Bash

nest start --watch
A API estará disponível em http://localhost:3000 (ou a porta que você configurou).

📜 Scripts Disponíveis
Dentro do diretório apps/api, você pode executar vários scripts:

Comando	Descrição
npm run dev	Inicia o servidor de desenvolvimento com hot-reload.
npm run build	Compila a aplicação para produção.
npm run start	Inicia a aplicação em modo de produção (após o build).
npm run lint	Executa o linter para análise de código estático.
npm run test	Roda os testes unitários.
npm run test:e2e	Roda os testes end-to-end.

Exportar para Sheets
