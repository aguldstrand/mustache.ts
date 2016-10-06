"use strict";
function* enumerateTokens(template) {
    // template = template.replace(/\n/g, '|')
    for (let item of enumerateTokensInner(template)) {
        if (item.type === TokenType.Block) {
            item.value = item.value.trim();
            switch (item.value[0]) {
                case '&': {
                    const pieces = item.value.substr(1).trim().split(/(?:[ ]+)/g);
                    item.value = pieces[0];
                    item.type = TokenType.Block;
                    item.rawOutput = true;
                    pieces.shift();
                    item.params = pieces;
                    break;
                }
                case '#': {
                    const pieces = item.value.substr(1).trim().split(/(?:[ ]+)/g);
                    item.value = pieces[0];
                    item.type = TokenType.EnterBlock;
                    pieces.shift();
                    item.params = pieces;
                    break;
                }
                case '^':
                    const pieces = item.value.substr(1).trim().split(/(?:[ ]+)/g);
                    item.value = pieces[0];
                    item.type = TokenType.EnterBlockInverted;
                    pieces.shift();
                    item.params = pieces;
                    break;
                case '/':
                    item.value = item.value.substr(1);
                    item.type = TokenType.ExitBlock;
                    break;
                case '!':
                    continue;
                default: {
                    const pieces = item.value.trim().split(/(?:[ ]+)/g);
                    item.value = pieces[0];
                    pieces.shift();
                    item.params = pieces;
                    break;
                }
            }
        }
        yield item;
    }
}
exports.enumerateTokens = enumerateTokens;
function* enumerateTokensInner(template) {
    // split into lines
    const lines = template.split('\n');
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        // buffer all tokens from each line
        let tokens = [];
        let index = 0;
        while (true) {
            var startPos = line.indexOf("{{", index);
            var trippleStart = line.indexOf("{{{", startPos) === startPos && startPos !== -1;
            var endPos = line.indexOf("}}", index);
            var trippleEnd = line.indexOf("}}}", endPos) === endPos && endPos !== -1;
            if (trippleStart !== trippleEnd) {
                throw "braces not matching";
            }
            // Yield rest of template if no {{ is found
            if (startPos === -1) {
                const val1 = line.substring(index);
                if (val1.length) {
                    tokens.push({
                        value: val1,
                        type: TokenType.Text,
                        params: []
                    });
                }
                break;
            }
            // Yield text block before block
            const val2 = line.substring(index, startPos);
            if (val2.length) {
                tokens.push({
                    value: val2,
                    type: TokenType.Text,
                    params: []
                });
            }
            if (endPos === -1) {
                throw "invalid syntax missing }}";
            }
            const offset = trippleStart ? 3 : 2;
            const val3 = line.substring(startPos + offset, endPos);
            if (val3.length) {
                tokens.push({
                    value: val3,
                    type: TokenType.Block,
                    rawOutput: trippleStart,
                    params: []
                });
            }
            index = endPos + offset;
        }
        // check if it is a standalone line (single block token with only whitespace text tokens)
        let blockCount = 0;
        let whitespaceOnly = true;
        tokens.forEach(token => {
            switch (token.type) {
                case TokenType.Text:
                    whitespaceOnly = whitespaceOnly && !!/^[ \t]*$/.exec(token.value);
                    break;
                case TokenType.Block:
                    blockCount++;
                    break;
            }
        });
        // if so, remove all text token including the trailing linebreak
        if (whitespaceOnly && blockCount === 1) {
            tokens = tokens.filter(t => t.type === TokenType.Block);
        }
        yield* tokens;
        if (i !== lines.length - 1 && !(whitespaceOnly && blockCount === 1)) {
            yield {
                value: '\n',
                type: TokenType.Text,
                params: []
            };
        }
    }
}
(function (TokenType) {
    TokenType[TokenType["Block"] = 0] = "Block";
    TokenType[TokenType["Text"] = 1] = "Text";
    TokenType[TokenType["EnterBlock"] = 2] = "EnterBlock";
    TokenType[TokenType["EnterBlockInverted"] = 3] = "EnterBlockInverted";
    TokenType[TokenType["ExitBlock"] = 4] = "ExitBlock";
})(exports.TokenType || (exports.TokenType = {}));
var TokenType = exports.TokenType;
