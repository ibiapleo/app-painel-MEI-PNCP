# Contrato do back-end — Recuperação de senha

> **Status:** rascunho. O fluxo em 3 telas está implementado no app com **código mock fixo `0000`** e `updatePassword()` local em `useAuthStore`. Este documento descreve o contrato para envio real de código e redefinição de senha.

## Fluxo no app (hoje)

| Passo | Tela | Rota | Comportamento mock |
|-------|------|------|-------------------|
| 1 | E-mail | `/(auth)/forgot-password` | Valida formato; navega com `email` nos params |
| 2 | Código (4 dígitos) | `/(auth)/forgot-password/code` | Aceita apenas `0000`; grava verificação em `usePasswordRecoveryStore` |
| 3 | Nova senha | `/(auth)/forgot-password/new-password` | Confirma senha (mín. 6 chars); `updatePassword()`; redirect para login |

Arquivos: `ForgotPasswordEmailScreen`, `ForgotPasswordCodeScreen`, `ForgotPasswordNewPasswordScreen`.

## Tipos compartilhados

### Solicitação de código

```ts
export interface ForgotPasswordRequest {
  email: string;
}
```

### Verificação de código

```ts
export interface VerifyResetCodeRequest {
  email: string;
  code: string; // 4 dígitos no UI atual; back pode usar 6 ou alfanumérico
}

export interface VerifyResetCodeResponse {
  resetToken: string;   // token de uso único, curta duração
  expiresIn: number;    // segundos
}
```

### Redefinição de senha

```ts
export interface ResetPasswordRequest {
  resetToken: string;
  newPassword: string;
  confirmPassword: string; // validado no app; back pode validar de novo
}
```

## Endpoints

### 1. Solicitar código por e-mail

Substitui o passo 1 → 2 sem chamada de rede hoje.

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

**202 Accepted** ou **200 OK** (não revelar se o e-mail existe)

```json
{
  "message": "Se o e-mail estiver cadastrado, você receberá um código."
}
```

**422** — e-mail inválido (`VALIDATION_ERROR`).

> **Segurança:** resposta idêntica para e-mail existente ou não, para evitar enumeração de contas.

---

### 2. Validar código

Substitui validação local `code === '0000'`.

```http
POST /auth/password-reset/verify
Content-Type: application/json
```

**Body**
```json
{
  "email": "usuario@email.com",
  "code": "0000"
}
```

**200 OK** → `VerifyResetCodeResponse`

**400 Bad Request**
```json
{
  "error": {
    "code": "INVALID_RESET_CODE",
    "message": "Código inválido ou expirado."
  }
}
```

**429 Too Many Requests** — excesso de tentativas (`RATE_LIMIT_EXCEEDED`).

---

### 3. Definir nova senha

Substitui `useAuthStore.updatePassword()` no passo 3.

```http
POST /auth/password-reset/complete
Content-Type: application/json
```

**Body**
```json
{
  "resetToken": "<token retornado no verify>",
  "newPassword": "********"
}
```

**204 No Content** — senha alterada; usuário deve fazer login novamente.

**400** — token inválido/expirado (`RESET_TOKEN_INVALID`).

**422** — senha fraca ou política não atendida (`VALIDATION_ERROR`).

---

### 4. Reenviar código (opcional)

Substitui `handleResend` com `Alert` mock na tela de código.

```http
POST /auth/password-reset/resend
Content-Type: application/json
```

**Body** — mesmo de `/request` (`email`).

**202 Accepted** — mesmo envelope genérico do passo 1.

**429** — cooldown entre reenvios.

## Erros padronizados

```json
{
  "error": {
    "code": "INVALID_RESET_CODE",
    "message": "Código inválido ou expirado."
  }
}
```

Códigos esperados: `INVALID_RESET_CODE`, `RESET_TOKEN_INVALID`, `RATE_LIMIT_EXCEEDED`, `VALIDATION_ERROR`, `INTERNAL_ERROR`.

## Como o front consome hoje (mock)

| Ação | Arquivo | Endpoint equivalente |
|---|---|---|
| Informar e-mail | `ForgotPasswordEmailScreen` | `POST /auth/password-reset/request` |
| Validar `0000` | `ForgotPasswordCodeScreen` | `POST /auth/password-reset/verify` |
| Reenviar código | `ForgotPasswordCodeScreen.handleResend` | `POST /auth/password-reset/resend` |
| Nova senha | `ForgotPasswordNewPasswordScreen` | `POST /auth/password-reset/complete` |
| Estado entre telas | `usePasswordRecoveryStore` | Substituir por `resetToken` em memória após verify |

### Mudanças previstas no app após integração

- Remover constante `MOCK_RECOVERY_CODE`.
- Após verify: guardar `resetToken` (memória segura, não persistir em AsyncStorage).
- Passo 3 envia `resetToken` + `newPassword` ao back; remover `mockPassword` local.
- Mensagens de erro vindas de `error.message` da API.


## Documentos relacionados

- [Autenticação (login)](./contrato-back-auth.md)
- [Cadastro](./contrato-back-cadastro.md)
