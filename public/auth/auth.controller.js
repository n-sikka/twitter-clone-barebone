(function(){
  'use strict';

  angular
    .module('timesuck')
    .controller('AuthController', controller);

  function controller($http, $state){
    var vm = this;

    vm.isAuth = function() {
      if(localStorage.getItem('token')){
        vm.user = localStorage.getItem('username');
        vm.isAuth = true;
        return true;
      }else {
        vm.isAuth = false;
        return false;
      }
    }

    vm.loginUser = function(cred) {


      $http.post('api/user/login', cred)
           .then(function success(response){
              localStorage.setItem('token', response.data._id);
              localStorage.setItem('email', response.data.email);
              localStorage.setItem('user-image', response.data.image);
              	zvar name = response.data.email.substring(0, response.data.email.lastIndexOf("@"));
              localStorage.setItem('username', name);
              location.reload();
           }, function error(response){
             console.log(response.statusText);
           });

    }

    vm.logout = function	z
      localStorage.clear();
      location.reload();
    }

  }
})()
