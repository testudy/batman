'use strict';

var path = require('path'),
    project = require('../../core/util/project'),
    walk = require('../../core/util/walk');

module.exports = {
    load: function () {
        var defaultConfigPath = path.normalize(path.join(process.env.HOME || process.env.USERPROFILE, '.jslintrc')),
            projectConfigPath = path.normalize(path.join(project.getPath(), '.jslintrc')),
            config = {},
            result;

        result = project.getOption(defaultConfigPath);
        if (result) {
            config = result;
        }

        result = project.getOption(projectConfigPath);
        if (result) {
            config = result;
        }

        return config;
    },

    getFiles: function () {
        return walk.walk(project.getPath(), {
            pattern: /\.js$/,
        });
    }
};
