[TOC]

# 架构文档

## 架构概览图

> todo: 未完成

## 开发模型

### 模块化方案

- 使用`ES2015+`语法编写代码
- 使用`Vue` 组件规范定义的`HTML/Style`模块化方案，尽量不要内联模板与样式文件
- 使用`Webpack`的3大javascript规范兼容特性，尽量使用`ES2015+`规范中`import/export`相关语法进行模块引入/导出
- 基于`职责单一`原则独立以下单元
   1. `service`单元
   2. `component`单元
   3. `pipeline`单元
   4. `directive`单元
   5. `common style`单元
   6. `common module`单元
- 通过预先设置相对地址结合`copy-webpack-plugin`插件管理拷贝静态资源
- 使用`webpack`及相关工具编译成浏览器友好的`ES5`代码（core-concept: `tree-shaking`）
- 使用`weback-dev-server`及相关工具进行开发（core-concept: `hot-module-reload`）

### 组件化方案

- 整个应用是一个单根组件树
- 每个逻辑页面尽量设计成一个页面级组件
- 非页面级组件按功能细分成子组件，抽离跨页面共用子组件
	 1. 简单组件使用.vue单文件组件编写
	 2. vue提供了.vue单文件组件`scope style`功能，但由于`CSSOM`性能问题并且便于培养良好的代码命名习惯，开发者应该谨慎使用此特性
	 3. 复杂组件使用[vue-class-component](https://github.com/vuejs/vue-class-component)，[vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)进行细粒度拆分(向```typescript```平滑过渡)

``` typescript
// eg:
// in user-component.ts
import { Component, Emit, Inject, Model, Prop, Provide, Watch } from 'vue-property-decorator'
// html-loader will process these files and output as string
import template from './user-component.html'
// sass-loader will process these files and output as string,then extra it to .css file
import './user-component.scss'

const s = Symbol('baz')

@Component({
	template,
	...
})
export class UserComponent extends Vue {

  @Emit()
  addToCount(n: number){ this.count += n }

  @Emit('reset')
  resetCount(){ this.count = 0 }

  @Inject() foo: string
  @Inject('bar') bar: string
  @Inject(s) baz: string

  @Model('change') checked: boolean

  @Prop()
  propA: number

  @Prop({ default: 'default value' })
  propB: string

  @Prop([String, Boolean])
  propC: string | boolean

  @Provide() foo = 'foo'
  @Provide('bar') baz = 'bar'

  @Watch('child')
  onChildChanged(val: string, oldVal: string) { }

  @Watch('person', { immediate: true, deep: true })
  onPersonChanged(val: Person, oldVal: Person) { }

  ...
}
```

### 状态管理（undetermined）

> 考虑引入[vuex-class](https://github.com/ktsn/vuex-class/)(向```typescript```平滑过渡)

#### 概念

- 采用flux设计，[详细信息](http://facebook.github.io/flux/docs/overview.html#content)
- 项目依赖[vuex](https://vuex.vuejs.org/en/)，专为Vue实现的类flux状态管理器
- 为减小store在整个项目的复杂度以及不必要的数据维护，开发者应当深入理解该状态管理模型。
- 并不是所有的数据都会交给store来管理（如页面中一次性消费的数据以及一些不需要持续维护管理的数据）

#### 设计哲学

![@vuex工作图示| center | 700x0](https://vuex.vuejs.org/en/images/vuex.png)

### 样式结构

- 组件样式文件附着于组件文件夹
- 公共样式模型
- 主题管理（TODO）
```
src
│
└─── core
│   │   ...
│   └───style
│       │   normalize.scss
│       │   common.scss
│       │   index.scss
│       │   ...
│       └───other-css-module-folder
```
