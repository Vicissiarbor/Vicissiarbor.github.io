# 前置知识
## 垃圾回收机制
JavaScript 有着自动的垃圾回收机制，其原则是，如果某个对象是“可达的”，即程序运行到目前为止，我们有某种方法访问这个对象，那么它就会被保留在内存中。如果我们没有任何方式访问它，那么它就会被释放，详见[垃圾回收](https://zh.javascript.info/garbage-collection)。

Go 有着和 JavaScript 实现不同但是效果相同的垃圾回收机制。
## 循环与变量声明
在 JavaScript 中，我们有两种需要区分的声明变量的方法，分别是 `var` 和 `let`。其区别是，`var` 声明的变量总是函数域变量，而 `let` 声明的变量的作用域仅限于代码块。

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
- 每个函数的作用域不同，作用域下的 `i` 值不同。
- 对于 `let i = 0;`，`let i = 1;`，`let i = 2;`，由于它们可以被自己作用于下的输出函数访问，同时输出函数由于在数组 `functions` 中可以被访问，那么他们是**可达**的。

这时，每个输出函数与自己对应的 `i` 形成闭包，相应的 `i` 不会被回收，并在运行时调用对应的 `i` 的值。

## 经典陷阱
如果我们把刚刚的代码写成下面这样子：
```js
let functions = [];
for(var i = 0; i < 3; ++i){
    functions.push(function (){ console.log(i); });
}
functions.forEach(f => f());
```
我们会发现，控制台输出变成了：
```
3
3
3
```
这是由于，在 JavaScript 中，由 `var` 声明的变量会在函数域开始时就声明，所以上述代码其实是这个样子：
```js
var i
let functions = [];
i = 0;
functions.push(function (){ console.log(i); });
i = 1;
functions.push(function (){ console.log(i); });
i = 2;
functions.push(function (){ console.log(i); });
i = 3;
functions.forEach(f => f());
```
此时，每个输出函数都与同一个 `i` 形成闭包，所以控制台输出也是一样的。如果我们在循环后，函数调用前对 `i` 另赋它值，也会改变控制台输出。

# 闭包的作用
## 引例
```js
function module(){
    let count = 0;
    return{
        add : function(){count++;},
        getCount : () => count,
    }
}

let m = module();
m.add();
m.add();
console.log(m.getCount());
```
控制台输出为：
```
2
```
观察这个例子，我们在调用函数 `module()` 时，返回一个对象并赋值给 `m`，可以通过 `m.add()` 和 `m.getCount` 来访问和修改 `count`，因为上述两个函数与 `count` 形成闭包，但是我们没有其他方法直接访问和修改 `count`。

上述引例称之为**模块模式**，是 ES6 之前 JavaScript 常用的实现 private 和 public 的方式，虽然现在我们通常用不同文件来实现 private，并通过 export 和 import 实现 public，实际上仍然是闭包思想。

## 函数工厂
是指根据不同的参数返回具有特定功能的函数的方法，例如：
```js
function multiplyBy(factor) {
  return function(number) {
    return number * factor;
  };
}
const double = multiplyBy(2);
const triple = multiplyBy(3);
console.log(double(5));
console.log(triple(5));
```
可以看到，`double` 和 `triple` 各自形成了闭包，从而实现使两个函数起到不同作用的效果，上述代码的控制台输出为
```
10
15
```
# Golang
文章一开始就提到了 Go 语言，是因为我在学习 JavaScript 的时候并没有理解闭包，并且在学习 Go 语言的时候理解了闭包，由于我还没有学会 Go 语言，本文没有使用 Go 语言作为讲解示例，下面我们用 Go 重现上文 JavaScript 中的示例。
## 简单样例
```go
package main
import "fmt"

func main() {
    var funcs []func()
    for i := 0; i < 3; i++ {
        funcs = append(funcs, func() { fmt.Println(i) })
    }
    for _, f := range funcs {
        f()
    }
}
```
Go 1.22 起循环变量每次迭代都是新变量，因此输出 0 1 2 ，旧版本（<1.22）该代码会输出 3 3 3，与 JS 的 var 陷阱相同
## 模块模式
```go
package main
import "fmt"

func module()(func(), func()int){
    count := 0
    return func(){ count++ }, func()int{ return count }
}

func main(){
    add, getCount := module()
    add()
    add()
    fmt.Println(getCount())
}
```
## 函数工厂
```go
package main
import "fmt"

func multiplyBy(factor int) func(int) int {
    return func(n int) int {
        return n * factor
    }
}

func main() {
    double := multiplyBy(2)
    triple := multiplyBy(3)
    
    fmt.Println(double(5))
    fmt.Println(triple(5))
}
```