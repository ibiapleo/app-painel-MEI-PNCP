# Contrato do back-end — Notificações (badge e alertas)

> **Status:** rascunho — **Capstone 3** (preparação). Hoje o app exibe contador fixo **9** via `useNotificationsStore` / `useNotifications` (`SearchHeader`). Sem integração de rede.

## Escopo previsto

- Contador de não lidas no header da Home.
- Futuro: lista de notificações, preferências, push (fora do escopo imediato deste contrato).

## Tipos compartilhados

### `NotificationSummary` (proposta)

```ts
export interface NotificationSummary {
  unreadCount: number;
}
```

### `NotificationItem` (proposta — lista Capstone 3)

```ts
export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;       // ISO 8601
  type: 'prazo_edital' | 'novo_edital' | 'sistema';
  relatedOpportunityId?: string;
}
```

## Endpoints

### 1. Contador de não lidas

Substitui `fetchCount()` mock.

```http
GET /notifications/unread-count
Authorization: Bearer <accessToken>
```

**200 OK**
```json
{
  "unreadCount": 9
}
```

---

### 2. Listar notificações (Capstone 3)

```http
GET /notifications
  ?page=<n>
  &pageSize=<n>
  &unreadOnly=<boolean>
Authorization: Bearer <accessToken>
```

**200 OK**
```json
{
  "items": [ /* NotificationItem[] */ ],
  "page": 1,
  "pageSize": 20,
  "total": 42
}
```

---

### 3. Marcar como lida (Capstone 3)

```http
PATCH /notifications/:id/read
Authorization: Bearer <accessToken>
```

**204 No Content**

---

### 4. Marcar todas como lidas (opcional)

```http
POST /notifications/read-all
Authorization: Bearer <accessToken>
```

**204 No Content**

## Erros padronizados

Mesmo envelope dos demais contratos (`UNAUTHORIZED`, `INTERNAL_ERROR`, etc.).

## Como o front consome hoje (mock)

| Comportamento | Arquivo | Endpoint equivalente |
|---|---|---|
| Badge no header | `SearchHeader` + `useNotifications` | `GET /notifications/unread-count` |

## Documentos relacionados

- [Editais](./contrato-back-editais.md) — `relatedOpportunityId`
- [Autenticação](./contrato-back-auth.md) — rotas protegidas
