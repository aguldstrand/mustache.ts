import {enumerateTokens, Token, TokenType} from "./tokenizer"

interface CompileContext {
    functionNameGenerator: { (): string },
    functions: { [fn: string]: string },
}

export function compile(template: string) {
    const tokens = enumerateTokens(template)

    var ctx: CompileContext = {
        functionNameGenerator: nameGenerator('f'),
        functions: {},
    }

    const name = makeSectionFunction(ctx, tokens)

    return 'let l=(d,f)=>Array.isArray(d)?d.map(f).join(""):f(d)\n' +
        `${Object.getOwnPropertyNames(ctx.functions).map(fn => `let ${ctx.functions[fn]}=${fn}`).join('\n')}\n` +
        `return ${name}(d)`
}

function nameGenerator(prefix: string) {
    let i = 0;
    return () => {
        return prefix + (i++).toString(36)
    }
}

function makeSectionFunction(ctx: CompileContext, tokens: IterableIterator<Token>) {

    let outp = `(d)=>\``

    let result: IteratorResult<Token>
    while (!(result = tokens.next()).done) {
        const token = result.value
        // console.log(JSON.stringify(token))

        switch (token.type) {
            case TokenType.Text:
                outp += token.value.replace(/`/g, "\\`")
                break

            case TokenType.Block:
                outp += '${' + combineContext('d', token.value) + '}'
                break

            case TokenType.EnterBlock:
                let innerName = makeSectionFunction(ctx, tokens)
                const newContext = combineContext('d', token.value)
                outp += `$\{l(${newContext},${innerName})}`
                break

            case TokenType.ExitBlock:
                outp += `\``

                const name = ctx.functions[outp] || ctx.functionNameGenerator()
                ctx.functions[outp] = name
                return name
        }
    }

    outp += `\``

    const name = ctx.functions[outp] || ctx.functionNameGenerator()
    ctx.functions[outp] = name
    return name
}

function combineContext(root: string, path: string) {
    if (path === '.') {
        return root
    }

    return root + path.split('.').map(p => `.${p.replace(/"/g, '\\"')}`).join("")
}
