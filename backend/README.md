# Backend - ABJ Administração Bom Jesus

API REST desenvolvida em Node.js para o sistema de gestão da Associação Bom Jesus.

## Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **Sequelize** - ORM para manipulação do banco de dados
- **MySQL** - Sistema de gerenciamento de banco de dados
- **JWT** - Autenticação e autorização
- **bcryptjs** - Criptografia de senhas
- **Babel** - Transpilador JavaScript (ES6+)
- **Nodemon** - Hot reload em desenvolvimento
- **ESLint + Prettier** - Formatação e qualidade de código

---

## Estrutura do Projeto

```
backend/
│
├── src/
│   ├── controllers/          # Lógica de negócio das rotas
│   │   ├── users.js          # Gerenciamento de usuários
│   │   ├── guests.js         # Gerenciamento de hóspedes
│   │   ├── entradas.js       # Registro de entrada de hóspedes
│   │   ├── quartos.js        # Gerenciamento de quartos
│   │   ├── produtos.js       # Gerenciamento de produtos
│   │   ├── consumos.js       # Registro de consumo
│   │   ├── occurrences.js    # Registro de ocorrências
│   │   ├── tipoOcorrencia.js # Tipos de ocorrência
│   │   └── bloqueios.js      # Gerenciamento de bloqueios
│   │
│   ├── models/               # Modelos do Sequelize (entidades do BD)
│   │   ├── index.js          # Configuração e associações
│   │   ├── users.js          # Modelo de Usuário
│   │   ├── guests.js         # Modelo de Hóspede
│   │   ├── entradas.js       # Modelo de Entrada
│   │   ├── quarto.js         # Modelo de Quarto
│   │   ├── produtos.js       # Modelo de Produto
│   │   ├── consumos.js       # Modelo de Consumo
│   │   ├── occurrence.js     # Modelo de Ocorrência
│   │   ├── tipoOcorrencia.js # Modelo de Tipo de Ocorrência
│   │   └── bloqueio.js       # Modelo de Bloqueio
│   │
│   ├── routes/               # Definição das rotas da API
│   │   ├── index.js          # Agregador de rotas
│   │   ├── users.js          # Rotas de usuários
│   │   ├── guests.js         # Rotas de hóspedes
│   │   ├── entradas.js       # Rotas de entradas
│   │   ├── quartos.js        # Rotas de quartos
│   │   ├── produtos.js       # Rotas de produtos
│   │   ├── consumos.js       # Rotas de consumos
│   │   ├── occurrences.js    # Rotas de ocorrências
│   │   ├── tipoOcorrencia.js # Rotas de tipos de ocorrência
│   │   └── bloqueios.js      # Rotas de bloqueios
│   │
│   ├── database/             # Configurações do banco de dados
│   │   ├── config.js         # Configuração Sequelize
│   │   ├── migrations/       # Migrations (versionamento do BD)
│   │   └── seeds/            # Seeds (dados iniciais)
│   │
│   ├── middlewares/          # Middlewares da aplicação
│   │   ├── index.js          # Exportação de middlewares
│   │   └── authUser.js       # Middleware de autenticação JWT
│   │
│   ├── helpers/              # Funções auxiliares
│   │
│   └── index.js              # Arquivo principal do servidor
│
├── dist/                     # Código transpilado (build)
├── .env                      # Variáveis de ambiente (não versionado)
├── .env.exemple              # Exemplo de variáveis de ambiente
├── .sequelizerc              # Configuração Sequelize CLI
├── docker-compose.yaml       # Configuração Docker (MySQL)
├── package.json              # Dependências e scripts
├── .babelrc                  # Configuração Babel
├── eslint.config.js          # Configuração ESLint
├── .prettierrc               # Configuração Prettier
└── README.md                 # Este arquivo
```

---

## Configuração do Ambiente

### Pré-requisitos

- Node.js v14 ou superior
- MySQL v5.7 ou superior
- npm ou yarn

### Instalação

1. **Clone o repositório e navegue até a pasta do backend**
   ```bash
   cd backend
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**

   Copie o arquivo `.env.exemple` para `.env`:
   ```bash
   cp .env.exemple .env
   ```

   Edite o arquivo `.env` com suas configurações:
   ```env
   NODE_ENV=development

   # Configurações do Banco de Dados
   DB_HOST=127.0.0.1
   DB_USER=root
   DB_PASSWORD=sua_senha
   DB_NAME=hospedaria
   DB_PORT=3306

   # Configurações da API
   API_PORT=3000

   # Configurações JWT
   JWT_SECRET=sua_chave_secreta_aqui
   ```

4. **Configure o banco de dados**

   **Opção 1: MySQL Local**
   - Crie o banco de dados manualmente:
     ```sql
     CREATE DATABASE hospedaria;
     ```

   **Opção 2: Docker (Recomendado)**
   - Inicie o container MySQL:
     ```bash
     docker-compose up -d
     ```

5. **Execute as migrations**
   ```bash
   npm run migrate
   ```

6. **Popule o banco com dados iniciais (opcional)**
   ```bash
   npm run seed
   ```

---

## Scripts Disponíveis

```bash
# Desenvolvimento (com hot reload)
npm run dev

# Build do projeto
npm run build

# Produção (após build)
npm start

# Migrations
npm run migrate

# Seeds (dados iniciais)
npm run seed

# Linting
npm run lint

# Corrigir problemas de lint automaticamente
npm run lint:fix

# Formatação de código
npm run format
```

---

## Rotas da API

### Base URL
```
http://localhost:3000/api
```

### Autenticação

A maioria das rotas requer autenticação via JWT. Após o login, inclua o token no header:

```
Authorization: Bearer {seu_token_jwt}
```

---

### 📋 Rotas Disponíveis

#### **Usuários** (`/api/users`)

| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|--------------|
| POST | `/register` | Registrar novo usuário | Não |
| POST | `/login` | Login de usuário | Não |
| GET | `/` | Listar todos os usuários | Sim |
| GET | `/:id` | Buscar usuário por ID | Sim |
| PUT | `/:id` | Atualizar usuário | Sim |
| DELETE | `/:id` | Deletar usuário | Sim |

#### **Hóspedes** (`/api/guests`)

| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|--------------|
| POST | `/` | Cadastrar novo hóspede | Sim |
| GET | `/` | Listar todos os hóspedes | Sim |
| GET | `/:id` | Buscar hóspede por ID | Sim |
| PUT | `/:id` | Atualizar hóspede | Sim |
| DELETE | `/:id` | Deletar hóspede | Sim |

#### **Entradas** (`/api/entradas`)

| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|--------------|
| POST | `/` | Registrar entrada de hóspede | Sim |
| GET | `/` | Listar todas as entradas | Sim |
| GET | `/:id` | Buscar entrada por ID | Sim |
| PUT | `/:id` | Atualizar entrada | Sim |
| DELETE | `/:id` | Deletar entrada | Sim |

#### **Quartos** (`/api/quartos`)

| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|--------------|
| POST | `/` | Cadastrar novo quarto | Sim |
| GET | `/` | Listar todos os quartos | Sim |
| GET | `/disponiveis` | Listar quartos disponíveis | Sim |
| GET | `/:id` | Buscar quarto por ID | Sim |
| PUT | `/:id` | Atualizar quarto | Sim |
| DELETE | `/:id` | Deletar quarto | Sim |

#### **Produtos** (`/api/produtos`)

| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|--------------|
| POST | `/` | Cadastrar novo produto | Sim |
| GET | `/` | Listar todos os produtos | Sim |
| GET | `/:id` | Buscar produto por ID | Sim |
| PUT | `/:id` | Atualizar produto | Sim |
| DELETE | `/:id` | Deletar produto | Sim |

#### **Consumos** (`/api/consumos`)

| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|--------------|
| POST | `/` | Registrar consumo | Sim |
| GET | `/` | Listar todos os consumos | Sim |
| GET | `/:id` | Buscar consumo por ID | Sim |
| DELETE | `/:id` | Deletar consumo | Sim |

#### **Ocorrências** (`/api/occurrences`)

| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|--------------|
| POST | `/` | Registrar ocorrência | Sim |
| GET | `/` | Listar todas as ocorrências | Sim |
| GET | `/:id` | Buscar ocorrência por ID | Sim |
| PUT | `/:id` | Atualizar ocorrência | Sim |
| DELETE | `/:id` | Deletar ocorrência | Sim |

#### **Tipos de Ocorrência** (`/api/tipoOcorrencia`)

| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|--------------|
| POST | `/` | Cadastrar tipo de ocorrência | Sim |
| GET | `/` | Listar todos os tipos | Sim |
| GET | `/:id` | Buscar tipo por ID | Sim |
| PUT | `/:id` | Atualizar tipo | Sim |
| DELETE | `/:id` | Deletar tipo | Sim |

#### **Bloqueios** (`/api/bloqueios`)

| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|--------------|
| POST | `/` | Registrar bloqueio de hóspede | Sim |
| GET | `/` | Listar todos os bloqueios | Sim |
| GET | `/:id` | Buscar bloqueio por ID | Sim |
| GET | `/hospede/:hospedeId` | Listar bloqueios de um hóspede | Sim |
| PUT | `/:id` | Atualizar bloqueio | Sim |
| DELETE | `/:id` | Remover bloqueio | Sim |

---

## Modelos de Dados

### Users (Usuários)
```javascript
{
  id: Integer (PK, Auto Increment),
  nomeUsuario: String (Unique),
  senha: String (Hash),
  email: String (Unique),
  cargo: String
}
```

### Guests (Hóspedes)
```javascript
{
  id: Integer (PK, Auto Increment),
  nome: String,
  cpf: String,
  rg: String,
  dataNascimento: Date,
  telefone: String,
  cidadeNatal: String,
  cidadeDestino: String,
  // ... outros campos socioeconômicos
}
```

### Entradas (Registros de Entrada)
```javascript
{
  id: Integer (PK, Auto Increment),
  hospedeId: Integer (FK -> Guests),
  quartoId: Integer (FK -> Quartos),
  dataEntrada: DateTime,
  dataSaida: DateTime,
  statusEntrada: String
}
```

### Quartos
```javascript
{
  id: Integer (PK, Auto Increment),
  numero: Integer (Unique),
  capacidade: Integer,
  tipoCama: String,
  status: String (disponível/ocupado)
}
```

### Produtos
```javascript
{
  id: Integer (PK, Auto Increment),
  nomeProduto: String,
  categoria: String,
  quantidade: Integer,
  descricaoProduto: Text
}
```

### Consumos
```javascript
{
  id: Integer (PK, Auto Increment),
  hospedeId: Integer (FK -> Guests),
  produtoId: Integer (FK -> Produtos),
  quantidade: Integer,
  dataConsumo: DateTime
}
```

### Occurrences (Ocorrências)
```javascript
{
  id: Integer (PK, Auto Increment),
  hospedeId: Integer (FK -> Guests),
  tipoOcorrenciaId: Integer (FK -> TipoOcorrencia),
  dataOcorrencia: DateTime,
  descricao: Text,
  gravidade: String
}
```

### TipoOcorrencia (Tipos de Ocorrência)
```javascript
{
  id: Integer (PK, Auto Increment),
  nome: String,
  descricao: Text,
  nivel: String
}
```

### Bloqueios
```javascript
{
  id: Integer (PK, Auto Increment),
  hospedeId: Integer (FK -> Guests),
  motivoBloqueio: String,
  dataBloqueio: Date,
  dataTermino: Date,
  tipoBloqueio: String (manual/automático)
}
```

---

## Segurança

### Autenticação JWT

O sistema utiliza JSON Web Tokens (JWT) para autenticação. Após o login bem-sucedido, o servidor retorna um token que deve ser incluído em todas as requisições protegidas.

**Exemplo de uso:**

1. **Login**
   ```bash
   POST /api/users/login
   Content-Type: application/json

   {
     "nomeUsuario": "admin",
     "senha": "sua_senha"
   }
   ```

   **Resposta:**
   ```json
   {
     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
     "user": {
       "id": 1,
       "nomeUsuario": "admin",
       "email": "admin@example.com"
     }
   }
   ```

2. **Requisição autenticada**
   ```bash
   GET /api/guests
   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

### Senhas

- Todas as senhas são criptografadas usando **bcryptjs** antes de serem armazenadas
- Nunca são retornadas em requisições GET
- Validação de força de senha (implementar conforme necessário)

### CORS

O CORS está configurado para permitir requisições do frontend. Ajuste as configurações em `src/index.js` conforme necessário.

---

## Migrations e Seeds

### Criar nova migration

```bash
npx sequelize-cli migration:generate --name nome-da-migration
```

### Executar migrations

```bash
npm run migrate
```

### Reverter última migration

```bash
npx sequelize-cli db:migrate:undo
```

### Executar seeds

```bash
npm run seed
```

### Criar nova seed

```bash
npx sequelize-cli seed:generate --name nome-da-seed
```

---

## Desenvolvimento

### Boas Práticas

- Utilize ESLint e Prettier para manter a qualidade do código
- Siga o padrão de nomenclatura dos arquivos existentes
- Documente funções complexas
- Mantenha controllers enxutos (lógica de negócio separada)
- Utilize async/await para operações assíncronas
- Trate erros adequadamente

### Estrutura de um Controller

```javascript
// Exemplo de estrutura de controller
export const listarTodos = async (req, res) => {
  try {
    const dados = await Model.findAll();
    return res.json(dados);
  } catch (error) {
    return res.status(500).json({
      error: 'Erro ao buscar dados',
      message: error.message
    });
  }
};
```

### Estrutura de uma Rota

```javascript
// Exemplo de estrutura de rota
import { Router } from 'express';
import * as controller from '../controllers/exemplo.js';
import { authUser } from '../middlewares/authUser.js';

const router = Router();

router.post('/', authUser, controller.criar);
router.get('/', authUser, controller.listarTodos);
router.get('/:id', authUser, controller.buscarPorId);
router.put('/:id', authUser, controller.atualizar);
router.delete('/:id', authUser, controller.deletar);

export default router;
```

---
