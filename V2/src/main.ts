import {compile} from "./compiler/compiler"

const scenarios = [/*{
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
}, {
        tpl: `{{#articles}}{{.}}\n{{/articles}}---\n{{#articles}}{{.}}\n{{/articles}}`,
        data: {
            articles: [9, 8, 7]
        },
        result: '\n9\n8\n7\n---\n9\n8\n7'
    }, {
        tpl: '{{#articles}}{{.}}{{/articles}}`{{#articles}}{{.}}{{/articles}}',
        data: {
            articles: [9, 8, 7]
        },
        result: '987`987'
    }, {
        tpl: `{{#articles}}{{.}}\n{{/articles}}---\n{{#articles}}{{.}}\n{{/articles}}`,
        data: {
            articles: [9, 8, 7]
        },
        result: '\n9\n8\n7\n---\n9\n8\n7'
    }, * /{
        tpl: `{{uppercase "blubb"}}`,
        data: {
        },
        result: 'BLUBB'
    }*/{
        tpl: `{{.}}{{.}}{{.}}{{.}}{{.}}{{.}}{{.}}{{.}}{{.}}{{.}}{{.}}{{.}}{{.}}{{.}}{{.}}{{.}}{{.}}{{.}}{{.}}{{.}}{{.}}{{.}}{{.}}{{.}}{{.}}`,
        data: "aaaaaaaaaaaaaaaaaaaa",
        result: 'BLUBB'
    }]

declare const process: any

for (let i = 0; i < scenarios.length; i++) {
    console.log('----------------------------------------------')
    const scenario = scenarios[i]

    const iterations = 1000
    let start = process.hrtime()
    for (let j = 0; j < iterations; j++) {
        compile(scenario.tpl)
    }
    let elapsed = process.hrtime(start)
    console.log(`average compile time: ${Math.floor((elapsed[0] * 1e9 + elapsed[1]) / iterations / 1e3)}µs`)

    const tplFnText = compile(scenario.tpl)
    const fn: any = new Function('d', tplFnText)
    const result = fn(scenario.data)

    start = process.hrtime()
    for (let j = 0; j < iterations; j++) {
        fn(scenario.data)
    }
    elapsed = process.hrtime(start)
    console.log(`average execution time: ${Math.floor((elapsed[0] * 1e9 + elapsed[1]) / iterations / 1e3)}µs`)

    console.log(`compiled/template length: ${Math.floor(tplFnText.length / scenario.tpl.length * 100)}%`)

    if (result !== scenario.result) {
        console.error('invalid template output     <--------')
        console.error(scenario.tpl)
        console.error()
        console.error('actual', result)
        console.error('expect', scenario.result)
    }

    console.log()
    console.log(tplFnText)
    console.log()
}





