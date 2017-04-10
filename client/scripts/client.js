var myApp = angular.module('myApp', []);

myApp.controller('SendMessage', ['$scope', 'DataService', function($scope, DataService){

var dataService = DataService;

  $scope.message = {
    name: '',
    text: ''
  };

$scope.messageArray = dataService.messageArray;
$scope.addMessage = dataService.addMessage;

}]);

myApp.controller('ShowMessages', ['$scope', 'DataService', function($scope, DataService) {

  $scope.messageObject = DataService.messageObject;
  $scope.getData = DataService.getData;


}]);

myApp.factory('DataService', ['$http', function($http){
    var messageObject = {
      messages : []
    };

    messageArray = [];

    var addMessage = function(message) {
      console.log(message);
      var copy = angular.copy(message);
      messageArray.push(copy);
      console.log(messageArray);
      postData(messageArray);
    };

    function getData(){
      $http.get('/messages').then(function(response){
        console.log('Object back from db: ', response);
      });
    }

    function postData(message){
      $http.post('/messages', message).then(function(response){
        messageObject.response = response;
      });
      getData();
    }

    return {
      messageObject : messageObject,
      addMessage: addMessage,
      messageArray: messageArray,
      getData  : getData,
      postData : postData
    };
}]);
