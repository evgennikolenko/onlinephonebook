/**
 * Created by evgen on 07.02.18.
 */
angular.module('phoneBookApp.home', ['ui.router']);

angular.module('phoneBookApp.home')
    .config(Config)
    .controller('homeCtrl', homeCtrl);
function homeCtrl(loginService) {



    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var home = this;
            home.val = "111";
            home.rr = function () {
                var user = loginService.getUser();
                console.log(user);
                home.email = user.email;
            };

            home.currentUserName =  firebase.auth().currentUser.displayName;
            console.log("NAME", firebase.auth().currentUser.displayName);
        } else {
            console.log("NONAME");
        }
    });
}

Config.$inject = ['$stateProvider', '$urlRouterProvider'];

function Config($stateProvider) {
    $stateProvider.state('home', {
        url: "/phonebook/home",
        templateUrl: 'controllers/basic-controllers/home/home.html',
        resolve: {
            auth: function ($q, $state) {
                /*
                 * Watch of user auth;
                 * If return false --> redirect on page 'login'
                 */
                firebase.auth().onAuthStateChanged(function(user) {
                    if (!user) {
                        alert('Вы должны авторизироваться!'); // soon will be deleted.
                        $state.go('login');
                    }
                });
            }
        },
        controllerAs: 'home',
        controller: 'homeCtrl'
    });
}