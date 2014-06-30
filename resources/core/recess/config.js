'use strict';

var path = require('path'),
    fs = require('fs'),
    project = require('../../core/util/project'),
    walk = require('../../core/util/walk');

module.exports = {
    load: function () {
        var defaultConfigPath = path.normalize(path.join(process.env.HOME || process.env.USERPROFILE, '.recessrc')),
            projectConfigPath = path.normalize(path.join(project.getPath(), '.recessrc')),
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

        // 强制使用默认规则
        config = {};
        //config.format = 'compact';
        config.noSummary = true;
        config.stripColors = true;
        config.noIDs = false;

        return config;
    },

    getFiles: function () {
        return walk.walk(project.getPath(), {
            pattern: /\.css$/,
        });
    }
};
