/**
 * Created by evgen on 10.02.18.
 */
angular.module('phoneBookApp')
    .directive('startButtons', function () {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'js/app/directive/startButtons/start-buttons.html'
    }
});