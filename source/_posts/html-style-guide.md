---
title: HTML 代码规范
---

# HTML 代码规范

## 通用规则

> 参阅 [html-css-common-style-guide](./html-css-common-style-guide.md)

## HTML 风格规则

### 文档类型

**使用 HTML5**

HTML5 推荐所有 HTML 文档使用 `<!DOCTYPE html>`。

> （推荐使用 HTML，即 `text/html` 。不推荐使用 XHTML，及 [`application/xhtml+xml`](http://hixie.ch/advocacy/xhtml)，其缺少浏览器和工具支持，优化空间比 HTML 小。）

不要闭合空标签，例如：要 `<br>`，而非 `<br />`。尽管 HTML 两者都支持。

### 有效的 HTML

**使用有效的 HTML 代码**

使用有效的 HTML 代码，否则很难达到性能上的提升。

使用 [W3C HTML validator](http://validator.w3.org/nu/) 等工具进行校验。

使用有效的 HTML 代码是重要的质量衡量标准，便于了解技术需求与约束，并可确保正确使用 HTML 代码。

```html
<!-- Bad HTML -->
<title>Test</title>
<article>This is only a test.

<!-- Good HTML -->
<!DOCTYPE html>
<meta charset="utf-8">
<title>Test</title>
<article>This is only a test.</article>
```

### 语义化

**使用 HTML 要符合语义**

符合本义地使用元素（标签），比如使用 heading 元素表示标题，使用 `p` 标签表示段落，使用 `a` 标签表示锚点等。

语义化地使用 HTML 有助于网页的可访问性，复用性和提高代码效率。

```html
<!-- Bad HTML -->
<div onclick="goToRecommendations();">All recommendations</div>

<!-- Good HTML -->
<a href="recommendations/">All recommendations</a>
```

### 多媒体备选内容

**为多媒体提供备选内容**

对于多媒体，如图像，视频，基于 `canvas` 的动画对象，确保提供备选访问。对于图像，使用有意义的备选文案（ `alt` ）。对于视频和音频，尽量提供文字稿和文案说明。

提供备选内容对网页可访问性是很重要的：用 `@alt` 告诉盲人用户图像是关于什么的，给可能没理解视频或音频的内容的用户以提示。

> （图像的 `alt` 属性会产生冗余，对于不是在 CSS 中引用的非内容图像，就不要使用 `alt` 描述了。）

```html
<!-- Bad HTML -->
<img src="spreadsheet.png">

<!-- Good HTML -->
<img src="spreadsheet.png" alt="Spreadsheet screenshot.">
```

### 关注点分离

**行为、呈现与结构分离**

严格保持结构 （标记），表现 （样式），和行为 （脚本）分离, 并最小化三者的相互作用。

确保文档和模板只包含 HTML 结构，把所有表现都放到样式表里，把所有行为都放到脚本里。

此外，尽量减少三者间的交集，即减少文档与模板中样式表与脚本的外链。

将表现和行为分开维护是很重要的，因为要在 HTML 文档中更改样式和行为花费成本更高。

```html
<!-- Bad HTML -->
<!DOCTYPE html>
<title>HTML sucks</title>
<link rel="stylesheet" href="base.css" media="screen">
<link rel="stylesheet" href="grid.css" media="screen">
<link rel="stylesheet" href="print.css" media="print">
<h1 style="font-size: 1em;">HTML sucks</h1>
<p>I’ve read about this on a few sites but now I’m sure: <u>HTML is stupid!!1</u>
<center>I can’t believe there’s no way to control the styling of my website without doing everything all over again!</center>

<!-- Good HTML -->
<!DOCTYPE html>
<title>My first CSS-only redesign</title>
<link rel="stylesheet" href="default.css">
<h1>My first CSS-only redesign</h1>
<p>I’ve read about this on a few sites but today I’m actually doing it: separating concerns and avoiding anything in the HTML of my website that is presentational.
<p>It’s awesome!
```

### 实体引用

**不要使用实体引用**

不需要使用类似 `&mdash;` 、 `&rdquo;` 和 `&#x263a;`等的转义符，假如文件和编辑器以及团队之间用的是同一编码（UTF-8）。

例外的只能是，在 HTML 文档中具有特殊含义的字符（例如 `<` 和 `&` )，还有 控制字符 或 “不可见” 字符（例如 no-break 空格）。

```html
<!-- Bad HTML -->
The currency symbol for the Euro is &amp;ldquo;&amp;eur;&amp;rdquo;.

<!-- Good HTML -->
The currency symbol for the Euro is “€”.
```

### **[不允许]** 可选标签

**省略可选标签（可选）**

为了代码文件的体积和可读性，可以考虑省略可选的标签。[HTML5 specification](http://www.whatwg.org/specs/web-apps/current-work/multipage/syntax.html#syntax-tag-omission) 定义了哪些标签是可以被省略的。

> （这种方法可能需要一段时间来建立更详细的规范，因为显然跟开发者通常认为的不一致。考虑到一致性和简洁的原因，省略所有可选标记是有必要的。）

```html
<!-- Bad HTML -->
<!DOCTYPE html>
<html>
      <head>
        <title>Spending money, spending bytes</title>
      </head>
      <body>
        <p>Sic.</p>
      </body>
</html>

<!-- Good HTML -->
<!DOCTYPE html>
<title>Saving money, saving bytes</title>
<p>Qed.

```

### `type` 属性

**在 style 和 scitpt 标签中省略 `type` 属性**

不要在 style 和 scitpt 标签中使用 `type` 属性（除非标签中引用的不是 CSS 或 JavaScript），

HTML5 默认使用 [`text/css`](http://www.whatwg.org/specs/web-apps/current-work/multipage/semantics.html#attr-style-type) 和 [`text/javascript`](http://www.whatwg.org/specs/web-apps/current-work/multipage/scripting-1.html#attr-script-type)，因此声明引用类型是不必要的，对于较老的浏览器也同样适用。

```html
<!-- Bad HTML -->
<link rel="stylesheet" href="//www.google.com/css/maia.css"
      type="text/css">

<!-- Good HTML -->
<link rel="stylesheet" href="//www.google.com/css/maia.css">

<!-- Bad HTML -->
<script src="//www.google.com/js/gweb/analytics/autotrack.js"
      type="text/javascript"></script>

<!-- Good HTML -->
<script src="//www.google.com/js/gweb/analytics/autotrack.js"></script>
```

## HTML 代码格式规则

### 通用格式

**每个块级元素、列表元素或表格元素都独占一行，每个子元素都相对于此类父元素进行缩进。**

除了元素的样式（as CSS allows elements to assume a different role per `display` property), 将块元素、列表元素或表格元素都放在新行。

另外，需要缩进块级元素、列表元素或表格元素的子元素。

> （如果出现了列表项间的空格问题，可以试着将所有的 `li` 元素都放在一行。推荐代码校验器抛出警告而不是错误。)

```html
<blockquote>
      <p><em>Space</em>, the final frontier.</p>
</blockquote>
<ul>
    <li>Moe
    <li>Larry
    <li>Curly
</ul>
<table>
    <thead>
    <tr>
        <th scope="col">Income
        <th scope="col">Taxes
    <tbody>
    <tr>
        <td>$ 5.00
        <td>$ 4.50
</table>
```

### HTML 引号

**对属性值使用双引号**

在属性值的两侧，使用双引号 (`""`) 而不是单引号 (`''`).

```html
<!-- Bad HTML -->
<a class='maia-button maia-button-secondary'>Sign in</a>

<!-- Good HTML -->
<a class="maia-button maia-button-secondary">Sign in</a>
```

> Note: 上述规范来自 [Google HTML/CSS Style Guide](https://google.github.io/styleguide/htmlcssguide.html)。

> Note: 上述带有 **[不允许]** 标记的是本规范异于 Google 规范之处。

---------------------------------------------------------
---------------------------------------------------------

## 额外补充

## 风格规则

### 元素 `id` 必须保证页面唯一

同一个页面中，不同的元素包含相同的 `id`，不符合 `id` 的属性含义。并且使用 `document.getElementById` 时可能导致难以追查的问题。

### 在 HTML 标签上设置正确的 `lang` 属性

有助于提高页面的可访问性，如：让语音合成工具确定其所应该采用的发音，令翻译工具确定其翻译语言等。

```html
<html lang="zh-CN">
```

### 块级元素

### 自关闭标签

自关闭的标签不需要关闭。

```html
<!-- Bad HTML -->
<br />
<img src="image.png" alt="image" />
<input type="text" name="username" />

<!-- Good HTML -->
<br>
<img src="image.png" alt="image">
<input type="text" name="username">
```

### 减少冗余标签

坚持避免使用冗余的父元素。

```html
<!-- Bad HTML -->
<span class="avatar">
    <img src="assets/img/img.png" alt="Jane Doe">
</span>

<!-- Good HTML -->
<img class="avatar" src="assets/img/img.png" alt="Jane Doe">
```

### 布尔（boolean）型属性

布尔型属性可以在声明时不赋值。XHTML 规范要求为其赋值，但是 HTML5 规范不需要。

更多信息请参考 [WhatWG section on boolean attributes](http://www.whatwg.org/specs/web-apps/current-work/multipage/common-microsyntaxes.html#boolean-attributes)：

> 元素的布尔型属性如果有值，就是 `true`，如果没有值，就是 `false`。

如果一定要为其赋值的话，请参考 WhatWG 规范：

> 如果属性存在，其值必须是空字符串或 [...] 属性的规范名称，并且不要在首尾添加空白符。

简单来说，就是不用赋值。


## 代码格式

### 行宽

每行不得超过 **120** 个字符。

过长的代码不容易阅读与维护。但是考虑到 HTML 的特殊性，不做硬性要求。

### 属性顺序

HTML 属性应当按照以下给出的顺序依次排列，确保代码的易读性。

- `class`
- `id`, `name`
- `data-*`
- `src`, `for`, `type`, `href`, `value`
- `title`, `alt`
- `role`, `aria-*`

`class` 用于标识高度可复用组件，因此应该排在首位。`id` 用于标识具体组件，应当谨慎使用（例如，页面内的书签），因此排在第二位。

### 过多/过长属性的元素

> 对于 HTML 元素，过长的代码行，必须按属性分行

```html
<!-- Bad HTML -->
<a class="maia-button maia-button-secondary" title="I'm a very very very very very very very very very very very very long title" href="http://example.com">Sign in</a>

<!-- Good HTML -->
<a class="maia-button maia-button-secondary"
   title="I'm a very very very very very very very very very very very very long title"
   href="http://example.com">Sign in</a>
```

### HTML 中"="两侧的空格

HTML中 “=” 两侧不能存在空格

```html
<!-- Bad HTML -->
<link rel = "stylesheet" href = "styles.css">

<!-- Good HTML -->
<link rel="stylesheet" href="styles.css">
```

### 区段分隔

**利用空行来强调结构**

在HTML 中通过加空行来标记含义，以便更容易了解页面结构概况。例如，在区段间加入五行空行：

```html
<header class="page-head">
    ...
</header>





<main class="page-content">
    ...
</main>





<footer class="page-foot">
    ...
</footer>
```

用单行的空行来分割独立但不相关的区段，例如：

```html
<ul class="primary-nav">

    <li class="primary-nav__item">
        <a href="/" class="primary-nav__link">Home</a>
    </li>

    <li class="primary-nav__item  primary-nav__trigger">
        <a href="/about" class="primary-nav__link">About</a>

        <ul class="primary-nav__sub-nav">
            <li><a href="/about/products">Products</a></li>
            <li><a href="/about/company">Company</a></li>
        </ul>

    </li>

</ul>
```

## HTML `head`

### 启用 IE Edge 模式

```html
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
```

### `title` 标题

`head` 必须包含 `title` 标签声明标题。

`title` 必须作为 `head` 的直接子元素，并紧随 meta charset 声明之后。

### favicon

保证 favicon 可访问。

```html
<link rel="shortcut icon" href="path/to/favicon.ico">
```

## 表单

### 使用 `button` 元素时必须指明 `type` 属性值

`button` 元素的默认 `type` 为 `submit`，如果被置于 `form` 元素中，点击后将导致表单提交。为显示区分其作用方便理解，必须给出 `type` 属性。

## 可访问性额外参考

[Web Content Accessibility Guidelines (WCAG) 2.0](https://www.w3.org/TR/WCAG20/)

## Microdata

所有关键页面（如产品宣传页面）需要包含 [microdata](https://www.w3.org/TR/microdata/). 当新增信息/功能时，请关注这一推荐。

## Appendix

### 文档参考来源：

> * http://devdocs.magento.com/guides/v2.0/coding-standards/code-standard-html.html
> * https://github.com/fex-team/styleguide/blob/master/html.md
> * https://contribute.jquery.org/style-guide/html/
