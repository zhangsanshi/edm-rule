module.exports = {
    styleRule: {

    },
    attrRule: {
        cellspacing: function (key, $child, root, collectError, rule) {

            var attr = $child.attr(key);
            if (!attr) {
                $child.attr(key, 0);
            }
        },
        cellpadding: function (key, $child, root, collectError, rule) {
            var attr = $child.attr(key);
            if (!attr) {
                $child.attr(key, 0);
            }
        },
        border: function (key, $child, root, collectError, rule) {
            var attr = $child.attr(key);
            if (!attr) {
                $child.attr(key, 0);
            }
        },
        width: function (key, $child, root, collectError, rule) {
            var attr = $child.attr(key);
            if (!$child.parents('table').length) {
                if (!attr || isNaN(attr)) {
                    collectError['table_root'] = '第一个table必须指定宽度';
                }
            } else if (!attr) {
                collectError['table'] = '已经自动添加table宽度属性100%';
                $child.attr(key, '100%');
            }
        }
    }
};