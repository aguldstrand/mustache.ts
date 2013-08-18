var TestRunner;
(function (TestRunner) {
    function runTest(testData) {
        Mustache.compile(testData.name, testData.template);
        var actual = Mustache.template(testData.name, testData.data);

        document.getElementById("table-body").innerHTML += "<tr class=\"" + (actual === testData.expected ? 'success' : 'fail') + "\"><td>" + testData.name + "</td><td><pre>" + testData.template + "</pre></td><td><pre>" + testData.expected + "</pre></td><td><pre>" + actual + "</pre></td></tr>";
    }

    $.getJSON('/externals/mustache-spec/specs/sections.json', function (data) {
        for (var i = 0; i < data.tests.length; i++) {
            runTest(data.tests[i]);
        }
    });
})(TestRunner || (TestRunner = {}));
//# sourceMappingURL=testRunner.js.map
