var fs = require('fs'),
    jslint = require('jslint').load('latest'),
    config = require('./config');

function lint() {
    var files = config.getFiles(),
        options = config.load(),
        result = [];

    files.forEach(function (file) {
        var content = fs.readFileSync(file, 'utf-8');
        if (!jslint(content, options)) {
            result.push({
                file: file,
                errors: jslint.data().errors
            });
        }
    });

    return result;
}

//lint();
exports.lint = lint;
