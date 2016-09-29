import {compile} from "./compiler/compiler"

const scenarios = [{
    tpl: `{{#articles}}<article><h1>{{#heading}}{{.}}{{/heading}}</h1><p>{{intro}}</p>{{#images}}<img src="{{src}}" title="{{title}}"/>{{/images}}<hr/>{{#images}}<img src="{{src}}" title="{{title}}"/>{{/images}}</article>{{/articles}}`,
    data: {
        articles: [{
            heading: '_heading_',
            intro: '_intro_',
            images: [{
                src: '_src_',
                title: '_title_'
            }]
        }, {
                heading: '_heading_',
                intro: '_intro_',
                images: [{
                    src: '_src_',
                    title: '_title_'
                }]
            }, {
                heading: '_heading_',
                intro: '_intro_',
                images: [{
                    src: '_src_',
                    title: '_title_'
                }]
            }]
    },
    result: '<article><h1>_heading_</h1><p>_intro_</p><img src="_src_" title="_title_"/><hr/><img src="_src_" title="_title_"/></article><article><h1>_heading_</h1><p>_intro_</p><img src="_src_" title="_title_"/><hr/><img src="_src_" title="_title_"/></article><article><h1>_heading_</h1><p>_intro_</p><img src="_src_" title="_title_"/><hr/><img src="_src_" title="_title_"/></article>'
}]

declare const process: any

for (let i = 0; i < scenarios.length; i++) {
    const scenario = scenarios[i]

    const iterations = 100
    const start = process.hrtime()
    for (let j = 0; j < iterations; j++) {
        compile(scenario.tpl)
    }
    const elapsed = process.hrtime(start)
    console.log(`average compile time: ${(elapsed[0] * 1e9 + elapsed[1]) / iterations / 1e6}ms`)

    const tplFnText = compile(scenario.tpl)
    const fn: any = new Function('d', tplFnText)
    const result = fn(scenario.data)
    console.log(`compiled/template length: ${Math.floor(tplFnText.length / scenario.tpl.length * 100)}%`)

    if (result !== scenario.result) {
        console.error('invalid template output')
        console.error(result)
    }

    console.log()
}





