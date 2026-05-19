# Capstone 1 — Protótipo e identidade visual

- **Data de entrega:** 08/05/2026
- **Status:** concluído

## Escopo

> Protótipo navegável com fluxos principais e identidade visual do app.

## O que entregamos

Tickets concluídos do board (Equipe 2):

| Ticket | Descrição |
|---|---|
| KAN-9  | Organização da arquitetura frontend |
| KAN-10 | Configuração do repositório frontend |
| KAN-11 | Configuração de GitHub Actions no frontend |
| KAN-4  | Telas de Registro |
| KAN-5  | Telas de Onboarding |
| KAN-14 | Correção do bug de versão do Expo |

## No código

- **Onboarding:** `src/screens/onboarding/OnboardingScreen.tsx` + rota `app/(onboarding)/index.tsx`.
- **Cadastro (3 passos + sucesso):** `src/screens/signup/StepOneScreen.tsx`, `StepTwoScreen.tsx`, `StepThreeScreen.tsx`, `SuccessScreen.tsx` + rotas em `app/(signup)/`.
- **Identidade visual:** tokens de design em `src/theme/tokens.ts` e estilos globais em `src/theme/globalStyles.ts`.
- **Componentes base criados:** `Button`, `StepIndicator`, `SearchComponent` em `src/components/`.
- **Assets:** SVGs de onboarding (`Onboarding-1..4.svg`) e cadastro (`CreateYourAccount.svg`) em `src/assets/`.

## CI/CD

- Workflow `CI - Type Check & Lint` em `.github/workflows/ci.yml` rodando `tsc --noEmit` e `npm run lint` em push/PR para `main` e `develop`.
- Job de `npm audit` para auditoria de segurança.
