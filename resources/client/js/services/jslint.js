(function (ng) {
    'use strict';

    var lint = require('./core/jslint/linter').lint;

    ng.module('batmanApp').factory('JSLint', [function () {
        return {
            lint: function () {
                return lint();
            }
        };
    }]);
}(this.angular));
