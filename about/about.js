// about.js - 固定加载 about.md，不依赖 URL 参数

(function() {
    const contentEl = document.getElementById('content');
    const mdFile = './about.md';

    fetch(mdFile)
        .then(res => {
            if (!res.ok) throw new Error('找不到 about.md');
            return res.text();
        })
        .then(markdown => {
            // 1. 先替换 Markdown 里的邮箱占位符
            //    约定在 .md 里写 {{EMAIL}} 作为占位
            const user = 'qqczfgxybk';
            const domain = 'petalmail.com';
            const email = user + '@' + domain;
            const markdownWithEmail = markdown.replace(/{{EMAIL}}/g, email);

            // 2. marked 解析
            let html = marked.parse(markdownWithEmail);

            contentEl.innerHTML = html;

            // 4. highlight.js 高亮
            if (typeof hljs !== 'undefined') {
                document.querySelectorAll('.markdown-body pre code').forEach(block => {
                    hljs.highlightElement(block);
                });
            }

            // 5. KaTeX 渲染公式
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