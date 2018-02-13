/**
 * Created by evgen on 07.02.18.
 */
angular.module('phoneBookApp')
    .service('loginService', loginService);

function loginService($state, $rootScope, $firebaseAuth, phonebookDatebaseService) {

    var self = this;

    self.createAccount = function (objPassAndEmail) {
        firebase.auth().createUserWithEmailAndPassword(objPassAndEmail.email, objPassAndEmail.password)
            // .then(function(user) {
            //     console.log("Signed in as:", user.uid);
            //     console.log(phonebookDatebaseService);
            //     // $rootScope.flagNotSignIn = false;
            //     user.updateProfile({
            //         displayName: objPassAndEmail.userFirstName + ' ' + objPassAndEmail.userLastName
            //     });
            //     console.log("Signed in as:", user.displayName);
            //     phonebookDatebaseService.createUserRoom(user.uid);
            //
            // })
            .then(function () {
               var user = firebase.auth().currentUser;
                user.updateProfile({
                    displayName:   objPassAndEmail.userFirstName + ' ' + objPassAndEmail.userLastName,
                    phoneNumber :  objPassAndEmail.userPhone

                }).then(function () {
                    console.log("Signed in as:", user);
                    console.log("Signed in ass:", user.displayName);
                    console.log("Signed in ass:", objPassAndEmail.userFirstName);
                    phonebookDatebaseService.createUserRoom(user.uid, objPassAndEmail.userFirstName,
                        objPassAndEmail.userLastName , objPassAndEmail.userPhone) ;
                    $state.go('home');
                });
            })
       .catch(function(error) {
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

    self.currentUser = function () {
        firebase.auth().currentUser.then(function (curUser) {
            console.log("ww", curUser);
        });

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
