# 前置知识
## 垃圾回收机制
JavaScript 有着自动的垃圾回收机制，其原则是，如果某个对象是“可达的”，即程序运行到目前为止，我们有某种方法访问这个对象，那么它就会被保留在内存中。如果我们没有任何方式访问它，那么它就会被释放，详见[垃圾回收](https://zh.javascript.info/garbage-collection)。

Go 有着和 JavaScript 实现不同但是效果相同的垃圾回收机制。
## 循环与变量声明
在 JavaScript 中，我们有两种需要区分的声明变量的方法，分别是 `var` 和 `let`。其区别是，`var` 声明的变量总是全局变量，而 `let` 声明的变量的作用域仅限于代码块。

特别地，对于 `for` 循环来说，在其循环声明初始化语句中，用 `let` 声明相当于在每一个循环开头用 `let` 声明，也就是说，每一次循环的变量 `i` 都是作用域不同的、独立声明的变量。而由于解释器会将 `var` 提前声明，所以以 `var` 来初始化的循环，所有循环作用域使用的 `i` 是同一个。
我们可以通过以下方式，使 `let` 和 `var` 在循环中的表现相同：
```js
let i;
for( i = 0; i < 3; ++i){
    //do some things
}
```
在 Go 中，对于 go 1.22+ 版本编译器来说，我们的声明总是仅在作用域内生效的。
# 什么是闭包
## 定义
闭包（closure）是一个存在于现代语言中的概念，严格地说，闭包是可执行代码体与其所引用的外部变量的和。在本文中，我们探讨的语言仅限于 JavaScript 和 Go， 闭包可以被理解成是`函数+函数所引用的外部变量`

## 简单样例
下面是一个 JavaScript 代码：
```js
let functions = [];
for(let i = 0; i < 3; ++i){
    functions.push(function (){ console.log(i); });
}
functions.forEach(f => f());
```
控制台输出为
```
0
1
2
```
我们来解释一下这段代码，首先我们声明了一个数组 `functions` ，然后用 `for` 循环给 `functions` 添加了三个函数，我们把 `for` 循环拆开来看：
```js
{
    let i = 0;
    functions.push(function (){ console.log(i); });
}{
    let i = 1;
    functions.push(function (){ console.log(i); });
}{
    let i = 2;
    functions.push(function (){ console.log(i); });
}{
    let i = 3;
}
```
可以看到以下几点：
- 数组 `functions` 有三个函数，每个函数的内容都是输出自己作用域下的 `i` 的值
- 每个函数的作用域不同，作用域下的 `i` 值不同
- 对于 `let i = 0;`，`let i = 1;`，`let i = 2;`，由于它们可以被自己作用于下的输出函数访问，同时输出函数由于在数组 `functions` 中可以被访问，那么他们是可达的。

