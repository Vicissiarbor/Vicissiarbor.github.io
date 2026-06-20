// about.js - 固定加载 about.md，不依赖 URL 参数

(function() {
    const contentEl = document.getElementById('content');
    const mdFile = './about.md';   // 固定加载同目录下的 about.md

    fetch(mdFile)
        .then(res => {
            if (!res.ok) throw new Error('找不到 about.md');
            return res.text();
        })
        .then(markdown => {
            // 1. marked 解析
            let html = marked.parse(markdown);
            contentEl.innerHTML = html;

            // 2. highlight.js 高亮
            if (typeof hljs !== 'undefined') {
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