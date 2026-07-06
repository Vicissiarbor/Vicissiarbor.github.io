// article.js - 根据类型渲染文章
(function() {
    // 获取 URL 参数
    const params = new URLSearchParams(window.location.search);
    const page = params.get('page');
    const contentEl = document.getElementById('content');

    if (!page) {
        contentEl.innerHTML = '<p style="color:#c0392b;">❌ 未指定文章。</p>';
        return;
    }

    // 从 list.js 中查找文章元数据
    let articleMeta = null;
    if (typeof articles !== 'undefined') {
        articleMeta = articles.find(a => a.id === page);
    }
    if (!articleMeta) {
        contentEl.innerHTML = `<p style="color:#c0392b;">❌ 未找到文章“${page}”。</p>`;
        return;
    }

    const mdFile = `./articles/${page}.md`;

    fetch(mdFile)
        .then(res => {
            if (!res.ok) throw new Error(`找不到 Markdown 文件：${page}.md`);
            return res.text();
        })
        .then(markdown => {
            // 1. 使用 marked 解析
            let html = marked.parse(markdown);
            contentEl.innerHTML = html;

            // 2. 根据类型进行后处理
            const type = articleMeta.type;
            if (type === 'works') {
                applyWorksStyles(contentEl);
            } else if (type === 'notes') {
                applyNotesStyles(contentEl);
            } else if (type === 'critique' || type === 'biography') {
                applyCritiqueStyles(contentEl);
            }

            // 3. 在文章顶部显示元信息（可选）
            const metaDiv = document.createElement('div');
            metaDiv.className = 'article-meta';
            metaDiv.innerHTML = `
                <span class="meta-title">${articleMeta.title}</span>
                <span class="meta-info">${articleMeta.author || ''}</span>
            `;
            contentEl.prepend(metaDiv);
            requestAnimationFrame(() => {
                // 确保容器宽度由内容撑开（防止父级限制）
                contentEl.style.display = 'inline-block';
                contentEl.style.width = 'auto';
                contentEl.style.maxWidth = 'none';
                // 等待布局完成后滚动
                requestAnimationFrame(() => {
                    metaDiv.scrollIntoView({ block: 'start', inline: 'end', behavior: 'auto' });
                });
            });
        })
        .catch(err => {
            contentEl.innerHTML = `<p style="color:#c0392b;">❌ 加载失败：${err.message}</p>`;
        });

    // ========== 后处理函数 ==========

    // 个人作品：竖排，序用楷体，正文正常
    function applyWorksStyles(container) {
        // 整体竖排
        container.style.writingMode = 'vertical-rl';
        container.style.textOrientation = 'upright';
        container.style.fontSize = '1.8em';
        container.style.lineHeight = '1.8';
        container.style.padding = '20px 40px';
        // 不需要缩进
        container.style.textIndent = '0';

        // 查找标题为 "序" 的二级标题，将其后续段落设为楷体
        const headings = container.querySelectorAll('h2');
        headings.forEach(h2 => {
            if (h2.textContent.trim() === '序') {
                h2.classList.add('preface-heading');
                // 给后续兄弟元素（直到下一个 h2）加类
                let next = h2.nextElementSibling;
                while (next && next.tagName !== 'H2') {
                    if (next.tagName === 'P' || next.tagName === 'DIV') {
                        next.classList.add('preface-text');
                    }
                    next = next.nextElementSibling;
                }
            }
            if (h2.textContent.trim() === '正文') {
                h2.classList.add('body-heading');
                let next = h2.nextElementSibling;
                while (next && next.tagName !== 'H2') {
                    if (next.tagName === 'P' || next.tagName === 'DIV') {
                        next.classList.add('body-text');
                    }
                    next = next.nextElementSibling;
                }
            }
            
        });
        // 如果没有任何 h2，则全部视为正文
        if (container.querySelectorAll('h2').length === 0) {
            container.querySelectorAll('p').forEach(p => p.classList.add('body-text'));
        }
        

    }

    // 阅读笔记：横排，区分原文/注释/感悟
    function applyNotesStyles(container) {
        // 整体横排
        container.style.writingMode = 'horizontal-tb';
        container.style.fontSize = '1.2em';
        container.style.padding = '20px 30px';
        container.style.textAlign = 'justify';

        // 给段落设置缩进两格（2em）
        const paragraphs = container.querySelectorAll('p');
        paragraphs.forEach(p => {
            p.style.textIndent = '2em';
        });

        // 根据三级标题划分区块
        const h3s = container.querySelectorAll('h3');
        h3s.forEach(h3 => {
            const text = h3.textContent.trim();
            let className = '';
            if (text === '原文') className = 'note-original';
            else if (text === '笔记') className = 'note-reflection';
            else return;

            h3.classList.add(className + '-heading');
            let next = h3.nextElementSibling;
            while (next && next.tagName !== 'H3' && next.tagName !== 'H2') {
                if (next.tagName === 'P' || next.tagName === 'DIV') {
                    next.classList.add(className);
                }
                next = next.nextElementSibling;
            }
        });
    }

    // 文学评论 & 人物生平：横排，缩进两格，美化引用块
    function applyCritiqueStyles(container) {
        container.style.writingMode = 'horizontal-tb';
        container.style.fontSize = '1.2em';
        container.style.padding = '20px 30px';
        container.style.textAlign = 'justify';

        const paragraphs = container.querySelectorAll('p');
        paragraphs.forEach(p => {
            p.style.textIndent = '2em';
            p.style.margin = '0.5em 0';
            p.classList.add('critique-text'); 
        });

        // 美化 blockquote（引用原文）
        const bqs = container.querySelectorAll('blockquote');
        bqs.forEach(bq => {
            bq.style.borderLeft = '4px solid #7a5a3a';
            bq.style.backgroundColor = '#f5ede4';
            bq.style.padding = '0.5em 1em';
            bq.style.margin = '1em 0';
            bq.style.borderRadius = '0 6px 6px 0';
        });
    }

})();