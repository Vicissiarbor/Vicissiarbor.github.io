// post.js - 文章加载逻辑（纯 script 标签，无 ES Module）
(function() {
    // 获取 URL 中的 page 参数
    const params = new URLSearchParams(window.location.search);
    const page = params.get('page');

    const contentEl = document.getElementById('content');

    if (!page) {
        contentEl.innerHTML = '<p style="color:#c0392b;">❌ 缺少文章标识（?page=xxx）</p>';
        return;
    }

    const mdFile = `./posts/${page}.md`;

    fetch(mdFile)
        .then(res => {
            if (!res.ok) throw new Error(`找不到文章：${page}.md`);
            return res.text();
        })
        .then(markdown => {
            // 1. marked 解析 Markdown（全局 marked 变量）
            let html = marked.parse(markdown);
            contentEl.innerHTML = html;

            // 2. KaTeX 自动渲染公式（全局 renderMathInElement 变量）
            if (typeof renderMathInElement === 'function') {
                renderMathInElement(contentEl, {
                    delimiters: [
                        { left: '$$', right: '$$', display: true },
                        { left: '$', right: '$', display: false }
                    ],
                    throwOnError: false
                });
            } else {
                console.warn('renderMathInElement 未加载，公式将保留为纯文本。');
            }
        })
        .catch(err => {
            contentEl.innerHTML = `<p style="color:#c0392b;">❌ 加载失败：${err.message}</p>`;
        });
})();