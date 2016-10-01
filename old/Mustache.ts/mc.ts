///<Reference path="compiler.ts" />
///<Reference path="node.d.ts" />
module Mustache {

    var fs = require('fs');

    var templatePath = process.argv[2];
    fs.readFile(templatePath, { encoding: 'utf-8' }, (err, data) => {
        if (err) {
            throw err;
        }

        var outp = JSON.stringify(Mustache.getBlocks(data), null, -1);
        console.log(outp);
    });

    // Mustache.compile(
}