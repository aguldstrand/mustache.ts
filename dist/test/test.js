"use strict";
const compiler_1 = require("../src/compiler/compiler");
const runtime_1 = require("../src/runtime/runtime");
const testCases_1 = require("./testCases");
const scenarios = []
    .concat(testCases_1.testCases);
const helpers = {
    uppercase: (scope, args) => args[0].toUpperCase(),
    label: (scope, args) => args[0] + '_helped',
    ellipsis: (scope, args) => args[0] + '...',
};
const partials = {};
describe('suite 1', function () {
    for (let i = 0; i < scenarios.length; i++) {
        const scenario = scenarios[i];
        var assert = require('assert');
        it(`${i} - ${scenario.msg}`, function () {
            const tplFnText = compiler_1.compile(scenario.tpl);
            const fn = runtime_1.makeTemplate(tplFnText, helpers, partials);
            const result = fn(scenario.data);
            assert.equal(result, scenario.res);
        });
    }
});
