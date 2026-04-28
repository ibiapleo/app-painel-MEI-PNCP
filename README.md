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
├── app/                    # Rotas (Expo Router)
│   ├── _layout.tsx         # Layout raiz
│   ├── +not-found.tsx      # Tela 404
│   └── (tabs)/
│       ├── _layout.tsx     # Navegação por abas
│       ├── index.tsx       # Tela principal (Painel)
│       └── buscar.tsx      # Tela de busca
├── components/             # Componentes reutilizáveis
│   ├── ThemedText.tsx
│   ├── ThemedView.tsx
│   ├── HapticTab.tsx
│   └── ui/
│       ├── IconSymbol.tsx
│       └── TabBarBackground.tsx
├── constants/
│   └── Colors.ts           # Paleta de cores (claro/escuro)
├── hooks/
│   ├── useColorScheme.ts
│   └── useThemeColor.ts
├── services/
│   └── pncp.ts             # Integração com a API do PNCP
├── assets/
│   ├── fonts/
│   └── images/
├── app.json                # Configuração do Expo
├── babel.config.js
├── package.json
└── tsconfig.json
```

## Tecnologias

| Tecnologia | Versão |
|---|---|
| Expo SDK | ~53.0.0 |
| React Native | 0.76.7 |
| Expo Router | ~4.0.17 |
| TypeScript | ^5.3.3 |

## API

O app integra com a [API pública do PNCP](https://www.pncp.gov.br/api/pncp/swagger-ui/index.html) para buscar contratações abertas.

## Licença

[MIT](./LICENSE)
