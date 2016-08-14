var Util = require('../util/util.js');
var imageSize = require('../util/image-size.js');
var path = require('path');
var url = require('url');

function getImageSize($child, ops, collectError) {
    var src = $child.attr('src');
    if (!Util.isUrl(src) && ops.imgRoot && !Util.isUrl(ops.imgRoot)) {
        var dimensions = null;
        try {
            dimensions = imageSize.parse(path.join(ops.imgRoot, src));
        } catch (e) {

        }
        if (dimensions && dimensions.width && dimensions.height) {
            $child.attr('width', dimensions.width);
            collectError['img_width_atuo'] = '获取到图片,已自动设置图片宽度';
            $child.attr('height', dimensions.height);
            collectError['img_height_atuo'] = '获取到图片,已自动设置图片高度';
        }
    }
}

module.exports = {
    styleRule: {
        display: function (key, $child, root, collectError, rule, style) {
            var attr = style[key];
            if (attr == 'inline-block' || !attr) {
                collectError['img'] = '请注意img处于inline-block的时候,会造成父元素大于图片的高度';
            }
        }
    },
    attrRule: {
        width: function (key, $child, root, collectError, rule, style, ops) {
            var attr = $child.attr(key);
            if (!attr && !style.width) {
                collectError['img_width'] = '存在img未设置宽度的问题';
                getImageSize($child, ops, collectError);
            } else if (!attr && style.width) {
                collectError['img_attr_width'] = 'img宽最好写在属性上';
                $child.attr(key, style.width.replace('px', ''));
            }
        },
        height: function (key, $child, root, collectError, rule, style, ops) {
            var attr = $child.attr(key);
            if (!attr && !style.height) {
                collectError['img_height'] = '存在img未设置高度的问题';
                getImageSize($child, ops, collectError);
            } else if (!attr && style.height) {
                collectError['img_attr_height'] = 'img高最好写在属性上';
                $child.attr(key, style.height.replace('px', ''));
            }
        },
        /* src 要放在 width 和 height 后面, 因为 src 在 存在 CDN 的情况下会改写 url, 导致获取不到本地的图片大小*/
        src: function (key, $child, root, collectError, rule, style, ops) {
            var display = style['display'];
            if (display == 'inline-block' || !display) {
                collectError['img'] = '请注意img处于inline-block的时候,会造成父元素大于图片的高度';
            }
            var attr = $child.attr(key);
            if (attr) {
                if (!Util.isUrl(attr)) {
                    collectError['img_src'] = '请注意img的地址是相对地址,请改成绝对地址';
                    if (ops.CDN) {
                        $child.attr('src', url.resolve(ops.CDN, attr));
                        collectError['img_src_auto'] = '已自动修改路径为CDN路径';

                    }
                }
            }

        },
        border: function (key, $child, root, collectError, rule, style) {
            var attr = $child.attr(key);
            if (!attr) {
                $child.attr(key, 0);
                collectError['img_border'] = '请注意添加img的border(默认0)';
            }
        },
        alt: function (key, $child, root, collectError, rule, style) {
            var attr = $child.attr(key);
            if (!attr && !style.height) {
                collectError['img_alt'] = 'img最好设置alt属性';
            }
        }
    }
};