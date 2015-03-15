---
layout: post
title: as!操作符（译）
date: 2015-03-11
categories: ios
---

### as!操作符

PS1:试译一些Swift的相关内容

PS2:Swift官网微博原文  [The as! Operator](https://developer.apple.com/swift/blog/?id=23)


在Swift 1.2版之前，根据表达式的类型和被转换表达式的类型，`as`操作符可以用于两种不同的转换

*  **保守转换**，这种是可以通过Swift的编辑器进行检查校正。举个例子，向上类型转换（将类转换为其父类）或者指定字面量表达式（`1 as Float`）

* **强制转换**，这种类型转换的安全性不能得到Swift编辑器的保证，可能产生在运行时的陷阱。比如类型的向下转换，将父类转换为子类。

在Swift 1.2版中，将强制转换和保守转换分成了两种不同的操作符。保守转换继续使用`as`操作符，但强制转换使用`as!`操作符。`!`用于指示转换可能失败。这样一来，你一眼就可以发现它的转换可能会导致程序崩溃。


下面的例子展示了这种变化：

~~~swift
class Animal {}
class Dog: Animal {}

let a: Animal = Dog()
a as Dog		// 将提示错"'Animal is not convertible to 'Dog'; did you mean to use 'as!' to force downcast?"
a as! Dog		// 这种强制向下转换是允许的

let d = Dog()
d as Animal		// 向上转换是允许的
~~~

注意对比`!`和`?`这两种不同后缀的表达式和`as!`与`as?`这两种转换操作符：

~~~swift
class Animal {}

class Cat: Animal {}

class Dog: Animal {
	var name = "Spot"
}

let dog: Dog? = nil
dog?.name		// 等于nil
dog!.name		// 引发运行时错误

let animal: Animal = Cat()
animal as? Dog	// 等于nil
animal as! Dog	// 引发运行时错误
~~~

最简单记住这些操作符的方法可能是: `!`意味着这可能是个陷阱， 而`?` 意味着这可能是空值