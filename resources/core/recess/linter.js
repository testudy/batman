'use strict';

var recess = require('recess'),
    config = require('./config');
function handleError(data) {
    var i,
        len,
        item;

    for (i = 0, len = data.length; i < len; i += 1) {
        item = data[i];
        if (item.extract) {
            item.evidence = item.extract.join('\n');
        }
    }
    return data;
}

function handleOutput(data) {
    var result = [],
        i,
        len,
        text,
        item = null,
        cRE = /^\s*\d+\./,
        sRE = /^\s+$/;

    for (i = 0, len = data.length; i < len; i += 1) {
        text = data[i];

        if (!sRE.test(text)) {
            if (text.indexOf('STATUS: Perfect!') !== -1) {
                item = null;
                break;
            }

            if (!cRE.test(text)) {
                if (item) {
                    item.evidence = item.evidence.join('\n');
                    result.push(item);
                }
                item = {
                    message: text,
                    evidence: []
                };
            } else {
                item.evidence.push(text);
            }
        }
    }

    if (item) {
        item.evidence = item.evidence.join('\n');
        result.push(item);
        item = null;
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

            if (reports && reports.length) {
                for (i = 0, len = reports.length; i < len; i += 1) {
                    report = reports[i];
                    if (report.errors.length) {
                        errors = handleError(report.errors);
                    }
                    if (report.output.length) {
                        output = handleOutput(report.output);
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
