# 📀 YouTube Music Playlist Management – Test Automation

Automação de testes end-to-end para gerenciamento de playlists no YouTube Music, utilizando Selenium WebDriver, BDD (Gherkin) e cenários orientados a comportamento.

Este projeto demonstra, de forma prática, como automatizar interações reais com a interface web do YouTube Music, cobrindo o ciclo completo de vida de uma playlist (criação, edição, exclusão, visibilidade, organização e adição de faixas).

## 🎯 Objetivo do Projeto

O objetivo principal é automatizar o fluxo de gerenciamento de playlists no YouTube Music, simulando o uso real de um usuário autenticado.

O projeto serve como estudo prático de:

* Automação de UI com Selenium

* Escrita de cenários BDD para comunicação clara entre equipe técnica e não técnica

* Testes funcionais de ponta a ponta

* Estruturação de testes reutilizáveis com Given/When/Then

## 🧩 Por que testar no YouTube Music?

Inicialmente, o planejamento envolvia o uso do Spotify, porém o método de login do Spotify é um pouco mais burrocrático, e por enviar um e-mail a cada login, acabamos tomando rate-limit deles.

👉 O YouTube Music foi escolhido por ser mais direto e viável, permitindo que o projeto se concentre em automação via Selenium sem dependência de APIs externas.

## 🎵 Funcionalidade escolhida: Gerenciamento de Playlists

##### A funcionalidade de playlists foi selecionada por ser:

* Um fluxo comum e real para qualquer usuário de streaming

* Uma funcionalidade rica em casos de teste

* Adequada para interação visual (inputs, cliques, menus, listas, drag-and-drop)

* Ideal para demonstrar o potencial do Selenium

* Ela abrange operações como:

    * Criar playlist

    * Validar nomes inválidos

    * Renomear

    * Excluir

    * Tornar pública ou privada

    * Adicionar ou remover faixas

    * Reordenar músicas

### 🧪 Testes BDD (Gherkin)

Os cenários seguem o padrão Given / When / Then, permitindo leitura natural e facilitando a comunicação com professores, colegas e stakeholders.

🌟 Cobertura de Cenários

O projeto contém testes automatizados para:

* Login

* Criação de playlist (válida e inválida)

* Renomear playlist

* Exclusão

* Alterar visibilidade (pública/privada)

* Adicionar faixa

* Remover faixa

* Reordenar faixas

* Execução de música

* Validação de falhas de criação via Scenario Outline
 
* Também inclui um Scenario Outline com Examples para testar casos de nome inválido:

    * Apenas espaços

    * Nome vazio

## 🧱 Estrutura dos Cenários (exemplo)

``` gherkin 
    Scenario: Create a playlist with a valid name
        Given I have a Google account
        And Execute login Scenario
        When I request to create a playlist with the name "DO ROCK"
        Then the playlist should be created successfully
```

``` gherkin 
    Scenario Outline: Do not allow playlist creation with an invalid name
        Given I have a Google account
        And Execute login Scenario
        When I request to create a playlist with the name "<playlistName>"
        Then the system should reject the request
        And I should receive an error message indicating "<errorMessage>"

        Examples:
            | playlistName | errorMessage        |
            | "   "        | Ops ocorreu um erro |
            |              | Obrigatório         |
```

## 🏗️ Stack Utilizada
✔ Selenium WebDriver

Automação da interface web do YouTube Music (cliques, campos, arrastar itens, interações visuais).

✔ BDD (Gherkin, Cucumber)

Organiza os testes em linguagem quase natural.

✔ Linguagem

JavaScript

## ▶️ Como Executar os Testes

#### Requisitos:
* Node vx

#### Passos:

1. Instale as dependências do projeto

``` nginx
npm install
```

2. Configure aS variáveIS de ambiente EMAIL e PASSWORD que estejam atrelados a um canal no youtube.

3. Execute os testes

``` nginx
npm test
```

### 🧑‍💻 Contribuição

Contribuições são bem-vindas!
Basta abrir uma issue ou enviar um Pull Request.

### 📄 Licença

MIT ou outra de sua escolha.