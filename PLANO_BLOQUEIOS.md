# Plano de Implementação - Sistema de Bloqueio de Hóspedes

## Visão Geral
Implementar funcionalidade completa de bloqueio de hóspedes, incluindo criação automática quando ocorrências graves são registradas.

---

## 1. Banco de Dados

### 1.1 Criar Migration para Tabela `bloqueios`
**Arquivo**: `backend/src/database/migrations/YYYYMMDDHHMMSS-create-bloqueios.js`

**Campos**:
- `id` - INTEGER, PRIMARY KEY, AUTO_INCREMENT
- `hospede_id` - INTEGER, NOT NULL, FOREIGN KEY → `guests.id`
- `motivo` - TEXT, NOT NULL
- `data_inicio` - DATE, NOT NULL
- `data_termino` - DATE, NOT NULL
- `ocorrencia_id` - INTEGER, NULL, FOREIGN KEY → `occurrences.id`
- `created_at` - TIMESTAMP
- `updated_at` - TIMESTAMP

**Validações**:
- `data_termino` deve ser >= `data_inicio`
- Foreign keys com `ON DELETE CASCADE`

---

## 2. Model

### 2.1 Criar Model `Bloqueio`
**Arquivo**: `backend/src/models/bloqueio.js`

**Associações**:
- `belongsTo` Guest (hospede_id)
- `belongsTo` Occurrence (ocorrencia_id) - opcional

**Attributes**:
- Mapear snake_case para camelCase
- Timestamps automáticos

---

## 3. Controller

### 3.1 Criar Controller de Bloqueios
**Arquivo**: `backend/src/controllers/bloqueios.js`

**Métodos CRUD**:

#### `create(req, res)`
- Validar campos obrigatórios: hospede_id, motivo, data_inicio, data_termino
- Validar que data_termino >= data_inicio
- Validar que hospede existe
- Se ocorrencia_id fornecido, validar que ocorrência existe
- Criar bloqueio
- Retornar 201 com bloqueio criado

#### `list(req, res)`
- Listar todos os bloqueios
- Incluir dados do hóspede e ocorrência (se houver)
- Suportar filtros via query params:
  - `hospede_id` - filtrar por hóspede específico
  - `ativo` - filtrar bloqueios ativos (data_termino >= hoje)
- Ordenar por data_inicio DESC

#### `get(req, res)`
- Buscar bloqueio por ID
- Incluir dados do hóspede e ocorrência
- Retornar 404 se não encontrado

#### `update(req, res)`
- Validar que bloqueio existe
- Permitir atualizar: motivo, data_inicio, data_termino
- Validar data_termino >= data_inicio se ambas forem fornecidas
- Retornar bloqueio atualizado

#### `delete(req, res)`
- Validar que bloqueio existe
- Deletar bloqueio
- Retornar 200 com mensagem de sucesso

#### `getByGuest(req, res)`
- Buscar todos os bloqueios de um hóspede específico
- Validar que hóspede existe
- Incluir dados da ocorrência relacionada
- Ordenar por data_inicio DESC

---

## 4. Rotas

### 4.1 Criar Rotas de Bloqueios
**Arquivo**: `backend/src/routes/bloqueios.js`

**Endpoints**:
```
GET    /bloqueios              → BloqueiosController.list
GET    /bloqueios/:id          → BloqueiosController.get
GET    /bloqueios/guest/:guest_id → BloqueiosController.getByGuest
POST   /bloqueios              → BloqueiosController.create
PUT    /bloqueios/:id          → BloqueiosController.update
DELETE /bloqueios/:id          → BloqueiosController.delete
```

### 4.2 Registrar Rotas no App
**Arquivo**: `backend/src/app.js` (ou arquivo principal de rotas)

Adicionar:
```javascript
import bloqueiosRoutes from './routes/bloqueios.js';
app.use('/bloqueios', bloqueiosRoutes);
```

---

## 5. Lógica Automática de Bloqueio

### 5.1 Modificar Controller de Ocorrências
**Arquivo**: `backend/src/controllers/occurrences.js`

#### No método `create()`:
Após criar a ocorrência, verificar se o tipo é "Grave":

1. Buscar o tipo de ocorrência criado
2. Se `occurrenceType.nivel === 'Grave'`:
   - Criar bloqueio automático:
     - `hospede_id`: do occurrence criado
     - `motivo`: "Bloqueio automático por ocorrência grave: [nome do tipo]"
     - `data_inicio`: data atual
     - `data_termino`: data atual + 30 dias (ou período configurável)
     - `ocorrencia_id`: ID da ocorrência criada

**Código sugerido**:
```javascript
// Após criar occurrence
const occurrence = await Occurrence.create({...});

// Buscar tipo de ocorrência para verificar nível
const occurrenceType = await TipoOcorrencia.findByPk(occurrence.occurrence_type_id);

if (occurrenceType && occurrenceType.nivel === 'Grave') {
  // Criar bloqueio automático
  const dataInicio = new Date();
  const dataTermino = new Date();
  dataTermino.setDate(dataTermino.getDate() + 30); // 30 dias de bloqueio

  await Bloqueio.create({
    hospede_id: occurrence.guest_id,
    motivo: `Bloqueio automático por ocorrência grave: ${occurrenceType.nome}`,
    data_inicio: dataInicio,
    data_termino: dataTermino,
    ocorrencia_id: occurrence.id
  });
}

return res.status(201).json(occurrence);
```

---

## 6. Checklist de Implementação

### Backend
- [ ] Criar migration para tabela `bloqueios`
- [ ] Executar migration: `npm run migrate` (ou comando equivalente)
- [ ] Criar model `Bloqueio` com associações
- [ ] Criar controller `BloqueiosController` com todos os métodos CRUD
- [ ] Criar arquivo de rotas `bloqueios.js`
- [ ] Registrar rotas no app principal
- [ ] Importar model `Bloqueio` no controller de ocorrências
- [ ] Adicionar lógica de criação automática no `OccurrencesController.create()`
- [ ] Testar endpoints via Postman/Insomnia:
  - [ ] POST /bloqueios (criação manual)
  - [ ] GET /bloqueios (listagem)
  - [ ] GET /bloqueios/:id (detalhes)
  - [ ] GET /bloqueios/guest/:guest_id (por hóspede)
  - [ ] PUT /bloqueios/:id (atualização)
  - [ ] DELETE /bloqueios/:id (exclusão)
  - [ ] POST /occurrences (verificar criação automática de bloqueio para ocorrências graves)

### Build
- [ ] Compilar backend: `npm run build` (se necessário)
- [ ] Verificar que não há erros de lint: `npm run lint`

---

## 7. Regras de Remoção/Cancelamento de Bloqueios

### 7.1 Opções de Estratégias

#### **Opção 1: Soft Delete com Status**
Adicionar campos à tabela:
- `status` - ENUM('ativo', 'cancelado', 'concluido')
- `cancelado_em` - TIMESTAMP (NULL)
- `cancelado_por_usuario_id` - INTEGER (NULL, FK para users)
- `motivo_cancelamento` - TEXT (NULL)

**Vantagens**:
- Mantém histórico completo
- Rastreabilidade de quem cancelou e quando
- Possibilidade de reverter cancelamento
- Relatórios e auditoria mais completos

**Desvantagens**:
- Mais complexo
- Mais campos no banco

**Regras de Negócio**:
- Apenas usuários autorizados podem cancelar
- Bloqueios automáticos (com ocorrencia_id) requerem justificativa
- Cancelamento deve registrar usuário e data
- Status "concluido" para bloqueios que chegaram ao fim naturalmente

---

#### **Opção 2: Ajuste de Data de Término**
Permitir editar `data_termino` para data atual ou anterior.

**Vantagens**:
- Simples de implementar
- Usa estrutura existente
- Bloqueio "expira" naturalmente

**Desvantagens**:
- Perde informação original do prazo
- Sem rastreabilidade de quem/quando ajustou
- Dificulta auditoria

**Regras de Negócio**:
- Permitir editar data_termino para qualquer data >= data_inicio
- Para antecipar término, definir data_termino = hoje
- Validar permissões do usuário

---

#### **Opção 3: Hard Delete com Justificativa**
Deletar bloqueio do banco após registrar em tabela de log.

**Vantagens**:
- Limpa registros ativos
- Mantém histórico em tabela separada

**Desvantagens**:
- Mais complexo (tabela adicional)
- Perde referência direta na query

**Estrutura**:
Criar tabela `bloqueios_cancelados`:
- Todos os campos de `bloqueios`
- `cancelado_em`
- `cancelado_por_usuario_id`
- `motivo_cancelamento`

---

#### **Opção 4: Sistema de Aprovação (Workflow)**
Cancelamento requer aprovação de supervisor.

**Vantagens**:
- Controle rigoroso
- Evita cancelamentos indevidos
- Auditoria completa

**Desvantagens**:
- Muito complexo
- Requer sistema de permissões avançado
- Pode ser excessivo para o caso de uso

**Estrutura**:
Adicionar campos:
- `solicitacao_cancelamento_em` - TIMESTAMP
- `solicitado_por_usuario_id` - INTEGER
- `motivo_solicitacao` - TEXT
- `aprovado_por_usuario_id` - INTEGER
- `aprovado_em` - TIMESTAMP

---

### 7.2 Recomendação: Opção 1 + Opção 2 (Híbrida)

Combinar soft delete com ajuste de data para flexibilidade:

#### Estrutura de Banco Recomendada:
```javascript
// Adicionar à migration:
- status: ENUM('ativo', 'cancelado', 'concluido') DEFAULT 'ativo'
- data_termino_original: DATE (armazena prazo original)
- cancelado_em: TIMESTAMP (NULL)
- cancelado_por_usuario_id: INTEGER (NULL, FK)
- motivo_cancelamento: TEXT (NULL)
```

#### Regras de Negócio:

**Para Bloqueios Manuais** (sem ocorrencia_id):
- Qualquer usuário autorizado pode cancelar
- Cancelamento é imediato
- Motivo opcional

**Para Bloqueios Automáticos** (com ocorrencia_id):
- Apenas administradores podem cancelar
- Motivo obrigatório
- Registra usuário que cancelou

**Operações**:

1. **Cancelar Bloqueio** (método novo):
   ```javascript
   async cancel(req, res) {
     const { id } = req.params;
     const { motivo_cancelamento, usuario_id } = req.body;

     const bloqueio = await Bloqueio.findByPk(id);

     // Se tem ocorrência grave, requer motivo
     if (bloqueio.ocorrencia_id && !motivo_cancelamento) {
       return res.status(400).json({
         error: 'Motivo obrigatório para bloqueios automáticos'
       });
     }

     await bloqueio.update({
       status: 'cancelado',
       cancelado_em: new Date(),
       cancelado_por_usuario_id: usuario_id,
       motivo_cancelamento
     });

     return res.status(200).json(bloqueio);
   }
   ```

2. **Antecipar Término** (edição normal):
   - Permite editar data_termino
   - Mantém data_termino_original
   - Não altera status (expira naturalmente)

3. **Listar Bloqueios Ativos**:
   - Filtrar: `status = 'ativo' AND data_termino >= hoje`

---

### 7.3 Endpoints Adicionais

```
POST   /bloqueios/:id/cancelar     → BloqueiosController.cancel
GET    /bloqueios/ativos           → BloqueiosController.listActive
GET    /bloqueios/historico/:guest_id → BloqueiosController.getHistory
```

---

### 7.4 Validações de Cancelamento

- [ ] Verificar se bloqueio existe
- [ ] Verificar se bloqueio já está cancelado
- [ ] Verificar se usuário tem permissão
- [ ] Se bloqueio automático, exigir motivo
- [ ] Validar que usuario_id existe
- [ ] Registrar timestamp de cancelamento
- [ ] Manter data_termino original

---

### 7.5 Frontend - Tela de Cancelamento

**Modal de Cancelamento**:
- Campo de motivo (obrigatório para automáticos)
- Botão "Confirmar Cancelamento"
- Avisos:
  - "Este bloqueio foi criado automaticamente por ocorrência grave"
  - "Você precisa justificar o cancelamento"

**Permissões Visuais**:
- Botão "Cancelar Bloqueio" visível apenas para usuários autorizados
- Bloqueios cancelados mostram badge "CANCELADO"
- Mostrar quem cancelou e quando

---

### 7.6 Lógica de Expiração/Conclusão de Bloqueios

Existem **3 abordagens** para mudar status de `ativo` para `concluido`:

---

#### **Opção A: Verificação em Tempo de Query (Recomendada)**

Não armazena status "concluido" no banco. Calcula dinamicamente ao buscar.

**Implementação Backend**:

```javascript
// No controller, método list()
async list(req, res) {
  const bloqueios = await Bloqueio.findAll({
    include: [Guest, Occurrence],
    order: [['data_inicio', 'DESC']]
  });

  // Adiciona campo "status_calculado" baseado na data
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const bloqueiosComStatus = bloqueios.map(bloqueio => {
    let statusCalculado = bloqueio.status;

    // Se status é "ativo", verificar se expirou
    if (bloqueio.status === 'ativo') {
      const dataTermino = new Date(bloqueio.data_termino);
      dataTermino.setHours(0, 0, 0, 0);

      if (dataTermino < hoje) {
        statusCalculado = 'concluido';
      }
    }

    return {
      ...bloqueio.toJSON(),
      status_calculado: statusCalculado
    };
  });

  return res.status(200).json(bloqueiosComStatus);
}
```

**Vantagens**:
- Simples, sem jobs ou cron
- Sempre preciso em tempo real
- Não precisa atualizar banco periodicamente
- Status "concluido" é apenas visual/lógico

**Desvantagens**:
- Precisa calcular em toda query
- Não armazena histórico de quando expirou
- Queries complexas (filtrar por status) ficam mais complicadas

**Filtros**:
```javascript
// Para buscar apenas ativos:
WHERE status = 'ativo' AND data_termino >= CURDATE()

// Para buscar concluídos:
WHERE status = 'ativo' AND data_termino < CURDATE()
```

---

#### **Opção B: Cron Job / Scheduled Task**

Job automático roda diariamente e atualiza status no banco.

**Implementação**:

1. **Instalar node-cron**:
```bash
npm install node-cron
```

2. **Criar serviço de expiração**:

**Arquivo**: `backend/src/services/bloqueiosExpiration.js`
```javascript
import cron from 'node-cron';
import Bloqueio from '../models/bloqueio.js';
import { Op } from 'sequelize';

class BloqueiosExpirationService {
  start() {
    // Roda todo dia à meia-noite (00:00)
    cron.schedule('0 0 * * *', async () => {
      console.log('Executando job de expiração de bloqueios...');
      await this.expireBloqueios();
    });

    console.log('Serviço de expiração de bloqueios iniciado');
  }

  async expireBloqueios() {
    try {
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);

      // Atualizar bloqueios que expiraram
      const resultado = await Bloqueio.update(
        { status: 'concluido' },
        {
          where: {
            status: 'ativo',
            data_termino: {
              [Op.lt]: hoje
            }
          }
        }
      );

      console.log(`${resultado[0]} bloqueios expirados atualizados`);
      return resultado[0];
    } catch (error) {
      console.error('Erro ao expirar bloqueios:', error);
    }
  }

  // Método para executar manualmente (útil para testes)
  async expireNow() {
    return await this.expireBloqueios();
  }
}

export default new BloqueiosExpirationService();
```

3. **Iniciar serviço no app**:

**Arquivo**: `backend/src/app.js` ou `index.js`
```javascript
import bloqueiosExpirationService from './services/bloqueiosExpiration.js';

// Após configurar rotas
bloqueiosExpirationService.start();
```

4. **Endpoint manual (opcional)**:
```javascript
// Em bloqueios.js routes
rotas.post('/expirar-bloqueios', async (req, res) => {
  const count = await bloqueiosExpirationService.expireNow();
  res.json({ message: `${count} bloqueios expirados` });
});
```

**Vantagens**:
- Status armazenado no banco
- Queries simples (WHERE status = 'concluido')
- Histórico preciso de quando expirou (via updated_at)
- Melhor performance em queries

**Desvantagens**:
- Mais complexo (requer cron)
- Pode ter delay de até 24h
- Precisa garantir que job está rodando
- Requer monitoramento

---

#### **Opção C: Lazy Update (Híbrida)**

Atualiza status apenas quando bloqueio é acessado.

**Implementação**:

```javascript
// Middleware ou método helper
async function checkAndExpireBloqueio(bloqueio) {
  if (bloqueio.status === 'ativo') {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const dataTermino = new Date(bloqueio.data_termino);
    dataTermino.setHours(0, 0, 0, 0);

    if (dataTermino < hoje) {
      await bloqueio.update({ status: 'concluido' });
    }
  }
  return bloqueio;
}

// Usar em get(), update(), etc
async get(req, res) {
  let bloqueio = await Bloqueio.findByPk(id);
  bloqueio = await checkAndExpireBloqueio(bloqueio);
  return res.json(bloqueio);
}
```

**Vantagens**:
- Simples, sem cron
- Status armazenado no banco
- Atualiza sob demanda

**Desvantagens**:
- Bloqueios não acessados ficam desatualizados
- Listagens podem mostrar status desatualizado
- Performance: atualiza um por vez

---

### 7.7 Recomendação Final: **Opção A + Endpoint Manual**

**Por quê?**
- Sistema de abrigo não é crítico em tempo real
- Verificação dinâmica é precisa
- Evita complexidade de cron
- Permite ajustes simples

**Implementação sugerida**:

1. **Queries calculam status dinamicamente**
2. **Helper function para reutilizar lógica**:

```javascript
// helpers/bloqueioStatus.js
export function calcularStatus(bloqueio) {
  if (bloqueio.status !== 'ativo') {
    return bloqueio.status; // cancelado mantém cancelado
  }

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const dataTermino = new Date(bloqueio.data_termino);
  dataTermino.setHours(0, 0, 0, 0);

  return dataTermino < hoje ? 'concluido' : 'ativo';
}

export function adicionarStatusCalculado(bloqueios) {
  // Aceita array ou objeto único
  const isArray = Array.isArray(bloqueios);
  const lista = isArray ? bloqueios : [bloqueios];

  const resultado = lista.map(bloqueio => ({
    ...bloqueio.toJSON(),
    status_calculado: calcularStatus(bloqueio),
    esta_ativo: calcularStatus(bloqueio) === 'ativo'
  }));

  return isArray ? resultado : resultado[0];
}
```

3. **Usar em todos os controllers**:

```javascript
async list(req, res) {
  const bloqueios = await Bloqueio.findAll({...});
  return res.json(adicionarStatusCalculado(bloqueios));
}

async get(req, res) {
  const bloqueio = await Bloqueio.findByPk(id);
  return res.json(adicionarStatusCalculado(bloqueio));
}
```

4. **Frontend usa `status_calculado`** ao invés de `status`

---

### 7.8 Queries de Filtro por Status

**Buscar apenas bloqueios ativos**:
```javascript
WHERE status IN ('ativo', 'cancelado') // não precisa verificar cancelados
  AND (
    status = 'cancelado'
    OR (status = 'ativo' AND data_termino >= CURDATE())
  )

// Simplificado:
WHERE status = 'ativo' AND data_termino >= CURDATE()
```

**Buscar bloqueios expirados/concluídos**:
```javascript
WHERE status = 'ativo' AND data_termino < CURDATE()
```

**Buscar todos bloqueios ativos de um hóspede**:
```javascript
WHERE hospede_id = :id
  AND status = 'ativo'
  AND data_termino >= CURDATE()
```

---

## 8. Considerações Técnicas

### Validações
- Data de término deve ser sempre >= data de início
- Não permitir bloqueios sem motivo
- Verificar existência de hóspede antes de criar bloqueio
- Verificar existência de ocorrência se ocorrencia_id for fornecida

### Performance
- Adicionar índices nas colunas:
  - `hospede_id` (busca por hóspede)
  - `ocorrencia_id` (relacionamento)
  - `data_termino` (filtro de bloqueios ativos)

### Segurança
- Validar todos os inputs
- Sanitizar campos de texto (motivo)
- Retornar mensagens de erro apropriadas

### Extensibilidade Futura
- Considerar adicionar campo `ativo` (BOOLEAN) para desativar bloqueios sem deletar
- Considerar adicionar campo `criado_por_usuario_id` para rastreabilidade
- Considerar adicionar campo `observacoes` para notas adicionais

---

## 9. Próximos Passos (Frontend)

Após implementação do backend, o frontend precisará:
1. Tela de listagem de bloqueios
2. Tela de cadastro de bloqueio manual
3. Tela de edição de bloqueio
4. Indicador visual de hóspedes bloqueados
5. Filtros por período e status (ativo/inativo)
6. Integração com tela de hóspedes (mostrar bloqueios ativos)
7. Integração com tela de ocorrências (mostrar bloqueios relacionados)

---

## Notas Finais

- Período padrão de bloqueio automático: **30 dias**
- Apenas ocorrências com nível "Grave" criam bloqueios automáticos
- Bloqueios podem ser criados manualmente para qualquer hóspede
- Bloqueios podem existir sem estar vinculados a uma ocorrência
