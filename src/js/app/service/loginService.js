/**
 * Created by evgen on 07.02.18.
 */
angular.module('phoneBookApp')
    .service('loginService', loginService);

function loginService($state, $rootScope, $firebaseAuth) {

    var self = this;


//     console.log(firebaseUser);


    self.createAccount = function (objPassAndEmail) {
        firebase.auth().createUserWithEmailAndPassword(objPassAndEmail.email, objPassAndEmail.password)
            .then(function(user) {

                console.log("Signed in as:", user.uid);
                $rootScope.flagNotSignIn = false;
                $state.go('home');
            }).catch(function(error) {
            console.error("Authentication failed:", error);
        });
    };

    self.signIn = function (objPassAndEmail) {
        firebase.auth().signInWithEmailAndPassword(objPassAndEmail.email, objPassAndEmail.password)

            .then(function(user) {
                console.log("Signed in as:", user.uid);
                if(user){
                    $rootScope.flagNotSignIn = false;
                    $state.go('home')
                }
            }).catch(function(error) {
                console.error("Authentication failed:", error);
            });
    };

    self.isAuth = function () {

        var firebaseUser = $firebaseAuth().$getAuth();
        if (firebaseUser) {
            return true
        } else {
            return false
        }
    };


    self.getUser = function () {
        var firebaseUser = $firebaseAuth().$getAuth();
        return firebaseUser;
    };
    self.signOut = function () {
        firebase.auth().signOut().then(function() {
            alert("Exit!!!");
                    $state.go('phonebook')
        }).catch(function(error) {
            console.log(error);
        });
    }




}
