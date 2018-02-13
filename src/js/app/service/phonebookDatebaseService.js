/**
 * Created by evgen on 12.02.18.
 */
phonebookDatebaseService

angular.module('phoneBookApp')
    .service('phonebookDatebaseService', phonebookDatebaseService);

function phonebookDatebaseService($state, $rootScope) {
    // Get a reference to the database service
    var database = firebase.database();

    this.createUserRoom = function (uid, userFirstName, userLastName, userPhone) {
        database.ref('phonesbook/authUsers/' + uid + '/userCard/myData/').set({
            firstname: userFirstName,
            lastname: userLastName,
            phone: userPhone
        });
    }
}
