"use strict";

class HB {

    public static compile(template: string): string {

        let token
        const nextToken = this.enumerateTokens(template)
        while (token = nextToken()) {
            console.log(JSON.stringify(token))
        }

        return "";
    }

    private static enumerateTokens(template: string): { (): Token } {
        var it: any = this.enumerateTokensInner(template)
        return () => {
            const n = it.next()
            if (n.done) {
                return null
            }

            return n.value
        }
    }

    private static *enumerateTokensInner(template: string): Iterable<Token> {
        let index = 0
        while (index !== -1) {
            var startPos = template.indexOf("{{", index)
            if (startPos === -1) {
                return {
                    value: template.substr(index),
                    type: TokenType.Text
                }
            }

            // yield text block before block
            yield {
                value: template.substring(index, startPos),
                type: TokenType.Text
            }

            var endPos = template.indexOf("}}", startPos)
            if (endPos === -1) {
                return null
            }

            yield {
                value: template.substring(startPos + 2, endPos),
                type: TokenType.Block
            }

            index = endPos + 2
        }
    }
}

interface Token {
    value: string
    type: TokenType
}

enum TokenType {
    Block, Text
}

HB.compile("ajdkfhlasdkjhf{{apa}}jfghslgf");