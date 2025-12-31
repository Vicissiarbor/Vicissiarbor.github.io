---

title: "一阶非齐次线性微分方程通解"

date: 2025-12-26

categories: ["数学"]

tags: ["数学", "微积分","微分方程"]

draft: false

math: true  # 开启LaTeX支持

---


你电微积分教程中求解一阶非齐次线性方程

$$
\begin{equation}
\frac{\mathrm{d}y}{\mathrm{d}x}+P(x)y=Q(x)
\end{equation}
$$

的方法,称作**常数变易法**，是通过求对应的齐次线性方程

$$
\begin{equation*}
\frac{\mathrm{d}y}{\mathrm{d}x}+P(x)y=0
\end{equation*}
$$

的解$y=Ce^{-\int P(x)\mathrm{d}x}$，然后将其`中的任意常数C变为x的一个待定系数C(x)`，把$y=C(x)e^{-\int P(x)\mathrm{d}x}$代入方程$(1)$，可得

$$
\begin{equation*}
C'(x)e^{-\int P(x)\mathrm{d}x}-P(x)C(x)e^{-\int P(x)\mathrm{d}x}+P(x)C(x)e^{-\int P(x)\mathrm{d}x}=Q(x)
\end{equation*}
$$

整理化简之后可以求得$C(x)$，然后反代得到方程$(1)$的解.

鼠鼠今天预习到这里时候不太喜欢这种做法，总感觉直接把常数变成x的方程能难受，教材也没有解释为什么可以变（好吧我知道这不是工科生该考虑的），所以想到可能有别的解释或想法.

以下是鼠鼠的做法：
我们知道求导公式$(P(x)Q(x))'=P'(x)Q(x)+Q'(x)P(x)$，那么我们可以配凑一个函数$C(x)$使得$(1)$可以变成

$$
\begin{equation}
y'C(x)+P(x)C(x)y=Q(x)C(x),C(x)\not\equiv0
\end{equation}
$$

，其中$P(x)C(x)=C'(x)$，这样$(2)$的等式左边可以直接积分消掉$y'$.
接下来我们求解$C(x)$:

$$
P(x)=\frac{C'(x)}{C(x)}
$$

用换元法令$t=C(x)$对两边同时积分可以得到

$$
\int P(x)\mathrm{d}x=\ln |C(x)|
$$

$$
C(x)=\pm e^{\int P(x)\mathrm{d}x}
$$

我们**只取其一**，也就是只令$C(x)=e^{\int P(x)\mathrm{d}x}$或$C(x)=-e^{\int P(x)\mathrm{d}x}$就可以配凑出$(2)$所需的函数.

然后试着解一下课本例10的问题

$$
\cos x \cdot y'+y\sin x =1
$$

重写方程得到

$$
\begin{equation}
y'+y\tan x =\sec x
\end{equation}
$$

令

$$
C(x)=e^{\int \tan x\mathrm{d}x}=\sec x+C_1
$$

在上文的推导中，每一个C都满足原方程，则令$C_1=0$，在$(3)$等号两边同时乘$C(x)$得

$$
y'\sec x+y\sec x\tan x =\sec^2 x
$$

对两边求积分得

$$
y\sec x=\tan x+C
$$

即为

$$
y=\sin x+C\cos x
$$

与教程的解相同.

---

谈一下我为什么要写这个帖子。
首先我相信这个方法一定有别的同学是会的，也许也有不少老师讲过，也许在网络上也可以找到，毕竟是一个并不出众的解法，**当然也希望有别的同学能受益于我的贴子，我想肯定有** [mobcent_phiz=https://bbs.uestc.edu.cn/static/image/smiley/alu/23.gif]
但是没有人发在河畔上 [mobcent_phiz=https://bbs.uestc.edu.cn/static/image/smiley/alu/46.gif]

鼠鼠水河畔一个学期了，~删除自我感动内容~，一是想着能不能抛砖引玉吸引别的同学多写一些知识内容，二也是自己想进步，想写好帖子就得多写嘛 [mobcent_phiz=https://bbs.uestc.edu.cn/static/image/smiley/alu/44.gif]，三也是充当一个对自己的记录吧。

---

欢迎各位讨论交流，发表任何观见解[mobcent_phiz=https://bbs.uestc.edu.cn/static/image/smiley/alu/40.gif]