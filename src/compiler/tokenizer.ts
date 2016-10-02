export function* enumerateTokens(template: string): IterableIterator<Token> {
    // template = template.replace(/\n/g, '|')
    for (let item of enumerateTokensInner(template)) {
        if (item.type === TokenType.Block) {
            item.value = item.value.trim()

            switch (item.value[0]) {
                case '&': {
                    const pieces = item.value.substr(1).trim().split(/(?:[ ]+)/g)
                    item.value = pieces[0]
                    item.type = TokenType.Block
                    item.rawOutput = true

                    pieces.shift()
                    item.params = pieces
                    break
                }

                case '#': {
                    const pieces = item.value.substr(1).trim().split(/(?:[ ]+)/g)
                    item.value = pieces[0]
                    item.type = TokenType.EnterBlock

                    pieces.shift()
                    item.params = pieces
                    break
                }

                case '^':
                    const pieces = item.value.substr(1).trim().split(/(?:[ ]+)/g)
                    item.value = pieces[0]
                    item.type = TokenType.EnterBlockInverted

                    pieces.shift()
                    item.params = pieces
                    break

                case '/':
                    item.value = item.value.substr(1)
                    item.type = TokenType.ExitBlock
                    break

                case '!':
                    continue

                default: {
                    const pieces = item.value.trim().split(/(?:[ ]+)/g)
                    item.value = pieces[0]

                    pieces.shift()
                    item.params = pieces
                    break
                }
            }
        }

        yield item
    }
}

function* enumerateTokensInner(template: string): IterableIterator<Token> {
    let index = 0

    while (true) {
        var startPos = template.indexOf("{{", index)
        var trippleStart = template.indexOf("{{{", startPos) === startPos && startPos !== -1

        var endPos = template.indexOf("}}", index)
        var trippleEnd = template.indexOf("}}}", endPos) === endPos && endPos !== -1

        if (trippleStart !== trippleEnd) {
            throw "braces not matching"
        }

        // Yield rest of template if no {{ is found
        if (startPos === -1) {
            const val1 = template.substring(index)
            if (val1.length) {
                yield {
                    value: val1,
                    type: TokenType.Text,
                    params: []
                }
            }
            break
        }

        // Yield text block before block
        const val2 = template.substring(index, startPos)
        if (val2.length) {
            yield {
                value: val2,
                type: TokenType.Text,
                params: []
            }
        }

        if (endPos === -1) {
            throw "invalid syntax missing }}"
        }

        const offset = trippleStart ? 3 : 2

        const val3 = template.substring(startPos + offset, endPos)
        if (val3.length) {
            yield {
                value: val3,
                type: TokenType.Block,
                rawOutput: trippleStart,
                params: []
            }
        }

        index = endPos + offset
    }
}

export interface Token {
    value: string
    type: TokenType
    params: string[]
    rawOutput?: boolean
}

export enum TokenType {
    Block,
    Text,
    EnterBlock,
    EnterBlockInverted,
    ExitBlock
}