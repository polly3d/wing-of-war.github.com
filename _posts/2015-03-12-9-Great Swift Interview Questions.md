---
layout: post
title: 9个伟大的Swift面试题(译)
date: 2015-03-12
categories: other
---

# 9个伟大的Swift面试题(译)

### 原文:  [9 Great Swift Interview Questions](http://www.toptal.com/swift/interview-questions)

<!--结构体和枚举是值类型 类是引用类型 reference types-->

## 1.

Swift定义了`AnyObject`类型用于引用类型实例的别名，而实际上是一个协议。

考虑下面的代码：

~~~swift
var array = [AnyObject]()
struct Test {}
array.append(Test())
~~~
这段代码将会提示编译错误，并提示如下信息：  

`Type 'Test' does not conform to protocol 'AnyObject'`

这个错误明显是因为`struct结构体`是一个值，而不是引用类型，这种类型也不会实现`AnyObject`的协议。

所以再看看下面的代码：

~~~swift
var array = [AnyObject]()
array.append(1)
array.append(2.0)
array.append("3")
array.append([4, 5, 6])
array.append([7: "7", 8: "8"])

struct Test {}
array.append(Test())
~~~

这个数组中各种值的类型有`int`、`double`、`string`、`array`和`dictionary`。所有的类型都是值类型，而不是引用类型，但都并没有报错。为什么？




## 2
考虑下面的代码：

~~~swift
let op1: Int = 1
let op2: UInt = 2
let op3: Double = 3.34
var result = op1 + op2 + op3
~~~

请问哪儿有错？如何更正？

## 3
考虑下面的代码：

~~~swift
var defaults = NSUserDefaults.standardUserDefaults()
var userPref = defaults.stringForKey("userPref")!
printString(userPref)

func printString(string: String) {
    println(string)
}

~~~

请问哪儿有Bug，如何引起的，正确的解决方法是什么？

## 4

下面一小段代码将产生一个编译错误：

~~~
struct IntStack {
  var items = [Int]()
  func add(x: Int) {
    items.append(x) // Compile time error here.
  }
}
~~~

解释一下出错的原因，并修改。

## 5

在Swift中的枚举，原始值和关联值有什么区别？

## 6

Swift中`字符串 String`是一种结构体类型，但它并没有提供数量或者长度来计算字符串中字符的个数。但是提供了一个通用的`countElements<T>()`方法来计算长度。当查询的`字符串String`时，请问`countElements`方法的时间复杂度是多少？

O(1)
O(n)

为什么？

译者提示：不同的 Unicode 字符以及相同 Unicode 字符的不同表示方式可能需要不同数量的内存空间来存储。所以 Swift 中的字符在一个字符串中并不一定占用相同的内存空间。因此字符串的长度不得不通过迭代字符串中每一个字符的长度来进行计算。

## 7

阅读下面的代码:

~~~swift
struct Planet {
    var name: String
    var distanceFromSun: Double
}

let planets = [
    Planet(name: "Mercury", distanceFromSun: 0.387),
    Planet(name: "Venus", distanceFromSun: 0.722),
    Planet(name: "Earth", distanceFromSun: 1.0),
    Planet(name: "Mars", distanceFromSun: 1.52),
    Planet(name: "Jupiter", distanceFromSun: 5.20),
    Planet(name: "Saturn", distanceFromSun: 9.58),
    Planet(name: "Uranus", distanceFromSun: 19.2),
    Planet(name: "Neptune", distanceFromSun: 30.1)
]

let result1 = planets.map { $0.name }
let result2 = planets.reduce(0) { $0 + $1.distanceFromSun }
~~~

`result1`和`result2`常量的类型、结果分别是什么，解释一下

## 8

阅读下面的代码:

~~~swift
var array1 = [1, 2, 3, 4, 5]
var array2 = array1
array2.append(6)
var len = array1.count
~~~

`len`的值是多少，为什么?

## 9

阅读下面的代码:

~~~swift 
class Master {
    lazy var detail: Detail = Detail(master: self)
    
    init() {
        println("Master init")
    }
    
    deinit {
        println("Master deinit")
    }
}

class Detail {
    var master: Master
    
    init(master: Master) {
        println("Detail init")
        self.master = master
    }
    
    deinit {
        println("Detail deinit")
    }
}

func createMaster() {
    var master: Master = Master()
    var detail = master.detail
}
    
createMaster()
~~~ 

请指出代码中的错误，并更正。
