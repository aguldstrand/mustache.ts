export function* enumerateTokens(template: string): IterableIterator<Token> {
    // template = template.replace(/\n/g, '|')
    for (let item of enumerateTokensInner(template)) {
        if (item.type === TokenType.Block) {
            item.value = item.value.trim()
            var match = item.value.split(' ')
            for (var i = 1; i < match.length; i++) {
                item.params.push(match[i].trim())
            }
            item.value = match[0]

            switch (item.value[0]) {
                case '&':
                    item.value = match[0].substr(1).trim()
                    item.type = TokenType.Block
                    item.rawOutput = true
                    break

                case '#':
                    item.value = match[0].substr(1).trim()
                    item.type = TokenType.EnterBlock
                    break

                case '^':
                    item.value = match[0].substr(1).trim()
                    item.type = TokenType.EnterBlockInverted
                    break

                case '/':
                    item.value = item.value.substr(1)
                    item.type = TokenType.ExitBlock
                    break

                case '!':
                    continue
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