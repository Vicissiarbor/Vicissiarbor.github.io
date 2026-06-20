// post.js - 文章详情页逻辑 (ES Module)
import { marked } from 'marked';
import markedKatex from 'marked-katex-extension';

// 配置 marked 使用 KaTeX 插件
marked.use(markedKatex({ throwOnError: false }));

// 获取 URL 中的 page 参数
const params = new URLSearchParams(window.location.search);
const page = params.get('page');

// 如果缺少 page 参数，显示错误信息
if (!page) {
    document.getElementById('content').innerHTML =
        '<p style="color:#c0392b;">❌ 缺少文章标识（?page=xxx）</p>';
    throw new Error('Missing "page" parameter');
}

const mdFile = `./posts/${page}.md`;  // 文章路径

// 加载并渲染
fetch(mdFile)
    .then(res => {
        if (!res.ok) throw new Error(`找不到文章：${page}.md`);
        return res.text();
    })
    .then(markdown => {
        const html = marked.parse(markdown);
        document.getElementById('content').innerHTML = html;
    })
    .catch(err => {
        document.getElementById('content').innerHTML =
            `<p style="color:#c0392b;">❌ 加载失败：${err.message}</p>`;
    });