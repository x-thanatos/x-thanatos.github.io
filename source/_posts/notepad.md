---
title: 学习笔记
---

# 学习笔记

1. 学习网页预加载方案[链接](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Preloading_content)

    eg:
    ```html
        <link rel="preload" href="bg-image-narrow.png" as="image" media="(max-width: 600px)">
    ```
   实验了一下，这里的media查询出的是设备像素尺寸，这里不知道是否能直接查询出逻辑尺寸？
