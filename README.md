# app-painel-MEI-PNCP

Aplicativo mobile para **Microempreendedores Individuais (MEI)** consultar oportunidades de contratação pública disponíveis no **Portal Nacional de Contratações Públicas (PNCP)**.

Desenvolvido com [React Native](https://reactnative.dev/) e [Expo Go](https://expo.dev/go).

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) 18 ou superior
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- Aplicativo **Expo Go** instalado no celular ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) / [iOS](https://apps.apple.com/app/expo-go/id982107779))

## Instalação

```bash
npm install
```

## Executar

```bash
npx expo start
```

Escaneie o QR Code com o aplicativo Expo Go para abrir o app no celular.

## Estrutura do Projeto

```
app-painel-MEI-PNCP/
├── app/                          # Rotas (Expo Router) — permanece na raiz
│   ├── _layout.tsx               # Layout raiz
│   ├── index.tsx                 # Entry / redirecionamento inicial
│   ├── +not-found.tsx            # Tela 404
│   ├── (onboarding)/             # Stack de onboarding
│   ├── (signup)/                 # Stack de cadastro (steps 1–3 + success)
│   └── (tabs)/                   # Navegação por abas (home, buscar)
├── src/                          # Código-fonte da aplicação
│   ├── assets/                   # SVGs, imagens, fontes
│   ├── components/               # Componentes reutilizáveis (Button, OpportunityCard, etc.)
│   ├── hooks/                    # Hooks customizados (useOpportunities, useSignup, ...)
│   ├── screens/                  # Telas (home, onboarding, signup)
│   ├── services/                 # Integrações externas (PNCP, IBGE)
│   ├── stores/                   # Zustand (auth, signup, opportunities, notifications)
│   ├── theme/                    # Tokens de design e estilos globais
│   └── types/                    # Tipagens compartilhadas
├── docs/                         # Documentação por Capstone
│   ├── capstone-1/               # Protótipo navegável + identidade visual (08/05/2026)
│   ├── capstone-2/               # Consulta de editais e detalhe (22/05/2026)
│   ├── capstone-3/               # MVP integrado (05/06/2026)
│   ├── capstone-4/               # Versão candidata + validação
│   └── entrega-final/            # App demonstrável + apresentação
├── app.json                      # Configuração do Expo
├── babel.config.js
├── metro.config.js
├── eslint.config.js
├── package.json
└── tsconfig.json
```

> **Alias de imports:** o alias `@/*` aponta para `./src/*`. Ou seja, `import Button from '@/components/Button/Button'` resolve para `src/components/Button/Button`.

## Documentação

A documentação do projeto está em [`docs/`](./docs), organizada pelos Capstones do Projeto Integrador:

- [Capstone 1 — Protótipo e identidade visual (08/05/2026)](./docs/capstone-1)
- [Capstone 2 — Consulta de editais e detalhe (22/05/2026)](./docs/capstone-2)
- [Capstone 3 — MVP integrado (05/06/2026)](./docs/capstone-3)
- [Capstone 4 — Versão candidata e validação](./docs/capstone-4)
- [Entrega Final](./docs/entrega-final)

## Tecnologias

| Tecnologia | Versão |
|---|---|
| Expo SDK | ~54.0.0 |
| React Native | 0.81.5 |
| Expo Router | ~6.0.23 |
| React | 19.1.0 |
| TypeScript | ^5.3.3 |

## API

O app integra com a [API pública do PNCP](https://www.pncp.gov.br/api/pncp/swagger-ui/index.html) para buscar contratações abertas, e com a [API de localidades do IBGE](https://servicodados.ibge.gov.br/api/docs/localidades) para preenchimento de estados e municípios no cadastro.

## Licença

[MIT](./LICENSE)
