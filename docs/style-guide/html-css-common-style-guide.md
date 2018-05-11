[TOC]

# HTML/CSS 通用规则

## 通用风格规则

### 协议

**尽量使用带 HTTPS 协议的嵌入资源**

坚持将 HTTPS 协议（`https:`）应用到图片以及其他媒体文件，样式表，和脚步，除非对应文件无法通过 HTTPS 获得

```html
<!-- Bad -->
<script src="http://www.google.com/js/gweb/analytics/autotrack.js"></script>

<!-- Good -->
<script src="https://www.google.com/js/gweb/analytics/autotrack.js"></script>
```

```css
/* Bad */
.example {
    background: url(//www.google.com/images/example);
}

/* Good */
.example {
    background: url(https://www.google.com/images/example);
}
```

## 通用格式化规则

### 缩进

**使用两个空格**

不要使用 tab 或者混用 tab 和空格的方式作为缩进。

```html
<ul>
    <li>Fantastic
    <li>Great
</ul>
```

```css
.example {
    color: blue;
}
```

### 大小写

**只使用小写**

所有代码只使用小写：包括HTML元素名、元素属性、元素属性值（`text/CDATA` 例外）、css选择器、css属性和css属性值（除了字符串）。

```html
<!-- Bad -->
<A HREF="/">Home</A>

<!-- Good -->
<img src="google.png" alt="Google">
```

```css
/* Bad */
color: #E5E5E5;

/* Good */
color: #e5e5e5;
```

### 尾部空格

**删除多余的尾部空格**

尾部空格是多余的，可能会造成混乱的代码比对（diff）。

```html
<!-- Bad -->
<p>What?_

<!-- Good -->
<p>Yes please.
```

## 通用 Meta 规则

### 编码

**使用 UTF-8 (no BOM) 编码**

确保你的编辑器文档编码为 UTF-8，没有字节顺序标记。

在 HTML 中使用 `<meta charset="utf-8">` 置顶文档编码，在 CSS 中默认就是 UTF-8 编码，不需要特别指定。

> （更多编码和指定方式的资料可以参见 [Character Sets & Encodings in XHTML, HTML and CSS](http://www.w3.org/International/tutorials/tutorial-char-enc/en/all.html)）

### 注释

**根据需要，给代码做注释**

用注释解释代码：它实现了什么功能，它的目的是什么，为什么这个方案被使用或更好？

> （注释代码不是强制要求，视乎项目性质和复杂程度）

### 待办事项

**使用 `TODO` 关键词标识待办事项**

只使用 `TODO` 关键词标识待办事项，而不用 `@@` 等其他格式。

使用 `TODO(contact)` 的形式附上联系方式（用户名和邮件列表）方便联系。

在冒号后加入待办事项内容，如  `TODO: action item` 。

```html
{# TODO(john.doe): revisit centering #}
<center>Test</center>
```

```html
<!-- TODO: remove optional tags -->
<ul>
      <li>Apples</li>
      <li>Oranges</li>
</ul>
```

> Note: 上述规范来自 [Google HTML/CSS Style Guide](https://google.github.io/styleguide/htmlcssguide.html)

-------------
-------------

## 额外规则

### 文件结尾

**文件结尾必须存在至少一空行**
