module Mustache {
    var templates: {};

    export function compile(name: string, template: string) {
        templates[name] = function () {

        };
    }

    export function template(name: string, data: any): string {
        return null;
    }
}