# :computer: Real Time Web

## Table of Contents 
* [Assesment](https://github.com/samclarkb/real-time-web-2122#books-assessment)
* [Concept](https://github.com/samclarkb/real-time-web-2122#bulb-concept)
* [Features](https://github.com/samclarkb/real-time-web-2122#clipboard-Features)
* [Socket](https://github.com/samclarkb/real-time-web-2122#satellite-Socket)
* [Process](https://github.com/samclarkb/real-time-web-2122#chart_with_upwards_trend-process)
* [API](https://github.com/samclarkb/real-time-web-2122#repeat-API)
* [Data model](https://github.com/samclarkb/real-time-web-2122#file_folder-Data-model)
* [Data lifecycle](https://github.com/samclarkb/real-time-web-2122#recycle-Data-lifecycle)
* [Wishlist](https://github.com/samclarkb/real-time-web-2122#memo-wishlist)
* [Installation](https://github.com/samclarkb/real-time-web-2122#wrench-installation)
* [Recources](https://github.com/samclarkb/real-time-web-2122#mag_right-recources)
* [License](https://github.com/samclarkb/real-time-web-2122#bookmark-license)

## :books: Assesment 

De omschrijving van het vak is als volgt: _During this course you will learn how to build a real-time application. You will learn techniques to setup an open connection between the client and the server. This will enable you to send data in real-time both ways, at the same time._

**Goals:** 

* deal with real-time complexity;
* handle real-time client-server interaction;
* handle real-time data management;
* handle multi-user support.

**Rubric:** 

_Your efforts will be graded using a single point rubric (see below). You will have to pass the criterion (centre column) to pass the course. During the test you will be consulted and will be given feedback on things we think deficient and things we think are an improvement on the criterion._

<img src='https://github.com/samclarkb/real-time-web-2122/blob/main/images/rubric.png' width='750px'/>

## :bulb: Concept

Het concept wat ik heb uitgewerkt is gebasseerd op het spel _Wie ben ik?_. Het is geschreven met Html, CSS en Javascript en met behulp van web sockets zorg ik ervoor dat het spel live gespeeld kan worden. Het is de bedoeling dat je het spel met zijn tweeën speelt, niet met meer en ook niet met minder. Allebei de spelers krijgen de zelfde 14 characters te zien en daarnaast krijgt ieder een specifiek character toegewezen. De spelers kunnen in de chatroom vragen aan elkaar stellen om erachter te komen welk character de tegenstander heeft. De gebruikers zien wie er online is en wie er aan het typen is.

**Spelregels:**

De twee spelers krijgen beide een 'spelbord' met daarop 14 gezichten (+ naam). Daarna is het de beurt aan de eerste speler om een vraag te stellen over het desbetreffende kaartje. Iedere vraag moet beantwoord worden met ja of nee, dus er kunnen geen open vragen worden gesteld. Een vraag die bijvoorbeeld kan gesteld worden, is: is het een vrouw? Stel dat klopt, dan kan de gebruiker alle gezichten van de mannen dichtklappen en dan ben je weer een stap dichterbij de winst. Daarna mag de andere speler een vraag stellen. Wanneer één van de twee spelers het character van de andere speler invoerd, wordt er _Correct!_ weergegeven.


**Uiterlijk:**

<img src='https://github.com/samclarkb/real-time-web-2122/blob/main/images/appGifje.gif' width='750px'/>

## :clipboard: Features
- Send a message
- Set a username
- Users sees who is typing 
- Users sees who is connected
- Flip a character 180deg when the user makes sure its not the answer
- App gaves feedback when the user guesses the correct answer

## :satellite: Socket
Socket.io (websockets) komen goed van pas wanneer je een real time app wil maken. In sommige gevallen wil je dat er data wordt ingeladen zonder dat de gebruiker de pagina herlaadt. Denk bijvoorbeeld aan whatsapp en Facetime. Socket.io kan ervoor zorgen dat client een 101 (switching protocols, TCP/IP) verbinding maakt met de server. Deze verbinding zorgt ervoor dat er data met erg weinige vertraging verstuurd kan worden.

<img src='https://github.com/samclarkb/real-time-web-2122/blob/main/images/socketImage.png' width='750px'/>
 

## :chart_with_upwards_trend: Process

geinteresseerd in mijn proces tijdens het maken van dit project? klik [hier](https://github.com/samclarkb/real-time-web-2122/wiki/Process)! 

## :repeat: API
Ik gebruik de naruto-api om de gegevens van de characters op te halen. Door middel van een fetch haal ik de naam en de afbeelding op van een specifiek character. Link API: https://naruto-api.herokuapp.com/api/v1/characters

## :file_folder: Data model
<img src='https://github.com/samclarkb/real-time-web-2122/blob/main/images/dataModel1.0.png' width='500px'/>

## :recycle: Data lifecycle 
<img src='https://github.com/samclarkb/real-time-web-2122/blob/main/images/dataLifecycle.png' width='500px'/>

## :memo: Wishlist
Er zijn een paar dingen waar ik niet aan toe ben gekomen, maar graag had willen doen:
* Rooms aanmaken 
* Om de beurt een bericht kunnen versturen 
* Systeem die de punten bijhoudt
* Het spel responisive maken

## :wrench: Installation

Mocht je er zelf wat aan toe willen voegen, neem vooral je tijd! 

``` git clone https://github.com/samclarkb/browser-technologies-2122.git ```

## :mag_right: Recources 
- https://www.youtube.com/watch?v=jD7FnbI76Hg
- https://socket.io/get-started/chat
- https://www.wallarm.com/what/a-simple-explanation-of-what-a-websocket-is

## :bookmark: License 
Copyright (c) 2021 Sam Clark Boot, [MIT](https://github.com/samclarkb/real-time-web-2122/blob/main/LICENSE)


