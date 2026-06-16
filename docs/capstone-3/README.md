# Capstone 3 — MVP integrado

- **Data de entrega:** 05/06/2026
- **Status:** entregue

## Escopo

> MVP integrado com checklist, documentos, alertas e dashboard.

## O que foi entregue

- Tela de Notificações (KAN-7) — implementada.
- Tela de Dashboard / Painel (KAN-8) — implementada.
- Integração inicial entre notificações e painel — implementada.
- Lógica de logout — sessão e redirecionamento finalizados.
- Integração parcial de rotas e estados compartilhados com o resto do app.

## Pendências

- Requisitos de acessibilidade (KAN-12) — em estudo para implementação.
- Implementação de acessibilidade básica (KAN-13) — pendente.

## No código

- **Painel (Dashboard):** [app/(tabs)/painel.tsx](app/(tabs)/painel.tsx) → `src/screens/painel/PainelScreen.tsx` (exibe `FavoritesCalendar`, `FavoriteCard` e consome `useFavorites`).
- **Notificações:** [app/(notifications)/notifications.tsx](app/(notifications)/notifications.tsx) → `src/screens/notifications/NotificationsScreen.tsx` (usa `src/components/NotificationCard/NotificationCard.tsx` e `useNotifications`).
- **Logout / sessão:** `src/stores/auth/useAuthStore.ts` (método `logout`) e `src/services/authService.ts` (invalidação de tokens / chamada `POST /auth/logout`).
- **Hooks / stores relacionados:** `src/hooks/useFavorites.ts`, `src/hooks/useNotifications.ts` e stores em `src/stores/` (`favorites`, `notifications`, `auth`).
- **Componentes reutilizados:** `src/components/FavoriteCard/FavoriteCard.tsx`, `src/components/FavoritesCalendar/FavoritesCalendar.tsx`, `src/components/NotificationCard/NotificationCard.tsx`.
- **Identidade visual e tokens:** `src/theme/tokens.ts` e `src/theme/globalStyles.ts` (cores, tipografia e spacing usados nas telas).



