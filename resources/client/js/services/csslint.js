(function (ng) {
    'use strict';

    var lint = require('./core/csslint/linter').lint;

    ng.module('batmanApp').factory('CSSLint', [function () {
        return {
            lint: function () {
                return lint();
            }
        };
    }]);
}(this.angular));
