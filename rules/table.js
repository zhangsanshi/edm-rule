module.exports = {
    styleRule: {

    },
    attrRule: {
        cellspacing: function (key, $child, root, collectError, rule) {

            var attr = $child.attr(key);
            if (!attr) {
                $child.attr(key, 0);
                collectError['table_cellspacing'] = '请注意添加table的cellspacing(默认0)';
            }
        },
        cellpadding: function (key, $child, root, collectError, rule) {
            var attr = $child.attr(key);
            if (!attr) {
                $child.attr(key, 0);
                collectError['table_cellpadding'] = '请注意添加table的cellpadding(默认0)';
            }
        },
        border: function (key, $child, root, collectError, rule) {
            var attr = $child.attr(key);
            if (!attr) {
                $child.attr(key, 0);
                collectError['table_border'] = '请注意添加table的border(默认0)';
            }
        },
        width: function (key, $child, root, collectError, rule) {
            var attr = $child.attr(key);
            if (!$child.parents('table').length) {
                if (!attr || isNaN(attr)) {
                    collectError['table_root'] = '第一个table必须指定宽度(默认指定650px)';
                    $child.attr(key, '650px');
                }
            } else if (!attr) {
                collectError['table_width'] = '已经自动添加table宽度属性100%';
                $child.attr(key, '100%');
            }
        }
    }
};