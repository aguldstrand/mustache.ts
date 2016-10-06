"use strict";
const compiler_1 = require("./compiler/compiler");
const runtime_1 = require("./runtime/runtime");
const testCases_1 = require("../test/testCases");
const scenarios = []
    .concat(testCases_1.testCases);
const helpers = {
    uppercase: (scope, args) => args[0].toUpperCase(),
    if: (scope, args) => args[0] ? [scope] : [],
    unless: (scope, args) => args[0] ? [] : [scope],
    label: (scope, args) => args[0] + '_helped',
    ellipsis: (scope, args) => args[0] + '...',
};
for (let i = 0; i < scenarios.length; i++) {
    const scenario = scenarios[i];
    console.log(`--- ${i} ${scenario.msg || ''} ---`);
    const iterations = 1;
    let start = process.hrtime();
    for (let j = 0; j < iterations; j++) {
        runtime_1.makeTemplate(compiler_1.compile(scenario.tpl), helpers);
    }
    let elapsed = process.hrtime(start);
    ////// console.log(`average compile time: ${Math.floor((elapsed[0] * 1e9 + elapsed[1]) / iterations / 1e3)}µs`)
    const tplFnText = compiler_1.compile(scenario.tpl);
    const fn = runtime_1.makeTemplate(tplFnText, helpers);
    try {
        const result = fn(scenario.data);
        start = process.hrtime();
        for (let j = 0; j < iterations; j++) {
            fn(scenario.data);
        }
        elapsed = process.hrtime(start);
        ///// console.log(`average execution time: ${((elapsed[0] * 1e9 + elapsed[1]) / iterations / 1e3)}µs`)
        ///// console.log(`compiled/template length: ${(tplFnText.length / scenario.tpl.length)}`)
        if (result !== scenario.res) {
            console.log('----------------------------------------------');
            console.log('invalid template output     <--------');
            console.log(scenario.tpl);
            console.log();
            console.log('actual', result);
            console.log('expect', scenario.res);
            console.log();
            console.log(tplFnText);
        }
        console.log();
    }
    catch (err) {
        console.log(tplFnText);
        console.log();
        throw err;
    }
}
