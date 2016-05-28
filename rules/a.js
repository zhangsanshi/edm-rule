module.exports = {

    attrRule: {
        target: function (key, $child, root, collectError, rule, style) {
            var attr = $child.attr(key);
            if (!attr) {
                $child.attr(key, '_blank');
                collectError['a_no_target'] = 'a标签的target未设置,已改成_blank';
            } else if (attr !== '_blank') {
                collectError['a_target'] = 'a标签的target,最好是_blank';
            }
        }

    }
};