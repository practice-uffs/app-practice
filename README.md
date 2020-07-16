<p align="center">
    <img width="600" src=".github/logo.png" title="Logo do projeto"><br />
</p>

# Coronavírus Chapecó

<p align="left">
    <img src="https://img.shields.io/maintenance/yes/2020?style=for-the-badge" title="Status do projeto">
    <img src="https://img.shields.io/github/workflow/status/grintex/app-covid/Main?label=Build&logo=github&logoColor=white&style=for-the-badge" title="Status do build">
</p>

Esse repositório contém o código-fonte do aplicativo móvel *PRACTICE*.

> **IMPORTANTE:** o aplicativo ainda está em desenvolvimento e logo será colocado à disposição na Google Play.

### Descrição

Como objetivo principal, o PRACTICE busca estruturar ambientes, capacitar agentes educacionais e produzir e mediar na produção de conteúdos que possibitem a produção de conteúdos de ensino e tecnologias baseadas em metodologias ativas para promover a inovação do processo de aprendizagem de estudantes em componentes curriculares e extracurriculares da UFFS. Esse aplicativo é um dos facilitadores que está sendo criado para ajudar a suprir este objetivo.

### Equipe

**Coordenação:**
* Fernando Bevilacqua - _Professor Ciência da Computação, UFFS Chapecó/SC - [fernando.bevilacqua@uffs.edu.br](mailto:fernando.bevilacqua@uffs.edu.br)_

**Equipe de criação e desenvolvimento:**

* [Andrew M. Silva](https://github.com/andrewmsilva) (Ciência da Computação, UFFS Chapecó/SC)
* [Cleisson Vieira Raimundi](https://github.com/CleissonVieira) (Ciência da Computação, UFFS Chapecó/SC)
* [Estela Vilas Boas](https://github.com/estelavilasboas) (Ciência da Computação, UFFS Chapecó/SC)
* [Jean Carlo Hilger](https://github.com/JeanCHilger) (Ciência da Computação, UFFS Chapecó/SC)
* [Junior Vitor Ramisch](https://github.com/arufonsekun) (Ciência da Computação, UFFS Chapecó/SC)

**Suporte:**
* [Programa de Inovação PRACTICE](https://practice.uffs.cc/) (UFFS Chapecó/SC)

## Informações para desenvolvedores

### 1. Pré-requisitos

Você precisa ter o node versão `>=13.5` instalado no seu sistema. Depois, rode:

```
npm i framework7-cli cordova -g
```

### 2. Preparar o projeto

Clone o projeto:

```
git clone https://github.com/practice-uffs/app-practice && cd app-practice
```

Instale todas as dependências

```
npm install
```

### 3. Teste

Para testar o projeto localmente, rode:

```
npm start
```

O browser abrirá apontando para o endereço [http://localhost:8080/](http://localhost:8080/) para você acessar o app. Se estiver usando o Chrome, pressione <kbd>F12</kbd> para abrir as Ferramentas de Desenvolvedor e visualizar a página como se fosse um celular.

### 4. Build e deploy

Para fazer build (dev) da aplicação, rode:

```
npm run build-dev
```

A aplicação pronta para uso estará no diretório `www` na raiz do respositório. Você também pode fazer um build de produção, rode:

```
npm run build-prod
```

Para fazer deploy (dev) na Google Play, rode:

```
npm run build-dev-cordova
```

Para fazer deploy (final) na Google Play, rode:

```
npm run build-prod-cordova
```

## Contribua

Sua ajuda é muito bem-vinda, independente da forma! Confira o arquivo [CONTRIBUTING.md](CONTRIBUTING.md) para conhecer todas as formas de contribuir com o projeto. Por exemplo, [sugerir uma nova funcionalidade](https://github.com/practice-uffs/app-practice/issues/new?assignees=&labels=&template=feature_request.md&title=), [reportar um problema/bug](https://github.com/practice-uffs/app-practice/issues/new?assignees=&labels=bug&template=bug_report.md&title=), ou simplemente utilizar o projeto e comentar sua experiência.

Veja o arquivo [ROADMAP.md](ROADMAP.md) para ter uma ideia de como o projeto deve evoluir.


## Licença

Esse projeto é licenciado nos termos da licença open-source [Apache 2.0](https://choosealicense.com/licenses/apache-2.0/) e está disponível de graça.

## Changelog

Veja todas as alterações desse projeto no arquivo [CHANGELOG.md](CHANGELOG.md).

## Créditos de ícones e arte

Os ícones e o logo utilizados nesse aplicativo foram feitos por diversos artistas de [www.flaticon.com](https://www.flaticon.com).
Icons made by [Freepik](https://www.flaticon.com/authors/Freepik), [Eucalyp](https://www.flaticon.com/authors/Eucalyp), [Smashicons](https://www.flaticon.com/authors/Smashicons), [Surang](https://www.flaticon.com/authors/Surang), [Monkik](https://www.flaticon.com/authors/Monkik), [Iconixar](https://www.flaticon.com/authors/Iconixar), [Photo3idea-studio](https://www.flaticon.com/authors/Photo3idea-studio), [Ultimatearm](https://www.flaticon.com/authors/Ultimatearm), [PongsakornRed](https://www.flaticon.com/authors/PongsakornRed), [Nhor Phai](https://www.flaticon.com/authors/Nhor-Phai), [Payungkead](https://www.flaticon.com/authors/Payungkead), [Mynamepong](https://www.flaticon.com/authors/Mynamepong), [Good Ware](https://www.flaticon.com/authors/Good-Ware), [Xnimrodx](https://www.flaticon.com/authors/Xnimrodx), [Srip](https://www.flaticon.com/authors/Srip) from [www.flaticon.com](https://www.flaticon.com).
