var Mustache;
(function (Mustache) {
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
        var last;
        var queued;

        var i = 0;
        var done = false;

        function trimnl(val) {
            var i = 0;

            if (val[i] === '\r') {
                i++;
            }

            if (val[i] === '\n') {
                i++;
            }

            return val.substring(i);
        }

        return function getNextToken() {
            if (done) {
                return null;
            }

            if (queued) {
                var temp = queued;
                queued = null;
                last = temp;
                return temp;
            }

            var instruction = findInstruction(i, template);
            var outp;
            if (instruction) {
                outp = { type: 'text', value: template.substring(i, instruction.start) };
                queued = { type: 'block', value: instruction.text };

                i = instruction.start + instruction.text.length;
            } else {
                done = true;
                outp = { type: 'text', value: template.substring(i, template.length) };
            }

            if (last && last.type === 'block' && outp.type === 'text' && (last.value[2] === '#' || last.value[2] === '/')) {
                outp.value = trimnl(outp.value);
            }

            return last = outp;
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
                            params: block.value.match(/^{{#[ ]*([^}]+?)[ ]*}}$/)[1],
                            blocks: getBlockStack(getNextBlock)
                        });
                    } else {
                        localBlocks.push({
                            plugin: 'value',
                            params: block.value.match(/^{{[ ]*([^}]+?)[ ]*}}$/)[1],
                            blocks: null
                        });
                    }
                    break;
            }
        }

        return localBlocks;
    }

    function getBlocks(template) {
        var blocks = [];

        // Tokensize
        var getNextToken = getTokenizer(template);

        return getBlockStack(getNextToken);
    }
    Mustache.getBlocks = getBlocks;
})(Mustache || (Mustache = {}));
///<Reference path="compiler.ts" />
var Mustache;
(function (Mustache) {
    var templates = {};
    var plugins = {};

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

    function getParamValue(name, data) {
        if (name === '.') {
            return data.value;
        }

        var pieces = name.split('.');
        if (pieces.length === 1) {
            for (var frame = data; frame; frame = frame.parent) {
                var val = frame.value[name];
                if (val) {
                    return val;
                }
            }
            return null;
        } else {
            var value = data.value;
            var len = pieces.length;
            for (var i = 0; i < len; i++) {
                value = getParamValue(pieces[i], {
                    parent: null,
                    value: value
                });

                if (!value) {
                    return null;
                }
            }
            return value;
        }
    }

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

    function compile(template) {
        var blocks = Mustache.getBlocks(template);
        return function (data) {
            return innerTemplate(blocks, { value: data });
        };
    }
    Mustache.compile = compile;
})(Mustache || (Mustache = {}));
