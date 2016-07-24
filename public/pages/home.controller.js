(function(){
  'use strict';

  angular
    .module('timesuck')
    .controller('HomeController', controller);

    function controller($http, $interval, $state, $scope) {
        var vm = this;
        vm.bitches;
        vm.newBitches;


        if(localStorage.getItem('token')) {
          vm.isAuth = true;
          vm.user = localStorage.getItem('username');
        } else {
          vm.isAuth = false;
        }

        vm.sendBitch = function(event, bitch) {
          // console.log(event)
          if(event.which === 13) { //enter
            console.log(bitch);
            var request = {
              user: vm.user || localStorage.getItem('email'),
              userId: localStorage.getItem('token'),
              userImage: localStorage.getItem('user-image'),
              content: bitch
            }
            $http.post('api/bitch/post', request)
                 .then(function success(response){
                   vm.bitches = response.data;
                   vm.newBitch = "";
                   console.log(response.data);
                 },function error(response){
                   console.log(response);
                 })
          }

        }

        vm.getBitches = function(initial) {

          $http.get('/api/bitch/get')
                .then(function success(response){

                  if(initial) {
                    vm.bitches = response.data;
                    console.log('initial call')
                  } else {
                    if(response.data.length > vm.bitches.length){
                      vm.newBitches = response.data;
                      console.log('newBitches updated!');
                    }
                    console.log('update call!');
                  }

                }, function error(response){
                  console.log(response.statusText)
                })
        }

        if(vm.isAuth){
          $interval(function(){

            vm.getBitches(false);

            if(vm.newBitches) {
              vm.difference = vm.newBitches.length - vm.bitches.length;
            }

            // effective code but not sure if efficient or not.
            
            // if(vm.newBitches){
            //   vm.difference = vm.newBitches.length - vm.bitches.length;
            //
            //   if(vm.difference > 0 && vm.difference !=0){
            //     // vm.bitches = vm.newBitches;
            //     vm.flag = true;
            //     // vm.bitches = vm.newBitches;
            //   }
            //
            // }else {
            //   vm.flag = false;
            // }



          }, 5000);
        }


        vm.updateBitches = function(){
              vm.bitches = angular.copy(vm.newBitches);
              vm.newBitches = undefined;
        }
    }

})()
