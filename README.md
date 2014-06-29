batman
======

检查JS和CSS代码质量

Option
------
cp patch/parser.js resources/node_modules/recess/node_modules/less/lib/less/parser.js

    // 更改less/parse.js中对Node-Webkit运行环境的判断
    } else if (typeof(window) === 'undefined' || typeof(process) !== 'undefined') {
        // Node.js


Build
-----
nwbuild -v 0.9.2 resources/
