module Mustache {
    var templates = {};
    var plugins = {};

    interface IDataStackFrame {
        parent: IDataStackFrame;
        value: any;
    }

    plugins['value'] = function valuePlugin(stackBlock: StackBlock, data: IDataStackFrame) {
        return getParamValue(stackBlock.params, data);
    };

    plugins['standard-iterator'] = function standardIteratorPlugin(stackBlock: StackBlock, data: IDataStackFrame) {
        var innerData = getParamValue(stackBlock.params, data);
        if (!innerData) {
            return "";
        }

        // Boolean
        var innerDataType = typeof (innerData);
        if (innerDataType === 'boolean') {
            return innerTemplate(stackBlock.blocks, data);
        }

        // Array
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

    function getParamValue(name: string, data: IDataStackFrame) {

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

    interface Block {
        type: string;
        value: string;
    }

    interface StackBlock {
        plugin: string;
        params: string;
        blocks: any[];
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
        var last: Block;
        var queued: Block;

        var i = 0;
        var done = false;

        return function getNextToken(): Block {

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
            var outp: Block;
            if (instruction) {

                outp = { type: 'text', value: template.substring(i, instruction.start) };
                queued = { type: 'block', value: instruction.text };

                i = instruction.start + instruction.text.length;
            } else {
                done = true;
                outp = { type: 'text', value: template.substring(i, template.length) };
            }

            if (last &&
                last.type === 'block' &&
                (last.value[2] === '#' || last.value[2] === '/') &&
                (outp.value === '\n' || outp.value === '\r' || outp.value === '\r\n' || outp.value === '\n\r')) {
                outp = getNextToken();
            } else {
                last = outp;
            }

            return last = outp;
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

                case 'block':
                    if (block.value[2] === '/') {
                        return localBlocks;
                    }

                    if (block.value[2] === '#') {
                        localBlocks.push({
                            plugin: 'standard-iterator',
                            params: block.value.match(/^{{#(.+)}}$/)[1],
                            blocks: getBlockStack(getNextBlock),
                        });
                    } else {
                        var match = block.value.match(/^{{(.+)}}$/);
                        localBlocks.push({
                            plugin: 'value',
                            params: match[1],
                            blocks: null,
                        });
                    }
                    break;
            }
        }

        return localBlocks;
    }

    export function compile(name: string, template: string) {

        var blocks: Block[] = [];

        // Tokensize
        var getNextToken = getTokenizer(template);

        templates[name] = getBlockStack(getNextToken);
    }

    function innerTemplate(blocks: any[], data: IDataStackFrame) {
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

    export function template(name: string, data: any): string {
        return innerTemplate(templates[name], {
            parent: null,
            value: data
        });
    }
}