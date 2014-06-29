/*jslint stupid: true*/

'use strict';

var fs = require('fs'),
    projectPath = process.cwd() + '/client';

module.exports = {
    getPath: function () {
        return projectPath;
    },
    setPath: function (path) {
        projectPath = path;
    },
    getOption: function (path) {
        var configText,
            config;

        try {
            configText = fs.readFileSync(path, 'utf-8');
            if (configText) {
                try {
                    config = JSON.parse(configText);
                } catch (ex) {
                    console.log('Error parse config file "' + path + '": ' + ex);
                }
            }
        } catch (ex) {
            if (path && ex.code !== 'ENOENT') {
                console.log('Error reading config file "' + path + '": ' + ex);
            }
        }

        return config;
    }
};
