Feature: Detalhe do Edital com Checklist e Elegibilidade
  Como um usuário que analisa um edital específico
  Eu quero ver os requisitos e saber se sou elegível
  Para decidir se vale a pena me candidatar

  Cenário: Visualizar informações completas do edital
    Dado que estou na lista de editais
    Quando toco em um edital
    Então vejo título, descrição, órgão, datas, anexos e requisitos obrigatórios

  Cenário: Marcar itens do checklist de requisitos
    Dado que estou na tela de detalhe do edital
    Quando vejo a seção "Checklist de requisitos"
    Então cada requisito tem um checkbox ao lado
    E posso marcar os que já atendo
    E o sistema salva meu progresso localmente ou no perfil

  Cenário: Visualizar indicador de elegibilidade
    Dado que marquei alguns requisitos como atendidos
    Quando o sistema calcula minha elegibilidade
    Então vejo um indicador visual (ex: barra de porcentagem ou círculo colorido)
    E uma mensagem como "Você atende 5 de 8 requisitos obrigatórios"

  Cenário: Requisitos obrigatórios vs. desejáveis
    Dado que o edital tem requisitos obrigatórios e desejáveis
    Quando visualizo o checklist
    Então os obrigatórios estão destacados com ícone de alerta
    E o indicador de elegibilidade mostra separadamente "% obrigatórios atendidos"