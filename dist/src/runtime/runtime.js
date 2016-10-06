"use strict";
function makeTemplate(tpl, helpers) {
    helpers['if'] = (scope, args) => args[0] ? [scope] : [];
    helpers['unless'] = (scope, args) => args[0] ? [] : [scope];
    const factory = (new Function('b', 'i', 'v', 'Frame', `
        return function(data) {
            let d = new Frame(data, null)
            ${tpl}
        }
    `));
    return factory(block, blockInverted, value, Frame);
    function block(frame, path, args, tplFn) {
        if (helpers[path]) {
            let frames = helpers[path](frame, resolveArguments(frame, args).map(p => p.value));
            return frames
                .map(frame => tplFn(frame))
                .join('');
        }
        frame = resolvePath(frame, path);
        if (!frame.value) {
            return '';
        }
        if (Array.isArray(frame.value)) {
            return frame.value
                .map(item => tplFn(new Frame(item, frame)))
                .join('');
        }
        return tplFn(frame);
    }
    function blockInverted(frame, path, args, tplFn) {
        frame = resolvePath(frame, path);
        if (!frame.value || (Array.isArray(frame.value) && frame.value.length === 0)) {
            return tplFn(frame);
        }
        return '';
    }
    function value(frame, path, args, raw = false) {
        let outp;
        if (helpers[path]) {
            outp = encode(helpers[path](frame, resolveArguments(frame, args).map(p => p.value)));
        }
        else {
            outp = resolvePath(frame, path).value;
        }
        if (!raw) {
            outp = encode(outp);
        }
        if (typeof outp === 'undefined') {
            outp = '';
        }
        return outp;
    }
}
exports.makeTemplate = makeTemplate;
function encode(val) {
    if (typeof val !== 'string') {
        return val;
    }
    return val
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}
function resolveArguments(frame, args) {
    return args
        .map(arg => {
        if (arg.startsWith('"')) {
            return new Frame(arg.substr(1, arg.length - 2), null);
        }
        return resolvePath(frame, arg);
    });
}
function resolvePath(frame, path) {
    let f = frame;
    var fragments = path.split(/(?:\/)|(?:\.(?=[a-zA-Z0-9_]))/g);
    for (let i = 0; i < fragments.length; i++) {
        if (fragments[i] === '.') {
            continue;
        }
        if (fragments[i] === '..') {
            f = f.parent;
            continue;
        }
        f = new Frame(f.value[fragments[i]], f);
        if (f.value === undefined) {
            break;
        }
    }
    if (!f.value && fragments.length === 1) {
        let f2 = f;
        while (f2 = f2.parent) {
            if (f2.value.hasOwnProperty(path)) {
                return new Frame(f2.value[path], f);
            }
        }
    }
    return f;
}
class Frame {
    constructor(value, parent) {
        this.value = value;
        this.parent = parent;
    }
}
exports.Frame = Frame;
