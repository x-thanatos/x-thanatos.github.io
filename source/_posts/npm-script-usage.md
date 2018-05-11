---
title: npm script usage
---

[TOC]

# npm script usage

> 说明，使用npm script之前，开发者请务必理解npm script [官方文档](https://docs.npmjs.com/misc/scripts)

运行本项目主要使用以下几条命令

1. `serve:hmr:spa:owner-all`
2. `serve:hmr:spa:distributor-all`
3. `serve:hmr:spa:vendor-all`
4. `serve:hmr:spa:renter-all`
5. `prod:spa:owner-all`
6. `prod:spa:distributor-all`
7. `prod:spa:renter-all`
8. `prod:spa:vendor-all`
9. `prod:spa:all`
10. `prod:mpa:all`
11. `prod:all`
12. `prod:stats`(TODO)

> 分析: `serve`和`prod`代表此命令作用，这里分别表示`服务`和`生产`，命令以`:`分隔参数，类似Linux的`pipeline`，这里多用于描述`可选项`或`特性`。例如: `serve:hmr:spa:owner-all`表示`本地开启spa类型owner-all服务，并且带有hmr特性`
