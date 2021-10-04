# Single Page Application
Deze single page web application ben ik aan bezig als oefening om zowel mijn front- als backend skills te oefenen. 

Op dit moment is alleen de TaskManager pagina geïmplementeerd. De backend is echter voorbereid op verdere uitbreiding van de app.

Meerdere pagina's zullen volgen wanneer ik nieuwe technologieën oefen.

Post Scriptum: In dit project focus ik op functionaliteit. Mooie layouts komen later

## Functionaliteit
### Task Manager
![Task Manager View](https://github.com/Ziothh/SPA/blob/master/readme_images/taskPage.png)

#### Task Pages
Je kan wisselen tussen verschillende taken pagina's

![Task Pages Switching](https://github.com/Ziothh/SPA/blob/master/readme_images/pageSwitching.png)


#### Task Groups
De task page is onderverdeeld in vier groepen. Je kan de taken slepen met drag-and-drop. 

#### Tasks
Je kan een nieuwe taak aanmaken door op de plus te clicken onderaan de Task Group. 

( De tags zijn nog niet geïmplementeerd )

![Task Creation Screen](https://github.com/Ziothh/SPA/blob/master/readme_images/taskCreationScreen.png)

#### Tags
( Nog niet geïmplementeerd in de frontend. Backend support is al afgewerkt )

Een systeem om taken te categoriseren en te sorteren.

## Gebruikte Technologieën
De code is volledig geschreven in [TypeScript](https://www.typescriptlang.org/).
### Frontend
 - [ReactJS](https://reactjs.org)
 - [urql](https://formidable.com/open-source/urql/docs): GraphQL gebruiken in vorm van React hooks
 - [scss](https://sass-lang.com)
### Backend
 - [NodeJS](https://nodejs.org): een JavaScript runtime voor de backend
 - [mikro-orm](https://mikro-orm.io): een variant van TypeORM. Gebruikt om SQL schema's the genereren
 - [TypeGraphQL](https://typegraphql.com/docs/introduction.html): Maakt gql schema's, types en resolvers met TypeScript, door middel van classes en decorators!
 - [Express](https://expressjs.com)
 - [Apollo Server](https://www.apollographql.com/docs/apollo-server): een GraphQL server
### Database
 - [MySQL](https://www.mysql.com)

## Toekomstige Plannen
 - hosting
 - color theme support ( verder af te afwerken )
 - accounts ( ipv globale data in de database )
 - nieuwe pagina's ( wanneer ik nieuwe technologieën oefen )
