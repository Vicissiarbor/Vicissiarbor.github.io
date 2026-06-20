// post.js（完整版）
(function() {
    const params = new URLSearchParams(window.location.search);
    const page = params.get('page');
    const contentEl = document.getElementById('content');

    if (!page) {
        window.location.href = 'index.html';
        return;
    }

    const mdFile = `./posts/${page}.md`;

    fetch(mdFile)
        .then(res => {
            if (!res.ok) throw new Error(`找不到文章：${page}.md`);
            return res.text();
        })
        .then(markdown => {
            // 1. marked 解析
            let html = marked.parse(markdown);
            contentEl.innerHTML = html;

            // 2. highlight.js 高亮代码块
            if (typeof hljs !== 'undefined') {
                // 查找所有代码块并高亮
                document.querySelectorAll('.markdown-body pre code').forEach(block => {
                    hljs.highlightElement(block);
                });
            }

            // 3. KaTeX 渲染公式
            if (typeof renderMathInElement === 'function') {
                renderMathInElement(contentEl, {
                    delimiters: [
                        { left: '$$', right: '$$', display: true },
                        { left: '$', right: '$', display: false }
                    ],
                    throwOnError: false
                });
            }
        })
        .catch(err => {
            contentEl.innerHTML = `<p style="color:#c0392b;">❌ 加载失败：${err.message}</p>`;
        });
})();