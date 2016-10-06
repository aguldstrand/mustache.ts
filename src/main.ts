export { compile } from "./compiler/compiler"
export { makeTemplate, makePartial, HelperMap, Frame } from "./runtime/runtime"


// import {testCases} from "../test/testCases"

/*
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


for (let i = 0; i < scenarios.length; i++) {
    const scenario = scenarios[i]
    console.log(`--- ${i} ${scenario.msg || ''} ---`)

    const iterations = 1
    let start = process.hrtime()
    for (let j = 0; j < iterations; j++) {
        makeTemplate(compile(scenario.tpl), helpers)
    }
    let elapsed = process.hrtime(start)
    ////// console.log(`average compile time: ${Math.floor((elapsed[0] * 1e9 + elapsed[1]) / iterations / 1e3)}µs`)

    const tplFnText = compile(scenario.tpl)
    const fn = makeTemplate(tplFnText, helpers)
    try {
        const result = fn(scenario.data)

        start = process.hrtime()
        for (let j = 0; j < iterations; j++) {
            fn(scenario.data)
        }
        elapsed = process.hrtime(start)
        ///// console.log(`average execution time: ${((elapsed[0] * 1e9 + elapsed[1]) / iterations / 1e3)}µs`)

        ///// console.log(`compiled/template length: ${(tplFnText.length / scenario.tpl.length)}`)

        if (result !== scenario.res) {
            console.log('----------------------------------------------')
            console.log('invalid template output     <--------')
            console.log(scenario.tpl)
            console.log()
            console.log('actual', result)
            console.log('expect', scenario.res)
            console.log()
            console.log(tplFnText)
        }

        console.log()
    } catch (err) {

        console.log(tplFnText)
        console.log()
        throw err
    }
}
*/