(function (ng) {
    'use strict';

    var lint = require('./core/recess/linter').lint;

    ng.module('batmanApp').factory('Recess', [function () {
        return {
            lint: function (callback) {
                lint(callback);
            }
        };
    }]);
}(this.angular));
