angular.module('listDemo1', ['ngMaterial'])
.controller('ListCtrl', function($scope) {
  $scope.toppings = [
    { name: 'Pepperoni', wanted: true },
    { name: 'Sausage', wanted: false },
    { name: 'Black Olives', wanted: true },
    { name: 'Green Peppers', wanted: false }
  ];

  $scope.settings = [
    { name: 'Wi-Fi', icon: 'wifi', enabled: true },
    { name: 'Bluetooth', icon: 'bluetooth', enabled: false },
  ];

  $scope.people = [
    { name: 'Janet Perkins', newMessage: true },
    { name: 'Mary Johnson', newMessage: false },
    { name: 'Peter Carlsson', newMessage: false }
  ];

  $scope.navigateAway = function() {
    alert('You would be whisked away!');
  };

});
