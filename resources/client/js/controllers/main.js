(function (ng) {
    'use strict';

    var project = require('./core/util/project.js');

    ng.module('batmanApp').controller('MainCtrl', ['$scope', 'JSLint', 'CSSLint', 'Recess', function ($scope, JSLint, CSSLint, Recess) {
        $scope.render = {
            jslint: null,
            csslint: null,
            recess: null
        };

        $scope.Info = {
            directory: '',
            jslint: true,
            csslint: true,
            recess: true
        };

        $scope.lint = function () {
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
                    $scope.$apply();
                });
            }
        };
    }]);
}(this.angular));
