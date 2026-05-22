Feature: Alertas, Notificações e Calendário de Prazos
  Como um usuário com múltiplos editais
  Eu quero receber lembretes e ver prazos em um calendário
  Para não perder nenhuma data importante

  Cenário: Visualizar calendário com prazos dos editais acompanhados
    Dado que acesso a tela de alertas/calendário
    Quando vejo o calendário mensal
    Então os dias com prazos têm um marcador (ponto ou círculo)
    E ao tocar em um dia, vejo a lista de prazos daquele dia

  Cenário: Receber notificação push de prazo próximo
    Dado que um edital acompanhado tem prazo de envio em 2 dias
    Quando o sistema detecta a proximidade
    Então recebo uma notificação push no meu smartphone
    E ao tocar nela, sou levado ao detalhe do edital

  Cenário: Gerenciar tipos de alerta
    Dado que estou nas configurações de notificações
    Quando posso ativar/desativar alertas por tipo (novo edital, prazo próximo, resultado)
    Então as mudanças são salvas
    E só recebo os tipos habilitados

  Cenário: Marcar prazo como "já providenciado"
    Dado que vejo um prazo no calendário
    Quando toco em "Marcar como feito"
    Então o prazo fica com risco ou cinza
    E não recebo mais lembretes para ele