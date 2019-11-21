# 中文数字转换

![Node CI](https://github.com/seonon/chinesenumerals/workflows/Node%20CI/badge.svg)
![Node.js Package](https://github.com/seonon/chinesenumerals/workflows/Node.js%20Package/badge.svg)

支持阿拉伯数字和中文数字之间的转换，中文简体小写数字和简体大写数字、繁体数字、繁体大写数字之间的转换。

支持中文数字和军事数字的转换。

## 阿拉伯数字和中文数字转换

```js

const { chinese } = require("./chinesenumerals");
chinese.toArabic("七");
7
chinese.toArabic("十七");
17
chinese.toArabic("四十二");
42
chinese.toArabic("一百一十一");
111
chinese.toArabic("两千零一十九");
2019
chinese.toArabic("十二亿三千四百五十六万七千八百九十");
1234567890

chinese.toChinese(7);
七
chinese.toChinese(42);
四十二
chinese.toChinese(101);
一百零一
 chinese.toChinese(1024);
 一千零二十四
```

## 中文数字和繁体及大小写之间的转换

```js
const { transformer } = require("./chinesenumerals");
transformer.fromSimplifiedBigWriting('壹萬');
一万
transformer.fromSimplifiedBigWriting('肆拾贰');
四十二
transformer.fromSimplifiedBigWriting('壹仟零伍萬零贰拾陆');
一千零五万零二十六
transformer.fromSimplifiedBigWriting('拾贰億叁仟肆佰伍拾陆萬柒仟捌佰玖拾');
十二亿三千四百五十六万七千八百九十

transformer.fromSimplifiedBigWriting('壹萬');
一万
transformer.fromSimplifiedBigWriting('肆拾贰');
四十二
transformer.fromSimplifiedBigWriting('壹仟零伍萬零贰拾陆');
一千零五万零二十六
transformer.fromSimplifiedBigWriting('拾贰億叁仟肆佰伍拾陆萬柒仟捌佰玖拾');
十二亿三千四百五十六万七千八百九十
```

## 阿拉伯数字和军事数字的转换

```js
const { military } = require("./chinesenumerals");
military.toDigits('幺两三四五六拐八勾洞');
1234567890
military.toMilitary('0123456789')；
洞幺两三四五六拐八勾
```
