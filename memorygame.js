var app= angular.module('my-app', []);
app.controller('MemoryController', function($scope, $timeout) {
  $scope.deck = new Deck();
  $scope.firstCard = null;
  $scope.secondCard = null;
  $scope.firstState = true;
  $scope.gameInPlay = true;
  $scope.moves = 0;
  $scope.matches = 0;

  $scope.revealCard = function(card) {
    // card.open = true;
    console.log(card['$$hashKey']);
    console.log(card.matched);
    console.log($scope.firstState);

    if ((card.matched === false) && ($scope.gameInPlay === true)) {
      // card.open = true;
      // console.log("Entered the first state!");
      if ($scope.firstState === true) {
        card.open = true;
        $scope.firstCard = card;
        $scope.firstState = null;
      } else if ($scope.firstCard['$$hashKey'] !== card['$$hashKey']) {
        card.open = true;
        console.log("They were not the same card after all!");
        $scope.secondCard = card;
        $scope.moves += 1;
        // $scope.gameInPlay = false;
        if ($scope.firstCard.url === $scope.secondCard.url) {
          console.log("They match!!!");
            $scope.firstCard.open = true;
            $scope.secondCard.open = true;
            $scope.firstCard.matched = true;
            $scope.secondCard.matched = true;
            $scope.matches += 1;
        } else {
          $timeout(function() {
            console.log("tried to set a delay again");
            // debugger
            $scope.gameInPlay = true;
            // $scope.firstState = false;
            $scope.firstCard.open = false;
            $scope.secondCard.open = false;
          }, 1000);
        }
        $scope.firstState = true;
        // $scope.firstState = false;
        $scope.gameInPlay = false;
        $timeout(function() {
          console.log("setting game play to true");
          $scope.gameInPlay = true;
          $scope.firstCard = null;
          $scope.secondCard = null;
        }, 1000);
      }
      // card.open = true;
    }
  }
  // $scope.revealCard = function(card) {
  //   // card.open = true;
  //   console.log(card['$$hashKey']);
  //   console.log(card.matched);
  //   console.log($scope.firstState);
  //
  //   if ((card.matched === false) && ($scope.gameInPlay)) {
  //     card.open = true;
  //     console.log("Entered the first state!");
  //     if ($scope.firstState) {
  //       $scope.firstCard = card;
  //       $scope.firstState = false;
  //     } else if ($scope.firstCard['$$hashKey'] !== card['$$hashKey']) {
  //       console.log("They were not the same card after all!");
  //       $scope.secondCard = card;
  //       $scope.gameInPlay = false;
  //       if ($scope.firstCard.url === $scope.secondCard.url) {
  //         console.log("They match!!!");
  //           $scope.firstCard.open = true;
  //           $scope.secondCard.open = true;
  //           $scope.firstCard.matched = true;
  //           $scope.secondCard.matched = true;
  //       } else {
  //         $timeout(function() {
  //           console.log("tried to set a delay");
  //           // debugger
  //           $scope.gameInPlay = true;
  //           $scope.firstState = false;
  //           $scope.firstCard.open = false;
  //           $scope.secondCard.open = false;
  //           $scope.firstCard = null;
  //           $scope.secondCard = null;
  //         }, 1000);
  //       }
  //     }
  //   }
    // $scope.firstCard = $scope.deck.currentCards[index];
    // console.log($scope.firstCard);
  // }

});

function Card(url, open, matched) {
  this.url = url;
  this.open = open;
  this.matched = matched;
}

function Deck() {
  this.currentCards = [];
  this.generateCards();
}

Deck.prototype.generateCards = function() {
  var cards = [];

  for(var j = 0; j < 2; j++) {
    for (var i = 1; i <= 8; i++) {
      var url = "assets/monsters-0" + i + ".png"
      cards.push(new Card(url, false, false));
    };
  }

  var length = cards.length;

  while (this.currentCards.length != length) {
    var randomIndex = Math.floor(Math.random() * cards.length);

    this.currentCards.push(cards[randomIndex]);
    cards.splice(randomIndex, 1);
  }
}

// var game1 = new Deck();
// game1.generateCards();
