
/**
 * Created by evgen on 14.02.18.
 */
angular.module('phoneBookApp')
    .directive('userCard', function ($timeout) {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: 'js/app/directive/userCard/user-card.html',
            // scope : {
            //     onCancel: '&',
            //     list: '@'
            // },
            replace: true,
            link: function(scope, element, attrs, controller) {
                console.log('elem', controller);
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
            controller: function () {
            },
            controllerAs: 'userCard'
        }
    });