(function(){
  'use strict';


  angular
    .module('timesuck')
    .controller('FindFollowerController', controller)

    function controller($http, $state){
				var vm = this;

				vm.currentUserId = localStorage.getItem('token');
        vm.currentUser = JSON.parse(localStorage.getItem('user'));
				vm.getUser = function(){
						$http.get('api/users/get')
									  .then(function success(response) {
											vm.users = createDataset(response.data);
										}, function success(response) {
											console.log(response.statusText);
										})
				}

        vm.follow = function(id){
            var request = {
                user: vm.currentUserId,
                targetUser: id
            }

            $http.post('api/users/follow', request)
                  .then(function success(response){
                    vm.users = createDataset(response.data);
                    $state.reload();
                  },function error(response){
                    console.log(response.statusText)
                  })
        }

				function createDataset(arr) {
						var temp = [];

						for(var i=0; i<arr.length; i++){

                if(arr[i]._id == vm.currentUserId){

                  vm.currentUser = arr[i];

                }

                var followFlag = isFollowed(arr[i]._id);

                temp[i] =  {
                  name : arr[i].email.substring(0, arr[i].email.lastIndexOf("@")),
                  uid : arr[i]._id,
                  following : arr[i].following,
                  isFollowed : followFlag
                }

            }

            console.log(temp);
						return temp;
				}



        function isFollowed(id){

          var arr = vm.currentUser.following;
          var followed;

          arr.forEach(function(item){

            if(item.userId == id){
              followed = true;
            }

          })

          if(followed === 'undefined'){
            followed = false;
          }

          return followed;

        }

		}

})()
