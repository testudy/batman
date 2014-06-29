/*jslint stupid: true*/

'use strict';

var fs = require('fs'),
    path = require('path');

// 深度优先
function depthFirstWalk(dir, pattern) {
    var files = [],
        contents = fs.readdirSync(dir);

    dir = path.resolve(dir);

    contents.forEach(function (content) {
        var file = dir + '/' + content;
        if (fs.statSync(file).isDirectory()) {
            files = files.concat(depthFirstWalk(file, pattern));
        } else if (!pattern || pattern.test(file)) {
            files.push(file);
        }
    });

    return files;
}

// 广度优先
function breadthFirstWalk(dir, pattern) {
    var files = [],
        contents = fs.readdirSync(dir);

    dir = path.resolve(dir);

    contents.forEach(function (content) {
        var file = dir + '/' + content;
        if (fs.statSync(file).isFile() && (!pattern || pattern.test(file))) {
            files.push(file);
        }
    });

    contents.forEach(function (content) {
        var file = dir + '/' + content;
        if (fs.statSync(file).isDirectory()) {
            files = files.concat(breadthFirstWalk(file, pattern));
        }
    });

    return files;
}

/**
 * 在指定目录下搜索符合条件的文件
 * @method walk
 * @param {String} dir 搜索路径
 * @param {Object} [options]
 * @param {RegExp} [options.pattern] 文件路径匹配正则表达式
 * @param {Boolean} [options.isBreadthFirst=false] 是否采用广度优先算法，默认采用深度优先算法
 * @return {Array} 文件路径数组
 * @example
 * walk('.', {
 *     pattern: /\.js$/,
 *     isBreadthFirst: true
 * });
 */
function walk(dir, options) {
    if (!dir) {
        throw new Error('Argument Error: dir must pass!');
    }

    options = options || {};

    if (options.isBreadthFirst) {
        return breadthFirstWalk(dir, options.pattern);
    }

    return depthFirstWalk(dir, options.pattern);
}

//console.log(depthFirstWalk('..', /src\/.*\.js$/));
//console.log(breadthFirstWalk('..', /src\/.*\.js$/));
//console.log(walk('../'));

exports.walk = walk;

// 参考
// http://www.swordair.com/blog/2012/05/923/
