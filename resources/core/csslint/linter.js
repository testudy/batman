var fs = require('fs'),
    csslint = require('csslint').CSSLint,
    config = require('./config');

function lint() {
    var files = config.getFiles(),
        options = config.load(),
        result = [];

    files.forEach(function (file) {
        var content = fs.readFileSync(file, 'utf-8'),
            messages = csslint.verify(content).messages

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
