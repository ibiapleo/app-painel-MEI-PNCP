# Entrega Final

- **Data de entrega:** a definir
- **Status:** concluído

## Escopo

> App demonstrável, repositório organizado, documentação e apresentação integradas.

> Material da apresentação e checklist final serão consolidados aqui no fechamento do projeto.

## O que foi entregue

Além das entregas dos capstones anteriores (consulta de editais, autenticação, painel, notificações, modo escuro, filtros e demais funcionalidades do MVP), a entrega final consolidou:

- **Configurações de `KeyboardAvoidingView`** — ajustes na tela de login para evitar que o teclado cubra os campos de entrada no Android e iOS.
- **Adequação de registro e políticas de privacidade no app** — fluxo de cadastro alinhado ao backend, termos de uso no signup e política de privacidade acessível nas configurações.
- **Edição de dados do perfil do usuário** — atualização dos dados do perfil pelo app.
- **Build do app configurada para Android e iOS** — projeto preparado para geração de build nativo em ambas as plataformas (Expo / EAS).

## No código

- **Teclado (login):** `src/screens/auth/LoginScreen.tsx`
- **Cadastro:** `src/screens/signup/`, `src/hooks/useSignup.ts`, `src/stores/auth/useSignUpStore.ts`
- **Termos de uso:** `src/components/TermsModal/TermsModal.tsx` (signup)
- **Política de privacidade:** `src/components/PrivacyPolicyModal/PrivacyPolicyModal.tsx`, `src/screens/settings/SettingsScreen.tsx`
- **Perfil do usuário:** `src/screens/settings/SettingsScreen.tsx`, `src/stores/auth/useAuthStore.ts`, `src/services/authService.ts`
- **Build / Expo:** `app.json`, `package.json`, `expo-dev-client`

## Repositório e documentação

- README geral do projeto com instruções de execução local
- Documentação organizada por capstone em [`docs/`](../)
- Release **1.0** integrada na branch `main`
