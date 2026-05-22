Feature: Dashboard e Histórico de Andamento
  Como um usuário que acompanha vários editais
  Eu quero ver de forma resumida o andamento de cada um
  Para ter uma visão geral do meu progresso

  Cenário: Visualizar resumo dos editais acompanhados
    Dado que estou logado na dashboard
    Quando vejo a seção "Meus editais"
    Então cada edital aparece com: título, status (em análise, aprovado, eliminado), última movimentação
    E uma barra de progresso de etapas concluídas

  Cenário: Filtrar histórico por status no dashboard
    Dado que tenho editais com diferentes status
    Quando seleciono o filtro "Aprovados"
    Então vejo apenas os editais aprovados
    E o título indica quantos foram aprovados

  Cenário: Acessar detalhes rápidos pelo dashboard
    Dado que vejo o resumo de um edital
    Quando toco em "Ver detalhes"
    Então sou levado para a tela de detalhe daquele edital
    E mantenho o dashboard na navegação de volta

  Cenário: Gráfico de desempenho por área
    Dado que estou na dashboard
    Quando rolo para a seção "Seu desempenho"
    Então vejo um gráfico simples (ex: pizza ou barras)
    Mostrando quantos editais fui elegível, aprovado, não aprovado