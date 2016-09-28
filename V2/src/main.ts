import {compile} from "./compiler/compiler"

var text = compile(`
{{#articles}}
    <article>
        <h1>{{#heading}}{{.}}{{/heading}}</h1>
        <p>{{intro}}</p>
        {{#images}}
            <img src="{{src}}" title="{{title}}"/>
        {{/images}}
    </article>
{{/articles}}
`)
console.log(text)
console.log()


var fn: any = new Function('d', text)
console.log(fn({
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
}))
