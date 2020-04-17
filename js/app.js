let app = {

  // TODO:
  // - Corriger putCardInDOM() et putCardInHtml()
  // - displayImage() va directement sur else + Partie du code en // car affichage HTML/DOM non OK pour le moment = error
  // - hideHailing() en // dans handle...() car displayImage non fonctionnelle actuellement.
  // - Ajouter classList pour DOM -> transitions textes slide-in/out
  // - Corriger isReversed()
  // - Nettoyer code

  // Propriétés

  buttonClick: 0,
  elements: {},
  pickedCard: {},
  // resultReverse: {},

  init: function() {
    
    console.log(app.init);

    app.elements.card = document.getElementById('card');

    app.startListener();

    app.handleCardButtonClick();
  },

  startListener: function() {

    app.elements.card.addEventListener('click', app.buttonCounter);
  },

  // Compteur de carte
  buttonCounter: function() {

    app.buttonClick = app.buttonClick + 1;
    console.log('buttonClick: ' + app.buttonClick);
  },

  // Carte aléatoire
  randomCard: function() {

    // console.log(dataTarotCardsList);

    // var pickedCard = (dataTarotCardsList[Math.floor(Math.random() * dataTarotCardsList.length)]);

    return pickedCard = (dataTarotCardsList[Math.floor(Math.random() * dataTarotCardsList.length)]);

    console.log(pickedCard);
    // return pickedCard;
  },

  // Animation rotation R/V 180deg de la carte selon rotation en cours
  flipCard: function () {

    if (app.elements.card.className === "card") {
      if(app.elements.card.style.transform == "rotateY(180deg)") {
        app.elements.card.style.transform = "rotateY(0deg)";
      } else {
        app.elements.card.style.transform = "rotateY(180deg)";
      }
    }
  },

  putCardInDOM: function(pickedCard) {

    var html = putCardInHtml(pickedCard);

    image = html[1];
    category = html[4];
    name = html[0];
    description = html[2];

    // Elements HTML
    app.elements.cardFrontImage = document.querySelector('img#front.fateButton');
    app.elements.cardFront = document.querySelector('figure.front.fateButton');
    app.elements.cardArcanaIconImage = document.querySelector('.arcana-icon img');
    app.elements.cardArcanaIcon = document.querySelector('section.arcana-icon');
    app.elements.cardName = document.querySelector('section.name');
    app.elements.cardDescription = document.querySelector('section.description');



    // Précharge les infos de la carte tirée


    // A partir du 2e tirage
    if (app.elements.cardArcanaIconImage) {
    app.elements.cardArcanaIconImage.classList.remove();
  }

    // Injection de la carte dans le DOM
    app.elements.cardFront.append(image).style.display = "none";
    app.elements.cardArcanaIcon.append(category).style.display = "none";
    app.elements.cardName.append(name).style.display = "none";
    app.elements.cardDescription.append(description).style.display = "none";


    console.log('Carte tirée placée dans le DOM');
    return false;

  },

  putCardInHtml: function(pickedCard) {

    // var cardName = 'name';
    // var cardImage = 'image';
    // var cardDescription = 'description';
    // var cardReversed = 'reversed';
    // var cardCategory = 'category';

    name = pickedCard[0];
    image = pickedCard[1];
    description = pickedCard[2];
    reversed = pickedCard[3]
    category = pickedCard[4];

    console.log('Affiche la carte dans la page');
    // Affiche la carte dans la page web

    // Retourne un array n'exécute pas le code
    return [
    
    image.innerHTML = '<img src="images/tarot-cards/'+ name + '" alt="Carte ' + name +'" />',
    category.innerHtml = '<img src="images/' + category + '.svg" alt="Icône ' + category +'" />',
    name.innerHtml = '<h2>' + name + '</h2>',
    description.innerHtml = '<p>' + description + '</p>',
  ]
  },

    // Affiche la carte et la cache tous les autres clics selon si pair ou impair
  displayImage: function(buttonClick) {

    if (buttonClick %2) {
      app.putCardInDOM(pickedCard);
      app.flipCard();
      app.elements.cardArcanaIconImage.style.display = "block";
      console.log('Affiche la carte si buttonClick est pair');
    } else {
      app.elements.cardBack = document.querySelector('.back');
      app.elements.cardBack.style.display = "none";
      app.flipCard();
      
      // Valide uniquement dès 1er affichage d'une carte
      // app.elements.nameh2 = document.querySelector('.name h2');
      // app.elements.nameh2.style.display = "block";
      // app.elements.descriptionp = document.querySelector('.description p');
      // app.elements.descriptionp.style.display = "block";

      // app.elements.cardArcanaIconImage.style.display = "none";

      console.log('Masque la carte si buttonClick est impair');
    }

    return false;

  },

  //Rotation 180 degrés de la carte si true
  reverseCard: function(buttonClick) {

    var isReversed = [true, false];
    cardReversedDescription = '<p> <span class="reversed__text">Reversed: </span>' + reversed + '</p>';
    isReversed = (isReversed[Math.floor(Math.random() * isReversed.length)]);
    console.log(isReversed);

    if (isReversed && (buttonClick % 2)) {
      app.elements.cardFrontImage.classList = "reversed img";
      app.elements.cardDescription.append(cardReversedDescription).style.display = 'none';
    }
  },

  // Lancement compteur + carte aléatoire + affichage 
  handleCardButtonClick: function() {

    app.preventDefault(event);
    // app.buttonCounter();
    app.randomCard();
    app.displayImage();
    app.reverseCard();
    // app.hideHailing();

    console.log('Lancement compteur + carte aléatoire + affichage');
    return false;    
  },

  preventDefault: function(event) {
    event.preventDefault();
  },

  // Masque le texte d'intro après 1er clic sur la carte
  hideHailing: function() {

    app.elements.hailing = document.querySelector('.hailing');
    app.elements.hailing.style.display = "none";
  }

  
};

document.addEventListener('DOMContentLoaded', app.init);