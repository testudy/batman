'use strict';

var recess = require('recess'),
    config = require('./config');

function handle(data) {
    var result = [],
        i,
        len;
    for (i = 0, len = data.length; i < len; i += 2) {
        if (data[i + 1].indexOf('STATUS: Perfect!') === -1) {
            result.push({
                message: data[i],
                evidence: data[i + 1]
            });
        }
    }
    return result;
}

function lint(callback) {
    var files = config.getFiles(),
        options = config.load(),
        result = [];

    if (files.length) {
        recess(files, options, function (error, reports) {
            var report,
                i,
                len,
                errors,
                output;

            if (error) {
                throw error;
            }
            if (reports && reports.length) {
                for (i = 0, len = reports.length; i < len; i += 1) {
                    report = reports[i];
                    if (report.errors.length || report.output.length) {
                        errors = handle(report.errors);
                        output = handle(report.output);
                    }
                    if ((errors && errors.length) || (output && output.length)) {
                        result.push({
                            file: report.path,
                            errors: errors,
                            output: output
                        });
                        errors = null;
                        output = null;
                    }
                }
            }
            callback(result);
        });
    }
}

//lint();
exports.lint = lint;
