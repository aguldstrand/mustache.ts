var Mustache;
(function (Mustache) {
    var templates;

    function compile(name, template) {
        templates[name] = function () {
        };
    }
    Mustache.compile = compile;
})(Mustache || (Mustache = {}));

function runTest(testData) {
}
//# sourceMappingURL=app.js.map
