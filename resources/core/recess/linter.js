'use strict';

var recess = require('recess'),
    config = require('./config');

function handle(data) {
    var result = [],
        i,
        len;
    for (i = 0, len = data.length; i < len; i += 1) {
        result.push({
            message: data[i],
            evidence: data[i + 1]
        });
        i += 1;
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
                len;

            if (error) {
                throw error;
            }
            if (reports && reports.length) {
                for (i = 0, len = reports.length; i < len; i += 1) {
                    report = reports[i];
                    if (report.errors.length || report.output.length) {
                        result.push({
                            file: report.path,
                            errors: handle(report.errors),
                            output: handle(report.output)
                        });
                    }
                }
            }
            callback(result);
        });
    }
}

//lint();
exports.lint = lint;
