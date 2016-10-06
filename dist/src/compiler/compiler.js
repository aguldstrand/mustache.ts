"use strict";
const tokenizer_1 = require("./tokenizer");
function compile(template) {
    const tokens = tokenizer_1.enumerateTokens(template);
    var ctx = {
        functionNameGenerator: nameGenerator('f'),
        functions: {},
        needsL: false,
        needsV: false
    };
    const name = makeSectionFunction(ctx, tokens);
    let outp = '';
    const propertyNames = Object.getOwnPropertyNames(ctx.functions);
    if (propertyNames.length === 1) {
        outp += `return ${propertyNames[0]}\n`;
    }
    else {
        outp += propertyNames.map(fn => `let ${ctx.functions[fn]}=(d)=>${fn}`).join('\n') + `\nreturn ${name}(d)`;
    }
    return outp;
}
exports.compile = compile;
function nameGenerator(prefix) {
    let i = 0;
    return () => {
        return prefix + (i++).toString(36);
    };
}
function makeSectionFunction(ctx, tokens) {
    let outp = `\``;
    let result;
    while (!(result = tokens.next()).done) {
        const token = result.value;
        switch (token.type) {
            case tokenizer_1.TokenType.Text:
                outp += token.value.replace(/`/g, "\\`");
                break;
            case tokenizer_1.TokenType.Block:
            case tokenizer_1.TokenType.Partial:
                outp += `$\{v(d,${JSON.stringify(token.value)},${JSON.stringify(token.params)}${token.rawOutput ? ',true' : ''})}`;
                break;
            case tokenizer_1.TokenType.EnterBlock:
                {
                    const innerName = makeSectionFunction(ctx, tokens);
                    outp += `$\{b(d,${JSON.stringify(token.value)},${JSON.stringify(token.params)},${innerName})}`;
                }
                break;
            case tokenizer_1.TokenType.EnterBlockInverted:
                {
                    const innerName = makeSectionFunction(ctx, tokens);
                    outp += `$\{i(d,${JSON.stringify(token.value)},${JSON.stringify(token.params)},${innerName})}`;
                }
                break;
            case tokenizer_1.TokenType.ExitBlock:
                outp += `\``;
                const name = ctx.functions[outp] || ctx.functionNameGenerator();
                ctx.functions[outp] = name;
                return name;
        }
    }
    outp += `\``;
    const name = ctx.functions[outp] || ctx.functionNameGenerator();
    ctx.functions[outp] = name;
    return name;
}
function combineContext(root, path) {
    if (path === '.') {
        return root;
    }
    // return JSON.stringify(path.split(/(?:\/)|(?:\.(?=[a-zA-Z0-9_]))/g))
    return root + path.split('.').map(p => `.${p.replace(/"/g, '\\"')}`).join("");
}
