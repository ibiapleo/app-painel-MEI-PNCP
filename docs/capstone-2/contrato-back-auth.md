# Contrato do back-end — Autenticação (login e sessão)

> **Status:** rascunho. Hoje o app usa `useAuthStore` (`src/stores/auth/useAuthStore.ts`) com login **100% mockado** (delay artificial, senha em `mockPassword`, expiração via `sessionExpiresAt` local). Este documento descreve o contrato para integração real.

## Origem / responsabilidade do back-end

O back-end do projeto deve:

- Validar credenciais (e-mail + senha).
- Emitir tokens de acesso (JWT ou equivalente) e, se aplicável, refresh token.
- Expor o perfil mínimo do usuário autenticado.
- Invalidar sessão no logout.

O app **não** deve persistir senha em texto claro após a integração — apenas `accessToken`, `refreshToken` (opcional) e metadados de expiração.

## Tipos compartilhados

### `AuthUser` (já no app)

`src/stores/auth/types.ts`:

```ts
export interface AuthUser {
  id: string;
  name: string;
  email: string;
}
```

### `AuthTokens` (proposta — resposta de login / refresh)

```ts
export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;        // segundos até expirar o access token
  tokenType: 'Bearer';
}
```

### `LoginResponse` (proposta)

```ts
export interface LoginResponse {
  user: AuthUser;
  tokens: AuthTokens;
}
```

## Endpoints

### 1. Login

Substitui `useAuthStore.login()`.

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

**200 OK** → `LoginResponse`

**401 Unauthorized**
```json
{
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "E-mail ou senha incorretos."
  }
}
```

**422 Unprocessable Entity** — e-mail inválido, campos obrigatórios (`VALIDATION_ERROR`).

---

### 2. Sessão atual (opcional, recomendado)

Substitui parte da reidratação mock (`user` + validação de expiração).

```http
GET /auth/me
Authorization: Bearer <accessToken>
```

**200 OK**
```json
{
  "user": { /* AuthUser */ }
}
```

**401 Unauthorized** — token ausente, inválido ou expirado.

---

### 3. Refresh token (opcional)

Substitui recálculo local de `sessionExpiresAt` quando o access token expirar.

```http
POST /auth/refresh
Content-Type: application/json
```

**Body**
```json
{
  "refreshToken": "<refresh_token>"
}
```

**200 OK** → `AuthTokens` (novo par de tokens).

**401 Unauthorized** — refresh inválido ou revogado.

---

### 4. Logout

Substitui `useAuthStore.logout()`.

```http
POST /auth/logout
Authorization: Bearer <accessToken>
```

**204 No Content** — sessão invalidada no servidor (revogar refresh, se houver).

**401 Unauthorized** — token já inválido (o app pode limpar estado local mesmo assim).

## Erros padronizados

Mesmo envelope do contrato de editais:

```json
{
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Mensagem legível para o usuário."
  }
}
```

Códigos esperados neste domínio: `INVALID_CREDENTIALS`, `UNAUTHORIZED`, `TOKEN_EXPIRED`, `VALIDATION_ERROR`, `INTERNAL_ERROR`.

## Como o front consome hoje (mock)

| Comportamento | Arquivo / store | Endpoint equivalente |
|---|---|---|
| Login com delay + validação de senha local | `useAuthStore.login()` | `POST /auth/login` |
| Sessão válida por 7 dias (`sessionExpiresAt`) | `selectIsSessionValid` em `session.ts` | `expiresIn` / `exp` do JWT + `GET /auth/me` |
| Logout local | `useAuthStore.logout()` | `POST /auth/logout` |
| Entrada do app (login vs tabs) | `useAppEntry` | Depende de token válido + cadastro completo |

### Mudanças previstas no app após integração

- Remover `mockPassword` e validação local de senha.
- Persistir apenas tokens (e opcionalmente `user` em cache).
- Interceptor HTTP: anexar `Authorization: Bearer <accessToken>` nas rotas protegidas (editais, notificações, etc.).
- Tratar `401` global: tentar refresh ou redirecionar para `/(auth)/login`.

## Documentos relacionados

- [Recuperação de senha](./contrato-back-recuperacao-senha.md)
- [Cadastro de usuário](./contrato-back-cadastro.md)
- [Editais](./contrato-back-editais.md)
