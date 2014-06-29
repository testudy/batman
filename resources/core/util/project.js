'use strict';

var projectPath = process.cwd() + '/client';

module.exports = {
    getPath: function () {
        return projectPath;
    },
    setPath: function (path) {
        projectPath = path;
    }
};
