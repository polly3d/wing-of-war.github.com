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

![Cocoapods article  structure](https://raw.githubusercontent.com/Wing-Of-War/wing-of-war.github.com/master/_postsImages/Cocoapods%20article%20%20structure.jpg)




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
* 一个很好的[安装教程](http://code4app.com/article/cocoapods-install-usage)
* 多个项目工程使用同一个Cocoapods的Podfile的编写
* *.podspec文件的编写
* 使用CocoaPoads对自身项目中的私有类库进行管理
* 从Github导入个人类库
* [Demo项目](https://github.com/Wing-Of-War/CocoaPods_Demo)，[Demo框架](https://github.com/Wing-Of-War/MyPrivateLibs)


## Step2 工程导入CocoaPoads

虽然是进阶教程，但我还是把基本的操作和常用的方法写一下，如果大家有更简便的方法可以我指点一下。

在桌面上，我新建了一个文件夹为将来的整体项目
~~~
mkdir CocoaPods_Demo
~~~
在此文件夹下，我建立了一个iPhone项目，命名为MyProject
进入到此项目下，pod初始化。
~~~
cd MyProject
pod init
~~~
或者直接在此文件夹下创建一个podfile文件，编辑podfile的内容如下，添加一个AFNetworking框架（非常好的类库示例，研究了很多）:
~~~
# Uncomment this line to define a global platform for your project
# platform :ios, "6.0"

target "MyProject" do
pod "AFNetworking" 
end


target "MyProjectTests" do

end
~~~
打开MyProject，此后使用的将是MyProject.xcworkspace这种以.xcworkspace为后缀的工作空间。在ViewController中我们可以尝试导入一下<AFNetworking/...>，如下图所示提示相关的头文件，则导入的框架AFNetworking工作正常。
![AFNetworking import](http://macdown.uranusjr.com/static/base/img/logo-160.png)

***[补充:pod install和pod update命令的区别](https://github.com/CocoaPods/guides.cocoapods.org/issues/14)***
* pod install作为初次安装
* pod update为变更podfile和导入类库升级时使用


### Step2.1 类库移除&CocoaPods卸载

####类库移除

* 在podfile文件中移除相应的类库引入行，然后执行
~~~
pod install
~~~
将自动移除多余的框架

####CocoaPods卸载

转自[《从工程中删除Cocoapods》](http://blog.csdn.net/freedom2028/article/details/10244819):
* 删除工程文件夹下的Podfile、Podfile.lock及Pods文件夹
* 删除xcworkspace文件
* ***使用xcodeproj文件打开工程，删除Frameworks组下的Pods.xcconfig及libPods.a引用***
* 在工程设置中的Build Phases下删除Check Pods Manifest.lock及Copy Pods Resources
![CocoaPods library create](http://img.blog.csdn.net/20130824010939328?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvZnJlZWRvbTIwMjg=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

以上几点中，第三点中删除xcconfig应该是核心点，它是Cocoapods链接各个类库的关键。经常有可能Podfile写错后，生成多个xcconfig造成工程的头文件引入编译错误。此时可以先用此方法进行一次卸载后，重新初始化Cocoapods。

## Step3 创建个人类库

创建类库的pod命令
~~~
pod lib create "MyPrivateLibs"
~~~


![CocoaPods library create](http://macdown.uranusjr.com/static/base/img/logo-160.png)

几个选项默认就好。
然后打开这个library项目

### Step3.1 导入Github类库

### Step3.2 导入本地类库

## Step4 工作空间使用CocoaPoads