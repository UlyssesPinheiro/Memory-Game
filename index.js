var difficulty = 4;
var audioCardFlip = new Audio("Sounds/f4ngy-card-flip.wav");
var winSound = new Audio("Sounds/win-sound.wav");
var flipSpeed = 400; // changes the time it takes to flip the cards
var allowclick = true; // checks if anything is runnning befor the user is allowed to click the button

//===============================Display Cards=================================//
function displayCards(difficulty) {
  for (let i = 1; i < gamePattern.length + 1; i++) {
    $("#reference").after(
      "<div class='card-div card-div-size1'><input class='card " +
        i +
        "' onclick='buttoclicked(" +
        i +
        ")' type='image' src='Imgs/card.png'></div>"
    );
  }
}

function resizeGameDiv(difficulty) {
  switch (difficulty) {
    case 4:
      $("#Game-Cards").width(600);
      break;

    case 9:
      $("#Game-Cards").width(700);
      break;

    case 18:
      $("#Game-Cards").width(1000);
      break;

    case 35:
      $("#Game-Cards").width(1300);
      break;

    default:
  }
}

function resizeGameCards(difficulty) {
  switch (difficulty) {
    case 4:
      $(".card-div").removeClass(
        "card-div-size1 card-div-size2 card-div-size3 card-div-size4"
      );
      $(".card-div").toggleClass("card-div-size1");
      break;

    case 9:
      $(".card-div").removeClass(
        "card-div-size1 card-div-size2 card-div-size3 card-div-size4"
      );
      $(".card-div").toggleClass("card-div-size2");
      break;

    case 18:
      $(".card-div").removeClass(
        "card-div-size1 card-div-size2 card-div-size3 card-div-size4"
      );
      $(".card-div").toggleClass("card-div-size3");
      break;

    case 35:
      $(".card-div").removeClass(
        "card-div-size1 card-div-size2 card-div-size3 card-div-size4"
      );
      $(".card-div").toggleClass("card-div-size4");
      break;

    default:
    // code block
  }
}

//===============================Game Win======================================//
function gameWin() {
  setTimeout(function () {
    if ($(".locked").length === difficulty * 2) {
      winSound.play();
    }
  }, 3000);
}

//=============================Restart Game====================================//
function restartGame(difficulty) {
  for (let i = 1; i <= gamePattern.length; i++) {
    flipCardCover(i);
  }
  setTimeout(function () {
    resizeGameDiv(difficulty);
    firstCard = true;
    lastCard = "";
    iniGamePattern = [];
    gamePattern = [];
    $(".card-div").remove();
    generateGameCards(difficulty);
    if ($(".card").hasClass("flip")) {
      // removes flip states from cards
      $(".card").removeClass("flip");
    }
    for (let i = 1; i <= difficulty * 2; i++) {
      flipCardCover(i);
    }
    resizeGameCards(difficulty);
    if ($(".card").hasClass("locked")) {
      // removes locks from cards
      $(".card").toggleClass("locked");
    }
  }, flipSpeed);
}
//Select difficulty
function changeDifficulty(newDif) {
  difficulty = newDif;
  restartGame(difficulty);
  $(".difficulty-selector-button").removeClass(
    "btn-light btn-outline-success btn-outline-warning btn-outline-danger btn-outline-dark"
  ); // removes all previous classes
  switch (
    difficulty // applies the current difficulty to the selector
  ) {
    case 4:
      $(".difficulty-selector-button").toggleClass("btn-outline-success");
      $(".difficulty-selector-button").text("Easy");
      break;

    case 9:
      $(".difficulty-selector-button").toggleClass("btn-outline-warning");
      $(".difficulty-selector-button").text("Medium");
      break;

    case 18:
      $(".difficulty-selector-button").toggleClass("btn-outline-danger");
      $(".difficulty-selector-button").text("Hard");
      break;

    case 35:
      $(".difficulty-selector-button").toggleClass("btn-outline-dark");
      $(".difficulty-selector-button").text("Extreme");
      break;
  }
  $(".difficulties").toggleClass("hidden"); // hides the expanded menu
}

function expanddifficultyMenu() {
  $(".difficulties").toggleClass("hidden");
}

//==============================PLAYING GAME===================================//
var firstCard = true;
var lastCard = "";

//detecting button presses
function buttoclicked(button) {
  //usuário clica na carta
  if (allowclick === true) {
    if ($("." + button + ".card").hasClass("locked") === false) {
      //A Carta está travada?
      //alert("Card is not Locked");
      if (firstCard === true) {
        //É a primeira carta?
        //alert("First Card");
        flipCardInsect(button);
        $("." + button + ".card").toggleClass("locked");
        lastCard = button; // saves the last card
        firstCard = false;
      } else {
        //Não é a primeira carta
        //alert("Not the first Card");
        if (gamePattern[button - 1] === gamePattern[lastCard - 1]) {
          // é igual a carta anterior
          //alert("same as last card:" + gamePattern[button - 1] + " and " + gamePattern[lastCard - 1]);
          flipCardInsect(button);
          $("." + button + ".card").toggleClass("locked"); // trava a Carta
          firstCard = true; // libera para selecionar o próximo par
          gameWin();
        } else if (firstCard === false) {
          //Não é igual a ultima Carta
          //alert("Not the same as the last card: " + gamePattern[button - 1] + " and " + gamePattern[lastCard - 1]);
          flipCardInsect(button);
          allowclick = false;
          setTimeout(function () {
            flipCardCover(button);
            flipCardCover(lastCard);
            allowclick = true;
          }, 1500);
          $("." + lastCard + ".card").toggleClass("locked");
          firstCard = true;
        }
      }
    } else {
      alert("You already got that pair right");
    }
  }
}
//flips the card to the insect
function flipCardInsect(button) {
  $("." + button + ".card").toggleClass("flip");
  audioCardFlip.play();
  setTimeout(function () {
    $("." + button + ".card").attr(
      "src",
      "Imgs/Insects/" + gamePattern[button - 1] + ".png"
    );
  }, flipSpeed);
  setTimeout(function () {
    $("." + button + ".card").toggleClass("flip");
  }, flipSpeed);
  openCards = [button];
}

//flips back to the card cover
function flipCardCover(button) {
  $("." + button + ".card").toggleClass("flip");
  audioCardFlip.play();
  setTimeout(function () {
    $("." + button + ".card").attr("src", "Imgs/card.png");
  }, flipSpeed);
  setTimeout(function () {
    $("." + button + ".card").toggleClass("flip");
  }, flipSpeed);
  openCards = [];
}

//=========================GAME PATTERN GENERATOR==============================//
// There are 39 items in the array
var avaiableInsects = [
  "ant",
  "bed-bug",
  "beetle",
  "butterfly blue",
  "butterfly",
  "caterpillar",
  "centipede",
  "cicada",
  "cockroach",
  "cricket",
  "dragonfly",
  "firebug",
  "flea",
  "fly",
  "grasshopper",
  "green-fly",
  "grub",
  "leaf-insect",
  "madagascar-hissing-cockroach",
  "maggot",
  "mie",
  "mosquito",
  "moth",
  "praying-mantis",
  "rain-beetle",
  "scorpion",
  "snake-fly",
  "soldier-termite",
  "spider",
  "stink-bug",
  "stonefly",
  "termite",
  "tick",
  "tomcat",
  "walking-stick",
  "wasp",
  "wolf-spider",
  "woodlouse",
  "worm",
];
var iniGamePattern = [];
var gamePattern = [];

//easy will create 4 pairs of cards
//medium will create 10 pairs of cards
//hard will create 16 pairs of cards

generateGameCards(difficulty);

function createCard() {
  return avaiableInsects[
    Math.floor((avaiableInsects.length - 1) * Math.random())
  ];
}

//Generates game cards, and run createCard X amounts of time, based on difficulty
function generateGameCards(difficulty) {
  var firstCard = createCard();
  iniGamePattern.push(firstCard);

  var newCard = createCard();
  while (iniGamePattern.length < difficulty) {
    if (iniGamePattern.includes(newCard) === true) {
      //checks if he new generated card already exists in the array
      newCard = createCard();
    } else {
      iniGamePattern.push(newCard);
    }
  }
  arrayDuplicator();
  shuffle(gamePattern);
  displayCards(difficulty);
}

//duplicates the iniGamePattern array to make pairs
function arrayDuplicator() {
  var temp = iniGamePattern;
  gamePattern = temp.concat(iniGamePattern);
}

//Randomizer for the gamePattern
function shuffle(array) {
  var currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
