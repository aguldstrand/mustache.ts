module Mustache {
    var templates = {};
    var plugins = {};

    interface IDataStackFrame {
        parent: IDataStackFrame;
        value: any;
    }

    function getParamValue(name: string, data: IDataStackFrame) {
        var val = data.value[name];
        if (val) {
            return val;
        }

        if (data.parent) {
            return getParamValue(name, data.parent);
        }

        return null;
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