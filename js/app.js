const assetsCards = "../images/tarot-cards/";
const assetsCategories = "../images/";

let app = {
  // Propriétés
  buttonClick: 0,
  elements: {},
  pickedCard: {},

  init: function () {
    card = document.getElementById("card");

    app.startListener();
  },

  startListener: function () {
    card.addEventListener("click", app.buttonCounter);
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
    if (card.className === "card") {
      if (card.style.transform == "rotateY(180deg)") {
        card.style.transform = "rotateY(0deg)";
      } else {
        card.style.transform = "rotateY(180deg)";
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
    cardFrontImage = document.querySelector("img#frontCard");
    cardFront = document.querySelector("figure.front.fateButton");
    cardArcanaIconImage = document.querySelector(
      ".arcana-icon img"
    );
    cardArcanaIcon = document.querySelector("section.arcana-icon");
    cardName = document.querySelector("section.name");
    cardDescription = document.querySelector(
      "section.description"
    );

    if (document.querySelector('img#frontCard.reversed')) {
      document.querySelector('img#frontCard.reversed').classList.remove('reversed');
    }

    // Précharge les infos de la carte tirée

    // Injection de la carte dans le DOM
    // Si #frontCard exite = src
    // Si non = append
    if (document.querySelector("img#frontCard")) {
      cardFrontImage = document.querySelector("img#frontCard");
      cardFrontImage.src = html[1];
    } else {
      cardFront.append(img);
    }
    if (document.querySelector("#cardCategory")) {
      cardArcanaIcon = document.querySelector("#cardCategory");
      cardArcanaIcon.src = html[4];
    } else {
      cardArcanaIcon.append(category);
    }
    cardName.textContent = name;

    // Séparation de la description en plusieurs paragraphes (marqué par  "Divinatory Meanings =")
    description = description.split(" Divinatory Meanings:");

    for (let i = 0; i < description.length; i++)
      description[i] = description[i]+ '</p>' + "<br>";
    description = description.join(" <strong>Divinatory Meanings</strong>:");

    cardDescription.innerHTML = '<p>' + description +'</p>';

    // Si isReversed = true
    if (isReversed === true) {
      if (
        (cardFrontImage = document.querySelector("img#frontCard"))
      ) {
        cardFrontImage.classList.add("reversed");
      }
      cardDescription.innerHTML +=
        "<p><strong>Reversed</strong>: " + html[3] + '</p>';
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
      cardBack = document.querySelector(".back");
      app.flipCard();
      // console.log("Masque la carte si buttonClick est impair");
    }

    return false;
  },

  //Rotation 180 degrés de la carte si true
  reverseCard: function () {
    var isReversed = [true, false];

    return isReversed = isReversed[Math.floor(Math.random() * isReversed.length)];
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
    hailing = document.querySelector(".hailing");
    details = document.querySelector("div.card-details.aligner");

    hailing.style.display = "none";

    if (app.buttonClick > 1 && details.style.display === "block") {
      if (hailing.style.display === "none") {
        hailing.style.display = "block";
      } else {
        hailing.style.display = "none";
      }
    }
  },

  // Affiche/ masque les détails de la carte selon valeur présente
  toggleCardDetails: function () {
    details = document.querySelector("div.card-details.aligner");

    if (details.style.display === "block") {
      details.style.display = "none";
    } else {
      details.style.display = "block";
    }
  },
};

document.addEventListener("DOMContentLoaded", app.init);