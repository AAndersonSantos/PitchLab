# 🗨️ Projeto Chat em Tempo Real

<h3 align="center">📸Screenshot</h3>
<p>
<h1 align="center"><img src="./frontend/public/chat-img-2.png"></h1>
<h1 align="center"><img src="./frontend/public/chat-img-1.png"></h1>
<h1 align="center"><img src="./frontend/public/chat-img-4.png"></h1>
<h1 align="center"><img src="./frontend/public/chat-img-3.png"></h1>



Este projeto consiste em uma aplicação de chat em tempo real com sistema de autenticação, criação de salas e troca de mensagens utilizando **Node.js**, **TypeScript**, **Prisma ORM**, **NextJs**, **Socket.io** e **PostgreSQL**.

Foi possível implementar as funcionalidades principais que tornam o projeto funcional e demonstram bem a arquitetura e o domínio das tecnologias.

---

## 🚀 Tecnologias Utilizadas

### **Backend (NestJS)**

* Node.js
* TypeScript
* JWT (JSON Web Token)
* Bcrypt
* PostgreSQL
* Prisma ORM
* Socket.io (Gateway WebSocket)

### **Frontend (NextJs)**

* NextJs + Vite
* TypeScript
* Socket.io-client

---

## ✅ Funcionalidades Implementadas

### 🔐 **Autenticação**

* Registro de usuários
* Login
* Geração e validação de JWT
* Guard de autenticação

### 🏠 **Salas de Chat**

* Criar salas
* Listar salas
* Entrar em salas

### 💬 **Chat em Tempo Real**

* Enviar mensagens via WebSocket
* Receber mensagens em tempo real
* Histórico inicial de mensagens

---

## ⚠️ Limitações / Bugs Pendentes

* Duplicação de mensagens ao enviar
* UI básica, faltando loading/feedback visual

---

## 🔧 Como Rodar o Projeto

## **Backend**
```bash
cd backend
npm install
```
## Varieveis de ambiente .env.example

Crie um arquivo .env na raiz do projeto backend
```
PORT=
APP_ORIGIN=
DATABASE_URL=""
JWT_SECRET=

# postgresql://USUÁRIO:SENHA@HOST:PORTA/NOME_DO_BANCO?schema=public
#        ↑          ↑         ↑           ↑         ↑
#     usuário     senha      host       porta   nome do banco
```

### Subir o banco de dados (PostgreSQL)
```
docker-compose up -d
```
### Gerar e rodar as migrations do Prisma
```
npx prisma migrate dev --name init
```
### Gerar e rodar as migrations do Prisma
```
npx prisma generate
```

### **Iniciar o projeto**
```bash
npm run dev
```

## **Frontend**
```bash
cd frontend
npm install
```
### **Iniciar o projeto**
```bash
npm run dev
```

---

## 📌 Rotas da API

### **Auth**

* `POST /auth/register` – Registrar usuário
* `POST /auth/login` – Login

### **Rooms**

* `GET /rooms` – Listar salas
* `POST /rooms` – Criar sala
* `GET /:id` – Sala por id

### **Chat**

* `GET /messages/:roomId` – Histórico de mensagens

---

## 📌 Eventos WebSocket

### **Cliente → Servidor**

* `join_room` – Entra em uma sala
* `send_message` – Envia mensagem

### **Servidor → Cliente**

* `receive_message` – Recebe mensagem

---

## 📝 Melhorias Futuras

* Resolver duplicação de mensagens
* Melhorar o código no frontend
* Adicionar sistema de usuários online
* Exibir lista de membros da sala
* Melhorar UI/UX
* integração com IA (Groq)
* Adicionar modulo Ideias e votos

---

## 👨‍💻 Autor

**Anderson Santos**
