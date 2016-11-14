
function Card(number) {
  this.url = 'images/monsters-' + number + '.png';
  this.open = false;
  this.matched = false;
}

var app = angular.module('memorygame', []);

app.controller('GameController', function($scope, $timeout) {
  $scope.state = 'first-card';
  $scope.firstCard = null;
  $scope.matchCount = 0;

  $scope.cards = [
    [new Card('01'), new Card('02'), new Card('03'), new Card('04')],
    [new Card('01'), new Card('04'), new Card('02'), new Card('03')]
  ];

  $scope.click = function(card) {
    if ($scope.state === 'first-card') {
      $scope.firstState(card);
    } else if ($scope.state === 'second-card') {
      $scope.secondState(card);
    } else if ($scope.state === 'showing-cards') {
      // nothing to do
    }
  };

  $scope.playerWins = function() {
    return $scope.cards.every(function(row) {
      var wholeRowMatched = row.every(function(card) {
        return card.matched;
      });
      return wholeRowMatched;
    });
  };

  $scope.firstState = function(card) {
    card.open = true;
    $scope.firstCard = card;
    $scope.state = 'second-card';
  };

  $scope.secondState = function(card) {
    card.open = true;
    if ($scope.firstCard.url === card.url) {
      $scope.state = 'first-card';
      $scope.matchCount++;
      $scope.firstCard.matched = true;
      card.matched = true;
      if ($scope.playerWins()) {
        console.log('You win!');
      }
    } else {
      $scope.state = 'showing-cards';
      $timeout(function() {
        $scope.firstCard.open = false;
        card.open = false;
        $scope.state = 'first-card';
      }, 1000);
    }
  };

});
