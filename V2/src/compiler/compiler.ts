import {enumerateTokens, Token, TokenType} from "./tokenizer"

interface CompileContext {
    functionNameGenerator: { (): string },
    functions: string[],
}

export function compile(template: string) {
    const tokens = enumerateTokens(template)

    var ctx: CompileContext = {
        functionNameGenerator: nameGenerator('fn_'),
        functions: [],
    }

    let name = makeSectionFunction(ctx, tokens);

    return ctx.functions.join('\n') +
        `\nreturn ${name}(d)`
}

function nameGenerator(prefix: string) {
    let i = 0;
    return () => {
        return prefix + (i++).toString(36)
    }
}

function makeSectionFunction(ctx: CompileContext, tokens: IterableIterator<Token>) {

    let name = ctx.functionNameGenerator()
    let outp = `function ${name}(d){return `

    let result: IteratorResult<Token>
    while (!(result = tokens.next()).done) {
        const token = result.value
        // console.log(JSON.stringify(token))

        switch (token.type) {
            case TokenType.Text:
                outp += '"' + token.value.replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"+'
                break

            case TokenType.Block:
                outp += combineContext('d', token.value) + '+'
                break

            case TokenType.EnterBlock:
                let innerName = makeSectionFunction(ctx, tokens)
                const newContext = combineContext('d', token.value)
                outp += `(Array.isArray(${newContext})?${newContext}.map(${innerName}).join(""):${innerName}(${newContext}))+`
                break

            case TokenType.ExitBlock:
                outp = outp.substr(0, outp.length - 1)
                outp += `}`
                ctx.functions.push(outp)

                return name
        }
    }

    outp = outp.substr(0, outp.length - 1)
    outp += `}`
    ctx.functions.push(outp)

    return name
}

function combineContext(root: string, path: string) {
    if (path === '.') {
        return root
    }

    return root + path.split('.').map(p => `["${p.replace(/"/g, '\\"')}"]`).join("")
}
