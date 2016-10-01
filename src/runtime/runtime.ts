export function makeTemplate(tpl: string, helpers: HelperMap) {

    const factory = <{ (b: any, v: any, Frame: any): { (data: any): string } }>(new Function('b', 'v', 'Frame', `
        return function(data) {
            let d = new Frame(data, null)
            ${tpl}
        }
    `))

    return factory(block, value, Frame);

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

    function value(frame: Frame, path: string, args: string[]) {

        if (helpers[path]) {
            return helpers[path](frame, resolveArguments(frame, args).map(p => p.value))
        }

        return resolvePath(frame, path).value
    }
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
