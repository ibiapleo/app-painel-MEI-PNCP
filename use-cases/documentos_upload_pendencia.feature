Feature: Documentos, Upload, Visualização e Pendências
  Como um usuário participando de um edital
  Eu quero enviar, visualizar e controlar meus documentos pendentes
  Para manter minha candidatura regularizada

  Cenário: Fazer upload de documento da galeria ou câmera
    Dado que estou na tela de documentos de um edital
    Quando toco em "Enviar documento"
    Então posso escolher entre "Tirar foto", "Galeria" ou "Arquivos"
    E após selecionar, o documento é enviado e aparece na lista

  Cenário: Visualizar documento enviado
    Dado que tenho um documento enviado na lista
    Quando toco sobre ele
    Então o sistema abre o visualizador de PDF/imagem
    E posso ampliar, rotacionar ou baixar

  Cenário: Ver status de pendência dos documentos
    Dado que a lista de documentos exigidos é exibida
    Então cada documento tem status: "Enviado", "Pendente", "Rejeitado"
    E se rejeitado, há um botão "Reenviar" e uma justificativa

  Cenário: Receber notificação de documento rejeitado
    Dado que um documento foi rejeitado pela banca
    Quando entro na tela de documentos
    Então vejo um alerta destacado
    E posso tocar para ver o motivo e reenviar