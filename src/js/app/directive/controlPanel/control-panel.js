/**
 * Created by evgen on 11.02.18.
 */
angular.module('phoneBookApp')
    .directive('controlPanel', function () {
        return {
            restrict: 'AE',
            transclude: true,
            templateUrl: 'js/app/directive/controlPanel/control-panel.html',
            // link : {
            //
            // },
            bindToController: true,
            controller: function (loginService) {
                this.currentUserName = firebase.auth().currentUser.displayName;

                this.signOut = function() {
                    loginService.signOut();
                };
            },
            controllerAs: 'controlPanel'

        }
    });