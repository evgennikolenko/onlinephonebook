/**
 * Created by evgen on 14.02.18.
 */
angular.module('phoneBookApp')
    .directive('userCard', function () {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: 'js/app/directive/userCard/user-card.html',
            link: function(scope, element, attrs, controller) {
                // console.log('cc', controller);
                // console.log('ss', attrs );
            },
            bindToController: true,
            controller: function () {

            },
            controllerAs: 'userCard'
        }
    });