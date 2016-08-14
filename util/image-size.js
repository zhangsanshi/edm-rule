var url = require('url');
var http = require('http');

var sizeOf = require('image-size');

var Util = require('./util.js');

module.exports = {
    parse: function (src) {
       return sizeOf(src);
    }
};