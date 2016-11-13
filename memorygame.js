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
    if ((card.matched === false) && ($scope.gameInPlay === true)) {
      if ($scope.firstState === true) {
        card.open = true;
        $scope.firstCard = card;
        $scope.firstState = null;
      } else if ($scope.firstCard['$$hashKey'] !== card['$$hashKey']) {
        card.open = true;
        $scope.secondCard = card;
        $scope.moves += 1;
        if ($scope.firstCard.url === $scope.secondCard.url) {
            $scope.firstCard.open = true;
            $scope.secondCard.open = true;
            $scope.firstCard.matched = true;
            $scope.secondCard.matched = true;
            $scope.matches += 1;
        } else {
          $timeout(function() {
            $scope.gameInPlay = true;
            $scope.firstCard.open = false;
            $scope.secondCard.open = false;
          }, 500);
        }
        $scope.firstState = true;
        $scope.gameInPlay = false;
        $timeout(function() {
          $scope.gameInPlay = true;
          $scope.firstCard = null;
          $scope.secondCard = null;
        }, 500);
      }
    }
  }
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
