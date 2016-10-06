export function makeTemplate(tpl: string, helpers: HelperMap) {
    const fn = makePartial(tpl, helpers)
    return data => {
        const d = new Frame(data, null)
        return fn(d)
    }
}

export function makePartial(tpl: string, helpers: HelperMap) {

    helpers['if'] = (scope: Frame, args: string[]) => args[0] ? [scope] : []
    helpers['unless'] = (scope: Frame, args: string[]) => args[0] ? [] : [scope]

    const factory = <{ (b: any, i: any, v: any, Frame: any): { (data: any): string } }>(new Function('b', 'i', 'v', 'Frame', `
        return function(frame) {
            ${tpl}
        }
    `))

    return factory(block, blockInverted, value, Frame);

    function block(frame: Frame, path: string, args: string[], tplFn: TemplateFunction) {

        if (helpers[path]) {
            let frames = <Frame[]>helpers[path](frame, resolveArguments(frame, args).map(p => p.value))
            return frames
                .map(frame => tplFn(frame))
                .join('')
        }

        frame = resolvePath(frame, path)

        if (!frame.value) {
            return ''
        }

        if (Array.isArray(frame.value)) {
            return frame.value
                .map(item => tplFn(new Frame(item, frame)))
                .join('')
        }

        return tplFn(frame)
    }

    function blockInverted(frame: Frame, path: string, args: string[], tplFn: TemplateFunction) {

        frame = resolvePath(frame, path)

        if (!frame.value || (Array.isArray(frame.value) && frame.value.length === 0)) {
            return tplFn(frame)
        }

        return ''
    }

    function value(frame: Frame, path: string, args: string[], raw = false) {
        let outp;

        if (helpers[path]) {
            outp = encode(helpers[path](frame, resolveArguments(frame, args).map(p => p.value)))
        } else {
            outp = resolvePath(frame, path).value
        }

        if (!raw) {
            outp = encode(outp)
        }

        if (typeof outp === 'undefined') {
            outp = ''
        }

        return outp
    }
}

function encode(val: any) {
    if (typeof val !== 'string') {
        return val
    }

    return val
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
}

function resolveArguments(frame: Frame, args: string[]) {
    return args
        .map(arg => {
            if (arg.startsWith('"')) {
                return new Frame(arg.substr(1, arg.length - 2), null)
            }

            return resolvePath(frame, arg)
        })
}

function resolvePath(frame: Frame, path: string): Frame {
    let f = frame
    var fragments = path.split(/(?:\/)|(?:\.(?=[a-zA-Z0-9_]))/g)
    for (let i = 0; i < fragments.length; i++) {

        if (fragments[i] === '.') {
            continue
        }

        if (fragments[i] === '..') {
            f = f.parent
            continue
        }

        f = new Frame(f.value[fragments[i]], f)

        if (f.value === undefined) {
            break;
        }
    }

    if (!f.value && fragments.length === 1) {
        let f2 = f;
        while (f2 = f2.parent) {
            if (f2.value.hasOwnProperty(path)) {
                return new Frame(f2.value[path], f)
            }
        }
    }

    return f
}

export class Frame {
    constructor(public value: any, public parent: Frame) { }
}

export interface TemplateFunction {
    (frame: Frame): string
}

export interface Helper {
    (frame: Frame, args: string[]): (string | Frame[])
}

export interface HelperMap {
    [name: string]: Helper
}
