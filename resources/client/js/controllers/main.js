(function (ng) {
    'use strict';

    var project = require('./core/util/project.js');

    ng.module('batmanApp').controller('MainCtrl', ['$scope', 'JSLint', 'CSSLint', 'Recess', function ($scope, JSLint, CSSLint, Recess) {
        $scope.render = {
            jslint: null,
            csslint: null,
            recess: null
        };

        $scope.isBefore = true;
        $scope.isPerfect = false;

        $scope.Info = {
            directory: '',
            jslint: true,
            csslint: true,
            recess: true
        };

        function isPerfect() {
            var render = $scope.render;
            if ((!render.jslint || (render.jslint && render.jslint.length === 0)) &&
                    (!render.csslint || (render.csslint && render.csslint.length === 0)) &&
                    (!render.recess || (render.recess && render.recess.length === 0))) {

                $scope.isPerfect = true;
            } else {
                $scope.isPerfect = false;
            }
        }

        $scope.lint = function () {
            $scope.isBefore = false;
            project.setPath($scope.Info.directory);

            $scope.render.jslint = null;
            if ($scope.Info.jslint) {
                $scope.render.jslint = JSLint.lint();
            }

            $scope.render.csslint = null;
            if ($scope.Info.csslint) {
                $scope.render.csslint = CSSLint.lint();
            }

            $scope.render.recess = null;
            if ($scope.Info.recess) {
                Recess.lint(function (result) {
                    $scope.render.recess = result;
                    isPerfect();
                    $scope.$apply();
                });
            } else {
                isPerfect();
            }
        };
    }]);
}(this.angular));
