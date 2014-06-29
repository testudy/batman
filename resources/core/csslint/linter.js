/*jslint stupid: true*/

'use strict';

var fs = require('fs'),
    underscore = require('underscore'),
    csslint = require('csslint').CSSLint,
    config = require('./config');

function lint() {
    var files = config.getFiles(),
        ruleset = csslint.getRuleset(),
        options = underscore.defaults(config.load(), ruleset),
        result = [];

    files.forEach(function (file) {
        var content = fs.readFileSync(file, 'utf-8'),
            messages = csslint.verify(content, options).messages;

        if (messages.length) {
            result.push({
                file: file,
                errors: messages
            });
        }
    });

    return result;
}

//lint();
exports.lint = lint;
