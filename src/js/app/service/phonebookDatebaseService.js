/**
 * Created by evgen on 12.02.18.
 */


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
        console.debug('red', refUserCard);
        console.log('userData', userData);
        console.log('uid', uid);

        // ref.child('phonesbook/authUsers/' + uid + '/userCard').on("value", function(snapshot) {
        //     // storing the snapshot.val() in a variable for convenience
        //
        //     var sv = snapshot.val();
        //     console.log("sv " + sv); //returns [obj obj]
        //
        //     // Getting an array of each key in the snapshot object
        //     var svArr = Object.keys(sv);
        //     console.log("svArr " + svArr); // [key1, key2, ..., keyn]
        //     // Console.log name of first key
        //     console.log(svArr[svArr.length-2]);
        // }, function(errorObject) {
        //     console.log("Errors handled: " + errorObject.code);
        // });
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
