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
    .run(function ($rootScope) {
        $rootScope.flagNotSignIn = true;

    })
    .config(function ($urlRouterProvider) {
        $urlRouterProvider.otherwise('phonebook');
    });

