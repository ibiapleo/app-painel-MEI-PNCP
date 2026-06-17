# Contrato do back-end — Autenticação (login e sessão)

> **Status:** Concluído. <br> 
O app consome o back via `authService` (`src/services/authService.ts`) e `api` (`src/services/api.ts`). <br>Tokens ficam no **Expo SecureStore** <br>Perfil do usuário em `useAuthStore`.

## Base da API

| Item | Valor |
|------|-------|
| Variável de ambiente | `EXPO_PUBLIC_API_URL` |
| Exemplo (produção) | `https://licitafacil.brazilsouth.cloudapp.azure.com/api/v1` |
| Cliente HTTP | Axios (`src/services/api.ts`) |
| Autenticação | `Authorization: Bearer <access_token>` (interceptor automático) |
| Refresh | `POST /refresh` com `{ refresh_token }` — retry transparente em `401` |

## Tipos compartilhados

### `AuthUser` (perfil — resposta de `GET /users/me`)

`src/stores/auth/types.ts`:

```ts
export interface AuthUser {
  name: string;
  email: string;
  cnpj?: string | null;
  company_name?: string | null;
  primary_cnae?: {
    id: string;
    description: string;
  } | null;
  secondary_cnaes?: {
    id: string;
    description: string;
  }[];
  interested_state_siglas?: string[];
  interested_states?: { sigla: string }[];
}
```

### Resposta de login / refresh / cadastro

O back retorna tokens em **snake_case** (sem envelope `tokens`):

```json
{
  "access_token": "<jwt>",
  "refresh_token": "<jwt>"
}
```

## Endpoints

### 1. Login

Usado por `authService.login()` → `useAuthStore.login()`.

```http
POST /auth/login
Content-Type: application/json
```

**Body**
```json
{
  "email": "usuario@email.com",
  "password": "********"
}
```

**200 OK**
```json
{
  "access_token": "<jwt>",
  "refresh_token": "<jwt>"
}
```

Após o login, o app chama `GET /users/me` para popular `useAuthStore.user`.

**401 Unauthorized** — credenciais inválidas. Corpo FastAPI:

```json
{
  "detail": "E-mail ou senha incorretos."
}
```

---

### 2. Perfil do usuário autenticado

Substitui `/auth/me`. Usado por `authService.getCurrentUser()` → `useAuthStore.fetchUserProfile()`.

```http
GET /users/me
Authorization: Bearer <access_token>
```

**200 OK** → `AuthUser`

**401 Unauthorized** — token ausente, inválido ou expirado.

---

### 3. Refresh token

Usado pelo interceptor em `src/services/api.ts` quando uma rota protegida retorna `401`.

```http
POST /refresh
Content-Type: application/json
```

**Body**
```json
{
  "refresh_token": "<refresh_token>"
}
```

**200 OK**
```json
{
  "access_token": "<novo_jwt>",
  "refresh_token": "<novo_refresh>"
}
```

**401 Unauthorized** — refresh inválido ou revogado. O app limpa os tokens do SecureStore.

---

### 4. Logout

Usado por `authService.logout()` → `useAuthStore.logout()`.

```http
POST /auth/logout
Authorization: Bearer <access_token>
```

**204 No Content** (ou equivalente de sucesso) — sessão invalidada no servidor.

O app sempre remove `access_token` e `refresh_token` do SecureStore, mesmo se a chamada falhar.

---

### 5. Atualizar perfil (Capstone 3+)

Usado por `authService.updateProfile()` e `authService.updateCnpj()`.

```http
PATCH /users/me
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Body** (campos opcionais)
```json
{
  "name": "Nome atualizado",
  "interested_state_siglas": ["PE", "SP"]
}
```

```http
PATCH /users/me/cnpj
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Body**
```json
{
  "cnpj": "12345678000199"
}
```

**200 OK** — perfil atualizado. O app chama `GET /users/me` em seguida.

## Erros

O back usa o formato **FastAPI** (`detail`), não envelope `{ error: { code, message } }`:

```json
{
  "detail": "Mensagem legível para o usuário."
}
```

Validação (422):

```json
{
  "detail": [
    {
      "loc": ["body", "email"],
      "msg": "value is not a valid email address",
      "type": "value_error"
    }
  ]
}
```

O app normaliza erros com `getApiErrorMessage()` (`src/utils/apiError.ts`).

## Como o front consome

| Comportamento | Arquivo | Endpoint |
|---|---|---|
| Login + persistência de tokens | `authService.login()` | `POST /auth/login` |
| Carregar perfil após login/reidratação | `useAuthStore.fetchUserProfile()` | `GET /users/me` |
| Refresh automático em 401 | `api.ts` interceptor | `POST /refresh` |
| Logout | `authService.logout()` | `POST /auth/logout` |
| Atualizar nome / UFs | `authService.updateProfile()` | `PATCH /users/me` |
| Atualizar CNPJ | `authService.updateCnpj()` | `PATCH /users/me/cnpj` |
| Entrada do app (login vs tabs) | `useAppEntry` | Token no SecureStore + `isRegistrationComplete` |

## Documentos relacionados

- [Recuperação de senha](./contrato-back-recuperacao-senha.md)
- [Cadastro de usuário](./contrato-back-cadastro.md)
- [Editais](./contrato-back-editais.md)
