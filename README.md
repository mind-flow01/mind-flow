Projeto Backend - [Nome do seu Projeto]
Uma breve descrição sobre o que este projeto faz, seus principais objetivos e a tecnologia utilizada.

**📜 Sumário**
Pré-requisitos

Como Começar

Configuração do Banco de Dados com Prisma

Rodando a Aplicação

Scripts Disponíveis

Estrutura do Projeto

**🔧 Pré-requisitos**
Antes de começar, você vai precisar ter as seguintes ferramentas instaladas em sua máquina:

**Node.js (versão 18.x ou superior)

NPM ou Yarn
nest
Git**

**SGDB para criar um banco postgre**

**🚀 Como Começar**
Siga os passos abaixo para configurar e rodar o ambiente de desenvolvimento.
no root:

npm install

/apps/api
npx prisma generate
prisma migrate
npx prisma migrate dev

ou execute os debuggers generate e migrate criados

**Na raiz do projeto**
crie um .env e um .env.local


**.env**
- DATABASE_URL="postgresql://docker:docker@localhost:5432/meu_banco?schema=public"
- JWT_SECRET=SEU_SECRET
- NEXT_PUBLIC_DB_HOST="https://localhost:3001/"
**.env.local**
- NEXTAUTH_SECRET=SEU_SECRET
