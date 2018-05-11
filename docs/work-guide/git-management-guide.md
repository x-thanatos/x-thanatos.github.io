[TOC]

# Git 管理使用指导

## commit

1. 不允许使用 `git commit -m <message>` 来提交代码
2. 如非特殊情况，不允许跳过提交钩子
3. commit 信息尽量参考提交模板填写，实在没什么可写，去掉对应部分

> 概览性规范详见：http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html

## branch

见 [Git flow 分支管理模型](./git-flow-guide.md)

## merge
除非特殊情况，只允许 PR 的合并产生 merge commit

## rebase
* 非主体分支未被合并前，请尽量基于主体分支进行rebase，减少分支冲突
* 若与主体分支发生冲突，请进行`interactive rebase`

## revert
非特殊情况，不建议生成 revert commit

## reset
适合本地改动的（各类）回滚。不允许对主体分支进行此类操作

## push force

* 不允许使用 `git push --force`
* 可以针对当前非主体分支进行 `git push --force-with-lease`
