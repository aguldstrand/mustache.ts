declare const require: any
declare const describe: any
declare const it: any

import { compile } from "../src/compiler/compiler"
import { makeTemplate, HelperMap, Frame } from "../src/runtime/runtime"
import { testCases } from "./testCases"

const glob = require('glob')
const fs = require('fs')
const path = require('path')

describe('handlebars spec', function () {

    glob('spec/**/*.json', function (err, files) {
        files.forEach(file => {
            const text = fs.readFileSync(file, 'utf8')
            const spec = <SpecFile>JSON.parse(text)

            describe(path.basename(file), function () {
                spec.tests.forEach(test => {
                    var assert = require('assert');
                    it(test.name, function () {

                        const tplFnText = compile(test.template)
                        const fn = makeTemplate(tplFnText, {}, {})
                        const result = fn(test.data)

                        assert.equal(result, test.expected);
                    });
                })
            });

        })
    })
})

interface SpecFile {
    tests: Test[]
}

interface Test {
    name: string,
    data: any,
    expected: string,
    template: string,
    desc: string
}