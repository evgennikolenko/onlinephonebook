/**
 * Created by evgen on 07.02.18.
 */
angular.module('phoneBookApp.startPage', ['ui.router']);

angular.module('phoneBookApp.startPage')
    .config(Config)
    .controller('startPageCtrl', startPageCtrl);
function startPageCtrl() {


}

Config.$inject = ['$stateProvider', '$urlRouterProvider'];

function Config($stateProvider, $urlRouterProvider) {
    $stateProvider.state('phonebook', {
        url: "/phonebook",
        templateUrl: 'controllers/basic-controllers/start-page/startPage.html',
        resolve: {
            auth: function ($state) {
                /*
                 * Watch of user auth;
                 * If return true --> redirect on page 'home'
                 */
                firebase.auth().onAuthStateChanged(function(user) {
                    if (user) {
                        alert('Вы авторизованы!'); // debug. Soon will be deleted.
                        $state.go('home');
                    }
                });
            }
        },
        controllerAs: 'startPage',
        controller: 'startPageCtrl'
    });
}