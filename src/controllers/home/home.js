/**
 * Created by evgen on 07.02.18.
 */
angular.module('phoneBookApp.home', ['ui.router']);

angular.module('phoneBookApp.home')
    .config(Config)
    .controller('homeCtrl', homeCtrl);
function homeCtrl(loginService) {
    var home = this;
    home.val = "111";
    home.rr = function () {
       var user = loginService.getUser();
       console.log(user);
       home.email = user.email;
    };
    home.authObj = loginService.isAuth();

    // console.log( home.authObj);

}


Config.$inject = ['$stateProvider', '$urlRouterProvider'];

function Config($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
        url: "/phonebook/home",
        templateUrl: 'js/app/controllers/home/home.html',
        resolve: {
            auth: function ($q, $state, loginService) {
                console.log('RRR', loginService.getUser());
                if (loginService.getUser() === undefined || loginService.getUser() === null) {
                    $q.reject();
                    alert('Вы должны авторизироваться!');
                    $state.go('login');
                }
            }
        },
        controllerAs: 'home',
        controller: 'homeCtrl'
    });
}