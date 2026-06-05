  Feature: Painel de Acompanhamento de Editais
    Como um fornecedor/participante de processos licitatórios
    Eu quero visualizar meus editais acompanhados em um painel centralizado
    Para monitorar datas, valores e status sem precisar consultar cada edital individualmente

  Cenário: Visualizar resumo de novos editais e categoria em alta
    Dado que estou na aba painel
    Então vejo um card de destaque com o total de "Novos Editais" disponíveis
    E a "Categoria em Alta" do momento (ex: Climatização)

  Cenário: Navegar pelo calendário de editais
    Dado que estou na aba painel
    Quando visualizo o "Meu Calendário Mensal"
    Então os dias com editais são destacados com um indicador visual
    E ao tocar em uma data marcada
    Vejo o(s) edital(is) daquele dia com título, órgão, localização e valor estimado
    E o status atual do edital (ex: "Em andamento")

  Cenário: Filtrar editais acompanhados por status
    Dado que estou na seção "Seus editais"
    Quando seleciono a aba "Em andamento"
    Então vejo apenas os editais com status ativo
    E quando seleciono "Encerrados"
    Vejo apenas os editais cujo prazo já foi encerrado

  Cenário: Visualizar card de edital na lista
    Dado que estou em "Seus editais"
    Então cada card exibe: título do objeto licitado, nome do órgão responsável,
    localização (cidade/UF), valor estimado e status atual
    E ao tocar no card sou direcionado ao detalhe daquele edital
