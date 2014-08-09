---
layout: post
title: Cocoapods进阶教程
categories: CH
---

作为第一篇正式技术性Blog，主要是为了记录最近研究的Cocoapods在项目中的使用（虽然也还不是特别懂：P）。

####文章说明：
* 可能会有点啰嗦，想详细点，个人比较健忘，重点会标明
* 有些问题我也没研究明白，但以可用为主
* 欢迎指教，Email: wing.of.war.1980th@gmail.com


Cocoapods的教程一般都是基本的入门（大约是如我下图所示的Step2)，官方文档感觉对于新手也不够友好（至少像我这样的半桶水研究了两个晚上），所以一半教学一半记录吧。

###此文的结构如下图步骤所示：

![Cocoapods article  structure](https://github.com/Wing-Of-War/wing-of-war.github.com/blob/master/_postsImages/Cocoapods%20article%20%20structure.jpg)




## 正文——像一个普通工程开始
* Step1: 创建一个新工程
* Step2: 通过CocoaPods导入几个常见框架（当然，说明项目中不会导入那么多，将以AFNetworking为例）
**Step 2.2**将说明如果卸载CocoaPods**（非常有用）**
* Step3: 创建一个个人类库（这将不会出现于Cocoapods的官方类库列表）。
**Step 3.1** 是通过Cocoapods创建的一个类库，保存与管理于Github上，在自己的项目中进行引用。便于团队的协作开发。
**Step 3.2**是在项目中建立一个私有类库，引用方式为相对路径，**好处是如果项目是私有的，将可以一起同项目保密和同步**
* Step4：工程需要进行扩展，在一个workspace下建立了多个target或者是导入了多个project，**重点是Podfile的配置**

之后本文的内容就会以上面的步骤的逐步进行，读者可以根据自身的需要来选择章节。

###几个关键点
* 多个项目工程使用同一个Cocoapods

## Step2 工程导入Cocoapods