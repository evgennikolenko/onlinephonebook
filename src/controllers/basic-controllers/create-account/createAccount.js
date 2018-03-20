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
        userPhone : '',
        email: '',
        password: ''
    };

    create.createUser = function(){
        loginService.createAccount(create.objRegistrationData);
    };


    create.getUser = loginService.getUser();
}

Config.$inject = ['$stateProvider', '$urlRouterProvider'];

function Config($stateProvider, $urlRouterProvider) {
    $stateProvider.state('create', {
        url: "/phonebook/create",
        templateUrl: 'controllers/basic-controllers/create-account/createAccount.html',
        resolve: {
            auth: function ($q, $state) {
                /*
                 * Watch of user auth;
                 * If return true --> redirect on page 'home'
                 */
                firebase.auth().onAuthStateChanged(function(user) {
                    if (user) {
                        alert('Вы уже авторизированы!'); // soon will be deleted;
                        $state.go('home');
                    }
                });
            }
        },
        controllerAs: 'create',
        controller: 'createAccountCtrl'
    });
}


