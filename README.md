# Desafio IP4y React Native

Regra de negocios:

## Cliente

- Criar Tela para inserir cliente com dois botões ( Inserir, Limpar).

- Criar Tela para editar cliente com dois botões ( Salvar, Limpar).

- Criar Opção de deletar cliente.

- Criar Opção de editar cliente.

- Criar Validações de campos obrigatorios ( Nome, Sobrenome, Data de Nascimento, E-mail, Gênero).

## Requisitos que estou utilizando

- Composer
- Node 16 ou superior V20.9.0 
- NPM V9.6.5
- Android Studio
- Configuração do ip

É necessário configurar os src/service/Api se estiver usando o Android Emulator o IP inicial de localhost é 10.0.2.2 e a porta do back-end:

```dosini
  http://10.0.2.2:8001/api/teste.ip4y
```

## Instale os pacotes e dependências

`npm install`

## Iniciar a aplicação simulando android

`npx react-native run-android`

## Próximos Passos (melhorias)

- Redux -> Gerenciamento de estado mais combusta.

- Async Storage ->  Alternativa de Armazenamento Local semelhante (localstorage)

- Tela dos excluidos (trashed) 

- Criar Bottom tabs (Menu).

###  Frameworks

- Node >= 16
- React Native

### Comunicação API

- JSON