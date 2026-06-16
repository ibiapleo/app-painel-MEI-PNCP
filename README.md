# LicitaFácil

Aplicativo mobile para **Microempreendedores Individuais (MEI)** consultarem oportunidades de contratação pública integradas ao **Portal Nacional de Contratações Públicas (PNCP)**.

O app oferece onboarding, autenticação, cadastro, exploração de editais com filtros, painel de favoritos, notificações e configurações (tema claro/escuro, termos e política de privacidade).

Desenvolvido com [React Native](https://reactnative.dev/), [Expo](https://expo.dev/) (SDK 54) e [Expo Router](https://docs.expo.dev/router/introduction/).

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) **18+** (recomendado: LTS)
- [npm](https://www.npmjs.com/) ou outro gerenciador compatível
- Para testar em dispositivo físico: app **Expo Go** com **SDK 54**
  - [Android](https://expo.dev/go?sdkVersion=54&platform=android&device=true)
  - [iOS](https://apps.apple.com/app/expo-go/id982107779)



---

## Rodar localmente

### 1. Clonar o repositório

```bash
git clone https://github.com/ibiapleo/app-painel-MEI-PNCP.git
cd app-painel-MEI-PNCP
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
EXPO_PUBLIC_API_URL=https://licitafacil.brazilsouth.cloudapp.azure.com/api/v1
```

### 4. Iniciar o servidor de desenvolvimento

```bash
npx expo start --lan --go
```
Escaneie o QR Code com o aplicativo Expo Go (Android) ou com a Câmera do celular (iOS) para abrir o 
app no celular.
Comandos úteis:

| Comando | Descrição |
|---|---|
| `npx expo start --go` | Força o uso do **Expo Go** |
| `npx expo start --lan` | Usa o IP da rede local (recomendado no Android) |
| `npx expo start --tunnel` | Túnel via internet (quando LAN não funciona) |
| `npx expo start -c` | Limpa o cache |


**Android:** se aparecer erro de conexão, verifique se a porta **8081** está liberada no firewall do computador e se o Expo Go está na versão do **SDK 54**.

### 6. Lint e TypeScript

```bash
npm run lint
npx tsc --noEmit
```

---

## Estrutura do projeto

```
app-painel-MEI-PNCP/
├── app/                              # Rotas (Expo Router)
│   ├── _layout.tsx                   # Layout raiz + providers
│   ├── index.tsx                     # Entry / redirecionamento inicial
│   ├── (onboarding)/                 # Fluxo de onboarding
│   ├── (auth)/                       # Login e recuperação de senha
│   │   ├── login.tsx
│   │   └── forgot-password/          # E-mail, código e nova senha
│   ├── (signup)/                     # Cadastro (steps 1–3 + sucesso)
│   ├── (tabs)/                       # Abas autenticadas
│   │   ├── index.tsx                 # Explore (home / editais)
│   │   ├── painel.tsx                # Painel de favoritos
│   │   └── settings.tsx              # Perfil e configurações
│   └── (notifications)/              # Central de notificações
├── src/
│   ├── assets/                       # SVGs e ilustrações
│   ├── components/                   # Componentes reutilizáveis
│   ├── hooks/                        # Hooks customizados
│   ├── screens/                      # Telas por domínio
│   │   ├── auth/
│   │   ├── home/
│   │   ├── notifications/
│   │   ├── onboarding/
│   │   ├── painel/
│   │   ├── settings/
│   │   └── signup/
│   ├── services/                     # API, auth e oportunidades
│   ├── stores/                       # Estado global (Zustand)
│   ├── theme/                        # Tokens, temas claro/escuro
│   ├── types/                        # Tipagens compartilhadas
│   └── utils/                        # Funções utilitárias
├── docs/                             # Documentação por Capstone
├── use-cases/                        # Cenários BDD (.feature)
├── app.json                          # Configuração do Expo
├── babel.config.js
├── metro.config.js
├── eslint.config.js
├── package.json
└── tsconfig.json
```

---

## Funcionalidades principais

- Onboarding inicial no app
- Login, cadastro e recuperação de senha
- Listagem e filtros de oportunidades (editais)
- Detalhe do edital, compatibilidade e favoritos
- Painel com calendário de favoritos
- Notificações automáticas (mock/timer local)
- Tema claro e escuro
- Termos de uso e política de privacidade

---

## Documentação

Documentação detalhada em [`docs/`](./docs):

- [Capstone 1 — Protótipo e identidade visual](./docs/capstone-1)
- [Capstone 2 — Consulta de editais e detalhe](./docs/capstone-2)
- [Capstone 3 — MVP integrado](./docs/capstone-3)
- [Capstone 4 — Versão candidata e validação](./docs/capstone-4)
- [Entrega final](./docs/entrega-final)

Contratos de API do backend estão em `docs/capstone-2/`.

---

## Tecnologias

| Tecnologia | Versão |
|---|---|
| Expo SDK | ~54.0.0 |
| React Native | 0.81.5 |
| Expo Router | ~6.0.23 |
| React | 19.1.0 |
| TypeScript | ^5.3.3 |
| Zustand | ^5.0.13 |
| Axios | ^1.16.1 |

---

## Integrações

| Serviço | Uso |
|---|---|
| API backend (`EXPO_PUBLIC_API_URL`) | Autenticação, cadastro, editais e notificações |


---

## Licença

[MIT](./LICENSE)
