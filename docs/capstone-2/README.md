# Capstone 2 — Consulta de editais e detalhe

- **Data de entrega:** 22/05/2026
- **Status:** em andamento

## Escopo

> Fluxo de consulta de editais e detalhe funcionando no app.

## O que já entregamos

| Ticket | Descrição |
|---|---|
| KAN-6  | Tela Home (consulta de editais) — concluída |
| KAN-16 | Mudanças na arquitetura do projeto (`src/` + `docs/` por capstone) — concluída |

### Detalhe do que está no código

- **Home (consulta de editais):** `src/screens/home/HomeScreen.tsx` — usa `SearchHeader`, `FilterTabs`, lista de `OpportunityCard` e o hook `useOpportunities`. Rota em `app/(tabs)/index.tsx` (aba “Explore”).
- **Fonte de dados:** mockada em `src/services/opportunitiesService.ts` (`getRecommendedOpportunities`, `toggleFavoriteOpportunity`).
- **Tipos:** `Opportunity` em `src/types/opportunity.ts`.

## Em andamento

| Ticket | Descrição | Responsável |
|---|---|-------------|
| KAN-17 | Modal da tela Home (detalhe do edital) | João        |
| KAN-15 | Refatorar estados de AsyncStorage para Zustand | Leonardo    |

A camada de **alertas e notificações** (tickets KAN-7 e KAN-8 — Tela de Notificações e Dashboard) está com a dupla e segue para o Capstone 3.

## Pendência de back-end

Como tudo está mockado, foi documentado o contrato esperado do back-end para a parte de editais:

- [Contrato do back-end — Editais](./contrato-back-editais.md)

## Documentos relacionados

- [Contrato do back-end — Editais](./contrato-back-editais.md)
