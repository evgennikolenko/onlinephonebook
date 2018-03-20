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
        templateUrl: 'controllers/basic-controllers/login/login.html',
        resolve: {
            auth: function ($q, $state) {
                /*
                 * Watch of user auth;
                 * If return true --> redirect on page 'home'
                 */
                firebase.auth().onAuthStateChanged(function(user) {
                    if (user) {
                        $state.go('home');
                    }
                });
            }
        },
        controllerAs: 'login',
        controller: 'loginCtrl'
    });
}

