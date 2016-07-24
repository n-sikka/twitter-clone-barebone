(function(){
  'use strict';


  angular
    .module('timesuck')
    .controller('FindFollowerController', controller)

    function controller($http){
				var vm = this;
				
				vm.currentUserId = localStorage.getItem('token');
				
				vm.getUser = function(){
//						console.log('function called')
						$http.get('api/users/get')
									  .then(function success(response) {
											vm.users = addUsername(response.data);
										}, function success(response) {
											console.log(response.statusText);
										})
				}
				
				function addUsername(arr) {
						var temp = [];
						for(var i=0; i<arr.length; i++){
								temp[i] =  {
										name : arr[i].email.substring(0, arr[i].email.lastIndexOf("@")),
										slug : arr[i]._id
								}
						}
						console.log(temp);
						return temp;
				}
				
				vm.follow = function(id){
						var request = {
								user: vm.currentUserId,
								targetUser: id 
						}
						
						$http.post('api/users/follow', request)
									.then(function success(response){
										console.log('followed')	
									},function error(response){
										console.log(response.statusText)	
									})
				}
		}

})()
