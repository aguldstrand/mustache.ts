declare const require: any
declare const describe: any
declare const it: any


import { compile } from "../src/compiler/compiler"
import { makeTemplate, HelperMap, Frame } from "../src/runtime/runtime"
import { testCases } from "./testCases"

declare const process: any

interface Scenario {
    msg?: string,
    tpl: string,
    data: any,
    res: string,
}

const scenarios: Scenario[] = []
    .concat(testCases)

const helpers: HelperMap = {
    uppercase: (scope: Frame, args: string[]) => args[0].toUpperCase(),
    if: (scope: Frame, args: string[]) => args[0] ? [scope] : [],
    unless: (scope: Frame, args: string[]) => args[0] ? [] : [scope],
    label: (scope: Frame, args: string[]) => args[0] + '_helped',
    ellipsis: (scope: Frame, args: string[]) => args[0] + '...',
}

describe('suite 1', function () {
    for (let i = 0; i < scenarios.length; i++) {
        const scenario = scenarios[i]

        var assert = require('assert');
        it(`${i} - ${scenario.msg}`, function () {

            const tplFnText = compile(scenario.tpl)
            const fn = makeTemplate(tplFnText, helpers)
            const result = fn(scenario.data)

            assert.equal(result, scenario.res);
        });
    }
});
