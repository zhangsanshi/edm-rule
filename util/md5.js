var md5 = require('md5');
var fs = require('fs');
module.exports = function (src) {
    try {
        return md5(fs.readFileSync(src));
    } catch (e) {

    }

};