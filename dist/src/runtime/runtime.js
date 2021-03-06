"use strict";
function makeTemplate(tpl, helpers, partials) {
    const fn = makePartial(tpl, helpers, partials);
    return data => {
        const d = new Frame(data, null);
        return fn(d);
    };
}
exports.makeTemplate = makeTemplate;
function makePartial(tpl, helpers, partials) {
    helpers['if'] = (scope, args) => args[0] ? [scope] : [];
    helpers['unless'] = (scope, args) => args[0] ? [] : [scope];
    const factory = (new Function('b', 'i', 'v', 'p', 'Frame', `
        return function(d) {
            ${tpl}
        }
    `));
    return factory(block, blockInverted, value, partial, Frame);
    function partial(frame, path) {
        const name = resolveArguments(frame, [path])[0].value;
        if (partials[name]) {
            return partials[name](frame);
        }
        return '';
    }
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
exports.makePartial = makePartial;
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
            return new Frame(JSON.parse(arg), null);
        }
        return resolvePath(frame, arg);
    });
}
function resolvePath(frame, path) {
    let f = frame;
    let fragments = path.split(/(?:\/)|(?:\.(?=[a-zA-Z0-9_]))/g);
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
