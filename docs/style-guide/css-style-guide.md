[TOC]

# CSS 代码规范

## 术语

### 规则

我们把一个（或一组）选择器和一组属性称之为 “规则”。举个例子：

```css
.listing {
  font-size: 18px;
  line-height: 1.2;
}
```

### 声明块

一对花括号和一组属性的组合称之为 “声明块”。举个例子：

```css
{
  font-size: 18px;
  line-height: 1.2;
}
```

### 选择器

在规则声明中，“选择器” 负责选取 DOM 树中的元素，这些元素将被定义的属性所修饰。选择器可以匹配 HTML 元素，也可以匹配一个元素的类名、ID, 或者元素拥有的属性。以下是选择器的例子：

```css
.my-element-class {
  /* ... */
}

[aria-hidden] {
  /* ... */
}
```

### 属性

最后，属性决定了规则声明里被选择的元素将得到何种样式。属性以键值对形式存在，一个规则声明可以包含一或多个属性定义。以下是属性定义的例子：

```css
/* some selector */ {
  background: #f1f1f1;
  color: #333;
}
```


## 通用规则

> 参阅 [html-css-common-style-guide](./html-css-common-style-guide.md)

## CSS 风格规则

### CSS 有效性

**尽可能使用有效的CSS。**

除非遇到验证器bug或者是专有的语法，使用有效的CSS代码。

使用诸如 [W3C CSS validator](http://jigsaw.w3.org/css-validator/) 等工具验证测试。

使用有效的CSS代码是一个可衡量CSS代码质量的指标，可帮你找出不起作用、可被删除的CSS代码，从而确保CSS的合理使用。

### `id` 与 `class` 的命名

**使用有意义的或者通用的 `id` 和 `class` 命名**

用能反映出问题中元素的目的或者通用的`id`、`class`命名，代替那些很表象的、难懂的命名。

首选特定的或者能反映出元素目的的命名。因为这样容易理解，也不太可能被修改

通用的命名通常作为非特殊元素或与兄弟元素无区别的元素的备选命名。他们常被称为“辅助元素”。

使用功能性或者通用的命名，可减少不必要的文档或者模板变化。

```css
/* 不推荐：无意义 */
#yee-1901 {}


/* 不推荐：表象 */
.button-green {}
.clear {}

/* 推荐：具体的 */
#gallery {}
#login {}
.video {}

/* 推荐：通用的 */
.aux {}
.alt {}
```

### `id` 与 `class` 的命名风格

**`ID` 和 `class` 命名要尽可能简短，但必要的话就别怕长。**

尽可能简洁地传达 `id` 或者 `class` 名称的含义。

使用简洁的 `id` 或者 `class` 名称有助于提高可读性和代码效率。

```css
/* 不推荐 */
#navigation {}
.atr {}

/* 推荐 */
#nav {}
.author {}
```

### 类型选择器

**应当避免在 `id` 和 `class` 前添加类型选择器。**

除了必要情况下（例如辅助的类），不要将元素名称与 `id` 或 `class` 结合作为选择器。

避免不必要的祖先选择器是出于 [性能原因](http://www.stevesouders.com/blog/2009/06/18/simplifying-css-selectors/) 的考虑。

```css
/* 不推荐 */
ul#example {}
div.error {}

/* 推荐 */
#example {}
.error {}
```

### ID 选择器

在 CSS 中，虽然可以通过 ID 选择元素，但大家通常都会把这种方式列为反面教材。ID 选择器给你的规则声明带来了不必要的高[优先级](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity)，而且 ID 选择器是不可重用的。

想要了解关于这个主题的更多内容，参见 [CSS Wizardry 的文章](http://csswizardry.com/2014/07/hacks-for-dealing-with-specificity/)，文章中有关于如何处理优先级的内容。

再说一遍: **永远不要嵌套 ID 选择器！**

如果你始终坚持要使用 ID 选择器（劝你三思），那也不应该嵌套它们。如果你正打算这么做，你需要先重新检查你的标签，或者指明原因。如果你想要写出风格良好的 HTML 和 CSS，你是**不**应该这样做的。

### JavaScript 钩子

避免在 CSS 和 JavaScript 中绑定相同的类。否则开发者在重构时通常会出现以下情况：轻则浪费时间在对照查找每个要改变的类，重则因为害怕破坏功能而不敢作出更改。

我们推荐在创建用于特定 JavaScript 的类名时，添加 `.js-` 前缀：

```html
<button class="btn btn-primary js-request-to-book">Request to Book</button>
```

> Note: 这个规则在 `SPA` 类型应用中**不是必要**的。

### 简写属性

**尽可能使用简写的属性书写方式。**

CSS提供了多种属性 [简写](http://www.w3.org/TR/CSS21/about.html#shorthand) 的方式（如 **font**），即使只显式设置一个值，也应该尽可能地使用。

使用简写属性有助于提高代码效率及可读性。

```css
/* 不推荐 */
border-top-style: none;
font-family: palatino, georgia, serif;
font-size: 100%;
line-height: 1.6;
padding-bottom: 2em;
padding-left: 1em;
padding-right: 1em;
padding-top: 0;

/* 推荐 */
border-top: 0;
font: 100%/1.6 palatino, georgia, serif;
padding: 0 1em 2em;
```

### 0与单位

**省略“0”后的单位。**

除非必需，否则`0`后不要加单位。

```css
margin: 0;
padding: 0;
```

### 前导 "0"

**省略前导 "0" 值。**

在`-1`至`1`之间的值无需保留整数位的`0`。

```css
font-size: .8em;
```

### 无边框

在定义无边框样式时，使用 `0` 代替 `none`。

```css
/* Bad */
.foo {
  border: none;
}
```

```css
/* Good */
.foo {
  border: 0;
}
```

### 十六进制表示法

**在可能的情况下使用3个字符的十六进制表示法。**

对于可用3字符十六进制表示的颜色值，按此规则书写更短、更简洁。

```css
/* 不推荐 */
color: #eebbcc;

/* 推荐 */
color: #ebc;
```

### 选择器前缀

**对选择器加上应用特定的前缀（可选）**

大型项目中以及嵌入在其它项目或外部网站上的代码需要给 `id` 和 `class` 添加前缀（命名空间）。使用短的、独特的标识符，并在其后跟一个破折号。
使用命名空间有助于防止命名冲突，可以让维护变得简单，例如在搜索和替换操作时。

```css
.adw-help {} /* AdWords */
#maia-note {} /* Maia */
```

### `id` 与 `class` 名称分隔符

**用连字符分隔 `id` 和 `class` 中的单词。**

选择器中的词语和缩写中不要使用除了连字符以外的任何字符（包括空字符），以提高可理解性和可读性。

```css
/* 不推荐: 单词未分开 */
.demoimage {}

/* 不推荐：使用下划线而不是连字符 */
.error_status {}

/* 推荐 */
#video-id {}
.ads-sample {}
```

### OOCSS 和 BEM

出于以下原因，我们鼓励使用 OOCSS 和 BEM 的某种组合：

- 可以帮助我们理清 CSS 和 HTML 之间清晰且严谨的关系。
- 可以帮助我们创建出可重用、易装配的组件。
- 可以减少嵌套，降低特定性。
- 可以帮助我们创建出可扩展的样式表。

**OOCSS**，也就是 “Object Oriented CSS（面向对象的CSS）”，是一种写 CSS 的方法，其思想就是鼓励你把样式表看作“对象”的集合：创建可重用性、可重复性的代码段让你可以在整个网站中多次使用。

参考资料：

- Nicole Sullivan 的 [OOCSS wiki](https://github.com/stubbornella/oocss/wiki)
- Smashing Magazine 的 [Introduction to OOCSS](http://www.smashingmagazine.com/2011/12/12/an-introduction-to-object-oriented-css-oocss/)

**BEM**，也就是 “Block-Element-Modifier”，是一种用于 HTML 和 CSS 类名的_命名约定_。BEM 最初是由 Yandex 提出的，要知道他们拥有巨大的代码库和可伸缩性，BEM 就是为此而生的，并且可以作为一套遵循 OOCSS 的参考指导规范。

- CSS Trick 的 [BEM 101](https://css-tricks.com/bem-101/)
- Harry Roberts 的 [introduction to BEM](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)

**示例**

```html
<article class="listing-card listing-card--featured">

  <h1 class="listing-card__title">Adorable 2BR in the sunny Mission</h1>

  <div class="listing-card__content">
    <p>Vestibulum id ligula porta felis euismod semper.</p>
  </div>

</article>
```

```css
.listing-card { }
.listing-card--featured { }
.listing-card__title { }
.listing-card__content { }
```

- `.listing-card` 是一个块（block），表示高层次的组件。
- `.listing-card__title` 是一个元素（element），它属于 `.listing-card` 的一部分，因此块是由元素组成的。
- `.listing-card--featured` 是一个修饰符（modifier），表示这个块与 `.listing-card` 有着不同的状态或者变化。


### Hacks

**请先尝试其他的方法，避免用户代理检测以及CSS的“hacks”。**

进行用户代理检测或使用特殊的CSS选择器及hacks看起来是处理样式差异的捷径。但为了实现和保持高效性以及代码的可维护性，这两种方案应该放到最后考虑。换句话说，用户代理检测和使用hacks会增大项目推进的阻力，所以从项目的长远利益考虑应尽力避免。一旦允许并无顾忌地使用用户代理检测和hacks便很容易滥用，最终一发而不可收。

## CSS 格式化规则

### 声明顺序

#### 方案一

**按字母顺序排列声明。**

css文件书写按字母顺序排列的方式，容易记忆和维护，以达到一致的代码。

在排序时忽略浏览器特定的前缀。但是，特定CSS属性的多个浏览器前缀应按字母顺序排列（如`-moz-`书写在`-webkit-`前面）。

```css
background: fuchsia;
border: 1px solid;
-moz-border-radius: 4px;
-webkit-border-radius: 4px;
border-radius: 4px;
color: black;
text-align: center;
text-indent: 2em;
```

#### 方案2

相关的属性声明应当归为一组，并按照下面的顺序排列：

  1. Positioning
  2. Box model
  3. Typographic
  4. Visual

由于定位（positioning）可以从正常的文档流中移除元素，并且还能覆盖盒模型（box model）相关的样式，因此排在首位。盒模型排在第二位，因为它决定了组件的尺寸和位置。

其他属性只是影响组件的*内部（inside）*或者是不影响前两组属性，因此排在后面。

完整的属性列表及其排列顺序请参考 [Recess](http://twitter.github.com/recess)。

```css
.declaration-order {
  /* Positioning */
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;

  /* Box-model */
  display: block;
  float: right;
  width: 100px;
  height: 100px;

  /* Typography */
  font: normal 13px "Helvetica Neue", sans-serif;
  line-height: 1.5;
  color: #333;
  text-align: center;

  /* Visual */
  background-color: #f5f5f5;
  border: 1px solid #e5e5e5;
  border-radius: 3px;

  /* Misc */
  opacity: 1;
}
```

### 块内容的缩进

**缩进所有块级内容。**

缩进 [块级内容](http://www.w3.org/TR/CSS21/syndata.html#block)，即嵌套的及声明块中的规则，以体现层级并提高可读性。

```css
@media screen, projection {

  html {
    background: #fff;
    color: #444;
  }

}
```

### 声明结束符

**每个属性后使用分号结束。**

以分号结束每个属性，提高一致性和可扩展性。

```css
/* 不推荐 */
.test {
  display: block;
  height: 100px
}

/* 推荐 */
.test {
  display: block;
  height: 100px;
}
```

### CSS 属性名结束符

**属性名称的冒号后有一个空格。**

为保证一致性，在属性名与属性值之间添加一个空格（但是属性名和冒号间没有空格）。

```css
/* 不推荐 */
h3 {
  font-weight:bold;
}

/* 推荐 */
h3 {
  font-weight: bold;
}
```

### 声明块分离

**在选择器和后面的声明块之间使用一个空格。**

最后一个选择器与表示 [声明块](http://www.w3.org/TR/CSS21/syndata.html#rule-sets) 开始的左大花括号在同行，中间有一个字符空格。

表示开始的左花括号和选择器在同行。
表示结束的右花括号放在新的一行。

```css
/* 不推荐：缺少空格 */
#video{
  margin-top: 1em;
}

/* 不推荐：不必要的换行符 */
#video
{
  margin-top: 1em;
}

/* 不推荐：右花括号前缺少换行符 */
#video {
  margin-top: 1em;}

/* 推荐 */
#video {
  margin-top: 1em;
}
```

### 选择器及声明分离

**每个选择器和声明独立成行。**

总是让每个选择器和声明单独成行。

如果规则只有一行声明，那么就不必再起行。

```css
/* 不推荐 */
a:focus, a:active {
  position: relative; top: 1px;
}

/* 推荐 */
h1,
h2,
h3 {
  font-weight: normal;
  line-height: 1.2;
}

/* 推荐 */
.icon--home     { background-position:   0     0  ; }
.icon--person   { background-position: -16px   0  ; }
.icon--files    { background-position:   0   -16px; }
.icon--settings { background-position: -16px -16px; }
```

### 规则分隔

**使用空行分隔规则。**

始终把一个空行（两个换行符）放在代码块规则之间。

```css
html {
  background: #fff;
}


body {
  margin: auto;
  width: 50%;
}

```

### CSS 引号

**属性选择器和属性值中使用单引号。**

在属性选择器及属性值中使用单引号（`''`）而不是双引号（`""`）。在 `url()` 中不要使用引号。

特例：如果你确实需要定义 ``@charset`` ，由于 [不允许使用单引号](http://www.w3.org/TR/CSS21/syndata.html#charset) ，故请使用双引号。

```css
/* 不推荐 */
@import url("//www.google.com/css/maia.css");

html {
  font-family: "open sans", arial, sans-serif;
}

/* 推荐 */
@import url(//www.google.com/css/maia.css);

html {
  font-family: 'open sans', arial, sans-serif;
}
```

## CSS 元规则

### 栏目/模块标题注释

**项目中的每一个主要栏目都需要附上标题：**

```css
/*------------------------------------*\
    #SECTION-TITLE
\*------------------------------------*/

.selector {}
```

栏目的标题以`#`号起头，以便我们更好的搜索。

在标题和下一行代码间加入空行（无论那行代码是评论，Sass 或者 CSS）

如果这个项目中，每个栏目都有自己的文件，那么标题应该在每个文件的顶部。如果一个文件内有几个栏目，每个标题前应插入 `5` 个空行。额外空格和标题让寻找变得更加简单。

```css
/*------------------------------------*\
    #A-SECTION
\*------------------------------------*/

.selector {}





/*------------------------------------*\
    #ANOTHER-SECTION
\*------------------------------------*/

/**
 * Comment
 */

.another-selector {}
```

### 更详细的注释

CSS 带来的认知负担是巨大的。有许多东西需要注意，有很多和项目有关的细节要去记，开发者遇到最糟糕的情况是面对其他人写的代码。记住自己的 class、规则、对象和助手不难，难得是理解其他人的。

CSS 需要更多的评论。

因为 CSS 是声明性的语言，所以单单看 CSS 的话，很难透过字面意思，去辨识其含义

- 有些 CSS 可能依赖其他地方的代码
- 改变某段代码的对其他代码的影响
- 什么地方已经应用了某些样式（代码冗余）
- 继承了怎样的样式（刻意或者无意）
- 传递了怎样的样式（刻意或者无意）
- 原作者想把样式用在哪里

这里甚至没有考量 CSS 的诸多奇异特性，例如多种 `overflow` 触发的块格式、或者某些 `transform` 属性触发硬件加速，这对接手的开发者来说更加的麻烦。

因为 CSS 无法很好的描述自己的情况，这是一个非常需要注释的语言。

一个规则是，注释任何一眼不能看穿的代码。意思就是，不需要告诉大家颜色的含义，但是如果使用 `overflow: hidden` 来去除浮动，而不是用来截去某个元素的 `overflow`，那么这就值得记录。

#### 顶层设计

对于解释整个分段或组件的大块注释来说，使用 DocBlock 级的多行评论，每行 80 字符宽。

这是来自 CSS Wizardry 网站中记录页头的真实例子：

```css
/**
 * The site’s main page-head can have two different states:
 *
 * 1) Regular page-head with no backgrounds or extra treatments; it just
 *    contains the logo and nav.
 * 2) A masthead that has a fluid-height (becoming fixed after a certain point)
 *    which has a large background image, and some supporting text.
 *
 * The regular page-head is incredibly simple, but the masthead version has some
 * slightly intermingled dependency with the wrapper that lives inside it.
 */
```

**重要的代码都要这么做。**

#### 对象扩展指针

当横跨多个部分，或者应用了 OOCSS 的方法时，你通常会发觉相互影响的规则通常不在同一个文件或者地方。

例如，有一个通用的按钮对象，只提供纯粹的结构样式，它还有一个扩展的对象，用来加上装饰效果。用简单的对象扩展指针来记录这种关系。在对象文件中：

```css
/**
 * Extend `.btn {}` in _components.buttons.scss.
 */

.btn {}
```

在你的主题文件中：

```css
/**
 * These rules extend `.btn {}` in _objects.buttons.scss.
 */

.btn--positive {}

.btn--negative {}
```

对不熟悉项目多个部分关系的开发者而言，或者希望了解样式继承规则的人来说，这种简单、省事的注释可以节约很多精力。

#### 底层/细节解释

有时候我们想评论特定的（某行）声明/规则，可以用反向脚注，以下是一个大型网站头部的脚注例子：

```scss
/**
 * Large site headers act more like mastheads. They have a faux-fluid-height
 * which is controlled by the wrapping element inside it.
 *
 * 1. Mastheads will typically have dark backgrounds, so we need to make sure
 *    the contrast is okay. This value is subject to change as the background
 *    image changes.
 * 2. We need to delegate a lot of the masthead’s layout to its wrapper element
 *    rather than the masthead itself: it is to this wrapper that most things
 *    are positioned.
 * 3. The wrapper needs positioning context for us to lay our nav and masthead
 *    text in.
 * 4. Faux-fluid-height technique: simply create the illusion of fluid height by
 *    creating space via a percentage padding, and then position everything over
 *    the top of that. This percentage gives us a 16:9 ratio.
 * 5. When the viewport is at 758px wide, our 16:9 ratio means that the masthead
 *    is currently rendered at 480px high. Let’s…
 * 6. …seamlessly snip off the fluid feature at this height, and…
 * 7. …fix the height at 480px. This means that we should see no jumps in height
 *    as the masthead moves from fluid to fixed. This actual value takes into
 *    account the padding and the top border on the header itself.
 */

.page-head--masthead {
    margin-bottom: 0;
    background: url(/img/css/masthead.jpg) center center #2e2620;
    @include vendor(background-size, cover);
    color: $color-masthead; /* [1] */
    border-top-color: $color-masthead;
    border-bottom-width: 0;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1) inset;

    @include media-query(lap-and-up) {
        background-image: url(/img/css/masthead-medium.jpg);
    }

    @include media-query(desk) {
        background-image: url(/img/css/masthead-large.jpg);
    }

    > .wrapper { /* [2] */
        position: relative; /* [3] */
        padding-top: 56.25%; /* [4] */

        @media screen and (min-width: 758px) { /* [5] */
            padding-top: 0; /* [6] */
            height: $header-max-height - double($spacing-unit) - $header-border-width; /* [7] */
        }

    }

}
```

## Appendix

### 文档参考来源

> - https://google.github.io/styleguide/htmlcssguide.html#CSS
> - http://cssguidelin.es/#introduction
> - https://github.com/airbnb/css
> - http://codeguide.bootcss.com
