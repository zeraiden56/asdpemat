# ASDPemat

Este é o repositório do site da Associação ASDPemat. O projeto é desenvolvido utilizando React no frontend e Node.js com PostgreSQL no backend.

## Estrutura do Projeto
/C:/Users/Arthur/Documents/Programação/site associação/asdpemat/ ├── src/ │ ├── pages/ │ │ ├── Home.tsx │ │ ├── QuemSomos.tsx │ │ ├── Servicos.tsx │ │ ├── Presidencia.tsx │ │ ├── Ferramentas.tsx │ │ ├── FAQ.tsx │ │ ├── Ajuda.tsx │ │ ├── Membro.tsx │ │ ├── Admin.tsx │ │ ├── Login.tsx │ ├── components/ │ │ ├── Layout.tsx │ ├── App.tsx │ ├── App.css │ ├── index.tsx ├── server.cjs ├── package.json ├── vite.config.ts

## Configuração do Ambiente

### Pré-requisitos

- Node.js
- PostgreSQL

### Instalação

1. Clone o repositório:
   ```sh
   git clone https://github.com/seu-usuario/asdpemat.git
   cd asdpemat

2. Instale as dependências:

npm install

3. Configure o banco de dados PostgreSQL:

Crie um banco de dados PostgreSQL.
Atualize as credenciais de conexão no arquivo server.cjs.

4. Inicialize o servidor:
node server.cjs

5. Inicialize o frontend:

npm run dev

Uso

Login

Usuário padrão: admin
Senha padrão: admin

Rotas
<vscode_annotation details='%5B%7B%22title%22%3A%22hardcoded-credentials%22%2C%22description%22%3A%22Embedding%20credentials%20in%20source%20code%20risks%20unauthorized%20access%22%7D%5D'>/login</vscode_annotation>/api: Rota de login
/api/news: Rotas para gerenciar notícias
/api/services: Rotas para gerenciar serviços
/api/members: Rotas para gerenciar membros
/api/settings: Rotas para gerenciar configurações
/api/export: Rota para exportar o banco de dados

Contribuição
Faça um fork do projeto.
Crie uma branch para sua feature (git checkout -b feature/nova-feature).
Commit suas mudanças (git commit -m 'Adiciona nova feature').
Push para a branch (git push origin feature/nova-feature).
Abra um Pull Request.

Licença
Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para mais detalhes.


