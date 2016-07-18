function color6(str) {
  return str.replace(/([0-9a-f])/ig, function (a) {
    a = a.toLowerCase();
    return a + a;
  });
}
function checkColor(color) {
  if (color[0] == '#') {
    if (!(/#[0-9a-f]{6}/.test(color))) {
      if (color.length == 4) {
        color = color6(color);
      }
    }
  }
  return color;
}
var COLOR_REG = /(.*#)([0-9a-f]{6}|[0-9a-f]{3})(.*)/;


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
      var check = checkColor(color);
      if (check != color) {
        style[key] = check;
        collectError['color'] = "存在color的简写情况";
      }
    }
  },
  float: function (key, $child, root, collectError, rule, style) {
    var float = style[key];
    if (float) {
      collectError[$child.get(0).name + '_float'] = "存在使用float的情况";
    }

  },
  position: function (key, $child, root, collectError, rule, style) {
    var position = style[key];
    if (position) {
      collectError[$child.get(0).name + '_position'] = "存在使用position的情况";
    }
  },
  backgroud: function (key, $child, root, collectError, rule, style) {
    var backgroud = style[key] || '',
      color = backgroud.match(COLOR_REG),
      check = '';
    if (background.indexOf('url') != -1) {
      collectError[$child.get(0).name + '_background'] = "最好不使用背景图";
    }
    if (color && color.length) {
      if (color[2].length === 3) {
        collectError['background-color'] = "存在background-color的简写情况";
        check = background.replace(COLOR_REG, function (a, b, c, d) {
          return b + color6(c) + d;
        });
        style[key] = check;
      }
    }

  },
  'background-color': function (key, $child, root, collectError, rule, style) {
    var color = style[key];
    if (color) {
      var check = checkColor(color);
      if (check != color) {
        style[key] = check;
        collectError['background-color'] = "存在 background-color 的简写情况";
      }
    }
  },
  'background-image': function (key, $child, root, collectError, rule, style) {
    collectError[$child.get(0).name + '_background'] = "最好不要使用背景图";
  },
  'background-position': function (key, $child, root, collectError, rule, style) {
    collectError[$child.get(0).name + '_background'] = "不要使用 sprite 图";
  }
};
module.exports = {
  attr: baseAttr,
  style: baseStyle
};
