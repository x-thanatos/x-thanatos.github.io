---
title: 使用装饰器开发Vue组件
---

## 前言

1. 你是否写腻了.vue单文件组件
2. 你是否面对复杂.vue单文件组件代码量感到头晕眼花
3. 你是否想尝试换一种姿势coding
4. 你是否渴望改变

## 背景

- 笔者有`Angular`经验，被它的设计理念深深折服（当然，学的时候比较苦逼），有一种“世间竟有如此出尘脱俗的女子”的感觉。
- 个人比较喜欢以模板，代码，样式文件分离的方式编写声明式组件。
- 接盘旧项目（技术栈：`Vue`全家桶），发现大大小小的组件几乎都是使用.vue单文件组件编写的，加之组件粒度过大，经常穿梭于一大堆css，js，html中改bug，毫无开发体验，在几经思考后，开始用新的方法编写组件。

## 准备

> 本文所需要的主要知识（相信各位都已经玩上手的啦！）
- `Decorator`设计模式
- [Javascript Decorator](https://tc39.github.io/proposal-decorators/)

## 开始

话说，磨刀不误砍材工。重新看了一遍`Vue`官方文档，发现了[这样](https://cn.vuejs.org/v2/guide/typescript.html#%E5%9F%BA%E4%BA%8E%E7%B1%BB%E7%9A%84-Vue-%E7%BB%84%E4%BB%B6)一种组件编写方式（[vue-class-component](https://github.com/vuejs/vue-class-component)）。心生一悦，这看上去有点眼熟啊（`Angular`使用了`Decorator`），于是有了下面的这样组件代码：

```javascript
import Vue from 'vue'
import Component from 'vue-class-component'
import './list.compoent.scss'

@Component({
    template: `
    <ol class="list">
        <li> count: {{ length }} </li>
        <li v-for="(item, index) in list" :key="index">
           {{item}}
        </li>
    </ol>
`
})
export default class ListPageComponent extends Vue {
    list = []

    get length() {
        return this.list.length
    }

    loadList() {
        return new Promise(((resolve) => {
            setTimeout(() => {
                resolve(Object.keys(window))
            }, 1000)
        }))
    }

    initialization() {
        return this.loadList()
            .then((res) => {
                this.list = res
            })
    }

    mounted() {
        return this.initialization()
    }
}
```

看到大量的Html字符串模板出现在代码里是不是觉得不美观，影响代码表达呢。咱们想个办法吧。记得`Webpack`有个`loader`吗？没错就是[html-loader](https://github.com/webpack-contrib/html-loader)（它的主要功能就是把.html文件内容转换成string，这样我们就可以在.html文件中“放飞自我”了，还能用到IDE自带的html智能提示，是不是美美的！，webpack配置就略过了，相信各位已经烂熟于心。），一顿`yarn add`（`npm i`）操作之后代码的上半部分变成了这样：

```javascript
import Vue from 'vue'
import Component from 'vue-class-component'
import './list.compoent.scss'
import template from './list.component.html'

@Component({ template })
...
```

怎么样，这样咱们就抽离了静态模板和代码（虽然只是换了一种写法--!），让它们在各自的文件中发挥作用，是不是很舒服。

目前为止，我们现在好像只用到了`@Component`类装饰器，话说还有类方法装饰器和类属性装饰器呢？细心的你肯定会在[vue-class-component](https://github.com/vuejs/vue-class-component)下面发现这个：[vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)。于是乎，通过它，为我们的组件添加一个新的功能吧：

```javascript
import { Component, Vue, Watch } from 'vue-property-decorator'
...
@Component({ template })
export default class ListPageComponent extends Vue {
    ...
    @Watch('list')
    onListChange(newVal, oldVal) {
        console.log(newVal, oldVal)
    }
    ...
}
```

让我们从头看一遍组件，似乎少了点Vue全家桶应用组件的一般“套路”，没错，就是状态管理[vuex](https://vuex.vuejs.org/zh/guide/)，接下来，GitHub上逛了一圈，又被我找到了这个：[vuex-class](https://github.com/ktsn/vuex-class)，接着，又是一顿`yarn add`（`npm i`）操作之后代码最终变成了这样：

```javascript
import { Component, Vue, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import template from './list.component.html'
import './list.compoent.scss'
import { actionTypes } from '../../core/store/window-properties/actions'
import { mutationTypes } from '../../core/store/window-properties/mutations'

const localModule = namespace('windowProperties')

@Component({ template })
export default class ListPageComponent extends Vue {
    @localModule.State('list') list

    @localModule.Getter('listLength') length

    @localModule.Mutation(mutationTypes.RESTORE_LIST)
    resetList() {
    }

    @localModule.Action(actionTypes.GET_LIST)
    loadList() {
    }

    @Watch('list')
    onListChange(newVal, oldVal) {
        console.log(newVal, oldVal)
    }

    initialization() {
        return this.loadList()
    }

    mounted() {
        return this.initialization()
    }

    destroyed() {
        this.resetList()
    }
}
```

如此，乍一看，代码更加`OO`了呢！

## 总结

1. 都写成这样了，为何不直接使用typescript呢？
    > 之所以用`javascript`，是因为自ES6版本以来，ECMA规范更新频繁，如今已经拥有许多令人振奋的特性。作为开发者，笔者认为应该有意识的通过原生规范去接触这些新特性，并且拥抱它们，努力将其用于实践，而不只是停留在了解。
2. 装饰器的出现，从语法上补足了语言在设计模式上的欠缺，当你完全掌握装饰器之后，你会发现它的作用远不如此。
3. 这里有一个缺陷，就是单文件组件的`scope css`特性不存在了，目前笔者还未找到替代方案，或许[css-modules](https://github.com/css-modules/css-modules)是个不错的选择。
4. 这样编写代码，在应用装饰器的同时，分离了组件各个部分，使得组件代码更加纯粹。当然，并不是所有组件都推荐这样做，根据自己的组件逻辑和复杂度灵活选择。相对简单的组件，.vue单文件组件依旧是不错的选择。
5. 本文旨在倡导开发者拥抱新特性，持续学习，用于实践。
6. 关于组件代码长度，决定因素依旧是你对组件粒度的划分，而不在于用什么样的方式编写代码。
7. 本文代码来自笔者[github仓库](https://github.com/x-thanatos/vue-start)（笔者用来实验webpack特性以及尝试一些小工具）。

 ps：以上内容，均源自笔者日常工作学习中总结积累，如有错误，还请指正，不胜感激。
