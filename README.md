# 📖 Página Virada — Backend

REST API da Livraria Independente "Página Virada", desenvolvida com Node.js, Express, Sequelize e PostgreSQL (Supabase).

## 🚀 Tecnologias

- Node.js
- Express
- Sequelize (ORM)
- PostgreSQL (Supabase)
- JWT (autenticação)
- Bcryptjs (criptografia de senha)

## 📁 Estrutura do Projeto

```
src/
├── config/
│   └── database.js          # Conexão com o banco via Sequelize
├── controllers/
│   ├── authController.js    # Login e cadastro
│   ├── livroController.js   # CRUD de livros
│   └── reservaController.js # Criação e cancelamento de reservas
├── middlewares/
│   └── authMiddleware.js    # Verificação de token e permissão admin
├── models/
│   ├── Usuario.js
│   ├── Livro.js
│   └── Reserva.js
├── routes/
│   ├── authRoutes.js
│   ├── livroRoutes.js
│   └── reservaRoutes.js
└── app.js
server.js
```

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
DATABASE_URL=sua_string_de_conexao_do_supabase
JWT_SECRET=sua_chave_secreta
PORT=3000
```

## ▶️ Como rodar localmente

```bash
# Instalar dependências
npm install

# Rodar o servidor
npm start
```

A API estará disponível em `http://localhost:3000`

## 📌 Endpoints

### Auth
| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| POST | /auth/cadastrar | Cadastrar novo usuário | ❌ |
| POST | /auth/login | Login e geração de token JWT | ❌ |

### Livros
| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| GET | /livro | Listar todos os livros | ❌ |
| GET | /livro/:id | Buscar livro por ID | ❌ |
| POST | /livro | Criar novo livro | ✅ Admin |
| PUT | /livro/:id | Atualizar livro | ✅ Admin |
| DELETE | /livro/:id | Deletar livro | ✅ Admin |

### Reservas
| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| POST | /reserva | Criar reserva | ✅ Cliente |
| GET | /reserva/minhas | Listar reservas do usuário logado | ✅ Cliente |
| GET | /reserva | Listar todas as reservas | ✅ Admin |
| DELETE | /reserva/:id/cancelar | Cancelar reserva | ✅ Cliente/Admin |

## 🔐 Autenticação

A API utiliza JWT. Após o login, inclua o token no header das requisições protegidas:

```
Authorization: Bearer seu_token_aqui
```

## 🌐 Deploy

Backend hospedado no [Render](https://render.com).