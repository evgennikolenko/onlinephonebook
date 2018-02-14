/**
 * Created by evgen on 13.02.18.
 */
/**
 * Created by evgen on 07.02.18.
 */
angular.module('phoneBookApp.phonebook', ['ui.router']);

angular.module('phoneBookApp.phonebook')
    .config(Config)
    .controller('phonebookCtrl', phonebookCtrl);
function phonebookCtrl(phonebookDatebaseService) {
    var phonebook = this;

    phonebook.showModal = false;
    phonebook.showModalAddCard =function () {
        phonebook.showModal = true;
    };

    phonebook.objUserAdd = {
        firstname: '',
        lastname: '',
        address: '',
        email: '',
        phone1: '',
        phone2: ''
    };

    phonebook.addUserCard = function () {
        phonebookDatebaseService.addUserCard(phonebook.objUserAdd);
        phonebook.showModal = false;
    };

        phonebookDatebaseService.loadUserCard().then(function (userCard) {
            phonebook.list = userCard;
            phonebook.myData = phonebook.list.pop();
        });

}


Config.$inject = ['$stateProvider', '$urlRouterProvider'];

function Config($stateProvider, $urlRouterProvider) {
    $stateProvider.state('userroom', {
        url: "/phonebook/home/userroom",
        templateUrl: 'controllers/phonebook-controller/phonebook.html',
        resolve: {
            auth: function ($q, $state, loginService) {
                console.log('RRR', loginService.getUser());
                if (loginService.getUser() === null) {
                    $q.reject();
                    alert('Вы должны авторизироваться!');
                    $state.go('login');
                }
            }
        },
        controllerAs: 'phonebook',
        controller: 'phonebookCtrl'
    });
}