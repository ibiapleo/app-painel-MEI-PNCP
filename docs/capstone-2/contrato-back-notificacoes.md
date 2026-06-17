# Contrato do back-end — Notificações (badge e alertas)

> **Status:** Concluído. <br> **Capstone 3**. Auth, editais, cadastro e recuperação de senha já usam o back; notificações ainda vêm de `useNotificationStore` (`src/stores/notifications/useNotificationsStore.ts`) sem chamadas HTTP, pois precisariamos de uma mensageria do back-end (requisito que não foi previsto para essa parte do projeto.)

## Escopo atual vs previsto

| Recurso | Hoje | Previsto (back) |
|---------|------|-----------------|
| Badge no header (`SearchHeader`) | contador da store mock | `GET /notifications/unread-count` |
| Lista (`NotificationsScreen`) | array mock | `GET /notifications` |
| Marcar como lida | local | `PATCH /notifications/:id/read` |

## Tipos no app

```ts
interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;      // ISO 8601
  isRead: boolean;
}
```

## Contrato

### `NotificationSummary`

```ts
export interface NotificationSummary {
  unreadCount: number;
}
```

### `NotificationItem` (lista)

```ts
export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
  type: 'prazo_edital' | 'novo_edital' | 'sistema';
  relatedOpportunityId?: string;
}
```

## Endpoints (a implementar)

### 1. Contador de não lidas

```http
GET /notifications/unread-count
Authorization: Bearer <access_token>
```

**200 OK**
```json
{
  "unreadCount": 3
}
```

---

### 2. Listar notificações

```http
GET /notifications?page=1&pageSize=20&unreadOnly=false
Authorization: Bearer <access_token>
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

### 3. Marcar como lida

```http
PATCH /notifications/:id/read
Authorization: Bearer <access_token>
```

**204 No Content**

---

### 4. Marcar todas como lidas (opcional)

```http
POST /notifications/read-all
Authorization: Bearer <access_token>
```

**204 No Content**

## Erros

Mesmo padrão FastAPI (`detail`) dos demais contratos integrados.

## Como o front consome hoje

| Comportamento | Arquivo | Endpoint equivalente |
|---|---|---|
| Badge no header | `useNotifications` → `SearchHeader` | _(mock)_ → `GET /notifications/unread-count` |
| Lista e detalhe | `NotificationsScreen` | _(mock)_ → `GET /notifications` |

## Documentos relacionados

- [Editais](./contrato-back-editais.md) — `relatedOpportunityId`
- [Autenticação](./contrato-back-auth.md) — rotas protegidas
