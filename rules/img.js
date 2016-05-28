module.exports = {
    styleRule: {
        display: function (key, $child, root, collectError, rule, style) {
            var attr = style[key];
            if (attr == 'inline-block' || !attr) {
                collectError['img'] = '请注意img处于inline-block的时候,会造成父元素大于图片的宽度';
            }
        }
    },
    attrRule: {
        src: function (key, $child, root, collectError, rule, style) {
            var attr = style['inline-block'];
            if (attr == 'inline-block' || !attr) {
                collectError['img'] = '请注意img处于inline-block的时候,会造成父元素大于图片的宽度';
            }
            var attr = $child.attr(key);
            if (attr && !(/^http/.test(attr))) {
                collectError['img_src'] = '请注意img的地址是相对地址,请改成绝对地址';
            }
        },
        border: function (key, $child, root, collectError, rule, style) {
            var attr = $child.attr(key);
            if (!attr) {
                $child.attr(key, 0);
            }
        },
        width: function (key, $child, root, collectError, rule, style) {
            //todo 可以添加获取图片大小的功能,自动填充图片的大小
            var attr = $child.attr(key);
            if (!attr && !style.width) {
                collectError['img_width'] = '存在img未设置宽度的问题';
            }
        },
        height: function (key, $child, root, collectError, rule, style) {
            //todo 可以添加获取图片大小的功能,自动填充图片的大小
            var attr = $child.attr(key);
            if (!attr && !style.height) {
                collectError['img_height'] = '存在img未设置高度的问题';
            }
        },
        alt: function (key, $child, root, collectError, rule, style) {
            //todo 可以添加获取图片大小的功能,自动填充图片的大小
            var attr = $child.attr(key);
            if (!attr && !style.height) {
                collectError['img_alt'] = 'img最好设置alt属性';
            }
        }
    }
};