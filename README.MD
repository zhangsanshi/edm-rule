# EDM-RULE
设置 EDM 的规则

## 说明
按照标签名划分规则,内部语法参见 [cheerio](https://github.com/cheeriojs/cheerio)

## 使用
该项目是配合 [html-check](https://github.com/zhangsanshi/html-check) 使用的,作为html-check的rule部分

### 
通过配置 `html-check` 的 `options` 可以使用多项功能

1. `options.imgRoot` 可以自动读取 `img`, 设置宽高属性(仅支持本地路径)
