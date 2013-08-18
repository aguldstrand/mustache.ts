var Mustache;
(function (Mustache) {
    var templates;

    function compile(name, template) {
        templates[name] = function () {
        };
    }
    Mustache.compile = compile;
})(Mustache || (Mustache = {}));
//# sourceMappingURL=app.js.map
