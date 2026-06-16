# Contrato do back-end — Cadastro de usuário (MEI)

> **Status:** rascunho. O cadastro em 3 passos persiste rascunho e conclusão apenas no app (`useSignupStore`, chave `@licitafacil/signup`). Estados vêm da [API IBGE](https://servicodados.ibge.gov.br/api/docs/localidades) via `fetchStates()` — não passa pelo back do projeto. Este documento descreve o contrato para **criar conta** no back interno.

## Fluxo no app (hoje)

| Passo | Campos | Tela |
|-------|--------|------|
| 1 | UFs de interesse (`selectedStates`: siglas) | `StepOneScreen` |
| 2 | Nome, CNPJ | `StepTwoScreen` |
| 3 | E-mail, senha | `StepThreeScreen` |
| — | `completeRegistration()` | Navega para success → login |

Rascunho salvo localmente a cada alteração; **não há** `POST` parcial ao servidor hoje.

## Tipos compartilhados

### `SignupDraft` (espelho do app)

`src/stores/signup/types.ts`:

```ts
export interface SignupDraft {
  selectedStates: string[];  // siglas (ex: "SP", "RJ")
  name: string;
  cnpj: string;              // mascarado no UI; enviar só dígitos ao back
  email: string;
  password: string;
}
```

### `RegisterUserRequest` (proposta — payload final)

```ts
export interface RegisterUserRequest {
  name: string;
  cnpj: string;                // 14 dígitos
  email: string;
  password: string;
  interestedStateIds: string[]; // siglas (ex: "SP", "RJ")
}
```

### `RegisterUserResponse` (proposta)

```ts
export interface RegisterUserResponse {
  user: {
    id: string;
    name: string;
    email: string;
  };
  // Opcional: login automático após cadastro
  tokens?: AuthTokens; // ver contrato-back-auth.md
}
```

## Endpoints

### 1. Registrar usuário (fluxo atual — submit no fim do step 3)

Substitui `completeRegistration()` + persistência local de `isRegistrationComplete`.

```http
POST /users/register
Content-Type: application/json
```

**Body** → `RegisterUserRequest` (campos sem máscara de CNPJ).

**201 Created** → `RegisterUserResponse`

**409 Conflict**
```json
{
  "error": {
    "code": "EMAIL_ALREADY_EXISTS",
    "message": "Este e-mail já está cadastrado."
  }
}
```

**422 Unprocessable Entity** — CNPJ inválido, senha fraca, lista de UFs vazia (`VALIDATION_ERROR` com `fields` opcional).

---

### 2. Verificar disponibilidade de e-mail (opcional)

Útil no step 3 antes de enviar o formulário completo.

```http
GET /users/check-email?email=<email>
```

**200 OK**
```json
{ "available": true }
```

---

### 3. Rascunho de cadastro no servidor (opcional — não implementado no app)

Se no futuro o rascunho sair do dispositivo:

```http
PUT /users/register/draft
Authorization: Bearer <token temporário ou anônimo>
```

**Body** — subset de `SignupDraft`.

**200 OK** → rascunho salvo com `draftId`.

> Hoje o app **não exige** este endpoint; o rascunho continua no `useSignupStore` até decisão explícita do time.

## Integração com IBGE (referência)

| Dado | Origem hoje | Back precisa? |
|------|-------------|----------------|
| Lista de UFs | `GET` IBGE direto no app | Opcional: back pode cachear e expor `GET /locations/states` para unificar |

## Erros padronizados

```json
{
  "error": {
    "code": "EMAIL_ALREADY_EXISTS",
    "message": "Este e-mail já está cadastrado."
  }
}
```

Códigos esperados: `EMAIL_ALREADY_EXISTS`, `CNPJ_ALREADY_EXISTS`, `VALIDATION_ERROR`, `INTERNAL_ERROR`.

## Como o front consome hoje (mock)

| Comportamento | Arquivo / store | Endpoint equivalente |
|---|---|---|
| Listar UFs | `fetchStates()` em `ibge.ts` | IBGE direto ou `GET /locations/states` |
| Salvar rascunho | `useSignupStore` (persist local) | _(opcional)_ `PUT /users/register/draft` |
| Concluir cadastro | `completeRegistration()` | `POST /users/register` |
| Gate onboarding vs login | `isRegistrationComplete` + `useAppEntry` | Após 201, app pode setar flag local ou inferir de `GET /auth/me` |

### Mudanças previstas no app após integração

- `completeRegistration()` chama `POST /users/register` e só então marca cadastro concluído.
- Remover persistência de senha no rascunho local após sucesso.
- Opcional: login automático se o back retornar `tokens` no 201.

## Documentos relacionados

- [Autenticação](./contrato-back-auth.md)
- [Editais](./contrato-back-editais.md) — compatibilidade usa perfil do MEI cadastrado
