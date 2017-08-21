var fs = require("fs");
var babel = require("babel-core");
var moriscript = require("./moriscript");

var fileName = process.argv[2];

fs.readFile(fileName, function(err, data) {
    if (err) throw err;

    var src = data.toString();

    var out = babel.transform(src, {
        plugins: [moriscript]
    });

    console.log(out.code);
});
