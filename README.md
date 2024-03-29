<p align="center">
    <img width="600" src=".github/logo.png" title="Logo do projeto"><br /><br />
    <img src="https://img.shields.io/maintenance/yes/2021?style=for-the-badge" title="Status do projeto">
    <img src="https://img.shields.io/github/workflow/status/ccuffs/template/ci.uffs.cc?label=Build&logo=github&logoColor=white&style=for-the-badge" title="Status do build">
</p>

# App PRACTICE

Esse repositório contém o código-fonte do aplicativo móvel *PRACTICE*. Esse aplicativo conta com uma imensa equipe que trabalhou com muito carinho para atender você da melhor forma possível. São quase trinta pessoas em equipes de desenvolvimento, conteúdo, design, mídia, auxílio-gerencial e comunicação!

> **IMPORTANTE:** o aplicativo está disponível para [download na Google Play](https://play.google.com/store/apps/details?id=cc.uffs.practice).

<p align="center">
    <img src=".github/imagens-app-practice.png" title="Imagens de algumas telas do aplicativo">
</p>

### Descrição

O [Programa de Ampliação e Consolidação de Tecnologias e Inovação no Contexto Educacional (PRACTICE)](https://practice.uffs.edu.br) é um programa multi-campi da [Universidade Federal da Fronteira Sul (UFFS)](https://www.uffs.edu.br).
O aplicativo PRACTICE permite que seus usuários usufruam das tecnologias e conteúdos criados por nós. O objetivo desse aplicativo é fornecer acesso fácil a informações para a comunidade acadêmica de todos os seis campi pertencentes à UFFS. Com um toque, você pode acessar o calendário acadêmico, os horários de ônibus, o cardápio do RU, conversar com a Aura, nossa Assistente Virtual, e muito mais! E claro, inteirar nossos solicitantes sobre suas demandas, tendo o recurso de notificação vinculado ao Mural, nosso sistema de atendimento.

## Informações para desenvolvedores

### 1. Pré-requisitos

Você precisa ter [NodeJS](https://nodejs.org/en/) versão `>=13.8` instalado no seu sistema. Depois, rode:

```
npm i framework7-cli cordova -g
```

### 2. Preparar o projeto

Faça um `fork` deste repositório em seu próprio GitHub e clone seu `fork` em seu computador:

```
git clone https://github.com/SEU_USUARIO/app-practice && cd app-practice
```

Mude para o branch `dev` e instale todas as dependências:

```
git checkout dev
npm install
```

### 3. Testar

Para testar o projeto localmente, rode:

```
npm start
```

O browser abrirá apontando para o endereço [http://localhost:8080/](http://localhost:8080/) para você acessar o app. Se estiver usando o Chrome, pressione <kbd>F12</kbd> para abrir as Ferramentas de Desenvolvedor e visualizar a página como se fosse um celular.

### 4. Build e deploy

#### 4.1 Pré-requisitos

Para ser possível gerar o APK do aplicativo é necessario instalar o Android SDK, o JDK 8 e também o Gradle. Caso haja mais de uma versão do JDK instalada no computador é necessário selecionar a versão 8 para ser utilizada.  Além disso, é necessário configurar as seguintes variaveis de ambiente: `JAVA_HOME`, `ANDROID_HOME` e `ANDROID_SDK_ROOT`.

O Android SDK pode ser instalado tanto manualmente quanto por meio da instalação do Android Studio (sendo esta ultima possívelmente a mais simples). Com o SDK instalado é necessário também aceitar as licenças do Android, caso a instalação do SDK tenha sido feita por meio do Android Studio basta acessar `Configurações > SDK Manager > SDK Tools`, instalar `Google Play Licensing Library` e aceitar as licenças. 
Por fim, é preciso instalar o Gradle e a instalação deste pode variar de acordo com o sistema operacional utilizado.

Além disso, para gerar o apk com o plugin do fcm adicionado é necessário:

1. Garantir que a linha `<widget id="cc.uffs.practice" version="0.4.0" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">` do arquivo `config.xml` possua o id **igual** ao nome do pacote criado no firebase.
2. Caso o pacote criado possua um nome diferente do que esta previamente configurado no arquivo `config.xml` é necessario remover e readicionar a plataforma android por meio do cordova.
3. Adicionar o arquivo `google-services.json` gerado pelo firebase à pasta `/cordova/platforms/android/app/src/google-services.json`

#### 4.2 Build

Para fazer build (dev) da aplicação, rode:

```
npm run build-dev
```

A aplicação pronta para uso estará no diretório `www` na raiz do respositório. Você também pode fazer um build de produção, rode:

```
npm run build-prod
```
#### 4.3 Deploy

### 5. Build e deploy Google Play

Para fazer um build e deploy para a Google Play, você precisa de um ambiente de desenvolvimento Android disponível na máquina. Instale, por exemplo, o Android SDK e afins (Grade, JDK, etc). Para build nesse projeto, você precisa do `JDK 1.8` e de uma versão especifica do node (instale o `nvm`, por exemplo).

Instale o Cordova:

```
npm install -g cordova
```

Instale as dependencias:

```
npm run install-deps-cordova
```

Faça um build da aplicação:

```
npm run build-dev-cordova
```

Faça os testes cabíveis, como instalar em algum dispositivo Android o `.apk` gerado no processo.

Após gerar o `.apk` é necessário verificar se a permissão para utilizar a câmera foi adicionada ao arquivo: `cordova/platforms/android/app/src/main/AndroidManifest.xml`. Para isso basta verificar se o mesmo possui uma linha com o conteúdo: `<uses-permission android:name="android.permission.CAMERA" />`. Caso não possua, é necessário adicionar esta linha para que o aplicativo consiga acessar a câmera do dispositivo, após isso basta executar o comando novamente para gerar um novo `.apk` do aplicativo.

Se tudo estiver certo, para fazer deploy (final) na Google Play, rode:

```
npm run build-prod-cordova
```

## Contribua

Sua ajuda é muito bem-vinda, independente da forma! Confira o arquivo [CONTRIBUTING.md](CONTRIBUTING.md) para conhecer todas as formas de contribuir com o projeto. Por exemplo, [sugerir uma nova funcionalidade](https://github.com/practice-uffs/app-practice/issues/new?assignees=&labels=&template=feature_request.md&title=), [reportar um problema/bug](https://github.com/practice-uffs/app-practice/issues/new?assignees=&labels=bug&template=bug_report.md&title=), ou simplemente utilizar o projeto e comentar sua experiência.

Veja o arquivo [ROADMAP.md](ROADMAP.md) para ter uma ideia de como o projeto deve evoluir.


## Licença

Esse projeto é licenciado nos termos da licença open-source [MIT](https://choosealicense.com/licenses/mit) e está disponível de graça.

## Changelog

Veja todas as alterações desse projeto no arquivo [CHANGELOG.md](CHANGELOG.md).

## Créditos de ícones e arte

Os ícones e o logo utilizados nesse aplicativo foram feitos por diversos artistas de [www.flaticon.com](https://www.flaticon.com).
Icons made by [Freepik](https://www.flaticon.com/authors/Freepik), [Eucalyp](https://www.flaticon.com/authors/Eucalyp), [Smashicons](https://www.flaticon.com/authors/Smashicons), [Surang](https://www.flaticon.com/authors/Surang), [Monkik](https://www.flaticon.com/authors/Monkik), [Iconixar](https://www.flaticon.com/authors/Iconixar), [Photo3idea-studio](https://www.flaticon.com/authors/Photo3idea-studio), [Ultimatearm](https://www.flaticon.com/authors/Ultimatearm), [PongsakornRed](https://www.flaticon.com/authors/PongsakornRed), [Nhor Phai](https://www.flaticon.com/authors/Nhor-Phai), [Payungkead](https://www.flaticon.com/authors/Payungkead), [Mynamepong](https://www.flaticon.com/authors/Mynamepong), [Good Ware](https://www.flaticon.com/authors/Good-Ware), [Xnimrodx](https://www.flaticon.com/authors/Xnimrodx), [Srip](https://www.flaticon.com/authors/Srip) from [www.flaticon.com](https://www.flaticon.com).
