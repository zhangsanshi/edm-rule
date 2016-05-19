module.exports = {

    attrRule: {
        target: function (key, $child, root, collectError, rule, style) {
            var attr = $child.attr(key);
            if (!attr) {
                $child.attr(key, '_blank');
            }
        }

    }
};