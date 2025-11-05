# API - Criar Consulta

## POST /consultas

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
| `status` | enum | Não | Status da consulta. Valores: `CONFIRMADO`, `CANCELADO`, `A_CONFIRMAR`. Padrão: `A_CONFIRMAR` |
| `sugestao_IA` | string | Não | Sugestão gerada por IA para a consulta |

### Validações

- `paciente_id`: Deve ser uma string não vazia. O paciente deve existir no sistema.
- `horario`: Deve ser uma string válida no formato ISO 8601 (ex: `2024-01-15T14:30:00Z`).
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

1. A rota valida todos os campos obrigatórios usando `class-validator`.
2. Verifica se o `paciente_id` fornecido corresponde a um paciente existente no sistema.
3. Se o `status` não for fornecido, o valor padrão será `A_CONFIRMAR`.
4. Um ID único é gerado automaticamente para a consulta usando `cuid()`.
5. As datas `created_at` e `updatedAt` são definidas automaticamente.
6. O campo `sugestao_IA` é opcional e pode ser `null` ou uma string.

### Observações

- A consulta criada não possui uma `transcricao` associada inicialmente. A transcrição deve ser criada separadamente se necessário.
- O campo `sugestao_IA` pode ser atualizado posteriormente através da rota PUT `/consultas/:id`.
- O campo `horario` deve ser enviado no formato ISO 8601, incluindo timezone.

### Exemplo de Uso com cURL

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

### Exemplo de Uso com JavaScript (fetch)

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

