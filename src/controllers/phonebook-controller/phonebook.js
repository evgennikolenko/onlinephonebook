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

function phonebookCtrl(phonebookDatebaseService, $state) {

    var phonebook = this;

    //
    // phonebook.showModal = true;

    /*
     * This code choose a template depending on the chosen option
     * jquery removeClass change style on selected button
     */
    phonebook.showCard = true;
    $(".phonebook-btn__chooseTemp-card").removeClass('phonebook-btn__chooseTemp-card').addClass('phonebook-btn-active__chooseTemp-card');

    phonebook.showToCard = function () {
        phonebook.showCard = true;
        phonebook.showList = false;
        $(".phonebook-btn__chooseTemp-card").removeClass('phonebook-btn__chooseTemp-card').addClass('phonebook-btn-active__chooseTemp-card');
        $(".phonebook-btn-active__chooseTemp-list").removeClass('phonebook-btn-active__chooseTemp-list').addClass('phonebook-btn__chooseTemp-list')
    };
    phonebook.showToList = function () {
        phonebook.showCard = false;
        phonebook.showList = true;
        $(".phonebook-btn__chooseTemp-list").removeClass('phonebook-btn__chooseTemp-list').addClass('phonebook-btn-active__chooseTemp-list');
        $(".phonebook-btn-active__chooseTemp-card").removeClass('phonebook-btn-active__chooseTemp-card').addClass('phonebook-btn__chooseTemp-card')
    };


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
           phone: '',
           skype: '',
           avatar: phonebook.avatar
       };
   };

    /*
     * Function sends info about user in firebase and create a card;
     * 'phonebookDatebaseService' - service for work with database;
     */
    phonebook.addUserCard = function () {
        phonebookDatebaseService.addUserCard(phonebook.objUserAdd);
        $(".modal-body form input").val("");
    };

    /*
     * Load data from database - 'loadUserCard()';
     * 'phonebookDatebaseService' - service for work with database;
     * 'phonebook.list' - model (user cards);
     * 'phonebook.myData' - info about current user;
     */
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            phonebookDatebaseService.loadUserCard().then(function (userCard) {
                phonebook.list = userCard;
                phonebook.myData = phonebook.list.pop();
            });
        } else {
            $state.go('login');
        }
    });


    // phonebookDatebaseService.loadUserCard().then(function (userCard) {
    //         phonebook.list = userCard;
    //         phonebook.myData = phonebook.list.pop();
    //     });
}


Config.$inject = ['$stateProvider'];

// todo: пофиксить баги в роутинге. При обновлении все падает и переход на старт.

function Config($stateProvider) {
    $stateProvider.state('userroom', {
        url: "/phonebook/home/userroom",
        templateUrl: 'controllers/phonebook-controller/phonebook.html',
        resolve: {
            auth: function ($q, $state) {
                /*
                 * Watch of user auth;
                 * If return false --> redirect on page 'login'
                 */
                firebase.auth().onAuthStateChanged(function(user) {
                    if (!user) {
                        alert('Вы должны авторизироваться!');
                        $state.go('login');
                    }
                });
            }
        },
        controllerAs: 'phonebook',
        controller: 'phonebookCtrl'
    });
}