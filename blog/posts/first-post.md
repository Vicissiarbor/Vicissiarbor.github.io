# 综合功能测试文档

本文档用于测试博客的所有Markdown功能。

---

## 1. 本地图片测试

**本地图片**（存放在 `images/logo/` 目录）：

![本地测试图片](../../images/logo/leaves.png)

*图1：本地图片测试*

---

## 2. 代码块测试

### Go语言代码
```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, Hugo!")
    // 计算平方
    result := square(5)
    fmt.Printf("5的平方是: %d\n", result)
}

func square(x int) int {
    return x * x
}
```

### Python代码
```Python
import numpy as np

def matrix_operations():
    # 创建矩阵
    a = np.array([[1, 2], [3, 4]])
    b = np.array([[5, 6], [7, 8]])
    
    # 矩阵乘法
    result = np.dot(a, b)
    return result

print(matrix_operations())
```
### JavaScript代码
```javascript
// 异步函数示例
async function fetchData() {
    try {
        const response = await fetch('https://api.github.com');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
}
```
## 3.LaTeX数学公式测试
### 行内公式
行内公式示例：$E = mc^2$，$\alpha = \beta + \gamma$，$\sum_{i=1}^{n} x_i = 1$

### 块级公式 - 积分
$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$

### 块级公式 - 矩阵
$$
\begin{pmatrix}
a & b & c \\\\
d & e & f \\\\
g & h & i
\end{pmatrix}
$$
$$
\begin{pmatrix}
x \\\\
y \\\\
z
\end{pmatrix}=
\begin{pmatrix}
ax + by + cz \\\\
dx + ey + fz \\\\
gx + hy + iz
\end{pmatrix}
$$

### 块级公式 - 分段函数
$$
f(x) = \begin{cases}
x^2 & \text{当 } x \geq 0 \text{ 时} \\\\
-x^2 & \text{当 } x < 0 \text{ 时} \\\\
0 & \text{当 } x = 0 \text{ 时}
\end{cases}
$$

### 复杂公式 - 微分方程
$$
\frac{\partial^2 u}{\partial t^2} = c^2 \nabla^2 u + f(x, t)
$$

## 4. 表格测试

| 语言         | 用途   | 示例               |
| ---------- | ---- | ---------------- |
| Go         | 后端开发 | `fmt.Println()`  |
| Python     | 数据科学 | `import numpy`   |
| JavaScript | 前端开发 | `async/await`    |
| LaTeX      | 数学排版 | $\sum_{i=1}^n$  |

## 5. 列表测试

### 无序列表
- 列表项1
- 列表项2
  - 嵌套项2.1
  - 嵌套项2.2
- 列表项3

### 有序列表
1. 第一步
2. 第二步
   1. 子步骤2.1
   2. 子步骤2.2
3. 第三步

## 6. 文本格式测试

**粗体文本**、*斜体文本*、***粗斜体文本***
`行内代码`

## 7. 引用块测试
>  这是一个引用块
> 
>  可以包含多行内容
> 
>  引用可以嵌套其他Markdown语法：**粗体**、*斜体*、`代码`

## 8. 链接测试
[我的博客](https://vicissiarbor.github.io/blog/index.html)