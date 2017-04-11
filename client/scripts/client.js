var myApp = angular.module('myApp', []);

myApp.controller('SendMessage', ['$scope', 'DataService', function($scope, DataService) {
  console.log('SendMessage Controller called');

  $scope.newMessage = {
    name: '',
    message: ''
  };

  $scope.postData = DataService.postData;


}]);

myApp.controller('AllMessages', ['$scope', 'DataService', function($scope, DataService) {
  $scope.messageObject = DataService.messageObject;
  $scope.getData = DataService.getData;
}]);

myApp.factory('DataService', ['$http', function($http){
    var messageObject = {
      messages : []
    };


    function getData(){
      $http.get('/messages').then(function(response){
        messageObject.messages = response.data;
        console.log(messageObject.messages);
      });
    }

    function postData(message){
      console.log('Message sent to db: ', message);
      $http.post('/messages', message).then(function(response){
          console.log('Response from db: ', response);
          getData();
      });

    }

    return {
      messageObject : messageObject,
      getData  : getData,
      postData : postData
    };
}]);
