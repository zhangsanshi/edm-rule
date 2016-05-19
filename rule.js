function checkColor(color) {
    if (color[0] == '#') {
        if (!(/#[0-9a-f]{6}/.test(color))) {
            if (color.length == 4) {
                color = color.replace(/([0-9a-f])/ig, function (a) {
                    a = a.toLowerCase();
                    return a + a;
                });
            }
        }
    }
    return color;
}

var baseAttr = {
    bgcolor: function (key, $child, root, collectError, rule, style) {

        var bgcolor = $child.attr('bgcolor');
        if (bgcolor) {
            var check = checkColor(bgcolor);
            if (check != bgcolor) {
                $child.attr('bgcolor', check);
                collectError['bgcolor'] = "存在bgcolor的简写情况";
            }
        }
    }
};

var baseStyle = {
    color: function (key, $child, root, collectError, rule, style) {
        var color = style[key];
        if (color) {
            style[key] = style;
        }
    },
    float: function (key, $child, root, collectError, rule, style) {
        var float = style[key];
        if (float) {
            collectError[$child.get(0).name + '_float'] = "存在使用float的情况";
        }

    },
    position: function (key, $child, root, collectError, rule, style) {
        var float = style[key];
        if (float) {
            collectError[$child.get(0).name + '_position'] = "存在使用position的情况";
        }
    }
};

module.exports = {
    table: require('./rules/table.js'),
    img: require('./rules/img.js'),
    a: require('./rules/a.js'),
    base: {
        attr: baseAttr,
        style: baseStyle
    }
};