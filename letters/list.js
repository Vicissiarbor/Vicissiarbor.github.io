// list.js - 文章数据列表 + 书架渲染引擎
// ============================================================

// 1. 文章数据（手动维护，按需增删）
// ------------------------------------------------------------
/*notes推荐阅读；works个人作品；critique文学评论；biography人物生平*/
const articles = [
    {
        id: 'dmlplpwf',
        title: '典论·论文',
        type: 'notes',
        date: '2026-07-06',
        dynasty: '魏',
        author: '曹丕'
    },
    {
        id: 'fu_of_u18',
        title: '成人赋',
        type: 'works',
        date: '2025-04-13',
        dynasty: '现代',
        author: '交讓'
    },
];

// ============================================================
// 2. 辅助函数：将中文日期转为可比较的数字
// ============================================================
function parseYear(dateStr) {
    if (!dateStr) return 0;
    // 处理 "前233年" -> -233
    if (dateStr.includes('前')) {
        const num = parseInt(dateStr.replace('前', '').replace('年', ''));
        return -num;
    }
    // 处理 "220年" -> 220, "2026-07-01" 取前四位
    if (dateStr.includes('年')) {
        const num = parseInt(dateStr.replace('年', ''));
        return num;
    }
    // 处理 ISO 日期 "2026-07-01" -> 2026
    const match = dateStr.match(/^\d{4}/);
    if (match) return parseInt(match[0]);
    return 0;
}

// ============================================================
// 3. 书架渲染引擎
// ============================================================
function renderShelf() {
    const secondContainer = document.querySelector('.second .shelf-scroll');
    if (!secondContainer) return; // 非书架页面

    function clearContainer(container) {
        if (container) container.innerHTML = '';
    }

    function appendBooks(container, items) {
        if (!container) return;
        items.forEach(item => {
            const book = document.createElement('div');
            book.className = 'book';
            book.textContent = item.title;
            book.style.cursor = 'pointer';
            book.addEventListener('click', () => {
                window.location.href = `article.html?page=${item.id}`;
            });
            container.appendChild(book);
        });
    }

    function appendArchiveBooks(container, items) {
        if (!container) return;
        items.forEach(item => {
            const book = document.createElement('div');
            book.className = 'book';
            book.style.cursor = 'pointer';
            const contentSpan = document.createElement('span');
            contentSpan.className = 'book-content';
            contentSpan.textContent = item.title;
            const dateSpan = document.createElement('span');
            dateSpan.className = 'book-date';
            dateSpan.textContent = item.date;
            book.appendChild(contentSpan);
            book.appendChild(dateSpan);
            book.addEventListener('click', () => {
                if (item.id) {
                    window.location.href = `article.html?page=${item.id}`;
                }
            });
            container.appendChild(book);
        });
    }

    // ----- 1. 第二层：阅读笔记 -----
    const notes = articles.filter(a => a.type === 'notes');
    clearContainer(secondContainer);
    appendBooks(secondContainer, notes);

    // ----- 2. 第三层左：个人作品 -----
    const works = articles.filter(a => a.type === 'works');
    const leftContainer = document.querySelector('.third .section-left .shelf-scroll');
    clearContainer(leftContainer);
    appendBooks(leftContainer, works);

    // ----- 3. 第三层右：文学评论 -----
    const critiques = articles.filter(a => a.type === 'critique');
    const rightContainer = document.querySelector('.third .section-right .shelf-scroll');
    clearContainer(rightContainer);
    appendBooks(rightContainer, critiques);

    // ----- 4. 第四层：人物生平 -----
    const bios = articles.filter(a => a.type === 'biography');
    const forthContainer = document.querySelector('.forth .shelf-scroll');
    clearContainer(forthContainer);
    appendBooks(forthContainer, bios);

    // ----- 5. 第五层：归档（从所有非归档文章中提取，按日期从旧到新） -----
    // 排除 type === 'archive'（虽然现在没有，但以防万一）
    const allOthers = articles.filter(a => a.type !== 'archive');
    // 按日期排序（旧 -> 新）
    const sorted = [...allOthers].sort((a, b) => {
        return parseYear(a.date) - parseYear(b.date);
    });

    let archiveContainer = document.querySelector('#archive .shelf-scroll');
    if (!archiveContainer) {
        archiveContainer = document.querySelector('#guidang .shelf-scroll');
    }
    clearContainer(archiveContainer);
    appendArchiveBooks(archiveContainer, sorted);
}

// ============================================================
// 4. 暴露数据给其他脚本（如 article.js）
// ============================================================
window.articles = articles;

// ============================================================
// 5. 页面加载完成后执行渲染
// ============================================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderShelf);
} else {
    renderShelf();
}