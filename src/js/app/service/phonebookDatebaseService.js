/**
 * Created by evgen on 12.02.18.
 */
phonebookDatebaseService

angular.module('phoneBookApp')
    .service('phonebookDatebaseService', phonebookDatebaseService);

function phonebookDatebaseService($state, $rootScope, $firebaseArray) {
    // Get a reference to the database service
    var database = firebase.database();

    this.createUserRoom = function (uid, userFirstName, userLastName, userPhone) {
        database.ref('phonesbook/authUsers/' + uid + '/userCard/myData/').set({
            firstname: userFirstName,
            lastname: userLastName,
            phone: userPhone
        });
    };


    var ref = firebase.database().ref();

    this.addUserCard = function (userData) {
        var uid = firebase.auth().currentUser.uid;
        var refUserCard = ref.child('phonesbook/authUsers/' + uid + '/userCard/');
        refUserCard.push(userData);
        console.log('red', refUserCard);
        console.log('userData', userData);
        console.log('uid', uid);
    };

    this.loadUserCard = function (data) {
        // var self = this;

        var uid = firebase.auth().currentUser.uid;
        var refUserCard = $firebaseArray(ref.child('phonesbook/authUsers/' + uid + '/userCard/'));
        return refUserCard.$loaded(data)
        // var uid = firebase.auth().currentUser.uid;
        // var starCountRef = firebase.database().ref('phonesbook/authUsers/' + uid + '/userCard/');
        // starCountRef.on('value', function(snapshot) {
        //     console.log('snapshot', snapshot.val());
        //    // return snapshot.val();
        //     updateStarCount(postElement, snapshot.val());
        // });

    }
}
