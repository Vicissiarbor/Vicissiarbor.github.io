// blog/list.js - 博客首页文章列表

// ============================================================
// 1. 文章数据（手动维护，按需增删）
// ============================================================
const posts = [
    {
        id:'closure',
        title: '闭包',
        date: '2026-07-10',
        author: '交讓',
        tags: ["闭包","JavaScript","Go"],
        category: '编程',
    },
    {
        id:'makeweb',
        title: '介绍我的网站是如何搭建的',
        date: '2026-06-21',
        author: '交讓',
        tags: ["前端"],
        category: '工程',
    },
    {
        id:'toInSCSE',
        title:'2026年计算机转专业题目',
        date: '2026-04-09',
        author: '交讓',
        tags: ["C语言","转专业","码图"],
        category: '编程',
        summary: '祝同学们取得理想的结果',
    },
    {
        id: 'dfuction',
        title: '一阶非齐次线性微分方程通解',
        date: '2025-12-26',
        author: '交讓',
        tags: ["数学", "微积分","微分方程"],
        category: '数学',
    },
    {
        id: 'relook_of_senior_high',
        title: '高中回忆录',
        date: '2025-12-01',
        author: '交讓',
        tags: ['随笔'],
        category: '文辞',
        summary: '我终于有空，也有精力，也有动力，也有内容，来写下这篇文章了',
    },
    {
        id: 'first-post',           // 对应 post.html?page=first-post
        title: '功能综合测试',
        date: '2025-11-30',
        author: '交讓',
        tags: ['test'],
        category: '技术',
        // 可选：摘要 (summary) 可留空，则自动取正文前几个字
        summary: '本文测试了Markdown、代码块、LaTeX公式等所有功能。',
    },
];

// ============================================================
// 2. 渲染函数
// ============================================================
function renderPostList() {
    const container = document.getElementById('post-list');
    if (!container) return;

    // 清空容器（保留可能存在的“正在加载”提示）
    container.innerHTML = '';

    posts.forEach(post => {
        // 创建卡片 div
        const card = document.createElement('div');
        card.className = 'card';

        // 标题（链接）
        const titleLink = document.createElement('a');
        titleLink.href = `post.html?page=${post.id}`;
        titleLink.textContent = post.title;
        titleLink.style.fontSize = '1.2em';
        titleLink.style.fontWeight = 'bold';
        titleLink.style.display = 'block';
        titleLink.style.marginBottom = '8px';

        // 元信息（日期、作者）
        const meta = document.createElement('div');
        meta.style.fontSize = '0.8em';
        meta.style.color = '#4a6a8a';
        meta.style.marginBottom = '6px';
        meta.textContent = `${post.date} · ${post.author}`;

        // 标签
        const tagContainer = document.createElement('div');
        tagContainer.style.marginBottom = '6px';
        post.tags.forEach(tag => {
            const tagSpan = document.createElement('span');
            tagSpan.textContent = tag;
            tagSpan.style.display = 'inline-block';
            tagSpan.style.padding = '2px 10px';
            tagSpan.style.margin = '0 4px 4px 0';
            tagSpan.style.fontSize = '0.7em';
            tagSpan.style.borderRadius = '12px';
            tagSpan.style.background = 'rgba(0, 136, 255, 0.12)';
            tagSpan.style.color = '#0088ff';
            tagContainer.appendChild(tagSpan);
        });

        // 摘要（如果有）
        if (post.summary) {
            const summaryP = document.createElement('p');
            summaryP.style.fontSize = '0.9em';
            summaryP.style.color = '#2a4a5a';
            summaryP.style.margin = '4px 0 0 0';
            summaryP.textContent = post.summary;
            card.appendChild(summaryP);
        }

        // 组装卡片
        card.appendChild(titleLink);
        card.appendChild(meta);
        card.appendChild(tagContainer);
        container.appendChild(card);
    });
}

// ============================================================
// 3. 页面加载完成后执行
// ============================================================
document.addEventListener('DOMContentLoaded', renderPostList);