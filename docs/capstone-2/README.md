# Capstone 2 — Consulta de editais e detalhe

- **Data de entrega:** 22/05/2026
- **Status:** Concluído

## Escopo

> Fluxo de consulta de editais e detalhe funcionando no app.

## O que já entregamos

| Ticket | Descrição |
|---|---|
| KAN-6  | Tela Home (consulta de editais) — concluída |
| KAN-16 | Mudanças na arquitetura do projeto (`src/` + `docs/` por capstone) — concluída |

### Detalhe do que está no código

**Home (consulta de editais)**

- `src/screens/home/HomeScreen.tsx` — `SearchHeader`, `FilterTabs`, `OpportunityCard`, hook `useOpportunities` (store `useOpportunitiesStore`, mock).
- Rota: `app/(tabs)/index.tsx` (aba “Explore”).
- Dados mock: `src/services/opportunitiesService.ts`.
- Tipos: `src/types/opportunity.ts`.

**Estado global — KAN-15**

- Remoção de `src/services/localAuth.ts`; persistência via Zustand + `persist` (AsyncStorage só como backend).
- `useAuthStore` — sessão mock, `mockPassword`, login/logout, `updatePassword`, hidratação e expiração de sessão (7 dias).
- `useSignupStore` — cadastro concluído + rascunho dos 3 steps (`@licitafacil/signup`).
- `useAppEntry` + `app/index.tsx` — roteamento inicial: onboarding → login → tabs.
- Onboarding **sem** persistência (exibido apenas enquanto `isRegistrationComplete === false`).
- `useOpportunitiesStore` e `useNotificationsStore` — em memória, preparadas para API.
- `usePasswordRecoveryStore` — estado em memória do fluxo esqueci senha (entre telas).
- **`__DEV__`:** em `app/_layout.tsx`, `resetAuthStateForDevReload()` + `skipHydration` na auth — a cada reload no Expo Go a sessão é zerada para facilitar testes de login, mas o cadastro (`signup`) permanece salvo. Em produção isso não executa.

**Autenticação (lógica e rotas — UI com tasks próprias abaixo)**

- Login mock: `src/screens/auth/LoginScreen.tsx`, rota `app/(auth)/login`.
- Esqueci senha (3 passos, mock código `0000`): e-mail → código → nova senha → redirect para login.
  - `ForgotPasswordEmailScreen`, `ForgotPasswordCodeScreen`, `ForgotPasswordNewPasswordScreen`
  - Rotas: `app/(auth)/forgot-password/` (`index`, `code`, `new-password`)

## Tasks feitas

| Ticket | Descrição | Responsável |
|---|---|-------------|
| KAN-17 | Modal da tela Home (detalhe do edital) | João |
| KAN-18 | Finalizar entrega da UI de login (`LoginScreen`), formulário + erros de autenticação. | Leo |
| KAN-19 | Finalizar entrega do fluxo completo: e-mail → código de confirmação (mock `0000`) → nova senha → retorno ao login. | Leo |

## Pendência de back-end

Contratos em rascunho (formato alinhado ao de editais). O app ainda consome mocks nas stores/services; os `.md` descrevem o que o back deve expor na integração.

| Domínio | Documento |
|---------|-----------|
| Visão geral / mapa | [contrato-back-visao-geral.md](./contrato-back-visao-geral.md) |
| Editais | [contrato-back-editais.md](./contrato-back-editais.md) |
| Login e sessão | [contrato-back-auth.md](./contrato-back-auth.md) |
| Recuperação de senha | [contrato-back-recuperacao-senha.md](./contrato-back-recuperacao-senha.md) |
| Cadastro MEI | [contrato-back-cadastro.md](./contrato-back-cadastro.md) |
| Notificações (Cap. 3) | [contrato-back-notificacoes.md](./contrato-back-notificacoes.md) |

## Documentos relacionados

- [Contrato — Editais](./contrato-back-editais.md)
- [Contrato — Auth](./contrato-back-auth.md)
- [Contrato — Recuperação de senha](./contrato-back-recuperacao-senha.md)
- [Contrato — Cadastro](./contrato-back-cadastro.md)
