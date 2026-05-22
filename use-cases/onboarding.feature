Feature: Onboarding do Usuário
  Como um novo usuário do aplicativo
  Eu quero conhecer as principais funcionalidades do app
  Para entender como navegar e aproveitar os recursos disponíveis

  Cenário: Onboarding com tutorial no primeiro acesso
    Dado que é meu primeiro acesso após o cadastro
    Quando faço login
    Então vejo uma sequência de telas explicando as principais funcionalidades
    E ao final sou direcionado para a tela inicial

  Cenário: Pular tutorial de onboarding
    Dado que estou na primeira tela do tutorial
    Quando toco em "Pular"
    Então sou direcionado imediatamente para a tela inicial
    E não vejo mais o tutorial nos próximos acessos

  Cenário: Revisitar tutorial nas configurações
    Dado que já passei pelo onboarding anteriormente
    Quando acesso o menu "Ajuda" ou "Configurações"
    E seleciono "Ver tutorial novamente"
    Então as telas de onboarding são exibidas novamente