# Contrato do back-end — Editais

> **Status:** Concluído. <br>Dados consumidos via `src/services/opportunitiesService.ts` (Axios + `EXPO_PUBLIC_API_URL`). Todas as rotas exigem `Authorization: Bearer <access_token>`.

## Origem dos dados

A fonte primária é a [API pública do PNCP](https://www.pncp.gov.br/api/pncp/swagger-ui/index.html). O back-end interno **agrega, enriquece e expõe** esses dados para o app, aplicando regras de compatibilidade com o perfil do MEI autenticado.

## Tipos compartilhados

Definidos em `src/types/opportunity.ts`:

### `Opportunity` (lista / cards)

```ts
export interface Opportunity {
  id: string;
  title: string;
  company: string;           // nome do órgão
  location: string;          // "Cidade/UF"
  description: string;
  estimatedValue: number;
  closingDate: string;       // ISO 8601
  daysRemaining: number;     // calculado no back
  isExpired: boolean;
  compatibilityLabel: string;
  isFavorite: boolean;
}
```

### `OpportunityDetail` (modal de detalhe)

```ts
export interface OpportunityDetail extends Opportunity {
  pncpId: string;
  pncpUrl: string;
  agency: {
    name: string;
    cnpj: string;
    unit: string;
  };
  modality: string;
  objectFull: string;
  judgementCriterion: string;
  openingDate: string;
  closingDate: string;
  proposalsOpeningDate: string;
  categories: OpportunityCategory[];
  compatibility: {
    score: number;
    label: string;
    reasons: string[];
  };
  status: string;
}
```

### `PaginatedOpportunities`

```ts
export interface PaginatedOpportunities {
  items: Opportunity[];
  page: number;
  pageSize: number;
  total: number;
}
```

## Endpoints

### 1. Editais recomendados (“Pra você”)

Usado por `getRecommendedOpportunities()` → aba **Pra você** e busca vazia.

```http
GET /opportunities/recommended?page=1&pageSize=20
Authorization: Bearer <access_token>
```

**200 OK** → `PaginatedOpportunities`

---

### 2. Busca por texto

Usado por `searchOpportunities()`.

```http
GET /opportunities?search=<texto>&page=1&pageSize=20
Authorization: Bearer <access_token>
```

**200 OK** → `PaginatedOpportunities`

---

### 3. Filtros por aba (Home)

| Aba no app | Função | Endpoint |
|------------|--------|----------|
| Região | `getOpportunitiesByRegion()` | `GET /opportunities/region?page=&pageSize=` |
| Valor | `getOpportunitiesByValue()` | `GET /opportunities/value?page=&pageSize=` |
| Prazo | `getOpportunitiesByTerm()` | `GET /opportunities/term?page=&pageSize=` |

**200 OK** → `PaginatedOpportunities`

---

### 4. Detalhe do edital (modal)

Usado por `getOpportunityDetail()`.

```http
GET /opportunities/:id
Authorization: Bearer <access_token>
```

**200 OK** → `OpportunityDetail`

**404 Not Found** — edital inexistente ou removido.

---

### 5. Favoritar / desfavoritar

Usado por `toggleFavoriteOpportunity()` na Home e no Painel.

```http
PATCH /opportunities/:id/favorite
Authorization: Bearer <access_token>
```

**200 OK**
```json
{ "id": "<id>", "isFavorite": true }
```

---

### 6. Listar favoritos (Painel)

Usado por `getFavoriteOpportunities()`.

```http
GET /opportunities/favorites/list?page=1&pageSize=50
Authorization: Bearer <access_token>
```

**200 OK** → `PaginatedOpportunities`

## Erros

Formato FastAPI (`detail`). Exemplos tratados nas stores:

```json
{ "detail": "Não foi possível carregar os editais recomendados." }
```

**401 Unauthorized** — dispara refresh automático via interceptor; se falhar, usuário é deslogado.

## Como o front consome

| Função | Arquivo | Store / tela |
|---|---|---|
| `getRecommendedOpportunities()` | `opportunitiesService.ts` | `useOpportunitiesStore` — aba Pra você |
| `searchOpportunities()` | `opportunitiesService.ts` | `useOpportunitiesStore.search()` |
| `getOpportunitiesByRegion/Value/Term()` | `opportunitiesService.ts` | `useOpportunitiesStore.changeTab()` |
| `getOpportunityDetail()` | `opportunitiesService.ts` | `HomeScreen`, `PainelScreen` (modal) |
| `toggleFavoriteOpportunity()` | `opportunitiesService.ts` | `useOpportunitiesStore`, `useFavoritesStore` |
| `getFavoriteOpportunities()` | `opportunitiesService.ts` | `useFavoritesStore` — Painel |

Ordenação local: abas **Pra você** e **Prazo** aplicam `sortOpportunitiesByDeadline()` após receber os itens.

## Documentos relacionados

- [Autenticação](./contrato-back-auth.md) — token Bearer obrigatório
- [Cadastro](./contrato-back-cadastro.md) — perfil/CNAEs usados na compatibilidade
