'use strict';

var recess = require('recess'),
    config = require('./config');

function handle(data) {
    var result = [],
        i,
        len,
        message,
        evidence,
        re = /^\s*\d+\./;

    for (i = 0, len = data.length; i < len; i += 1) {
        message = data[i];
        evidence = data[i + 1];

        if (evidence.indexOf('STATUS: Perfect!') !== -1) {
            break;
        }

        if (evidence && re.test(evidence)) {
            i += 1;
        } else {
            evidence = '';
        }

        result.push({
            message: message,
            evidence: evidence
        });
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

            if (error && !reports) {
                throw error;
            }
            console.log(reports);
            if (reports && reports.length) {
                for (i = 0, len = reports.length; i < len; i += 1) {
                    report = reports[i];
                    if (report.errors.length) {
                        errors = handle(report.errors);
                    }
                    if (report.output.length) {
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
