module Mustache {
    var templates = {};

    interface Block {
        type: string;
        value: string;
    }

    function findInstruction(i: number, template: string) {
        var startPos = template.indexOf("{{", i);
        if (startPos === -1) {
            return null;
        }

        var endPos = template.indexOf("}}", startPos);
        if (endPos === -1) {
            return null;
        }

        return {
            start: startPos,
            text: template.substring(startPos, endPos + 2)
        };
    }

    function getTokenizer(template: string) {
        var i = 0;
        var queued;
        var done = false;

        return function () {

            if (done) {
                return null;
            }

            if (queued) {
                var t = queued;
                queued = null;
                return t;
            }

            var instruction = findInstruction(i, template);
            if (instruction) {

                var first = { type: 'text', value: template.substring(i, instruction.start) };
                queued = { type: instruction.text[2] === '/' ? 'close' : 'open', value: instruction.text };

                i = instruction.start + instruction.text.length;

                return first;
            }
            else {
                done = true;
                return { type: 'text', value: template.substring(i, template.length) };
            }
        };
    }

    function getBlockStack(getNextBlock: () => Block) {

        var localBlocks = [];

        var block: Block;
        while (block = getNextBlock()) {

            switch (block.type) {
                case 'text':
                    localBlocks.push(block.value);
                    break;

                case 'open':

                    break;

                case 'close':
                    break;
            }
        }

    }

    export function compile(name: string, template: string) {

        var blocks: Block[] = [];

        // Tokensize
        var getNextToken = getTokenizer(template);

        templates[name] = getBlockStack(getNextToken);
    }

    export function template(name: string, data: any): string {
        return null;
    }
}