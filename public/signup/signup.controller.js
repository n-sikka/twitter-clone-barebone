(function(){
  angular
    .module('timesuck')
    .controller('SignUpController', controller);

  function controller($http){
    var vm = this;

    vm.createUser = function(user) {
      console.log(user)
      $http.post('api/user/signup', user)
           .then(function success(response){
              console.log(response.statusText);
           }, function error(response){
              console.log(response.statusText);
           });
    }
  }

})()
