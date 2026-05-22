Feature: Lista de Editais e Filtros para Smartphone
  Como um usuário que busca oportunidades
  Eu quero visualizar editais e aplicar filtros de forma rápida e adaptada à tela pequena
  Para encontrar os editais mais relevantes sem dificuldade de navegação

  Cenário: Visualizar lista de editais ordenada por data limite
    Dado que estou logado na tela inicial
    Quando a lista de editais é carregada
    Então vejo cada edital com título, órgão responsável e data limite
    E a ordenação padrão é por data limite (mais próximo primeiro)

  Cenário: Aplicar filtros otimizados para toque
    Dado que estou na tela inicial
    Quando toco no ícone de filtros
    Então é exibida uma modal com opções de filtro (área, região, status)
    E posso selecionar múltiplos filtros com botões grandes
    E ao aplicar, a lista é atualizada sem recarregar a página

  Cenário: Limpar filtros rapidamente
    Dado que tenho filtros aplicados na lista
    Quando toco em "Limpar filtros"
    Então todos os filtros são removidos
    E vejo a lista completa novamente

  Cenário: Busca por texto com teclado otimizado
    Dado que estou na tela inicial
    Quando toco na barra de busca
    Então o teclado numérico ou alfabético aparece conforme o campo
    E ao digitar parte do título do edital, os resultados são filtrados em tempo real