# Contrato do back-end — Cadastro de usuário (MEI)

> **Status:** Concluído.<br> O cadastro em 3 passos chama o back no submit final (`useSignup` → `authService.registerMei()`). Rascunho dos steps permanece local em `useSignupStore`; UFs e CNAEs vêm do back.

## Fluxo no app

| Passo | Campos | Tela | Integração back |
|-------|--------|------|-----------------|
| 1 | UFs de interesse (`selectedStates`: siglas) | `StepOneScreen` | `GET /locations/states` |
| 2 | Nome, CNPJ | `StepTwoScreen` | `GET /cnpj/cnaes?cnpj=` (auto ao informar CNPJ válido) |
| 3 | E-mail, senha | `StepThreeScreen` | `GET /users/check-email` → `POST /users/register` |
| — | Sucesso | redirect para `/(tabs)` | Login automático (tokens retornados no register) |

## Tipos compartilhados

### `SignupDraft` (estado local)

`src/stores/auth/useSignUpStore.ts`:

```ts
export interface SignupDraft {
  name: string;
  cnpj: string;
  email: string;
  password: string;
  selectedStates: string[];  // siglas, ex: "PE", "SP"
  cnaes: Cnae[];
}

export interface Cnae {
  id: string;
  title: string;
}
```

### Payload de registro

`RegisterMeiPayload` em `src/services/authService.ts`:

```ts
export type RegisterMeiPayload = {
  name: string;
  email: string;
  password: string;
  cnpj: string;                      // 14 dígitos, sem máscara
  interested_state_siglas: string[]; // siglas das UFs
  cnae_ids: string[];
};
```

### Resposta de registro

Mesmo formato de login — tokens em snake_case:

```json
{
  "access_token": "<jwt>",
  "refresh_token": "<jwt>"
}
```

O app persiste os tokens no SecureStore e chama `GET /users/me` antes de marcar `isRegistrationComplete`.

### `LocationState`

```ts
export type LocationState = {
  id: string;
  sigla: string;
  nome: string;
};
```

## Endpoints

### 1. Listar UFs

Usado por `locationService.getStates()` no step 1.

```http
GET /locations/states
```

**200 OK**
```json
[
  { "id": "26", "sigla": "PE", "nome": "Pernambuco" }
]
```

---

### 2. CNAEs por CNPJ

Usado por `authService.getCnaesByCnpj()` no step 2 (quando CNPJ tem 14 dígitos).

```http
GET /cnpj/cnaes?cnpj=12345678000199
```

**200 OK**
```json
{
  "primary_cnae": { "id": "6201501", "description": "Desenvolvimento de programas..." },
  "secondary_cnaes": [
    { "id": "6202300", "description": "Desenvolvimento e licenciamento..." }
  ]
}
```

**404 / erro** — CNPJ não encontrado. O app exibe "CNPJ não encontrado ou erro na busca."

---

### 3. Verificar disponibilidade de e-mail

Usado no step 3 antes do registro.

```http
GET /users/check-email?email=usuario@email.com
```

**200 OK**
```json
{ "available": true }
```

Se `available === false`, o app bloqueia o submit com "Este e-mail já está em uso."

---

### 4. Registrar usuário MEI

Usado por `authService.registerMei()` no submit do step 3.

```http
POST /users/register
Content-Type: application/json
```

**Body** → `RegisterMeiPayload`

**201 Created / 200 OK**
```json
{
  "access_token": "<jwt>",
  "refresh_token": "<jwt>"
}
```

**409 Conflict / 422 Unprocessable Entity** — e-mail ou CNPJ já cadastrado, senha fraca, CNAEs inválidos, etc. Corpo FastAPI com `detail` (string ou array de validação).

## Regras de senha (validadas no app e no back)

Mínimo 8 caracteres, pelo menos: 1 número, 1 letra maiúscula, 1 caractere especial (`validatePassword` em `useSignup.ts`).

## Erros

Formato FastAPI (`detail`). Ver [contrato-back-auth.md](./contrato-back-auth.md#erros).

## Como o front consome

| Comportamento | Arquivo | Endpoint |
|---|---|---|
| Listar UFs | `locationService.getStates()` | `GET /locations/states` |
| Buscar CNAEs do CNPJ | `authService.getCnaesByCnpj()` | `GET /cnpj/cnaes` |
| Verificar e-mail | `authService.checkEmail()` | `GET /users/check-email` |
| Concluir cadastro + login | `authService.registerMei()` | `POST /users/register` |
| Gate onboarding vs login | `isRegistrationComplete` + `useAppEntry` | Flag local após register bem-sucedido |

Persistência local do rascunho: apenas `isRegistrationComplete` é salvo no AsyncStorage (`signup-storage`); campos do formulário não são persistidos entre sessões.

## Documentos relacionados

- [Autenticação](./contrato-back-auth.md)
- [Editais](./contrato-back-editais.md) — compatibilidade usa perfil/CNAEs do MEI cadastrado
