# API - Rotas de Consulta

Documentação completa das rotas disponíveis para gerenciar consultas no sistema.

**Base URL:** `/consultas`

---

## 📋 Índice

1. [GET /consultas](#1-get-consultas) - Listar todas as consultas
2. [POST /consultas](#2-post-consultas) - Criar nova consulta
3. [PUT /consultas/:id](#3-put-consultasid) - Atualizar consulta
4. [DELETE /consultas/:id](#4-delete-consultasid) - Deletar consulta

---

## 1. GET /consultas

Lista todas as consultas do sistema, incluindo informações do paciente e transcrições quando disponíveis.

### Endpoint

```
GET /consultas
```

### Headers

```
Content-Type: application/json
Authorization: Bearer {token} (opcional)
```

### Parâmetros

Nenhum parâmetro de query necessário.

### Resposta de Sucesso

**Status Code:** `200 OK`

```json
[
  {
    "id": "clx9876543210",
    "paciente_id": "clx1234567890",
    "paciente": {
      "name": "João Silva"
    },
    "horario": "2024-01-15T14:30:00.000Z",
    "tipo": "Terapia Individual",
    "categoria": "Acompanhamento",
    "tags": ["primeira-consulta", "ansiedade"],
    "status": "A_CONFIRMAR",
    "sugestao_IA": "Sugerir exercícios de respiração para ansiedade.",
    "transcricoes": [
      {
        "id": "clxtrans123",
        "id_consulta": "clx9876543210",
        "texto_gerado": "Transcrição da sessão...",
        "data_geracao": "2024-01-15T15:00:00.000Z",
        "status": "CONCLUIDA"
      }
    ],
    "created_at": "2024-01-10T10:00:00.000Z",
    "updatedAt": "2024-01-10T10:00:00.000Z"
  },
  {
    "id": "clx1112223334",
    "paciente_id": "clx5556667778",
    "paciente": {
      "name": "Maria Santos"
    },
    "horario": "2024-01-16T10:00:00.000Z",
    "tipo": "Avaliação Inicial",
    "categoria": "Primeira Consulta",
    "tags": ["avaliacao"],
    "status": "CONFIRMADO",
    "sugestao_IA": null,
    "transcricoes": [],
    "created_at": "2024-01-11T09:00:00.000Z",
    "updatedAt": "2024-01-11T09:00:00.000Z"
  }
]
```

### Campos da Resposta

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | string | ID único da consulta |
| `paciente_id` | string | ID do paciente (userId) |
| `paciente` | object \| null | Informações do paciente (quando disponível) |
| `paciente.name` | string | Nome do paciente |
| `horario` | string (ISO 8601) | Data e hora da consulta |
| `tipo` | string | Tipo da consulta |
| `categoria` | string | Categoria da consulta |
| `tags` | string[] | Array de tags |
| `status` | enum | Status: `CONFIRMADO`, `CANCELADO`, `A_CONFIRMAR` |
| `sugestao_IA` | string \| null | Sugestão gerada por IA (opcional) |
| `transcricoes` | array | Array de transcrições (pode estar vazio) |
| `transcricoes[].id` | string | ID da transcrição |
| `transcricoes[].id_consulta` | string | ID da consulta relacionada |
| `transcricoes[].texto_gerado` | string \| null | Texto da transcrição |
| `transcricoes[].data_geracao` | string \| null | Data de geração da transcrição |
| `transcricoes[].status` | enum | Status: `PENDENTE`, `PROCESSANDO`, `CONCLUIDA`, `ERRO` |
| `created_at` | string (ISO 8601) | Data de criação |
| `updatedAt` | string (ISO 8601) | Data da última atualização |

### Comportamento

- As consultas são retornadas ordenadas por `horario` (crescente)
- Inclui informações do paciente quando disponíveis
- Inclui array de transcrições (pode estar vazio se não houver transcrições)
- O campo `paciente` pode ser `null` se não existir

### Exemplo de Uso

```bash
curl -X GET http://localhost:3001/consultas \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer seu_token_aqui"
```

```javascript
const response = await fetch('http://localhost:3001/consultas', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer seu_token_aqui'
  }
});

const consultas = await response.json();
console.log(consultas);
```

---

## 2. POST /consultas

Cria uma nova consulta no sistema.

### Endpoint

```
POST /consultas
```

### Headers

```
Content-Type: application/json
Authorization: Bearer {token} (opcional)
```

### Request Body

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `paciente_id` | string | Sim | ID do paciente (userId) |
| `horario` | string (ISO 8601) | Sim | Data e hora da consulta no formato ISO 8601 |
| `tipo` | string | Sim | Tipo da consulta |
| `categoria` | string | Sim | Categoria da consulta |
| `tags` | string[] | Sim | Array de tags associadas à consulta |
| `status` | enum | Não | Status: `CONFIRMADO`, `CANCELADO`, `A_CONFIRMAR`. Padrão: `A_CONFIRMAR` |
| `sugestao_IA` | string | Não | Sugestão gerada por IA para a consulta |

### Validações

- `paciente_id`: Deve ser uma string não vazia. O paciente deve existir no sistema.
- `horario`: Deve ser uma string válida no formato ISO 8601.
- `tipo`: Deve ser uma string não vazia.
- `categoria`: Deve ser uma string não vazia.
- `tags`: Deve ser um array de strings. Cada elemento deve ser uma string.
- `status`: Se fornecido, deve ser um dos valores: `CONFIRMADO`, `CANCELADO`, `A_CONFIRMAR`.
- `sugestao_IA`: Se fornecido, deve ser uma string.

### Exemplo de Requisição

```json
{
  "paciente_id": "clx1234567890",
  "horario": "2024-01-15T14:30:00.000Z",
  "tipo": "Terapia Individual",
  "categoria": "Acompanhamento",
  "tags": ["primeira-consulta", "ansiedade"],
  "status": "A_CONFIRMAR",
  "sugestao_IA": "Sugerir exercícios de respiração para ansiedade."
}
```

### Resposta de Sucesso

**Status Code:** `201 Created`

```json
{
  "id": "clx9876543210",
  "paciente_id": "clx1234567890",
  "horario": "2024-01-15T14:30:00.000Z",
  "tipo": "Terapia Individual",
  "categoria": "Acompanhamento",
  "tags": ["primeira-consulta", "ansiedade"],
  "status": "A_CONFIRMAR",
  "sugestao_IA": "Sugerir exercícios de respiração para ansiedade.",
  "created_at": "2024-01-10T10:00:00.000Z",
  "updatedAt": "2024-01-10T10:00:00.000Z"
}
```

### Respostas de Erro

#### 400 Bad Request - Validação Falhou

```json
{
  "statusCode": 400,
  "message": [
    "paciente_id should not be empty",
    "horario must be a valid ISO 8601 date string"
  ],
  "error": "Bad Request"
}
```

#### 404 Not Found - Paciente Não Encontrado

```json
{
  "statusCode": 404,
  "message": "Paciente não encontrado.",
  "error": "Not Found"
}
```

### Comportamento

- Um ID único é gerado automaticamente para a consulta usando `cuid()`
- Se o `status` não for fornecido, o valor padrão será `A_CONFIRMAR`
- As datas `created_at` e `updatedAt` são definidas automaticamente
- O campo `sugestao_IA` é opcional e pode ser `null`
- A consulta criada não possui `transcricoes` associadas inicialmente (array vazio)

### Exemplo de Uso

```bash
curl -X POST http://localhost:3001/consultas \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer seu_token_aqui" \
  -d '{
    "paciente_id": "clx1234567890",
    "horario": "2024-01-15T14:30:00.000Z",
    "tipo": "Terapia Individual",
    "categoria": "Acompanhamento",
    "tags": ["primeira-consulta", "ansiedade"],
    "status": "A_CONFIRMAR",
    "sugestao_IA": "Sugerir exercícios de respiração para ansiedade."
  }'
```

```javascript
const response = await fetch('http://localhost:3001/consultas', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer seu_token_aqui'
  },
  body: JSON.stringify({
    paciente_id: 'clx1234567890',
    horario: '2024-01-15T14:30:00.000Z',
    tipo: 'Terapia Individual',
    categoria: 'Acompanhamento',
    tags: ['primeira-consulta', 'ansiedade'],
    status: 'A_CONFIRMAR',
    sugestao_IA: 'Sugerir exercícios de respiração para ansiedade.'
  })
});

const consulta = await response.json();
console.log(consulta);
```

---

## 3. PUT /consultas/:id

Atualiza uma consulta existente. Todos os campos são opcionais - apenas os campos fornecidos serão atualizados.

### Endpoint

```
PUT /consultas/:id
```

### Headers

```
Content-Type: application/json
Authorization: Bearer {token} (opcional)
```

### Parâmetros da URL

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `id` | string | ID único da consulta a ser atualizada |

### Request Body

Todos os campos são opcionais. Apenas os campos fornecidos serão atualizados.

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `paciente_id` | string | Não | ID do paciente (userId) |
| `horario` | string (ISO 8601) | Não | Data e hora da consulta |
| `tipo` | string | Não | Tipo da consulta |
| `categoria` | string | Não | Categoria da consulta |
| `tags` | string[] | Não | Array de tags |
| `status` | enum | Não | Status: `CONFIRMADO`, `CANCELADO`, `A_CONFIRMAR` |
| `sugestao_IA` | string | Não | Sugestão gerada por IA |

### Validações

- `paciente_id`: Se fornecido, deve ser uma string não vazia. O paciente deve existir no sistema.
- `horario`: Se fornecido, deve ser uma string válida no formato ISO 8601.
- `tipo`: Se fornecido, deve ser uma string não vazia.
- `categoria`: Se fornecido, deve ser uma string não vazia.
- `tags`: Se fornecido, deve ser um array de strings.
- `status`: Se fornecido, deve ser um dos valores: `CONFIRMADO`, `CANCELADO`, `A_CONFIRMAR`.
- `sugestao_IA`: Se fornecido, deve ser uma string.

### Exemplo de Requisição

```json
{
  "status": "CONFIRMADO",
  "sugestao_IA": "Aplicar técnicas de mindfulness durante a sessão."
}
```

Ou atualizando múltiplos campos:

```json
{
  "horario": "2024-01-15T16:00:00.000Z",
  "tipo": "Terapia em Grupo",
  "categoria": "Grupo de Apoio",
  "tags": ["grupo", "terapia-coletiva"],
  "status": "CONFIRMADO"
}
```

### Resposta de Sucesso

**Status Code:** `200 OK`

```json
{
  "id": "clx9876543210",
  "paciente_id": "clx1234567890",
  "horario": "2024-01-15T16:00:00.000Z",
  "tipo": "Terapia em Grupo",
  "categoria": "Grupo de Apoio",
  "tags": ["grupo", "terapia-coletiva"],
  "status": "CONFIRMADO",
  "sugestao_IA": "Aplicar técnicas de mindfulness durante a sessão.",
  "created_at": "2024-01-10T10:00:00.000Z",
  "updatedAt": "2024-01-12T14:30:00.000Z"
}
```

### Respostas de Erro

#### 400 Bad Request - Validação Falhou

```json
{
  "statusCode": 400,
  "message": [
    "horario must be a valid ISO 8601 date string",
    "status must be one of the following values: CONFIRMADO, CANCELADO, A_CONFIRMAR"
  ],
  "error": "Bad Request"
}
```

#### 404 Not Found - Consulta Não Encontrada

```json
{
  "statusCode": 404,
  "message": "Consulta não encontrada.",
  "error": "Not Found"
}
```

#### 404 Not Found - Paciente Não Encontrado

```json
{
  "statusCode": 404,
  "message": "Paciente não encontrado.",
  "error": "Not Found"
}
```

### Comportamento

- Apenas os campos fornecidos no body serão atualizados
- O campo `updatedAt` é atualizado automaticamente
- Se `paciente_id` for fornecido, o sistema verifica se o paciente existe
- A consulta deve existir no sistema antes de ser atualizada

### Exemplo de Uso

```bash
curl -X PUT http://localhost:3001/consultas/clx9876543210 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer seu_token_aqui" \
  -d '{
    "status": "CONFIRMADO",
    "sugestao_IA": "Aplicar técnicas de mindfulness durante a sessão."
  }'
```

```javascript
const response = await fetch('http://localhost:3001/consultas/clx9876543210', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer seu_token_aqui'
  },
  body: JSON.stringify({
    status: 'CONFIRMADO',
    sugestao_IA: 'Aplicar técnicas de mindfulness durante a sessão.'
  })
});

const consulta = await response.json();
console.log(consulta);
```

---

## 4. DELETE /consultas/:id

Deleta uma consulta do sistema.

### Endpoint

```
DELETE /consultas/:id
```

### Headers

```
Content-Type: application/json
Authorization: Bearer {token} (opcional)
```

### Parâmetros da URL

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `id` | string | ID único da consulta a ser deletada |

### Resposta de Sucesso

**Status Code:** `200 OK`

```json
{
  "message": "Consulta deletada com sucesso."
}
```

### Respostas de Erro

#### 404 Not Found - Consulta Não Encontrada

```json
{
  "statusCode": 404,
  "message": "Consulta não encontrada.",
  "error": "Not Found"
}
```

### Comportamento

- A consulta é permanentemente removida do banco de dados
- Se houver uma transcrição associada, ela será deletada automaticamente (cascade delete)
- A operação não pode ser desfeita

### Exemplo de Uso

```bash
curl -X DELETE http://localhost:3001/consultas/clx9876543210 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer seu_token_aqui"
```

```javascript
const response = await fetch('http://localhost:3001/consultas/clx9876543210', {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer seu_token_aqui'
  }
});

const resultado = await response.json();
console.log(resultado.message); // "Consulta deletada com sucesso."
```

---

## 📝 Enums

### ConsultaStatus

```typescript
enum ConsultaStatus {
  CONFIRMADO = 'CONFIRMADO',
  CANCELADO = 'CANCELADO',
  A_CONFIRMAR = 'A_CONFIRMAR'
}
```

### TranscricaoStatus

```typescript
enum TranscricaoStatus {
  PENDENTE = 'PENDENTE',
  PROCESSANDO = 'PROCESSANDO',
  CONCLUIDA = 'CONCLUIDA',
  ERRO = 'ERRO'
}
```

---

## 🔒 Autenticação

Todas as rotas podem aceitar um token de autenticação no header `Authorization`:

```
Authorization: Bearer {seu_token_aqui}
```

**Nota:** A autenticação é opcional dependendo da configuração do sistema. Verifique com o administrador se a autenticação é necessária.

---

## ⚠️ Observações Importantes

1. **Formato de Data:** Todas as datas devem estar no formato ISO 8601 (ex: `2024-01-15T14:30:00.000Z`)

2. **Relacionamentos:**
   - Ao deletar uma consulta, todas as transcrições associadas são deletadas automaticamente (cascade delete)
   - Ao criar uma consulta, não é possível criar transcrições no mesmo request
   - Uma consulta pode ter múltiplas transcrições (relação 1:N)

3. **Validações:**
   - O `paciente_id` deve referenciar um paciente existente no sistema
   - Campos obrigatórios são validados antes de persistir no banco

4. **Ordenação:**
   - A rota GET retorna consultas ordenadas por `horario` (crescente)

5. **Campos Opcionais:**
   - `sugestao_IA` pode ser `null` ou uma string
   - `transcricoes` é sempre um array, mas pode estar vazio se não houver transcrições associadas à consulta

---

## 📚 Documentação Relacionada

- [Guia de Migrações](../migrations/aplicar-alteracoes-consulta-transcricao.md)
- [Documentação da Rota POST (Detalhada)](./criar-consulta.md)
