//===============================Game Win======================================//
function gameWin() {
  setTimeout(function (){
    if (($(".locked").length) === (dificulty * 2)){
    alert("You Won!");
  }
}, 2000);
}

//=============================Restart Game====================================//
function restartGame(){
  firstCard = true;
  lastCard = "";
  generateGameCards(dificulty); //Regenerates the game cards
  if ($(".card").hasClass("locked")){ // removes locks from cards
    $(".card").toggleClass("locked");
  }
  for (let i = 0; i < gamePattern.length + 1; i++)
  flipCardCover(i);
}

//==============================PLAYING GAME===================================//
var firstCard = true;
var lastCard = "";

//detecting button presses
function buttoclicked(button) { //usuário clica na carta
  if ($("." + button + ".card").hasClass("locked") === false){ //A Carta está travada?
    //alert("Card is not Locked");
    if (firstCard === true){  //É a primeira carta?
      //alert("First Card");
      flipCardInsect(button);
      $("." + button + ".card").toggleClass("locked");
      lastCard = button; // saves the last card
      firstCard = false;
    } else { //Não é a primeira carta
      //alert("Not the first Card");
      if (gamePattern[button - 1] === gamePattern[lastCard - 1]){ // é igual a carta anterior
        //alert("same as last card:" + gamePattern[button - 1] + " and " + gamePattern[lastCard - 1]);
        flipCardInsect(button);
        $("." + button + ".card").toggleClass("locked"); // trava a Carta
        firstCard = true; // libera para selecionar o próximo par
        gameWin();
      } else if (firstCard === false){ //Não é igual a ultima Carta
        //alert("Not the same as the last card: " + gamePattern[button - 1] + " and " + gamePattern[lastCard - 1]);
        flipCardInsect(button);
        setTimeout(function(){
          flipCardCover(button);
          flipCardCover(lastCard);
        }, 2500);
        $("." + lastCard + ".card").toggleClass("locked");
        firstCard = true;
      }
    }
  } else {
    alert("You already got that pair right");
  }
}

//flips the card to the insect
function flipCardInsect(button) {
  $("." + button + ".card").toggleClass("flip");
  setTimeout(function() {
    $("." + button + ".card").attr("src", "Imgs/Insects/" + gamePattern[button - 1] + ".png");
  }, 1000);
  setTimeout(function() {
    $("." + button + ".card").toggleClass("flip");
  }, 1000);
  openCards = [button];
}

//flips back to the card cover
function flipCardCover(button) {
  $("." + button + ".card").toggleClass("flip");
  setTimeout(function() {
    $("." + button + ".card").attr("src", "Imgs/card.png");
  }, 1000);
  setTimeout(function() {
    $("." + button + ".card").toggleClass("flip");
  }, 1000);
  openCards = [];
}









//=========================GAME PATTERN GENERATOR==============================//
// There are 39 items in the array
var avaiableInsects = ['ant', 'bed-bug', 'beetle', 'butterfly blue', 'butterfly', 'caterpillar', 'centipede', 'cicada', 'cockroach', 'cricket', 'dragonfly',
  'firebug', 'flea', 'fly', 'grasshopper', 'green-fly', 'grub', 'leaf-insect', 'madagascar-hissing-cockroach', 'maggot', 'mie', 'mosquito', 'moth', 'praying-mantis',
  'rain-beetle', 'scorpion', 'snake-fly', 'soldier-termite', 'spider', 'stink-bug', 'stonefly', 'termite', 'tick', 'tomcat', 'walking-stick', 'wasp', 'wolf-spider',
  'woodlouse', 'worm'
];
var iniGamePattern = [];
var gamePattern = [];
var dificulty = 4;

//easy will create 4 pairs of cards
//medium will create 8 pairs of cards
//hard will create 16 pairs of cards

generateGameCards(dificulty);

function createCard() {
  return avaiableInsects[Math.floor((avaiableInsects.length - 1) * Math.random())];
}

//Generates game cards, and run createCard X amounts of time, based on dificulty
function generateGameCards(dificulty) {
  var firstCard = createCard();
  iniGamePattern.push(firstCard);

  var newCard = createCard();
  while (iniGamePattern.length < dificulty) {
    if (iniGamePattern.includes(newCard) === true) { //checks if he new generated card already exists in the array
      newCard = createCard();
    } else {
      iniGamePattern.push(newCard);
    }
  }
  arrayDuplicator();
  shuffle(gamePattern);
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
      array[randomIndex], array[currentIndex]
    ];
  }

  return array;
}








//end
