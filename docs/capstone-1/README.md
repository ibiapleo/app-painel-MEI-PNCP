# Capstone 1 — Protótipo e identidade visual

- **Data de entrega:** 08/05/2026
- **Status:** Concluído

## Escopo

> Protótipo navegável com fluxos principais e identidade visual do app. [[Protótipo]](https://www.figma.com/proto/Ch3l5K1T688Ns3viCpJXcj/LicitaF%C3%A1cil?node-id=13-6872&t=CSjO7YkjqTIgp2hK-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=7%3A1649&show-proto-sidebar=1)
[[Figma]](https://www.figma.com/design/Ch3l5K1T688Ns3viCpJXcj/LicitaF%C3%A1cil?node-id=0-1&p=f&t=QKCcjL9jnL3GIB49-0)

## O que entregamos

Além do protótipo começamos a configuração do repositório e do projeto.

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
