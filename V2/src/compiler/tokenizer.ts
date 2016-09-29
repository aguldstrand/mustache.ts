export function* enumerateTokens(template: string) {
    for (let item of enumerateTokensInner(template)) {
        item.value = item.value.trim()
        if (item.type === TokenType.Block) {
            if (item.value[0] === '#') {
                var match = /([ ]*[#a-zA-Z0-9_\-./]+)*/.exec(item.value)

                item.value = match[0].substr(1).trim()
                item.type = TokenType.EnterBlock

                const params: string[] = (<HelperToken>item).params = []
                for (var i = 1; i < match.length; i++) {
                    params.push(match[i].trim())
                }

                console.error(JSON.stringify(item))

            } else if (item.value[0] === '/') {
                item.value = item.value.substr(1)
                item.type = TokenType.ExitBlock
            }
        }

        yield item
    }
}

function* enumerateTokensInner(template: string) {
    let index = 0

    while (true) {
        var startPos = template.indexOf("{{", index)
        var endPos = template.indexOf("}}", index)

        // Yield rest of template if no {{ is found
        if (startPos === -1) {
            const val1 = template.substring(index)
            if (val1.length) {
                yield {
                    value: val1,
                    type: TokenType.Text
                }
            }
            break
        }

        // Yield text block before block
        const val2 = template.substring(index, startPos)
        if (val2.length) {
            yield {
                value: val2,
                type: TokenType.Text
            }
        }

        if (endPos === -1) {
            throw "invalid syntax missing }}"
        }

        const val3 = template.substring(startPos + 2, endPos)
        if (val3.length) {
            yield {
                value: val3,
                type: TokenType.Block
            }
        }

        index = endPos + 2
    }
}

export interface Token {
    value: string
    type: TokenType
}

export interface HelperToken extends Token {
    params: string[]
}

export enum TokenType {
    Block, Text, EnterBlock, ExitBlock
}