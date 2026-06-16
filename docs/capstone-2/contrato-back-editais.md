# Contrato do back-end — Editais

> **Status:** rascunho. Os dados hoje vêm de `src/services/opportunitiesService.ts` (mockados). Este documento descreve o contrato que o back-end deve expor para substituir o mock.

## Origem dos dados

A fonte primária é a [API pública do PNCP](https://www.pncp.gov.br/api/pncp/swagger-ui/index.html). O back-end interno do projeto **agrega, enriquece e expõe** esses dados para o app, aplicando regras de compatibilidade com o perfil do MEI.

## Tipos compartilhados

### `Opportunity` (resumo, usado na lista)

Já existe em `src/types/opportunity.ts`:

```ts
export interface Opportunity {
  id: string;
  title: string;
  company: string;       // nome do órgão
  location: string;      // "Cidade/UF"
  description: string;   // resumo curto (1–2 linhas)
  estimatedValue: number;
  daysRemaining: number; // calculado a partir da data limite
  compatibilityLabel: string; // ex: "Altamente Compatível"
  isFavorite: boolean;   // por usuário autenticado
}
```

### `OpportunityDetail` (proposta — usado no modal)

Estende `Opportunity` com os campos necessários para a tela de detalhe:

```ts
export interface OpportunityDetail extends Opportunity {
  // Identificação no PNCP
  pncpId: string;            // "numeroControlePncp"
  pncpUrl: string;           // link para o edital no portal PNCP

  // Órgão
  agency: {
    name: string;            // razão social
    cnpj: string;
    unit: string;            // unidade compradora
  };

  // Modalidade / objeto
  modality: string;          // ex: "Pregão eletrônico", "Dispensa", etc.
  objectFull: string;        // descrição completa do objeto
  judgementCriterion: string; // ex: "Menor preço"

  // Datas
  openingDate: string;       // ISO 8601
  closingDate: string;       // ISO 8601 — base de cálculo de daysRemaining
  proposalsOpeningDate?: string;

  // Anexos
  attachments: Array<{
    name: string;
    url: string;
    sizeBytes?: number;
    mimeType?: string;
  }>;

  // Compatibilidade
  compatibility: {
    score: number;           // 0..100
    label: string;            // mesmo da `compatibilityLabel`
    reasons: string[];        // explicações curtas: "Atende ao CNAE", "Localização compatível", etc.
  };

  // Status do edital
  status: 'aberto' | 'encerrado' | 'suspenso' | 'cancelado';
}
```

## Endpoints

### 1. Listar oportunidades recomendadas

Usado por `getRecommendedOpportunities()` (home).

```http
GET /opportunities/recommended
Authorization: Bearer <token>
```

**200 OK**
```json
[
  { /* Opportunity */ }
]
```

### 2. Buscar oportunidades

Usado pela tela de busca (Capstone 2 / refinamento Capstone 3).

```http
GET /opportunities
  ?search=<texto livre>
  &state=<UF>
  &city=<municipio>
  &modality=<modalidade>
  &minValue=<numero>
  &maxValue=<numero>
  &compatibility=<min_score 0..100>
  &page=<n>
  &pageSize=<n>
Authorization: Bearer <token>
```

**200 OK**
```json
{
  "items": [ /* Opportunity[] */ ],
  "page": 1,
  "pageSize": 20,
  "total": 132
}
```

### 3. Detalhe do edital (modal)

Usado pelo modal de detalhe.

```http
GET /opportunities/:id
Authorization: Bearer <token>
```

**200 OK** → `OpportunityDetail`

**404 Not Found** quando o edital não existir ou tiver sido removido.

### 4. Favoritar / desfavoritar

Usado por `toggleFavoriteOpportunity()`.

```http
PATCH /opportunities/:id/favorite
Authorization: Bearer <token>
```

**200 OK**
```json
{ "id": "<id>", "isFavorite": true }
```

### 5. Listar favoritos (a definir)

```http
GET /opportunities/favorites
Authorization: Bearer <token>
```

**200 OK** → `Opportunity[]`

## Erros padronizados

Todas as respostas de erro seguem:

```json
{
  "error": {
    "code": "OPPORTUNITY_NOT_FOUND",
    "message": "Edital não encontrado."
  }
}
```

Códigos esperados: `UNAUTHORIZED`, `OPPORTUNITY_NOT_FOUND`, `VALIDATION_ERROR`, `INTERNAL_ERROR`.

## Pendências / decisões em aberto

- [ ] Confirmar formato de `daysRemaining`: calculado no back ou no front a partir de `closingDate`?
- [ ] Definir paginação para `/opportunities/recommended` (hoje retorna lista inteira).
- [ ] Definir esquema de compatibilidade (`score` e `reasons`) com a dupla — depende de quais campos do perfil do MEI são considerados.
- [ ] Confirmar se anexos serão proxy do PNCP ou link direto.
- [ ] Confirmar política de cache no app (revalidar a cada N min? pull-to-refresh?).

## Como o front consome hoje (mock)

| Função | Arquivo | Endpoint equivalente |
|---|---|---|
| `getRecommendedOpportunities()` | `src/services/opportunitiesService.ts` | `GET /opportunities/recommended` |
| `toggleFavoriteOpportunity(id)` | `src/services/opportunitiesService.ts` | `PATCH /opportunities/:id/favorite` |
| _(a criar)_ `getOpportunityById(id)` | `src/services/opportunitiesService.ts` | `GET /opportunities/:id` |
