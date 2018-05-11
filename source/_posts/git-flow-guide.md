---
title: git-flow 开发模型
---

[TOC]

## git-flow 开发模型

参见：
- https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow
- http://www.ruanyifeng.com/blog/2015/12/git-workflow.html
- http://danielkummer.github.io/git-flow-cheatsheet/index.zh_CN.html

### 本项目定制规范

#### 开发人员

1. 被分配到任务时，从`develop`分支分出特性分支。

	> 特性分支命名格式: `feature/name[#***]`，如果有分配的 issue，注明 issue id(可选)。
	> 样例：`feature/batch-update(#657)`

2. 特性分支开发完成后，向 `develop` 分支发起 **PR**。开发人员相互 review（可由负责人指定审阅者）。持续提交直至 **PR** 被接受。

	一旦 **PR** 被接受合并，删除该特性分支。（如果未发布前发现隐藏漏洞，另开`fix`分支进行修复）

> 开发时难以避免出现需要修复 bug 的情况（非 hotfix）。
> 这时如果 bug 的修复可以独立存在，不影响特性分支的话，
> 需另起**修复分支**`fix/name[#***]`，处理方案基本跟特性分支一样。

**总的来说**，开发人员主要接触 `develop` 分支、**特性分支**、**修复分支**。

#### 开发负责人

##### 测试网
1. 当产品进行部署时，将 `develop` 分支分出 `release` 分支（打tag），提交到测试网。`release` 分支冻结所有新特性的增加（特殊情况除外）。
2. 测试网发现的Bug，直接在`release`分支进行提交。
3. 待`release`分支稳定后，合并到`master`（tag: stable），将`master`分支发布到现网。
   也合并至 `develop` 分支，保持 `develop` 分支的稳定性。而后，删除该`release`分支。

##### 现网
1. 现网发现的bug，直接在 `master` 分出 `hotfix`（格式类似特性分支或者`hotfix/issue-***`） 分支，进行修复。
2. `master`分支稳定后，合并回`develop`分支，删除所有`hotfix`分支。

> 上述只是说明职责的划分，具体职责可以视情况按需分配。


### 备注
各类 IDE 或者 git 管理工具都提供了 git flow 的集成管理。

如： SourceTree, WebStorm, GitKraken, Sublime Text
