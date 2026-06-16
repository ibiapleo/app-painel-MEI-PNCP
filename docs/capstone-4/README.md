# Capstone 4 — Versão candidata

- **Data de entrega:** 13/06/2026
- **Status:** concluído

## Escopo

> Versão candidata com validação em dispositivos e feedback de usuários.

## O que foi entregue

- **Modo escuro** — suporte a tema claro/escuro em todo o app.
- **Notificações** — sistema de disparo automático e tela de notificações.
- **Otimizações no painel** — melhorias de performance e usabilidade na tela de painel.
- **Mudanças nos cards de editais** — atualização visual e de informações nos cards de oportunidades.
- **Mudança no modal de editais** — modal de detalhe do edital em tela cheia com ajustes de layout e safe area.
- **Modal de filtros** — filtros avançados para busca de editais (região, valor, compatibilidade, etc.).

## No código

- **Tema claro/escuro:** `src/stores/theme/useThemeStore.ts`, `src/theme/themes.ts`, `src/hooks/useTheme.ts`
- **Notificações:** `src/screens/notifications/NotificationsScreen.tsx`, `src/hooks/useNotificationTimer.ts`, `src/stores/notifications/useNotificationsStore.ts`
- **Painel:** `src/screens/painel/PainelScreen.tsx`, `src/hooks/useFavorites.ts`
- **Cards de editais:** `src/components/OpportunityCard/OpportunityCard.tsx`, `src/components/CompatibilityBadge/CompatibilityBadge.tsx`
- **Modal de edital:** `src/components/EditalDetailsModal/EditalDetailsModal.tsx`
- **Modal de filtros:** `src/components/FilterModal/FilterModal.tsx`, `src/stores/filters/useFiltersStore.ts`
- **Home (integração):** `src/screens/home/HomeScreen.tsx`
