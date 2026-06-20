// blog/category.js - 分类页：按 category 分组展示文章

// ============================================================
// 1. 工具函数：从 posts 中提取所有分类
// ============================================================
function getCategories() {
    const cats = posts.map(p => p.category).filter(Boolean);
    return [...new Set(cats)];   // 去重
}

// ============================================================
// 2. 按分类分组
// ============================================================
function groupPostsByCategory() {
    const groups = {};
    posts.forEach(post => {
        const cat = post.category || '未分类';
        if (!groups[cat]) groups[cat] = [];
        groups[cat].push(post);
    });
    return groups;
}

// ============================================================
// 3. 渲染分类页
// ============================================================
function renderCategoryPage() {
    const container = document.getElementById('category-container');
    if (!container) return;

    const groups = groupPostsByCategory();
    const categoryNames = Object.keys(groups).sort(); // 按字母/拼音排序

    if (categoryNames.length === 0) {
        container.innerHTML = '<p style="color:#6a737d;">📭 暂无分类</p>';
        return;
    }

    // 清空容器
    container.innerHTML = '';

    // 遍历每个分类
    categoryNames.forEach(cat => {
        const articles = groups[cat];
        // 按日期降序排列
        articles.sort((a, b) => new Date(b.date) - new Date(a.date));

        // 分类标题
        const catHeader = document.createElement('h2');
        catHeader.textContent = cat;
        catHeader.style.margin = '1.5em 0 0.5em 0';
        catHeader.style.paddingBottom = '0.3em';
        catHeader.style.borderBottom = '2px solid #0088ff';
        catHeader.style.color = '#1a2a3a';
        container.appendChild(catHeader);

        // 该分类下的文章列表（简洁列表，不用卡片）
        const list = document.createElement('ul');
        list.style.listStyle = 'none';
        list.style.padding = '0';
        list.style.margin = '0 0 0.5em 0';

        articles.forEach(post => {
            const li = document.createElement('li');
            li.style.margin = '6px 0';
            li.style.padding = '4px 0';

            const link = document.createElement('a');
            link.href = `post.html?page=${post.id}`;
            link.textContent = post.title;
            link.style.color = '#0088ff';
            link.style.textDecoration = 'none';
            link.style.fontSize = '1.05em';

            const meta = document.createElement('span');
            meta.style.fontSize = '0.8em';
            meta.style.color = '#6a8aaa';
            meta.style.marginLeft = '12px';
            meta.textContent = post.date;

            li.appendChild(link);
            li.appendChild(meta);
            list.appendChild(li);
        });

        container.appendChild(list);
    });
}

// ============================================================
// 4. 页面加载后执行
// ============================================================
document.addEventListener('DOMContentLoaded', renderCategoryPage);