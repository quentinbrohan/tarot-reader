const assetsCards = "../images/tarot-cards/";
const assetsCategories = "../images/";

let app = {
  // Propriétés
  buttonClick: 0,
  elements: {},
  pickedCard: {},

  init: function () {
    app.elements.card = document.getElementById("card");

    app.startListener();
  },

  startListener: function () {
    app.elements.card.addEventListener("click", app.buttonCounter);
  },

  // Compteur de carte
  buttonCounter: function () {
    app.buttonClick = app.buttonClick + 1;
    // console.log("buttonClick: " + app.buttonClick);
    app.handleCardButtonClick();
  },

  // Carte aléatoire
  randomCard: function () {
    return (pickedCard =
      dataTarotCardsList[
        Math.floor(Math.random() * dataTarotCardsList.length)
      ]);
  },

  // Animation rotation R/V 180deg de la carte selon rotation en cours
  flipCard: function () {
    if (app.elements.card.className === "card") {
      if (app.elements.card.style.transform == "rotateY(180deg)") {
        app.elements.card.style.transform = "rotateY(0deg)";
      } else {
        app.elements.card.style.transform = "rotateY(180deg)";
      }
    }
  },

  putCardInDOM: function (pickedCard, isReversed) {
    // L'implantation se fera ici dans le DOM
    var html = app.putCardInHtml(pickedCard);

    img = document.createElement("img");
    img.id = "frontCard";
    img.src = html[1];

    category = document.createElement("img");
    category.id = "cardCategory";
    category.classList = "arcana-icon";
    category.src = html[4];

    name = html[0];
    description = html[2];

    isReversed = app.reverseCard();

    // Elements HTML
    app.elements.cardFrontImage = document.querySelector("img#frontCard");
    app.elements.cardFront = document.querySelector("figure.front.fateButton");
    app.elements.cardArcanaIconImage = document.querySelector(
      ".arcana-icon img"
    );
    app.elements.cardArcanaIcon = document.querySelector("section.arcana-icon");
    app.elements.cardName = document.querySelector("section.name");
    app.elements.cardDescription = document.querySelector(
      "section.description"
    );

    // Précharge les infos de la carte tirée

    // Injection de la carte dans le DOM
    // Si #frontCard exite = src
    // Si non = append
    if (document.querySelector("img#frontCard")) {
      app.elements.cardFrontImage = document.querySelector("img#frontCard");
      app.elements.cardFrontImage.src = html[1];
    } else {
      app.elements.cardFront.append(img);
    }
    if (document.querySelector("#cardCategory")) {
      app.elements.cardArcanaIcon = document.querySelector("#cardCategory");
      app.elements.cardArcanaIcon.src = html[4];
    } else {
      app.elements.cardArcanaIcon.append(category);
    }
    app.elements.cardName.textContent = name;

    // Séparation de la description en plusieurs paragraphes (marqué par  "Divinatory Meanings =")
    description = description.split(" Divinatory Meanings:");
    for (let i = 0; i < description.length; i++)
      description[i] = description[i]+ '</p>' + "<br>";
    description = description.join(" <strong>Divinatory Meanings</strong>:");

    app.elements.cardDescription.innerHTML = '<p>' + description +'</p>';

    // Si isReversed = true
    if (isReversed === true) {
      if (
        (app.elements.cardFrontImage = document.querySelector("img#frontCard"))
      ) {
        app.elements.cardFrontImage.classList.add("reversed");
      }
      app.elements.cardDescription.innerHTML +=
        "<strong>Reversed</strong>: " + '<p>' + html[3] + '</p>';
    }

    // console.log("Carte tirée placée dans le DOM");
    // return false;
  },

  putCardInHtml: function (pickedCard) {
    let name = pickedCard[0];
    let image = pickedCard[1];
    let description = pickedCard[2];
    let reversed = pickedCard[3];
    let category = pickedCard[4];

    // console.log("Place la carte dans l'HTML");

    return [
      (cardName = name),
      (img = assetsCards + image),
      (cardDescription = description),
      (cardReversed = reversed),
      (cat = assetsCategories + category + ".svg"),
    ];
  },

  // Affiche la carte et la cache tous les autres clics selon si pair ou impair
  displayImage: function (buttonClick, pickedCard, isReversed) {
    if (app.buttonClick % 2 !== 0) {
      app.putCardInDOM(buttonClick, pickedCard, isReversed);
      app.flipCard();
      // console.log("Affiche la carte si buttonClick est pair");

      return true;
    } else {
      app.elements.cardBack = document.querySelector(".back");
      app.flipCard();
      // console.log("Masque la carte si buttonClick est impair");
    }

    return false;
  },

  //Rotation 180 degrés de la carte si true
  reverseCard: function () {
    var isReversed = [true, false];

    isReversed = isReversed[Math.floor(Math.random() * isReversed.length)];

    return isReversed;
  },

  // Lancement compteur + carte aléatoire + affichage
  handleCardButtonClick: function () {
    app.preventDefault(event);
    app.randomCard();
    app.displayImage(pickedCard);
    app.toggleHailing();
    app.reverseCard();
    app.toggleCardDetails();

    // console.log("Lancement compteur + carte aléatoire + affichage effectué");
    return false;
  },

  preventDefault: function (event) {
    event.preventDefault();
  },

  // Masque le texte d'intro après 1er clic sur la carte
  // Et gère affichage ensuite
  toggleHailing: function () {
    app.elements.hailing = document.querySelector(".hailing");

    app.elements.details = document.querySelector("div.card-details.aligner");

    app.elements.hailing.style.display = "none";

    if (app.buttonClick > 1 && app.elements.details.style.display === "block") {
      if (app.elements.hailing.style.display === "none") {
        app.elements.hailing.style.display = "block";
      } else {
        app.elements.hailing.style.display = "none";
      }
    }
  },

  // Affiche/ masque les détails de la carte selon valeur présente
  toggleCardDetails: function () {
    app.elements.details = document.querySelector("div.card-details.aligner");

    if (app.elements.details.style.display === "block") {
      app.elements.details.style.display = "none";
    } else {
      app.elements.details.style.display = "block";
    }
  },
};

document.addEventListener("DOMContentLoaded", app.init);