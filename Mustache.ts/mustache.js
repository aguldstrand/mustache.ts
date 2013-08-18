var Mustache;
(function (Mustache) {
    var templates;

    function compile(name, template) {
        templates[name] = function () {
        };
    }
    Mustache.compile = compile;

    function template(name, data) {
        return null;
    }
    Mustache.template = template;
})(Mustache || (Mustache = {}));
//# sourceMappingURL=mustache.js.map
