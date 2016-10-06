import { enumerateTokens, Token, TokenType } from "./tokenizer"

interface CompileContext {
    functionNameGenerator: { (): string },
    functions: { [fn: string]: string },
    needsL: boolean,
    needsV: boolean
}

export function compile(template: string) {
    const tokens = enumerateTokens(template)

    var ctx: CompileContext = {
        functionNameGenerator: nameGenerator('f'),
        functions: {},
        needsL: false,
        needsV: false
    }

    const name = makeSectionFunction(ctx, tokens)

    let outp = ''
    const propertyNames = Object.getOwnPropertyNames(ctx.functions)
    if (propertyNames.length === 1) {
        outp += `return ${propertyNames[0]}\n`
    }
    else {
        outp += propertyNames.map(fn => `let ${ctx.functions[fn]}=(d)=>${fn}`).join('\n') + `\nreturn ${name}(d)`
    }

    return outp
}

function nameGenerator(prefix: string) {
    let i = 0;
    return () => {
        return prefix + (i++).toString(36)
    }
}

function makeSectionFunction(ctx: CompileContext, tokens: IterableIterator<Token>) {

    let outp = `\``

    let result: IteratorResult<Token>
    while (!(result = tokens.next()).done) {
        const token = result.value

        switch (token.type) {
            case TokenType.Text:
                outp += token.value.replace(/`/g, "\\`")
                break

            case TokenType.Block:
            case TokenType.Partial:
                outp += `$\{v(d,${JSON.stringify(token.value)},${JSON.stringify(token.params)}${token.rawOutput ? ',true' : ''})}`
                break

            case TokenType.EnterBlock:
                {
                    const innerName = makeSectionFunction(ctx, tokens)
                    outp += `$\{b(d,${JSON.stringify(token.value)},${JSON.stringify(token.params)},${innerName})}`
                }
                break

            case TokenType.EnterBlockInverted:
                {
                    const innerName = makeSectionFunction(ctx, tokens)
                    outp += `$\{i(d,${JSON.stringify(token.value)},${JSON.stringify(token.params)},${innerName})}`
                }
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

    // return JSON.stringify(path.split(/(?:\/)|(?:\.(?=[a-zA-Z0-9_]))/g))
    return root + path.split('.').map(p => `.${p.replace(/"/g, '\\"')}`).join("")
}
