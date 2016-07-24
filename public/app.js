(function(){
  'user strict';

  var app = angular
              .module('timesuck', [
                'ui.router',
                'ngFileUpload'
              ]);


  //SPA routes
  app.config(function($urlRouterProvider, $stateProvider){

    $urlRouterProvider.otherwise('/');
    $urlRouterProvider.when('/', '/home');

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'public/pages/home.html',
        controller: 'HomeController',
        controllerAs: 'vm'
      })
      .state('signup', {
        url: '/sign-up',
        templateUrl: 'public/signup/signup.html',
        controller: 'SignUpController',
        controllerAs: 'vm'
      })
      .state('editProfile', {
        url: '/edit-profile',
        templateUrl: 'public/user/profile/edit-profile.html',
        controller: 'ProfileController',
        controllerAs: 'vm'
      })
      .state('find', {
        url: '/explore',
        templateUrl: 'public/pages/follow/find.html',
        controller: 'FindFollowerController',
        controllerAs: 'vm'
      })
  })


})();
