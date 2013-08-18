var Mustache;
(function (Mustache) {
    var templates = {};

    function findInstruction(i, template) {
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

    function getTokenizer(template) {
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
            } else {
                done = true;
                return { type: 'text', value: template.substring(i, template.length) };
            }
        };
    }

    function getBlockStack(getNextBlock) {
        var localBlocks = [];
        var block;

        while (block = getNextBlock()) {
            var block = blocks[i];

            switch (block.type) {
                case 'text':
                    localBlocks.push(block);
                    break;

                case 'open':
                    break;

                case 'close':
                    break;
            }
        }
    }

    function compile(name, template) {
        var blocks = [];

        // Tokensize
        var getNextToken = getTokenizer(template);

        templates[name] = getBlockStack(getNextToken);
    }
    Mustache.compile = compile;

    function template(name, data) {
        return null;
    }
    Mustache.template = template;
})(Mustache || (Mustache = {}));
//# sourceMappingURL=mustache.js.map
