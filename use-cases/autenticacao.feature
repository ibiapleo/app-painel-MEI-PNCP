Feature: Autenticação do Usuário
  Como um usuário interessado em editais
  Eu quero me cadastrar, fazer login e recuperar minha senha
  Para acessar as funcionalidades de acompanhamento de editais de forma segura

  Cenário: Realizar cadastro com e-mail e senha
    Dado que estou na tela de autenticação
    Quando seleciono "Criar conta"
    E informo um e-mail válido, senha e confirmo senha
    E submeto o formulário
    Então devo receber uma mensagem de confirmação por e-mail
    E ser redirecionado para a tela inicial após confirmar o e-mail

  Cenário: Fazer login com sucesso
    Dado que já possuo uma conta
    Quando informo e-mail e senha corretos
    E clico em "Entrar"
    Então sou redirecionado para a tela inicial com lista de editais

  Cenário: Tentar login com credenciais inválidas
    Dado que estou na tela de login
    Quando informo e-mail ou senha incorretos
    E clico em "Entrar"
    Então vejo uma mensagem de erro "E-mail ou senha inválidos"
    E permaneço na tela de login

  Cenário: Recuperar senha
    Dado que estou na tela de login
    Quando clico em "Esqueci minha senha"
    E informo meu e-mail cadastrado
    Então recebo um link para redefinir minha senha
    E posso definir uma nova senha e fazer login

  Cenário: Fazer logout
    Dado que estou logado no aplicativo
    Quando acesso o menu e seleciono "Sair"
    Então sou deslogado
    E sou redirecionado para a tela de autenticação