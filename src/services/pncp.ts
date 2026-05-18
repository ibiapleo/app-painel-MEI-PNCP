/**
 * Serviço para integração com a API do PNCP
 * Portal Nacional de Contratações Públicas
 * Documentação: https://www.pncp.gov.br/api/pncp/swagger-ui/index.html
 */

const BASE_URL = 'https://pncp.gov.br/api/pncp/v1';

export interface ContratacaoItem {
  numeroControlePNCP: string;
  orgaoEntidade: {
    cnpj: string;
    razaoSocial: string;
  };
  descricao: string;
  valorTotalEstimado?: number;
  dataPublicacaoPncp: string;
  situacaoCompradorId: number;
}

export interface BuscaResponse {
  data: ContratacaoItem[];
  totalRegistros: number;
  totalPaginas: number;
  numeroPagina: number;
  qtdRegistrosPagina: number;
}

export async function buscarContratacoesMEI(
  termoBusca: string,
  pagina = 1,
  tamanhoPagina = 10,
): Promise<BuscaResponse> {
  const params = new URLSearchParams({
    q: termoBusca,
    pagina: String(pagina),
    tamanhoPagina: String(tamanhoPagina),
    status: 'recebendo_propostas',
  });

  const response = await fetch(`${BASE_URL}/contratacoes/publicacoes?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`Erro ao buscar contratações: ${response.status}`);
  }

  return response.json() as Promise<BuscaResponse>;
}
