var Mustache;
(function (Mustache) {
    var templates = {};
    var plugins = {};

    function getParamValue(name, data) {
        var val = data.value[name];
        if (val) {
            return val;
        }

        if (data.parent) {
            return getParamValue(name, data.parent);
        }

        return null;
    }

    plugins['value'] = function valuePlugin(stackBlock, data) {
        return getParamValue(stackBlock.params, data);
    };

    plugins['standard-iterator'] = function standardIteratorPlugin(stackBlock, data) {
        var innerData = getParamValue(stackBlock.params, data);
        if (!innerData) {
            return "";
        }

        // Boolean
        var innerDataType = typeof (innerData);
        if (innerDataType === 'boolean') {
            return innerTemplate(stackBlock.blocks, data);
        }

        if (innerData instanceof Array) {
            var outp = "";
            var len = innerData.length;
            for (var i = 0; i < len; i++) {
                outp += innerTemplate(stackBlock.blocks, {
                    parent: data,
                    value: innerData[i]
                });
            }
            return outp;
        }

        if (innerDataType === 'object') {
            return innerTemplate(stackBlock.blocks, {
                parent: data,
                value: innerData
            });
        }

        throw "not supported value type";
    };

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
                queued = { type: 'block', value: instruction.text };

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
            switch (block.type) {
                case 'text':
                    localBlocks.push(block.value);
                    break;

                case 'block':
                    if (block.value[2] === '/') {
                        return localBlocks;
                    }

                    if (block.value[2] === '#') {
                        localBlocks.push({
                            plugin: 'standard-iterator',
                            params: block.value.match(/^{{#(.+)}}$/)[1],
                            blocks: getBlockStack(getNextBlock)
                        });
                    } else {
                        var match = block.value.match(/^{{(.+)}}$/);
                        localBlocks.push({
                            plugin: 'value',
                            params: match[1],
                            blocks: null
                        });
                    }
                    break;
            }
        }

        return localBlocks;
    }

    function compile(name, template) {
        var blocks = [];

        // Tokensize
        var getNextToken = getTokenizer(template);

        templates[name] = getBlockStack(getNextToken);
    }
    Mustache.compile = compile;

    function innerTemplate(blocks, data) {
        var outp = "";

        var len = blocks.length;
        for (var i = 0; i < len; i++) {
            var block = blocks[i];
            if (typeof (block) === 'string') {
                outp += blocks[i];
            } else {
                outp += plugins[block.plugin](block, data);
            }
        }

        return outp;
    }

    function template(name, data) {
        return innerTemplate(templates[name], {
            parent: null,
            value: data
        });
    }
    Mustache.template = template;
})(Mustache || (Mustache = {}));
//# sourceMappingURL=mustache.js.map
