# 前置知识
## HTML and CSS
《Head First HTML 与 CSS（第二版）》ISBN:9787512344778

---

web 前端的知识，现在AI已经完全可以实现，先说说我为什么要学吧。我花了约两周的时间，学会了这本书的基础知识，起码能够自己画前端了。

学会之后开发效率确实比去年搭第一版博客，纯AI时候高很多，但我会将这个归功于今年在别的技能上的进步，而非了解前端知识。

学会两者使我能够向AI给出我的建议、更明确地表明需求，以及必要时候亲自上手微调。

我的[主页](https://vicissiarbor.github.io)的html和css是纯手搓的，在这个前提下，借助AI生成的博客页也很符合我的审美。如果网站不能长成自己的样子，那么要其何用呢？
## JavaScript
[现代 JavaScript 教程](https://zh.javascript.info/)，是中文版的。

本来打算继续学习

>《PROFESSIONAL JAVASCRIPT FOR WEB DEVELOPERS》
> 
> ISBNs: 9781394193219 (Paperback), 9781394193233 (ePDF), 9781394193226 (ePub)

由于个人规划，不打算深入学习JavaScript了。

---
JavaScript是继C语言之后，我深入接触的第二门语言，也是我深入接触的第一门现代语言，其灵活度给我的震撼还是非常大的。

js我学了一个多月吧，本来希望起码能学点现代架构，到时候失业了能混个前端开发工程师，结果发现连BOM和DOM都学不到。嗯这也正常，毕竟互联网也很博大精深，没有道理可以速成什么的。

起码我学会了对象和JSON，以后再看到JSON就不会莫名其妙了。

## git 与 GitHub
[Learn Git Branching](https://learngitbranching.js.org/?locale=zh_CN)，当然在 VSCode 下，仅靠鼠标点击就能实现对 GitHub 的 git push。

GitHub，在会用 git 之后，我就养成了用 VSCode 编写所有的无需编译的代码（html/css/js/md），顺便 git push 到 GitHub 上面的习惯，在 WSL 下使用 git 也很方便。
# 网站设计
## 设计哲学
由于网站的唯一作用是用作个人网站，我最大的愿望是希望网站是自己的，所以除了渲染 .md 相关（marked、katex、highlight）外，没有使用三方库，网站本身也不是现代前端架构，而是简单的 HTML/CSS 实现。
## 渲染markdown
这个要依托`lib/`中的三方库来实现，所有的博客内容都是基于`blog/post.html`，经过 BOM/DOM 读取 markdown 渲染为网页。
## 维护文章列表对象
文章列表对象是博客主页文章列表的来源，分类页也是基于此渲染。我直接在`blog/list.js`里声明对象，并通过维护JS对象维护文章列表。


# 网站架构
在主目录下：
- index.html：作为 GitHub Page 的入口，也是网站的主页面
- css/：主要CSS文件
  - index.css：作为网站的主样式，包含位置与色彩，其余所有CSS文件均基于此文件
  - blog.css：作为博客页的个性样式，通过覆盖`css/index.css`来作用
- about/：关于部分
   - about.html：演示页，仅包含导航与尾注。
   - about.md：真正的内容。
   - about.js：通过`about/about.md`渲染about.html。
   - acknowledgements.html：开源页，直接维护 html 文档，无需渲染。
- blog/：博客子站
   - libs/：包含 katex、marked 等开源库。
   - posts/：该目录下存放博客正文 .md 文件
   - index.html：博客主页面，需渲染文章列表。
   - list.js：包含文章列表对象和渲染函数。
   - post.html：博客正文页，需渲染。
   - post.css：博客正文页样式，主要为了支持代码块高亮，在引用`css/index.css` `css/blog.css`的前提下。
   - post.js：将 .md 文件渲染为 html 文档。
   - category.html：分类页面，需渲染。
   - category.js：根据`blogs/list.js`里的列表对象按分类渲染。
- links/：友链部分
  - link.css：友链专属样式
  - link.html：无需渲染，直接维护。
- images/：图片
- fonts：字体

其中，`index.html`和`css/index.css`是人工代码，其余代码基于这两个文件，由人工智能生成。

网站全部基于前端 HTML/CSS/JavaScript 代码实现，无任何后端/脚本需求，所有渲染由浏览器端完成。