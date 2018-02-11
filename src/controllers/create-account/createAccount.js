/**
 * Created by evgen on 08.02.18.
 */

angular.module('phoneBookApp.createAccount', ['ui.router']);

angular.module('phoneBookApp.createAccount')
    .config(Config)
    .controller('createAccountCtrl', createAccountCtrl);

function createAccountCtrl(loginService) {
    var create = this;

    create.objRegistrationData = {
        userFirstName : '',
        userLastName : '',
        email: '',
        password: ''
    };

    create.createUser = function(){
        loginService.createAccount(create.objRegistrationData);
    };


    create.getUser = loginService.getUser();
    console.log('user',   create.getUser);
}

Config.$inject = ['$stateProvider', '$urlRouterProvider'];

function Config($stateProvider, $urlRouterProvider) {
    $stateProvider.state('create', {
        url: "/phonebook/create",
        templateUrl: 'controllers/create-account/createAccount.html',
        resolve: {
            auth: function ($q, $state, loginService) {
                if (loginService.getUser() !== null) {
                    $q.reject();
                    alert('Вы уже авторизированы!');
                    $state.go('home');
                }
            }
        },
        controllerAs: 'create',
        controller: 'createAccountCtrl'
    });
}


