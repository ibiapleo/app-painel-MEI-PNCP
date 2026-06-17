# Contrato do back-end — Recuperação de senha

> **Status:** Concluído.<br> Fluxo em 3 telas consome `authService` (`src/services/authService.ts`). Estado entre telas: `usePasswordRecoveryStore` (memória — `resetToken`).

## Fluxo no app

| Passo | Tela | Rota | Integração back |
|-------|------|------|-----------------|
| 1 | E-mail | `/(auth)/forgot-password` | `POST /auth/password-reset/request` |
| 2 | Código (4 dígitos) | `/(auth)/forgot-password/code` | `POST /auth/password-reset/verify` |
| 3 | Nova senha | `/(auth)/forgot-password/new-password` | `POST /auth/password-reset/complete` |

Reenvio de código: nova chamada a `POST /auth/password-reset/request` (mesmo endpoint do passo 1).

Arquivos: `ForgotPasswordEmailScreen`, `ForgotPasswordCodeScreen`, `ForgotPasswordNewPasswordScreen`.

## Tipos compartilhados

### Solicitação de código

```ts
{ email: string }
```

### Verificação de código

**Request**
```ts
{ email: string; code: string }  // 4 dígitos no UI
```

**Response** — o app aceita camelCase ou snake_case:

```ts
{
  resetToken?: string;   // ou reset_token
}
```

### Redefinição de senha

Enviado por `authService.completePasswordReset()`:

```ts
{
  reset_token: string;
  new_password: string;
}
```

Validação de confirmação de senha e política (mín. 8 chars, número, maiúscula, especial) ocorre no app (`validatePassword`).

## Endpoints

### 1. Solicitar código por e-mail

Usado por `authService.requestPasswordReset()`.

```http
POST /auth/password-reset/request
Content-Type: application/json
```

**Body**
```json
{
  "email": "usuario@email.com"
}
```

**200 OK / 202 Accepted** — resposta genérica (não revela se o e-mail existe).

**422 Unprocessable Entity** — e-mail inválido (`detail` FastAPI).

---

### 2. Validar código

Usado por `authService.verifyResetCode()`.

```http
POST /auth/password-reset/verify
Content-Type: application/json
```

**Body**
```json
{
  "email": "usuario@email.com",
  "code": "1234"
}
```

**200 OK**
```json
{
  "reset_token": "<token de uso único>"
}
```

**400 Bad Request** — código inválido ou expirado:

```json
{
  "detail": "Código inválido ou expirado."
}
```

---

### 3. Definir nova senha

Usado por `authService.completePasswordReset()`.

```http
POST /auth/password-reset/complete
Content-Type: application/json
```

**Body**
```json
{
  "reset_token": "<token retornado no verify>",
  "new_password": "********"
}
```

**204 No Content / 200 OK** — senha alterada; app redireciona para `/(auth)/login`.

**400 / 422** — token inválido/expirado ou senha fora da política (`detail`).

## Erros

Formato FastAPI (`detail`). Normalizados com `getApiErrorMessage()` (`src/utils/apiError.ts`).

## Como o front consome

| Ação | Arquivo | Endpoint |
|---|---|---|
| Informar e-mail | `ForgotPasswordEmailScreen` | `POST /auth/password-reset/request` |
| Validar código | `ForgotPasswordCodeScreen` | `POST /auth/password-reset/verify` |
| Reenviar código | `ForgotPasswordCodeScreen.handleResend` | `POST /auth/password-reset/request` |
| Nova senha | `ForgotPasswordNewPasswordScreen` | `POST /auth/password-reset/complete` |
| Estado entre telas | `usePasswordRecoveryStore` | `resetToken` em memória após verify |

## Documentos relacionados

- [Autenticação (login)](./contrato-back-auth.md)
- [Cadastro](./contrato-back-cadastro.md)
