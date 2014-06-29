/*jslint stupid: true*/

var path = require('path'),
    fs = require('fs'),
    project = require('../../core/util/project'),
    walk = require('../../core/util/walk');

module.exports = {
    load: function () {
        'use strict';

        var defaultConfigPath = path.normalize(path.join(process.env.HOME || process.env.USERPROFILE, '.jslintrc')),
            projectConfigPath = path.normalize(path.join(project.getPath(), '.jslintrc')),
            config = {};


        try {
            config = fs.readFileSync(defaultConfigPath, 'utf-8');
        } catch (ex) {
            if (defaultConfigPath && ex.code !== 'ENOENT') {
                console.log('Error reading config file "' + defaultConfigPath + '": ' + ex);
            }
        }

        try {
            config = fs.readFileSync(projectConfigPath, 'utf-8');
        } catch (ex) {
            if (projectConfigPath && ex.code !== 'ENOENT') {
                console.log('Error reading config file"' + projectConfigPath + '": ' + ex);
            }
        }

        return config;
    },

    getFiles: function () {
        return walk.walk(project.getPath(), {
            pattern: /\.js$/,
        });
    }
};
