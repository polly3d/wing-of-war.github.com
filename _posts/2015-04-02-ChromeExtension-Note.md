---
layout: post
title: Chrome插件 开发的前端笔记
date: 2015-04-02
categories: web
---

总结一下Chrome Extension开发中学习到的东西

## HTML


**所有的javascript脚本全部都要写在js文件中**

原文引用：
[JavaScript and HTML must be in separate files: see our Content Security Policy documentation for details and explanation.](https://developer.chrome.com/extensions/contentSecurityPolicy)

**特别的：**

~~~html
<a href="javascript:" class="load">load</a>
~~~

虽然只是空指令，在href中引用javascript:是会触发Chrome 插件的安全协议的，可以换成

~~~html
<a href="#"></a>
~~~


## CSS

### 禁止选择文本的属性


引用 : [*http://stackoverflow.com/questions/826782/css-rule-to-disable-text-selection-highlighting?answertab=votes#tab-top*](*http://stackoverflow.com/questions/826782/css-rule-to-disable-text-selection-highlighting?answertab=votes#tab-top*)

~~~css
.noselect {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
~~~

###变换特效

~~~css
.todoForm .button:hover{
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#f1f3f5), color-stop(100%,#d5d7d9));
}
~~~

## Javascript

###JS脚本加载的开始

~~~js
document.addEventListener('DOMContentLoaded', function() {

});
~~~

>The DOMContentLoaded event is fired when the document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading (the load event can be used to detect a fully-loaded page).[https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded](https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded)

相当于页面载入方法，加载完HTML后，会这里开始加载并执行JS脚本

###获取网页元素时，判断元素否存在


~~~js
    var createButton = document.getElementById("createNew");
    if (createButton) {
        createButton.addEventListener("click", createTabSpace);
    } else {
        console.log('createButton not found');
    };
~~~


### jQuery对象与JS对象是有区别的

jQ对象可以用`$`来进行标记
~~~jq
var $input = $("#todoInput");
~~~

http://stackoverflow.com/questions/205853/why-would-a-javascript-variable-start-with-a-dollar-sign

http://www.cnblogs.com/zxjyuan/archive/2010/05/07/1729462.html

注意dom对象和jquery对象是有区别的，调用方法时要注意操作的是dom对象还是jquery对象。


**javascript对象是DOM？**



### JS数组清空

How to clean a array: http://stackoverflow.com/questions/1232040/empty-an-array-in-javascript
~~~js
tabSpaceItems = []
~~~


### ChromeExtension Storage 存储的小坑

set的第一个参数为字典，设置的时候创立对象进行键值对赋值，否则会产生`键名`作为`键值`的问题。

~~~js
var toDBData = {};
toDBData[TabSpaceDBKey] = tabSpaceItems;
chrome.storage.local.set(toDBData, function() {
// Notify that we saved.
console.log('Settings saved');
});
~~~
