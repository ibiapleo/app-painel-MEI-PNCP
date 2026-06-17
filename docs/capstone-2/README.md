# Capstone 2 — Consulta de editais e detalhe

- **Data de entrega:** 22/05/2026
- **Status:** Concluído

## Escopo

> Fluxo de consulta de editais e detalhe funcionando no app, com autenticação, cadastro e recuperação de senha integrados ao back-end.

## O que já entregamos

| Ticket | Descrição |
|---|---|
| KAN-6  | Tela Home (consulta de editais) — concluída |
| KAN-16 | Mudanças na arquitetura do projeto (`src/` + `docs/` por capstone) — concluída |

### Detalhe do que está no código

**Home (consulta de editais)**

- `src/screens/home/HomeScreen.tsx` — `SearchHeader`, `FilterTabs`, `OpportunityCard`, hook `useOpportunities`.
- Rota: `app/(tabs)/index.tsx` (aba “Explore”).
- Dados via API: `src/services/opportunitiesService.ts` → `useOpportunitiesStore`.
- Tipos: `src/types/opportunity.ts`.

**Estado global — KAN-15**

- Cliente HTTP: `src/services/api.ts` (Axios + interceptor de Bearer token e refresh em `401`).
- Tokens no **Expo SecureStore** (`access_token`, `refresh_token`); perfil em AsyncStorage via `useAuthStore` (persist parcial).
- `useAuthStore` — login/logout/perfil via `authService`; reidratação chama `GET /users/me`.
- `useSignupStore` — rascunho local dos 3 steps; submit final via `POST /users/register` (login automático).
- `useAppEntry` + `app/index.tsx` — roteamento inicial: onboarding → login → tabs.
- Onboarding **sem** persistência de campos (apenas flag `isRegistrationComplete` salva).
- `useOpportunitiesStore` e `useFavoritesStore` — editais e favoritos via back-end.
- `usePasswordRecoveryStore` — estado em memória do fluxo esqueci senha (`resetToken` após verify).
- `useNotificationStore` — **mock local** (integração prevista Capstone 3).
- **`__DEV__`:** em `app/_layout.tsx`, `resetAuthStateForDevReload()` + `skipHydration` na auth — a cada reload no Expo Go a sessão em memória é zerada para facilitar testes de login; tokens no SecureStore permanecem. Em produção isso não executa.

**Autenticação**

- Login: `src/screens/auth/LoginScreen.tsx` → `POST /auth/login` + `GET /users/me`.
- Esqueci senha (3 passos integrados): e-mail → código → nova senha → redirect para login.
  - `ForgotPasswordEmailScreen`, `ForgotPasswordCodeScreen`, `ForgotPasswordNewPasswordScreen`
  - Rotas: `app/(auth)/forgot-password/` (`index`, `code`, `new-password`)

**Cadastro MEI (3 passos)**

- UFs: `GET /locations/states` | CNAEs: `GET /cnpj/cnaes` | Registro: `POST /users/register`.
- Hook: `src/hooks/useSignup.ts` | Store: `useSignupStore`.

## Integração com back-end

Base URL configurada em `.env`:

```env
EXPO_PUBLIC_API_URL=https://licitafacil.brazilsouth.cloudapp.azure.com/api/v1
```

Camada de serviços: `src/services/api.ts`, `authService.ts`, `opportunitiesService.ts`.

| Domínio | Status | Serviço / store | Contrato |
|---------|--------|-----------------|----------|
| Login, sessão, perfil | Integrado | `authService`, `useAuthStore` | [contrato-back-auth.md](./contrato-back-auth.md) |
| Cadastro MEI | Integrado | `authService`, `useSignup` | [contrato-back-cadastro.md](./contrato-back-cadastro.md) |
| Recuperação de senha | Integrado | `authService`, telas forgot-password | [contrato-back-recuperacao-senha.md](./contrato-back-recuperacao-senha.md) |
| Editais e favoritos | Integrado | `opportunitiesService`, stores Home/Painel | [contrato-back-editais.md](./contrato-back-editais.md) |
| Notificações | Mock local | `useNotificationStore` | [contrato-back-notificacoes.md](./contrato-back-notificacoes.md) |

### Endpoints em uso (resumo)

| Método | Rota | Uso no app |
|--------|------|------------|
| `POST` | `/auth/login` | Login |
| `POST` | `/auth/logout` | Logout |
| `POST` | `/refresh` | Refresh automático (interceptor) |
| `GET` | `/users/me` | Perfil autenticado |
| `PATCH` | `/users/me` | Atualizar nome / UFs |
| `PATCH` | `/users/me/cnpj` | Atualizar CNPJ |
| `GET` | `/users/check-email` | Disponibilidade de e-mail (cadastro) |
| `POST` | `/users/register` | Cadastro MEI + tokens |
| `GET` | `/locations/states` | UFs no step 1 |
| `GET` | `/cnpj/cnaes` | CNAEs no step 2 |
| `POST` | `/auth/password-reset/request` | Solicitar / reenviar código |
| `POST` | `/auth/password-reset/verify` | Validar código |
| `POST` | `/auth/password-reset/complete` | Nova senha |
| `GET` | `/opportunities/recommended` | Aba “Pra você” |
| `GET` | `/opportunities` | Busca por texto |
| `GET` | `/opportunities/region` | Aba “Região” |
| `GET` | `/opportunities/value` | Aba “Valor” |
| `GET` | `/opportunities/term` | Aba “Prazo” |
| `GET` | `/opportunities/:id` | Modal de detalhe |
| `PATCH` | `/opportunities/:id/favorite` | Favoritar |
| `GET` | `/opportunities/favorites/list` | Painel de favoritos |

Erros da API seguem formato FastAPI (`detail`); o app usa `getApiErrorMessage()` para exibir mensagens legíveis.

## Tasks feitas

| Ticket | Descrição | Responsável |
|---|---|---|
| KAN-17 | Modal da tela Home (detalhe do edital) | João |
| KAN-18 | Finalizar entrega da UI de login (`LoginScreen`), formulário + erros de autenticação. | Leo |
| KAN-19 | Finalizar entrega do fluxo completo: e-mail → código de confirmação → nova senha → retorno ao login. | Leo |

## Documentos relacionados

- [Contrato — Editais](./contrato-back-editais.md)
- [Contrato — Auth](./contrato-back-auth.md)
- [Contrato — Recuperação de senha](./contrato-back-recuperacao-senha.md)
- [Contrato — Cadastro](./contrato-back-cadastro.md)
- [Contrato — Notificações](./contrato-back-notificacoes.md)
