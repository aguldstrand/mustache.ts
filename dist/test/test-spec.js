"use strict";
const compiler_1 = require("../src/compiler/compiler");
const runtime_1 = require("../src/runtime/runtime");
const glob = require('glob');
const fs = require('fs');
const path = require('path');
describe('handlebars spec', function () {
    glob('spec/**/*.json', function (err, files) {
        files.forEach(file => {
            const text = fs.readFileSync(file, 'utf8');
            const spec = JSON.parse(text);
            describe(path.basename(file), function () {
                spec.tests.forEach(test => {
                    var assert = require('assert');
                    it(test.name, function () {
                        const tplFnText = compiler_1.compile(test.template);
                        const fn = runtime_1.makeTemplate(tplFnText, {}, {});
                        const result = fn(test.data);
                        assert.equal(result, test.expected);
                    });
                });
            });
        });
    });
});
