/**
 * Created by evgen on 07.02.18.
 */
angular.module('phoneBookApp', ['ui.router',
                                'firebase',
                                'phoneBookApp.startPage',
                                'phoneBookApp.login',
                                'phoneBookApp.createAccount',
                                'phoneBookApp.home']);

angular.module('phoneBookApp')
    .run(function ($rootScope, loginService) {
        $rootScope.flagNotSignIn = true;
       $rootScope.isAuth = function () {
           if (loginService.getUser() === null) {
               return false;
           } else return true;
       };
    })
    .config(function ($urlRouterProvider) {
        $urlRouterProvider.otherwise('phonebook');
    });

