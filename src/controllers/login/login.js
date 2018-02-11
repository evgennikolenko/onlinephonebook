/**
 * Created by evgen on 07.02.18.
 */
angular.module('phoneBookApp.login', ['ui.router']);

angular.module('phoneBookApp.login')
    .config(Config)
    .controller('loginCtrl', loginCtrl);

function loginCtrl(loginService) {
    var login = this;

    login.objPassAndEmail = {
        email : '',
        password : ''
    };


    login.signIn = function(){
        loginService.signIn( login.objPassAndEmail );
    };

}

Config.$inject = ['$stateProvider', '$urlRouterProvider'];

function Config($stateProvider, $urlRouterProvider) {
    $stateProvider.state('login', {
        url: "/phonebook/login",
        templateUrl: 'controllers/login/login.html',
        resolve: {
        },
        controllerAs: 'login',
        controller: 'loginCtrl'
    });
}

