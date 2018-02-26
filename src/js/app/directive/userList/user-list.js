/**
 * Created by evgen on 26.02.18.
 */

angular.module('phoneBookApp')
    .directive('userList', function ($timeout) {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: 'js/app/directive/userList/user-list.html',

            // todo: repeat link with user-card.js (directive)

            replace: true,
            link: function(scope, element, userCard) {
                scope.onDeleteCard = function () {
                    element.fadeOut();

                    $timeout( function(){
                        var uid = firebase.auth().currentUser.uid;
                        var cardUid = scope.list.$id;
                        firebase.database().ref('phonesbook/authUsers/' + uid + '/userCard/' + cardUid).remove();
                    }, 1000 );
                };
            },
            bindToController: true,
            controller: function () {},
            controllerAs: 'userList'
        }
    });