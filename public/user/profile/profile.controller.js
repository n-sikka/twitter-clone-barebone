(function(){
  'use strict';

  angular
    .module('timesuck')
    .controller('ProfileController', controller);

    function controller($scope, Upload, $http){
      var vm = this;

      if(localStorage['token']) {
        vm.userId = localStorage['token'];
      }else {
        vm.userId = undefined;
      }

      vm.uploadFile = function(file) {

        if(file) {
          Upload.upload({
            url: 'api/profile/editPhoto',
            method: 'POST',
            data: {userId: localStorage['token']},
            file: file
          }).progress(function(evt){
            console.log('uploading image');
          }).success(function(data) {
            console.log(data);
            alert('Image Uploaded Successfully')
          }).error(function(error) {
            console.log(error)
          })
        }

      }
      //this is deprecated, need to replace
      //watches file ng model in profile edit and uploads the file value
      $scope.$watch(function(){
        return $scope.file
      }, function() {
        vm.uploadFile($scope.file);
      });


      vm.getUserProfile = function() {
        var userId = localStorage.getItem('token');
        $http.get('/api/users/get/'+userId)
            .then(function success(response){
              vm.userProfile = response.data;
            }, function error(response){
              console.log(response);
            })
      }

      vm.updateUsername = function(username) {
        var postData = {
          userId: vm.userId,
          username: username
        }

        $http.post('api/profile/updateUsername', postData)
             .then(function success(response){
               console.log(response);
             }, function error(response){
               console.log(response);
             })
      }

      vm.updateBio = function(bio) {
        var postData = {
          userId: vm.userId,
          bio: bio
        }

        $http.post('api/profile/updateBio', postData)
             .then(function success(response){
               console.log(response);
             }, function error(response){
               console.log(response);
             })
      }

      vm.updateProfile = function(username, bio) {
        vm.updateUsername(username)
        vm.updateBio(bio)
      }


    }
})()
