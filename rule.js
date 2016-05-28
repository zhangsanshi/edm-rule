var base = require("./defaultRule.js");
module.exports = {
    table: require('./rules/table.js'),
    img: require('./rules/img.js'),
    a: require('./rules/a.js'),
    base: base
};