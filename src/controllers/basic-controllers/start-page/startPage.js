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
        templateUrl: 'controllers/start-page/startPage.html',
        resolve: {
            auth: function ($q, $state, loginService) {
                console.log('RRR', loginService.getUser());
                if (loginService.getUser() !== null) {
                    $q.reject();
                    alert('Вы авторизованы!');
                    $state.go('home');
                }
            }
        },
        controllerAs: 'startPage',
        controller: 'startPageCtrl'
    });
}