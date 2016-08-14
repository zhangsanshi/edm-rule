module.exports = {
    isUrl: function (str) {
        return /^https*:\/\//.test(str);
    }
};