---
layout: post  
title: Storyboard和Code加载Xib自定义View  
date: 2015-06-28  
categories: iOS  
---

# 使用Storyboard和Code加载Xib定义的UIView  

之前一直使用代码来编写UI，但随着iOS开发中StoryBoard，Autolayout逐步完善，及未来iOS中分屏等功能的增加，迫切感项目开发中UI使用混编的重要性。

本文是对使用Xib来编写的自定义UIView的一个小小总结，将以一个小项目的形式来进行讲解。

目的：
1. 通过StoryBoard加载支持AutoLayout的自定义UIView  
2. 通过Code加载支持AutoLayout的自定义UIView  
3. 合理自定义Custom UIView的SubView  

##1.项目结构

创建了一个`Albums`的项目，添加了`AlbumView`继承于`UIView`的类，用于Custom UIView的演示，同时导入`2.jpg`,`3.jpg`,`4.jpg`用作于Album的封面。

![Alt text](https://raw.githubusercontent.com/Wing-Of-War/wing-of-war.github.com/master/_postsImages/2015/1/1.png)

##2.Xib绘制Custom UI

构建你需要的自定义UI。本文简单起见，只添加了一个`UIImage`，和一个`UILabel`，
* 通过`AutoLayout`来控制`ImageView`的大小，与`ContainerView`（即View）保持上左中8px的边距，下底保持22px的边距（给`UILabel`留下足够的位置）
* UILabel保持与ImageView的中线对齐与顶端0px的距离
* `View`在`Simulated Metrics`中的`Size`设置为`Freeform`，`Size inspector`中设置的宽为128，高设置为160

![Alt text](https://raw.githubusercontent.com/Wing-Of-War/wing-of-war.github.com/master/_postsImages/2015/1/2.png)


##3.Xib与Class的连接

1 . File's Owner需要与`AlbumView`进行连接，即在代码中进行加载时，View的控制对象，用于构建Class File与Xib的连接  

![Alt text](https://raw.githubusercontent.com/Wing-Of-War/wing-of-war.github.com/master/_postsImages/2015/1/3.png)

2 . 连接完File's Owner后，连接Xib中`SubView`与`Class`中对应的实例（可以不连接固定不变的对象）  

> * **`View`这个实例就是使用UIView对象进行加载，直接从`1`处拖到代码处，建立一个Strong类型的实例**  
>* `2`处则保持UIView的基本类型即可（我之前在这里犯了好多次错误，会将其填写为AlbumView，将会造成加载的死循环）
>* 其它的控件拖到interface中建立连接即可

![Alt text](https://raw.githubusercontent.com/Wing-Of-War/wing-of-war.github.com/master/_postsImages/2015/1/4.png)

3 . 当然，还需要在class中实现`- (instancetype)initWithCoder:(NSCoder *)aDecoder`方法，进行Xib的加载。Owner即为通过File's Owner建立链接

    - (instancetype)initWithCoder:(NSCoder *)aDecoder {
      if (self = [super initWithCoder:aDecoder]) {
        [[NSBundle mainBundle]loadNibNamed:@"AlbumView" owner:self options:nil];
        [self addSubview:self.view];
      }
      return self;
    }


##4. 通过Storyboard进行加载

* `album1`通过调整，使用得View的Size与Xib中的一致为`W128`，`H160`.
* `album2`和`album3`为随机拉扯大小，模拟自动布局或者在不同使用场景不同尺寸下`AlumbView`的加载表现情况
* `album1,2,3`分别添加了不同的底色用于区别（在开发中，将通过代码根据实际情况进行调整）

![Alt text](https://raw.githubusercontent.com/Wing-Of-War/wing-of-war.github.com/master/_postsImages/2015/1/5.png)

运行模拟器

![Alt text](https://raw.githubusercontent.com/Wing-Of-War/wing-of-war.github.com/master/_postsImages/2015/1/6.png)

除了`album1`，结果并非我们所希望。

分析：
模拟器中，红块，灰块为AlumbView本身，而蓝底部分则为我们在Xib中绘制定义的部分。所以在我们的`- (id)initWithCoder:(NSCoder *)aDecoder`方法中还缺上这样一行代码。

    self.view.frame = CGRectMake(0, 0, self.frame.size.width, self.frame.size.height);

将`AlbumView`尺寸传给Xib中的View，再次启动模拟器：

**坚屏**：  

![Alt text](https://raw.githubusercontent.com/Wing-Of-War/wing-of-war.github.com/master/_postsImages/2015/1/7.png)  

**横屏**：
![Alt text](https://raw.githubusercontent.com/Wing-Of-War/wing-of-war.github.com/master/_postsImages/2015/1/8.png)

两个都非常正常，`AlbumView`的`subviews`也根据`autolayout`很好的进行调整


## 5.通过Code进行加载

1 . 通过StoryBoard加载的自定义UIView需要实现`- (instancetype)initWithCoder:(NSCoder *)aDecoder`，而通过代码实现的UIView则需要实现`- (instancetype)initWithFrame:(CGRect)frame`或者`- (instancetype)init`方法。但后者将只能实现固定大小的自定义UIView的加载，所以不继续讨论。
2 . 在AlbumView.m文件中，添加以下代码：

~~~
- (instancetype)initWithFrame:(CGRect)frame {
  self = [super initWithFrame:frame];
  if (self) {
  //1
    [[NSBundle mainBundle]loadNibNamed:@"AlbumView" owner:self options:nil];
  //2
    self.view.frame = CGRectMake(0, 0, self.frame.size.width, self.frame.size.height);
    [self addSubview:self.view];
  }
  return self;
}
~~~

代码1处加载`Xib`文件，与使用`StoryBoard`加载一样
代码2处可见通过代码加载`AlbumView`时，`AlbumView`的尺寸是通过`frame`传入，而`Storyboard`中`AlbumView`在运行`initWithCoder`已经有由IB传入的尺寸
>如果不加代码2处，AlbumView的Frame将为（0，0）尺寸的UIView进行加载，但AlbumView中的子View将会加载Xib中默认的UI布局。并且由于AlbumView的尺寸为CGRectZero，**将不能对用户的操作进行响应**。

3 .  在ViewController的ViewDidLoa方法后面添加如下代码进行加载同样位置的AlbumView

~~~
  self.album1.hidden = true;
  self.album2.hidden = true;
  self.album3.hidden = true;
  
  AlbumView* album4 = [[AlbumView alloc]initWithFrame:self.album1.frame];
  AlbumView* album5 = [[AlbumView alloc]initWithFrame:self.album2.frame];
  AlbumView* album6 = [[AlbumView alloc]initWithFrame:self.album3.frame];
  
  [album4.imageView setImage:[UIImage imageNamed:@"2.jpg"]];
  [album5.imageView setImage:[UIImage imageNamed:@"3.jpg"]];
  [album6.imageView setImage:[UIImage imageNamed:@"4.jpg"]];
  [album4.label setText:@"初音ミク"];
  [album5.label setText:@"初音ミク"];
  [album6.label setText:@"初音ミク"];

  
  [self.view addSubview:album4];
  [self.view addSubview:album5];
  [self.view addSubview:album6];
~~~

将得到与StroyBoard加载一样的效果

## 6. CustomView中SubView的修饰与圆角阴影生成

在`AlbumView.m`的方法中添加以下方法


~~~
- (void)setupCustomUIItem {
  //1.
  self.view.layer.cornerRadius = 6.0;
  //self.view.layer.borderWidth = 5.0;
  //self.view.layer.borderColor = [UIColor grayColor].CGColor;
  //2.
  self.layer.shadowOpacity = 0.5f;
  self.layer.shadowOffset = CGSizeMake(2.0f, 5.0f);
  self.layer.shadowRadius = 5.0f;
  //3.
  self.view.layer.masksToBounds = YES;
  //4.
  self.backgroundColor = [UIColor clearColor];
}
~~~

1. 修改的为Xib布局中的`view`，将其修改为圆角矩形
2. 修改的为实际上的`AlbumView`，为其添加阴影
3. 将以上两者的图层进行合并
4. 在`StoryBoard`中将`AlbumView`的背景色设置为不同颜色进行区别，在此处进行清除或者自定义

最后在两个不同的init的方法末尾调用此方法，运行模拟器：

![Alt text](https://raw.githubusercontent.com/Wing-Of-War/wing-of-war.github.com/master/_postsImages/2015/1/9.png)



## 7. 参考

[Custom UIView from Xib file in Xcode 5 for Reusable Components - Part 1](https://www.youtube.com/watch?v=xP7YvdlnHfA)

[Custom UIView from Xib file Loaded Programmatically in Xcode 5 - Part 2](https://www.youtube.com/watch?v=5ibVlOx2o7I)