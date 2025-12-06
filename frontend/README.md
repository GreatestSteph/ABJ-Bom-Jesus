# Frontend - ABJ Administração Bom Jesus

Interface web desenvolvida em React para o sistema de gestão da Associação Bom Jesus.

## Tecnologias Utilizadas

- **React 19** - Biblioteca JavaScript para construção de interfaces
- **React Router DOM** - Roteamento e navegação
- **Axios** - Cliente HTTP para requisições à API
- **jsPDF** - Geração de documentos PDF
- **jsPDF-AutoTable** - Tabelas automáticas em PDF
- **React Icons** - Biblioteca de ícones
- **React Scripts** - Configuração e scripts do Create React App
---

## Estrutura do Projeto

```
frontend/
│
├── public/                   # Arquivos públicos estáticos
│   └── index.html           # HTML base da aplicação
│
├── src/
│   ├── componentes/         # Componentes React organizados por funcionalidade
│   │   │
│   │   ├── GerenciarUsuarios/
│   │   │   ├── LoginSection/        # Login e autenticação
│   │   │   │   ├── loginsection.jsx
│   │   │   │   ├── loginsection2.jsx
│   │   │   │   └── ProtectedRoute.jsx
│   │   │   ├── ListUsers/           # Listagem de usuários
│   │   │   │   └── listarusuarios.jsx
│   │   │   └── EditProfile/         # Edição de perfil
│   │   │       └── editarperfis.jsx
│   │   │
│   │   ├── GerenciarHospedes/
│   │   │   ├── ListHospedes/        # Listagem de hóspedes
│   │   │   │   └── ListarHospedes.jsx
│   │   │   ├── EditarHospede/       # Cadastro/Edição de hóspedes
│   │   │   │   └── EditarHospede.jsx
│   │   │   ├── DetalhesHospede/     # Detalhes do hóspede
│   │   │   │   └── DetalhesHospede.jsx
│   │   │   ├── HospedarHospede/     # Registro de entrada
│   │   │   │   └── listadeentradas.jsx
│   │   │   └── DetalhesHospedagem/  # Detalhes da hospedagem
│   │   │       └── DetalhesHospedagem.jsx
│   │   │
│   │   ├── GerenciarProdutos/
│   │   │   ├── ListProducts/        # Listagem de produtos
│   │   │   │   └── listarprodutos.jsx
│   │   │   └── EditProducts/        # Cadastro/Edição de produtos
│   │   │       └── editarprodutos.jsx
│   │   │
│   │   ├── GerenciarQuartos/
│   │   │   ├── ListQuartos/         # Listagem de quartos
│   │   │   │   └── ListQuartos.jsx
│   │   │   └── EditarQuarto/        # Cadastro/Edição de quartos
│   │   │       └── EditarQuarto.jsx
│   │   │
│   │   ├── GerenciarOcorrencias/
│   │   │   ├── ListOcorrencias/     # Listagem de ocorrências
│   │   │   │   └── ListarOcorrencias.jsx
│   │   │   └── EditarOcorrencia/    # Registro de ocorrências
│   │   │       └── EditarOcorrencia.jsx
│   │   │
│   │   ├── GerenciarTiposOcorrencias/
│   │   │   └── ...                  # Gerenciamento de tipos
│   │   │
│   │   ├── GerenciarBloqueios/
│   │   │   └── ...                  # Gerenciamento de bloqueios
│   │   │
│   │   ├── RegistrarConsumo/
│   │   │   └── ...                  # Registro de consumo
│   │   │
│   │   ├── Relatorios/
│   │   │   └── ...                  # Geração de relatórios PDF
│   │   │
│   │   └── WebsiteDesign/
│   │       ├── Header/              # Cabeçalhos da aplicação
│   │       │   ├── HeaderConnected/
│   │       │   └── HeaderDisconnected/
│   │       └── Footer/              # Rodapés da aplicação
│   │
│   ├── services/                # Serviços e integrações
│   │   ├── api.js              # Configuração do Axios
│   │   └── context.js          # Context API do React
│   │
│   ├── config/                 # Arquivos de configuração
│   │
│   ├── App.js                  # Componente principal com rotas
│   ├── App.test.js             # Testes do App
│   ├── index.js                # Ponto de entrada da aplicação
│   └── reportWebVitals.js      # Métricas de performance
│
├── .env.local                  # Variáveis de ambiente (não versionado)
├── .env.example                # Exemplo de variáveis de ambiente
├── .gitignore                  # Arquivos ignorados pelo Git
├── package.json                # Dependências e scripts
└── README.md                   # Este arquivo
```

---

## Configuração do Ambiente

### Pré-requisitos

- Node.js v14 ou superior
- npm ou yarn
- Backend da aplicação rodando

### Instalação

1. **Clone o repositório e navegue até a pasta do frontend**
   ```bash
   cd frontend
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**

   Copie o arquivo `.env.example` para `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

   Edite o arquivo `.env.local` com a URL da API:
   ```env
   REACT_APP_API_URL=http://localhost:3000
   ```

   > ⚠️ **Importante**: Certifique-se de que a porta corresponde à porta configurada no backend.

4. **Inicie o servidor de desenvolvimento**
   ```bash
   npm start
   ```

   A aplicação será aberta automaticamente em `http://localhost:3000`

---

## Scripts Disponíveis

```bash
# Desenvolvimento (inicia servidor local)
npm start

# Build para produção
npm build

# Executar testes
npm test

# Ejetar configuração (irreversível)
npm run eject
```

### Detalhes dos Scripts

- **`npm start`**: Inicia o servidor de desenvolvimento com hot reload
- **`npm run build`**: Cria build otimizado para produção na pasta `build/`
- **`npm test`**: Executa os testes em modo watch
- **`npm run eject`**: Remove a abstração do Create React App (use com cautela)

---

## Arquitetura e Estrutura

### Padrão de Organização

O frontend segue uma organização modular baseada em funcionalidades:

```
componentes/
└── [Funcionalidade]/
    ├── [Ação]/
    │   └── componente.jsx
    └── ...
```

**Exemplo:**
- `GerenciarHospedes/ListHospedes/` - Listagem de hóspedes
- `GerenciarHospedes/EditarHospede/` - Cadastro/Edição de hóspedes
- `GerenciarHospedes/DetalhesHospede/` - Detalhes do hóspede

### Roteamento

As rotas são configuradas no arquivo `App.js` usando React Router:

```javascript
<Routes>
  <Route path="/login" element={<LoginSection />} />
  <Route path="/hospedes" element={
    <ProtectedRoute>
      <ListarHospedes />
    </ProtectedRoute>
  } />
  // ... outras rotas
</Routes>
```

### Rotas Protegidas

Rotas que exigem autenticação são protegidas pelo componente `ProtectedRoute`:

```javascript
<ProtectedRoute>
  <ComponenteProtegido />
</ProtectedRoute>
```

---

## Principais Funcionalidades

### 1. **Autenticação**
- **Login**: Autenticação via JWT
- **Logout**: Encerramento de sessão
- **Rotas Protegidas**: Controle de acesso por autenticação

### 2. **Gestão de Hóspedes**
- Cadastro completo de hóspedes
- Listagem com busca e filtros
- Edição de informações
- Visualização de detalhes
- Histórico de hospedagens
- Registro de entrada e saída

### 3. **Gestão de Quartos**
- Cadastro de quartos
- Visualização de disponibilidade
- Controle de ocupação
- Edição de informações

### 4. **Gestão de Produtos e Consumo**
- Cadastro de produtos
- Registro de consumo por hóspede
- Controle de estoque
- Histórico de consumo

### 5. **Ocorrências e Bloqueios**
- Registro de ocorrências comportamentais
- Classificação por gravidade
- Bloqueio automático/manual de hóspedes
- Gerenciamento de tipos de ocorrência

### 6. **Relatórios**
- Geração de PDFs com jsPDF
- Relatório de Hospedagens
- Relatório de Consumos
- Relatório de Hóspedes Bloqueados
- Relatório Socioeconômico
- Relatório de Ocorrências

### 7. **Gestão de Usuários**
- Cadastro de usuários do sistema
- Edição de perfil
- Controle de permissões

---

## Integração com a API

### Configuração do Axios

O arquivo `services/api.js` configura a instância do Axios:

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para adicionar token JWT
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

### Exemplo de Requisição

```javascript
import api from '../../services/api';

// GET - Listar hóspedes
const listarHospedes = async () => {
  try {
    const response = await api.get('/api/guests');
    console.log(response.data);
  } catch (error) {
    console.error('Erro ao buscar hóspedes:', error);
  }
};

// POST - Criar hóspede
const criarHospede = async (dados) => {
  try {
    const response = await api.post('/api/guests', dados);
    console.log('Hóspede criado:', response.data);
  } catch (error) {
    console.error('Erro ao criar hóspede:', error);
  }
};
```

---

## Autenticação e Armazenamento

### Token JWT

Após o login bem-sucedido, o token JWT é armazenado no `localStorage`:

```javascript
// Salvar token após login
localStorage.setItem('token', token);

// Recuperar token
const token = localStorage.getItem('token');

// Remover token (logout)
localStorage.removeItem('token');
```

### Verificação de Autenticação

O componente `ProtectedRoute` verifica se o usuário está autenticado:

```javascript
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
```

---

## Geração de Relatórios

### Usando jsPDF e jsPDF-AutoTable

Exemplo de geração de relatório em PDF:

```javascript
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const gerarRelatorioPDF = (dados) => {
  const doc = new jsPDF();

  // Título
  doc.text('Relatório de Hóspedes', 14, 15);

  // Tabela
  doc.autoTable({
    head: [['ID', 'Nome', 'CPF', 'Data Entrada']],
    body: dados.map(item => [
      item.id,
      item.nome,
      item.cpf,
      new Date(item.dataEntrada).toLocaleDateString()
    ]),
    startY: 25
  });

  // Salvar PDF
  doc.save('relatorio-hospedes.pdf');
};
```
