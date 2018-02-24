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

    /*
    * Function start when the button 'openModal' is pressed;
    * 'avatarColor' choose a color for avatar;
     */
   phonebook.openModal = function () {
        phonebook.avatarColor = function () {
           var a = ['b2e2a2', '53b1f0', '6fb1e4', 'ce90e2', 'ecd074', '73cdd0'];
           return a[Math.floor(Math.random() * a.length)];
         };
       phonebook.avatar = phonebook.avatarColor();

       /*
       * Object with settings user-card for firebase;
       * 'objUserAdd' is filled from the form in modal window
       */
       phonebook.objUserAdd = {
           firstname: '',
           lastname: '',
           address: '',
           email: '',
           phone1: '',
           phone2: '',
           avatar: phonebook.avatar
       };
   };

    /*
     * Function sends info about user in firebase and create a card;
     * 'phonebookDatebaseService' - service for work with database;
     */
    phonebook.addUserCard = function () {
        phonebookDatebaseService.addUserCard(phonebook.objUserAdd);
    };

    /*
     *  Clear the form after created user
     */
    phonebook.closeModalWindow = function () {
        $(".modal-body form input").val("");
    };

    /*
     * Load data from database - 'loadUserCard()';
     * 'phonebookDatebaseService' - service for work with database;
     * 'phonebook.list' - model (user cards);
     * 'phonebook.myData' - info about me;
     */
    phonebookDatebaseService.loadUserCard().then(function (userCard) {
            phonebook.list = userCard;
            phonebook.myData = phonebook.list.pop();
        });
}



Config.$inject = ['$stateProvider'];

function Config($stateProvider) {
    $stateProvider.state('userroom', {
        url: "/phonebook/home/userroom",
        templateUrl: 'controllers/phonebook-controller/phonebook.html',
        resolve: {
            auth: function ($q, $state, loginService) {
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