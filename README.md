# 🌟 ASDPEMAT - Associação dos Servidores da Defensoria Pública do Estado de Mato Grosso

Bem-vindo ao repositório do site da **ASDPEMAT**! 🚀
Este projeto foi desenvolvido utilizando **React** no frontend e **Node.js** com **PostgreSQL** no backend.

---

## 📂 Estrutura do Projeto

```
/C:/Users/Arthur/Documents/Programação/site associação/asdpemat/
├── src/
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── QuemSomos.tsx
│   │   ├── Servicos.tsx
│   │   ├── Presidencia.tsx
│   │   ├── Ferramentas.tsx
│   │   ├── FAQ.tsx
│   │   ├── Ajuda.tsx
│   │   ├── Membro.tsx
│   │   ├── Admin.tsx
│   │   ├── Login.tsx
│   ├── components/
│   │   ├── Layout.tsx
│   ├── App.tsx
│   ├── App.css
│   ├── index.tsx
├── server.cjs
├── package.json
├── vite.config.ts
```

---

## ⚙️ Configuração do Ambiente

### 📌 Pré-requisitos

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)

### 📥 Instalação

1️⃣ **Clone o repositório:**

```sh
```sh
<<<<<<< HEAD
git clone https://github.com/zeraiden56/asdpemat.git
=======
git clone https://github.com/zeraiden56/asdpemat.git
>>>>>>> 301d8adf7afcc73ee0206e9e23ea0b765e523b9a
cd asdpemat
```

```

```

2️⃣ **Instale as dependências:**

```sh
npm install
```

3️⃣ **Configure o banco de dados PostgreSQL:**

- Crie um banco de dados PostgreSQL.
- Atualize as credenciais de conexão no arquivo `server.cjs`.

4️⃣ **Inicialize o servidor:**

```sh
node server.cjs
```

5️⃣ **Inicialize o frontend:**

```sh
npm run dev
```

---

## 🚀 Uso

### 🔑 Login

- **Usuário padrão:** `admin`
- **Senha padrão:** `admin`

> ⚠️ **Atenção:** Recomenda-se alterar as credenciais padrão para garantir a segurança do sistema.

### 🔗 Rotas

| Rota              | Descrição                          |
| ----------------- | ------------------------------------ |
| `/api`          | Rota de login                        |
| `/api/news`     | Rotas para gerenciar notícias       |
| `/api/services` | Rotas para gerenciar serviços       |
| `/api/members`  | Rotas para gerenciar membros         |
| `/api/settings` | Rotas para gerenciar configurações |
| `/api/export`   | Rota para exportar o banco de dados  |

---

## 🤝 Contribuição

Quer contribuir com o projeto? Siga os passos abaixo:

1. Faça um **fork** do projeto.
2. Crie uma **branch** para sua feature:
   ```sh
   git checkout -b feature/nova-feature
   ```
3. Commit suas mudanças:
   ```sh
   git commit -m 'Adiciona nova feature'
   ```
4. Envie para o repositório remoto:
   ```sh
   git push origin feature/nova-feature
   ```
5. Abra um **Pull Request** e aguarde a revisão. 🚀

---

## 📜 Licença

Este projeto está licenciado sob a licença **MIT**. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

---

💡 *Mantenha-se atualizado e contribua com melhorias!* 😃
