// 应用状态
let currentPage = 'home';
let currentQuestion = 1;
let timer = null;
let timeLeft = 20;
let answers = [];

// 题目数据（20道职场新人版迫选题）
const questions = [
    {
        text: "刚入职第一周，领导让你熟悉业务，你会...",
        a: "先快速浏览所有相关资料，建立整体认知框架",
        b: "挑一个核心模块深入研究，搞透它再扩展",
        themeA: "搜集",
        themeB: "专注"
    },
    {
        text: "和同事合作项目，对方进度落后了，你会...",
        a: "分析原因，看看是流程问题还是能力问题，一起找解决方案",
        b: "先关心他是不是遇到什么困难，情绪状态怎么样",
        themeA: "分析",
        themeB: "共情"
    },
    {
        text: "团队有个重复性工作需要优化，你会...",
        a: "想设计一个标准流程/模板，让大家以后都能高效完成",
        b: "先把这个任务高效做完，然后再看有没有必要优化流程",
        themeA: "系统",
        themeB: "执行"
    },
    {
        text: "领导交代了一个你不太感兴趣的任务，你会...",
        a: "虽然不感兴趣，但做好了能获得认可，我就能投入去做",
        b: "只有觉得这件事有意义/有价值，我才有动力做好",
        themeA: "成就",
        themeB: "意义"
    },
    {
        text: "要学习一个新领域的知识，你会...",
        a: "广泛搜集各种资料，从多个角度了解这个领域",
        b: "找到最核心的几本经典，用逻辑框架消化吸收",
        themeA: "搜集",
        themeB: "分析"
    },
    {
        text: "你对一个技术难题死磕了很久还没解决，你会...",
        a: "继续钻研，直到搞懂为止，这是我的执念",
        b: "停下来，找人聊聊，也许换个心情就有新思路了",
        themeA: "专注",
        themeB: "共情"
    },
    {
        text: "你刚建立了一个高效的工作流程，最爽的是...",
        a: "看到整个系统运转顺畅，流程被优化得很优雅",
        b: "因为这个流程，我/团队拿到了好结果，被表扬了",
        themeA: "系统",
        themeB: "成就"
    },
    {
        text: "老板让你做一件你觉得没意义的事，你会...",
        a: "就算没意义，先高效完成再说，执行力是第一位的",
        b: "尝试理解意义，或者和老板沟通，否则很难投入",
        themeA: "执行",
        themeB: "意义"
    },
    {
        text: "朋友找你吐槽工作烦恼，你会...",
        a: "帮他分析问题根源，给出解决建议",
        b: "先倾听，让他把情绪宣泄出来，表示理解",
        themeA: "分析",
        themeB: "共情"
    },
    {
        text: "手头有多个任务要做，你会...",
        a: "先专注做完一个，再做下一个，这样效率高",
        b: "先规划整体节奏，协调好各任务的进度安排",
        themeA: "专注",
        themeB: "系统"
    },
    {
        text: "公司团建活动，你可以提议玩法，你会...",
        a: "想尝试各种新鲜有趣的活动，让大家体验不同的东西",
        b: "想选择能让大家都放松、愉快互动的活动，氛围更重要",
        themeA: "搜集",
        themeB: "共情"
    },
    {
        text: "你收藏了很多有用的工作资料和文章，你会...",
        a: "喜欢不断收藏新的，涉猎越广越好，说不定哪天用上",
        b: "定期整理归类，建立一个清晰的资料库体系",
        themeA: "搜集",
        themeB: "系统"
    },
    {
        text: "发现了一个工作流程中的小问题，你会...",
        a: "想彻底研究透这个问题，找出根因，哪怕花点时间",
        b: "先快速修掉，保证进度，后面有空再优化",
        themeA: "专注",
        themeB: "执行"
    },
    {
        text: "团队要做一个新项目，你会...",
        a: "先分析项目的底层逻辑和商业可行性",
        b: "先设计项目的整体框架和执行路线图",
        themeA: "分析",
        themeB: "系统"
    },
    {
        text: "领导临时加了一个需求，你会...",
        a: "需要先搞清楚这个需求的合理性和逻辑，再动手",
        b: "直接开干，边做边理解，先交付再说",
        themeA: "分析",
        themeB: "执行"
    },
    {
        text: "项目成功了，你最开心的是...",
        a: "看到团队成员都很开心、有成就感，氛围特别好",
        b: "项目成果被领导认可，自己拿到了好绩效/表扬",
        themeA: "共情",
        themeB: "成就"
    },
    {
        text: "朋友拉你参与一个公益项目，你会...",
        a: "参与是因为和朋友一起做这件事很开心，过程很重要",
        b: "参与是因为认同这个公益项目的价值和意义",
        themeA: "共情",
        themeB: "意义"
    },
    {
        text: "公司推行一个新的管理制度，你会...",
        a: "如果这个制度设计合理、逻辑清晰，我可以接受",
        b: "如果这个制度能让工作更有意义感，我才会支持",
        themeA: "系统",
        themeB: "意义"
    },
    {
        text: "周末你打算提升自己，你会...",
        a: "安排满满的计划，高效执行，学完一门课/看完一本书",
        b: "选择能拿到证书/作品/成果的学习，有结果才有动力",
        themeA: "执行",
        themeB: "成就"
    },
    {
        text: "年终总结时，你更想展示...",
        a: "这一年涉猎了很多领域，知识面更广了",
        b: "这一年拿到了 XX 成果/奖项/认可，有具体成绩",
        themeA: "搜集",
        themeB: "成就"
    }
];

// 页面切换
function goToPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    const pageElement = document.getElementById(pageId);
    if (pageElement) {
        pageElement.classList.add('active');
    }
    currentPage = pageId;
    
    // 特殊处理
    if (pageId === 'report-role') {
        setTimeout(() => {
            drawRadarChart();
        }, 300);
    }
}

// 选项选择（画像页）
document.querySelectorAll('.option-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        this.parentElement.querySelectorAll('.option-btn').forEach(b => {
            b.classList.remove('selected');
        });
        this.classList.add('selected');
    });
});

// 开始答题
function startQuiz() {
    goToPage('quiz');
    loadQuestion(1);
}

// 加载题目
function loadQuestion(num) {
    currentQuestion = num;
    
    // 确保不超出题目范围
    const qIndex = (num - 1) % questions.length;
    const q = questions[qIndex];
    
    // 先清除选择状态（在更新内容之前）
    document.querySelectorAll('.choice-btn').forEach(btn => {
        btn.classList.remove('selected');
        btn.style.pointerEvents = 'auto';
        btn.style.background = '';
        btn.style.borderColor = '';
    });
    
    // 更新题目内容
    document.getElementById('current-q').textContent = num;
    document.getElementById('question-text').textContent = q.text;
    document.querySelector('#choice-a .text').textContent = q.a;
    document.querySelector('#choice-b .text').textContent = q.b;
    
    // 再次确保清除选择状态
    setTimeout(() => {
        document.querySelectorAll('.choice-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
    }, 10);
    
    // 启动计时器
    startTimer();
}

// 计时器
function startTimer() {
    timeLeft = 20;
    clearInterval(timer);
    
    updateTimerDisplay();
    
    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

function updateTimerDisplay() {
    document.getElementById('timer').textContent = timeLeft;
    const percentage = (timeLeft / 20) * 100;
    document.getElementById('timer-fill').style.width = percentage + '%';
    
    // 时间少于5秒变红色
    if (timeLeft <= 5) {
        document.getElementById('timer-fill').style.background = '#ef4444';
    } else {
        document.getElementById('timer-fill').style.background = '';
    }
}

// 选择答案
function selectChoice(choice) {
    clearInterval(timer);
    
    // 防止重复点击
    document.querySelectorAll('.choice-btn').forEach(btn => {
        btn.style.pointerEvents = 'none';
    });
    
    // 记录答案
    const qIndex = (currentQuestion - 1) % questions.length;
    const q = questions[qIndex];
    answers.push({
        question: currentQuestion,
        choice: choice,
        theme: choice === 'a' ? q.themeA : q.themeB
    });
    
    // 视觉反馈
    document.getElementById('choice-' + choice).classList.add('selected');
    
    // 延迟进入下一题
    setTimeout(nextQuestion, 500);
}

// 下一题
function nextQuestion() {
    if (currentQuestion < 20) {
        loadQuestion(currentQuestion + 1);
    } else {
        finishQuiz();
    }
}

// 天赋数据配置
const themeData = {
    '搜集': {
        icon: '📚',
        name: '广度涉猎',
        desc: '热衷收集信息',
        behaviors: ['订阅大量公众号、囤资料', '喜欢了解新事物、新领域', '知识面宽，是团队里的"知识枢纽"'],
        bestScenarios: ['快速了解一个新领域', '建立跨领域连接', '信息整合'],
        watchOut: '信息收集时停不下来，因为"万一有用呢"'
    },
    '专注': {
        icon: '🎯',
        name: '深度死磕',
        desc: '深耕单一领域',
        behaviors: ['可以长时间钻研一件事', '对细节有执念', '追求把事情做到极致'],
        bestScenarios: ['需要深度思考的任务', '技术研究', '复杂问题解决'],
        watchOut: '可能忽略其他重要事项，陷入完美主义'
    },
    '分析': {
        icon: '🔍',
        name: '逻辑推演',
        desc: '依赖理性推导',
        behaviors: ['做决定要数据支撑', '喜欢拆解问题', '寻找逻辑漏洞'],
        bestScenarios: ['数据分析', '问题诊断', '决策支持'],
        watchOut: '过度分析导致行动延迟，忽略情感因素'
    },
    '共情': {
        icon: '💝',
        name: '情绪感知',
        desc: '敏感他人情绪',
        behaviors: ['容易感知他人感受', '善于倾听', '关注团队氛围'],
        bestScenarios: ['团队协作', '客户沟通', '冲突调解'],
        watchOut: '容易被他人情绪影响，边界感不强'
    },
    '系统': {
        icon: '🏗️',
        name: '系统构建',
        desc: '擅长设计流程',
        behaviors: ['喜欢制定规则', '善于搭建框架', '追求效率和秩序'],
        bestScenarios: ['流程设计', '项目管理', '体系建设'],
        watchOut: '太追求系统的完美，可能延迟行动'
    },
    '执行': {
        icon: '⚡',
        name: '执行力',
        desc: '擅长落地执行',
        behaviors: ['说干就干不拖延', '注重结果导向', '快速响应'],
        bestScenarios: ['紧急任务', '目标明确的执行', '快速迭代'],
        watchOut: '可能忽略规划和质量，只求速度'
    },
    '成就': {
        icon: '🏆',
        name: '成就驱动',
        desc: '追求结果认可',
        behaviors: ['需要外部反馈驱动', '追求可见成果', '在意绩效和认可'],
        bestScenarios: ['目标明确的任务', '竞争环境', '结果导向的工作'],
        watchOut: '不被注意时动力下降，过度依赖外部认可'
    },
    '意义': {
        icon: '✨',
        name: '意义驱动',
        desc: '追求内心价值',
        behaviors: ['在意事情的意义', '追求内在满足', '关注长期价值'],
        bestScenarios: ['价值观匹配的工作', '社会影响力项目', '创造性工作'],
        watchOut: '可能忽视现实约束，过于理想化'
    }
};

// 角色类型定义
const roleTypes = {
    '系统架构师型': {
        avatar: '🏗️',
        themes: ['系统', '分析', '专注', '成就', '搜集'],
        tagline: '你喜欢把事情理清楚、搭好框架，让复杂变有序，是大家眼里的"靠谱担当"。',
        domainScores: { strategic_thinking: 85, execution: 78, influence: 52, relationship: 45 }
    },
    '探索者型': {
        avatar: '🔭',
        themes: ['搜集', '分析', '意义', '专注', '共情'],
        tagline: '你充满好奇心，喜欢探索新事物，同时追求深度和意义。',
        domainScores: { strategic_thinking: 82, execution: 45, influence: 48, relationship: 65 }
    },
    '执行专家型': {
        avatar: '⚡',
        themes: ['执行', '成就', '系统', '专注', '分析'],
        tagline: '你是结果导向的行动派，能把事情稳稳地做成。',
        domainScores: { strategic_thinking: 65, execution: 92, influence: 70, relationship: 38 }
    },
    '关系构建者型': {
        avatar: '🤝',
        themes: ['共情', '搜集', '意义', '分析', '执行'],
        tagline: '你善于理解他人，是团队里的情感纽带。',
        domainScores: { strategic_thinking: 58, execution: 52, influence: 62, relationship: 88 }
    }
};

// 计算测评结果
function calculateResults() {
    const scores = {};
    
    // 初始化所有主题分数
    Object.keys(themeData).forEach(theme => {
        scores[theme] = 0;
    });
    
    // 统计答题结果
    answers.forEach(answer => {
        if (answer.theme) {
            scores[answer.theme] += 1;
        }
    });
    
    // 排序获取 TOP 5
    const sortedThemes = Object.entries(scores)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([theme, score]) => ({ theme, score }));
    
    // 确定角色类型（简化版：根据第一天赋匹配）
    const topTheme = sortedThemes[0].theme;
    let roleType = '系统架构师型';
    
    if (topTheme === '搜集') roleType = '探索者型';
    else if (topTheme === '执行') roleType = '执行专家型';
    else if (topTheme === '共情') roleType = '关系构建者型';
    
    return {
        top5: sortedThemes,
        roleType: roleType,
        allScores: scores
    };
}

// 完成答题
function finishQuiz() {
    goToPage('loading');
    
    // 计算结果
    const results = calculateResults();
    
    // 模拟分析时间
    setTimeout(() => {
        generateReport(results);
        // 先进入5Why深挖，而不是角色概览
        goToPage('report-5why');
        // 初始化对话
        setTimeout(() => {
            initFiveWhyDialog();
            setupInputListener();
        }, 300);
    }, 2000);
}

// 生成报告
function generateReport(results) {
    currentResults = results;
    
    // 更新角色概览
    const role = roleTypes[results.roleType];
    document.getElementById('role-name').textContent = results.roleType;
    document.getElementById('role-desc').textContent = role.tagline;
    document.getElementById('role-avatar').textContent = role.avatar;
    
    // 更新维度详情
    updateDimensionsDetail(results);
    
    // 生成天赋详解
    generateThemeDetails(results.top5);
    
    // 生成礼物与挑战
    generateGiftsAndChallenges(results.top5);
    
    // 生成长期建议
    generateSuggestions(results.top5);
}

// 更新维度详情
function updateDimensionsDetail(results) {
    const scores = calculateDimensionScores();
    const top5Themes = results.top5.map(t => t.theme);
    
    // 维度配置
    const dimensions = [
        {
            name: '战略思维',
            icon: '🧠',
            score: scores.strategic_thinking,
            themes: ['搜集', '专注', '分析'],
            themeNames: ['广度涉猎', '深度死磕', '逻辑推演']
        },
        {
            name: '执行力',
            icon: '⚡',
            score: scores.execution,
            themes: ['系统', '执行'],
            themeNames: ['系统构建', '执行力']
        },
        {
            name: '影响力',
            icon: '🌟',
            score: scores.influence,
            themes: ['成就'],
            themeNames: ['成就驱动']
        },
        {
            name: '关系建立',
            icon: '💝',
            score: scores.relationship,
            themes: ['共情', '意义'],
            themeNames: ['情绪感知', '意义驱动']
        }
    ];
    
    // 按分数排序
    dimensions.sort((a, b) => b.score - a.score);
    
    // 生成维度详情HTML
    const container = document.getElementById('dimensions-detail');
    if (container) {
        container.innerHTML = dimensions.map((dim, index) => {
            // 找出该维度中用户拥有的天赋
            const userTalents = [];
            dim.themes.forEach((theme, i) => {
                if (top5Themes.includes(theme)) {
                    const themeInfo = themeData[theme];
                    userTalents.push({
                        theme: theme,
                        name: dim.themeNames[i],
                        rank: top5Themes.indexOf(theme) + 1,
                        desc: themeInfo.desc,
                        behaviors: themeInfo.behaviors.slice(0, 2) // 只取前2个行为特征
                    });
                }
            });
            
            const isTopDimension = index === 0;
            const borderStyle = isTopDimension ? '2px solid var(--primary)' : '1px solid var(--border)';
            const bgStyle = isTopDimension ? 'linear-gradient(135deg, #eff6ff 0%, #ffffff 100%)' : 'var(--white)';
            
            if (userTalents.length === 0) {
                return '';
            }
            
            return `
                <div class="dimension-item" style="border: ${borderStyle}; background: ${bgStyle};">
                    <div class="dimension-header">
                        <span class="dimension-icon">${dim.icon}</span>
                        <div class="dimension-info">
                            <span class="dimension-name">${dim.name}</span>
                            <span class="dimension-score">${dim.score}分</span>
                        </div>
                    </div>
                    <div class="dimension-talents-detail">
                        ${userTalents.map(t => `
                            <div class="talent-detail-item">
                                <div class="talent-name-row">
                                    <span class="talent-tag rank-${t.rank}">${t.name}</span>
                                    <span class="talent-desc">${t.desc}</span>
                                </div>
                                <ul class="talent-behaviors">
                                    ${t.behaviors.map(b => `<li>${b}</li>`).join('')}
                                </ul>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }).join('');
    }
    
    // 更新雷达图图例
    const legendContainer = document.getElementById('radar-legend');
    if (legendContainer) {
        legendContainer.innerHTML = dimensions.map(dim => `
            <div class="legend-item">
                <span class="dot" style="background:${getDimensionColor(dim.name)}"></span>
                <span>${dim.name} ${dim.score}分</span>
            </div>
        `).join('');
    }
}

// 获取维度颜色
function getDimensionColor(name) {
    const colors = {
        '战略思维': '#60a5fa',
        '执行力': '#93c5fd',
        '影响力': '#bfdbfe',
        '关系建立': '#dbeafe'
    };
    return colors[name] || '#94a3b8';
}

// 更新雷达图数据
function updateRadarData(scores) {
    // 更新图例
    const legendItems = document.querySelectorAll('.radar-legend .legend-item span:last-child');
    if (legendItems[0]) legendItems[0].textContent = `战略思维 ${scores.strategic_thinking}分`;
    if (legendItems[1]) legendItems[1].textContent = `执行力 ${scores.execution}分`;
    if (legendItems[2]) legendItems[2].textContent = `影响力 ${scores.influence}分`;
    if (legendItems[3]) legendItems[3].textContent = `关系建立 ${scores.relationship}分`;
}

// 生成天赋详解
function generateThemeDetails(top5) {
    const container = document.getElementById('theme-detail-list');
    if (!container) return;
    
    container.innerHTML = top5.slice(0, 3).map((item, index) => {
        const data = themeData[item.theme];
        return `
            <div class="theme-item">
                <div class="theme-header">
                    <span class="theme-rank">#${index + 1}</span>
                    <span class="theme-icon">${data.icon}</span>
                    <h4>${data.name}</h4>
                </div>
                <p class="theme-desc"><strong>${data.desc}</strong></p>
                
                <div class="theme-section">
                    <h5>典型表现</h5>
                    <ul>
                        ${data.behaviors.map(b => `<li>${b}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="theme-section">
                    <h5>适合场景</h5>
                    <ul>
                        ${data.bestScenarios.map(s => `<li>✅ ${s}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="theme-watchout">
                    <h5>💡 小提醒</h5>
                    <p>${data.watchOut}</p>
                </div>
            </div>
        `;
    }).join('<hr class="theme-divider">');
}

// 生成礼物与挑战
function generateGiftsAndChallenges(top5) {
    const topThemeNames = top5.map(t => t.theme);
    const giftsList = document.getElementById('gifts-list');
    const challengesList = document.getElementById('challenges-list');
    
    if (!giftsList || !challengesList) return;
    
    // 根据 TOP 天赋生成礼物
    const gifts = [];
    
    if (topThemeNames.includes('系统') && topThemeNames.includes('分析')) {
        gifts.push('系统构建 + 分析的组合让你成为团队里的"问题拆解专家"。别人看到一个烂摊子，你看到的已经是分类好的模块和解决路径。');
    }
    
    if (topThemeNames.includes('专注') && topThemeNames.includes('成就')) {
        gifts.push('专注 + 成就驱动的组合让你是"结果导向的执行者"。不仅能埋头做事，还能确保事情有交代、有成果。');
    }
    
    if (topThemeNames.includes('搜集')) {
        gifts.push('广度涉猎给你的系统思维提供了丰富的素材库。你能把 A 领域的方法论迁移到 B 领域，这是你的隐藏优势。');
    }
    
    if (topThemeNames.includes('共情')) {
        gifts.push('情绪感知让你成为团队里的"氛围调节器"，能敏锐察觉他人的需求和情绪变化。');
    }
    
    if (topThemeNames.includes('执行')) {
        gifts.push('强大的执行力让你是团队里的"定心丸"，说到做到，靠谱担当。');
    }
    
    // 默认礼物
    if (gifts.length === 0) {
        gifts.push('你的天赋组合独特，在合适的场景下能发挥出色。');
    }
    
    // 生成挑战
    const challenges = [];
    
    if (topThemeNames.includes('系统') && topThemeNames.includes('搜集')) {
        challenges.push('当系统构建遇上广度涉猎，你容易陷入"资料收集 → 整理框架 → 发现新领域 → 再收集"的循环，导致真正动手的时间被压缩。');
    }
    
    if (topThemeNames.includes('成就') && topThemeNames.includes('专注')) {
        challenges.push('你会很在意"这件事做成能不能被看到"，如果感觉没人关注，可能连开始的动力都没有。');
    }
    
    if (!topThemeNames.includes('共情')) {
        challenges.push('关系建立维度偏弱，在追求效率和结果时，可能会忽略同事的情绪和关系维护，让人觉得你有点"冷"。');
    }
    
    if (!topThemeNames.includes('执行')) {
        challenges.push('执行力不是你最突出的天赋，有时候想得太多、规划太久，反而迟迟不开始。');
    }
    
    // 默认挑战
    if (challenges.length === 0) {
        challenges.push('注意平衡你的优势，避免过度依赖某个天赋而忽略其他方面的发展。');
    }
    
    giftsList.innerHTML = gifts.map(g => `<div class="gift-item">${g}</div>`).join('');
    challengesList.innerHTML = challenges.map(c => `<div class="challenge-item">${c}</div>`).join('');
}

// 生成长期建议
function generateSuggestions(top5) {
    const topThemeNames = top5.map(t => t.theme);
    const leverageList = document.getElementById('suggestions-leverage');
    const balanceList = document.getElementById('suggestions-balance');
    const growthList = document.getElementById('suggestions-growth');
    
    if (!leverageList || !balanceList || !growthList) return;
    
    // 发挥天赋的建议
    const leverageSuggestions = [];
    
    if (topThemeNames.includes('系统')) {
        leverageSuggestions.push('主动承担流程设计：团队需要新流程时，你就是最佳人选');
        leverageSuggestions.push('可视化你的思考：多画思维导图、流程图，让大家跟上你的思路');
        leverageSuggestions.push('允许"足够好"：80分的系统比100分的计划更有价值');
    }
    
    if (topThemeNames.includes('分析')) {
        leverageSuggestions.push('做团队的"逻辑守门员"：在决策前帮助大家梳理清楚思路');
        leverageSuggestions.push('用数据说话：在汇报时多用数据和逻辑支撑你的观点');
    }
    
    if (topThemeNames.includes('搜集')) {
        leverageSuggestions.push('成为知识枢纽：主动分享你收集到的有价值信息');
        leverageSuggestions.push('建立个人知识库：把碎片信息系统化整理');
    }
    
    // 平衡矛盾的建议
    const balanceSuggestions = [];
    
    if (topThemeNames.includes('搜集') && topThemeNames.includes('专注')) {
        balanceSuggestions.push('战略选点：选定1-2个真正感兴趣的方向深耕，其他的保持轻松涉猎');
        balanceSuggestions.push('试试单点突破：给自己一个小实验，比如"这个季度只专注一个技能"');
        balanceSuggestions.push('重新定义"被看见"：你的价值不只是"知道很多"，"在一件事上有洞见"同样闪闪发光');
    }
    
    if (topThemeNames.includes('成就')) {
        balanceSuggestions.push('听听内心的声音：问问自己"如果没人知道，我还会想做吗？"');
        balanceSuggestions.push('给自己鼓掌：设置一些属于自己的小里程碑');
        balanceSuggestions.push('试试纯粹的事：偶尔做一些只是为了开心、不计结果的事');
    }
    
    // 成长方向
    const growthSuggestions = [
        '🌱 练习接受"不确定"和"没条理"，不是所有事情都需要系统',
        '🌱 探索"不被看见时的动力"，找到内在驱动的火花',
        '🌱 允许自己"只想不做"一段时间，休息也是成长的一部分'
    ];
    
    leverageList.innerHTML = leverageSuggestions.map(s => `<li>${s}</li>`).join('');
    balanceList.innerHTML = balanceSuggestions.map(s => `<li>${s}</li>`).join('') || '<li>你的天赋组合比较平衡，继续保持～</li>';
    growthList.innerHTML = growthSuggestions.map(s => `<li>${s}</li>`).join('');
}

// 5Why 对话状态
let fiveWhyState = {
    currentRound: 0,
    answers: [],
    conversationPath: 'contradiction', // 'contradiction' | 'achievement' | 'meaning'
    isComplete: false
};

// 动态 5Why 对话系统
const dynamic5Why = {
    // 根据答题结果分析用户的模式
    analyzePattern: (answers) => {
        const themeCounts = {};
        answers.forEach(a => {
            themeCounts[a.theme] = (themeCounts[a.theme] || 0) + 1;
        });
        
        const patterns = [];
        
        // 检测高天赋（某一方面特别强）
        const maxCount = Math.max(...Object.values(themeCounts));
        const topThemes = Object.entries(themeCounts)
            .filter(([_, count]) => count >= 4)
            .map(([theme, _]) => theme);
        
        if (topThemes.length === 1) {
            patterns.push({
                type: 'strength',
                theme: topThemes[0],
                description: `${themeData[topThemes[0]].name}特别突出`
            });
        }
        
        // 检测矛盾/缠绕（两个方面都很强）
        const strongThemes = Object.entries(themeCounts)
            .filter(([_, count]) => count >= 3)
            .map(([theme, _]) => theme);
        
        if (strongThemes.length >= 2) {
            // 检查是否是矛盾组合
            const contradictions = [
                ['搜集', '专注'],  // 广度 vs 深度
                ['系统', '执行'],  // 规划 vs 行动
                ['成就', '意义'],  // 外在 vs 内在
                ['分析', '共情']   // 理性 vs 感性
            ];
            
            for (const [t1, t2] of contradictions) {
                if (strongThemes.includes(t1) && strongThemes.includes(t2)) {
                    patterns.push({
                        type: 'contradiction',
                        themes: [t1, t2],
                        description: `${themeData[t1].name}与${themeData[t2].name}的拉扯`
                    });
                }
            }
        }
        
        // 如果没有检测到明显模式，使用最强的天赋
        if (patterns.length === 0) {
            const strongestTheme = Object.entries(themeCounts)
                .sort((a, b) => b[1] - a[1])[0][0];
            patterns.push({
                type: 'strength',
                theme: strongestTheme,
                description: `${themeData[strongestTheme].name}是你的核心天赋`
            });
        }
        
        return patterns;
    },
    
    // 根据模式生成开场白
    generateIntro: (patterns) => {
        const pattern = patterns[0];
        
        if (pattern.type === 'strength') {
            const data = themeData[pattern.theme];
            return `我注意到你的测评结果中，${data.name}特别突出。${data.desc}，这种特质在你身上表现得很明显～`;
        } else if (pattern.type === 'contradiction') {
            const [t1, t2] = pattern.themes;
            const data1 = themeData[t1];
            const data2 = themeData[t2];
            return `我注意到你在测评中既表现出${data1.name}的特质（${data1.desc}），又有${data2.name}的倾向（${data2.desc}）。这两种力量在你身上似乎都在发挥作用～`;
        }
        
        return '我注意到你的测评结果中有一些很有意思的模式，想跟你聊聊～';
    },
    
    // 根据用户回答和当前对话状态生成下一个问题
    generateNextQuestion: (pattern, answers, round) => {
        const lastAnswer = answers[answers.length - 1] || '';
        const allAnswers = answers.join(' ');
        
        // 第一轮：探索感受
        if (round === 0) {
            if (pattern.type === 'strength') {
                const data = themeData[pattern.theme];
                return {
                    question: `当你${data.behaviors[0]}的时候，通常是什么样的感觉？`,
                    quickReplies: ['很享受，觉得这就是我应该做的事', '有时候也会累，但停不下来', '会有一种满足感', '其实没太注意，就是自然而然']
                };
            } else if (pattern.type === 'contradiction') {
                const [t1, t2] = pattern.themes;
                return {
                    question: `当${themeData[t1].name}和${themeData[t2].name}这两种需求同时出现时，你通常是什么感受？`,
                    quickReplies: ['会觉得纠结，不知道该选哪个', '看情况，有时候选A有时候选B', '挺享受的，两者都想要', '其实有点焦虑，怕顾此失彼']
                };
            }
        }
        
        // 第二轮：深挖动机
        if (round === 1) {
            // 根据上一轮回答调整问题
            if (lastAnswer.includes('纠结') || lastAnswer.includes('焦虑')) {
                return {
                    question: '那种纠结或焦虑的感觉，通常会在什么情况下出现？',
                    quickReplies: ['做选择的时候', '看到别人有成果时', '时间不够用的时候', '被要求表态的时候']
                };
            } else if (lastAnswer.includes('享受') || lastAnswer.includes('满足')) {
                return {
                    question: '那种满足或享受的感觉，对你来说重要在哪里呢？',
                    quickReplies: ['让我觉得自己有价值', '是一种自我确认', '能带来安全感', '就是单纯的快乐']
                };
            } else {
                return {
                    question: '你提到"自然而然"或"没太注意"，如果仔细感受一下，这背后是什么在驱动你呢？',
                    quickReplies: ['可能是习惯吧', '觉得应该这样做', '不想落后于人', '内心的一种渴望']
                };
            }
        }
        
        // 第三轮：探索价值观
        if (round === 2) {
            if (allAnswers.includes('价值') || allAnswers.includes('确认')) {
                return {
                    question: '这种对"价值"或"确认"的需要，你觉得是从什么时候开始有的呢？',
                    quickReplies: ['从小就这样', '工作以后才有的', '某次经历之后', '一直都有，但越来越强烈']
                };
            } else if (allAnswers.includes('选择') || allAnswers.includes('纠结')) {
                return {
                    question: '当面临选择时，你内心深处更害怕的是选错，还是怕错过？',
                    quickReplies: ['更怕选错，怕走弯路', '更怕错过，怕后悔', '两者都怕', '其实还好，能接受']
                };
            } else {
                return {
                    question: '如果想象一下自己最理想的状态，那会是什么样的呢？',
                    quickReplies: ['能够兼顾各方面', '在一个领域做到顶尖', '被所有人认可', '内心平静满足']
                };
            }
        }
        
        // 第四轮：追溯根源
        if (round === 3) {
            if (allAnswers.includes('从小') || allAnswers.includes('小时候')) {
                return {
                    question: '小时候的经历中，有没有哪个场景让你印象特别深刻，觉得"被看见"或"被认可"的感觉很好？',
                    quickReplies: ['被表扬的时候', '比别人做得好的时候', '被关注的时候', '帮助别人被感谢的时候']
                };
            } else if (allAnswers.includes('工作') || allAnswers.includes('经历')) {
                return {
                    question: '那次经历或工作后的变化，给你带来了什么样的影响？',
                    quickReplies: ['让我更清楚自己要什么', '改变了我的价值观', '让我变得更谨慎', '激发了我的某方面潜能']
                };
            } else {
                return {
                    question: '回顾这些感受，你觉得它们在你的人生中扮演着什么样的角色？',
                    quickReplies: ['是我前进的动力', '有时候也是负担', '帮助我认识自己', '还在探索中']
                };
            }
        }
        
        return {
            question: '还有什么是你想分享的吗？',
            quickReplies: ['没有了，谢谢', '我想补充一点...', '这让我想到...', '其实还有一个方面...']
        };
    },
    
    // 生成洞察总结 - 基于用户实际回答
    generateInsights: (pattern, answers) => {
        const allAnswers = answers.join(' ');
        const lastAnswer = answers[answers.length - 1] || '';
        
        let path = [];
        let impacts = [];
        let finalMessage = [];
        
        // 分析用户回答中的关键词
        const hasFear = allAnswers.includes('怕') || allAnswers.includes('担心') || allAnswers.includes('焦虑');
        const hasValue = allAnswers.includes('价值') || allAnswers.includes('认可') || allAnswers.includes('被看见');
        const hasChildhood = allAnswers.includes('从小') || allAnswers.includes('小时候') || allAnswers.includes('早期');
        const hasWork = allAnswers.includes('工作') || allAnswers.includes('经历');
        const hasChoice = allAnswers.includes('选择') || allAnswers.includes('纠结');
        const hasEnjoy = allAnswers.includes('享受') || allAnswers.includes('满足') || allAnswers.includes('快乐');
        const hasDrive = allAnswers.includes('动力') || allAnswers.includes('驱动');
        
        if (pattern.type === 'strength') {
            const data = themeData[pattern.theme];
            
            // 根据用户回答构建路径
            if (hasChildhood) {
                path.push('早期的经历');
            }
            path.push(`${data.name}的渴望`);
            
            if (hasValue) {
                path.push('寻求认可');
            } else if (hasEnjoy) {
                path.push('享受过程');
            } else {
                path.push('持续投入');
            }
            
            if (hasDrive) {
                path.push('成为核心动力');
            } else {
                path.push('形成行为模式');
            }
            
            impacts = [
                `在${data.name}相关的事情上表现出色，容易获得成就感`,
                '可能会在这个领域过度投入，忽略其他维度的发展',
                '当环境不需要这个天赋时，可能会感到不适应或挫败'
            ];
            
            finalMessage = [
                `你对${data.name}的追求，是一种珍贵的天赋。它让你在这个领域有独特的优势。`,
                `同时也记得：你的价值不只在这一个维度，全面的你才是完整的你。试着在发挥天赋的同时，也给其他方面一些成长的空间。`
            ];
            
        } else if (pattern.type === 'contradiction') {
            const [t1, t2] = pattern.themes;
            const name1 = themeData[t1].name;
            const name2 = themeData[t2].name;
            
            // 根据用户回答构建路径
            if (hasChildhood) {
                path.push('成长经历的影响');
            } else if (hasWork) {
                path.push('工作经历的塑造');
            }
            
            path.push(`${name1}的渴望`);
            path.push(`${name2}的向往`);
            
            if (hasFear && hasChoice) {
                path.push('选择时的纠结');
            } else if (hasFear) {
                path.push('内心的担忧');
            } else if (hasEnjoy) {
                path.push('两者的平衡');
            } else {
                path.push('寻找整合');
            }
            
            if (hasValue) {
                path.push('确认自我价值');
            } else if (hasDrive) {
                path.push('驱动前行');
            } else {
                path.push('持续探索');
            }
            
            impacts = [
                `同时拥有${name1}和${name2}让你更加全面，能从多个角度看待问题`,
                '两种力量的拉扯可能在做选择时消耗你的精力',
                '可能会在不同情境下表现出不同的倾向，让人觉得你有些矛盾'
            ];
            
            finalMessage = [
                `这种"既想要${name1}又想要${name2}"的心情，其实说明你有着丰富的内在世界。`,
                `不需要急着二选一，学会让两者和谐共存，是你独特的智慧。试着找到能让两者都发挥作用的场景，那会是你的最佳舞台。`
            ];
        }
        
        return { path, impacts, finalMessage };
    }
};

// 初始化 5Why 对话
function initFiveWhyDialog() {
    // 分析用户的模式
    const patterns = dynamic5Why.analyzePattern(answers);
    const mainPattern = patterns[0];
    
    fiveWhyState = {
        currentRound: 0,
        answers: [],
        pattern: mainPattern,
        patterns: patterns,
        isComplete: false
    };
    
    const chatMessages = document.getElementById('chat-messages');
    
    // 清空之前的对话
    chatMessages.innerHTML = '';
    
    // 生成并添加开场白
    const intro = dynamic5Why.generateIntro(patterns);
    addSystemMessage(intro);
    
    // 显示第一个问题
    setTimeout(() => {
        showDynamicQuestion();
    }, 800);
}

// 显示动态生成的问题
function showDynamicQuestion() {
    const { pattern, currentRound, answers } = fiveWhyState;
    const qa = dynamic5Why.generateNextQuestion(pattern, answers, currentRound);
    
    addSystemMessage(qa.question);
    showQuickReplies(qa.quickReplies);
}

// 显示问题
function showQuestion(roundIndex) {
    const dialog = fiveWhyDialogs[fiveWhyState.conversationPath];
    const round = dialog.rounds[roundIndex];
    
    if (!round) {
        completeDialog();
        return;
    }
    
    let question = round.question;
    if (typeof question === 'function' && fiveWhyState.answers.length > 0) {
        question = question(fiveWhyState.answers[fiveWhyState.answers.length - 1]);
    }
    
    addSystemMessage(question);
    showQuickReplies(round.quickReplies);
}

// 添加系统消息
function addSystemMessage(text) {
    const chatMessages = document.getElementById('chat-messages');
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble system';
    bubble.innerHTML = `<p>${text}</p>`;
    chatMessages.appendChild(bubble);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// 添加用户消息
function addUserMessage(text) {
    const chatMessages = document.getElementById('chat-messages');
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble user';
    bubble.innerHTML = `<p>${text}</p>`;
    chatMessages.appendChild(bubble);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// 显示快速回复选项
function showQuickReplies(replies) {
    const container = document.getElementById('quick-replies');
    container.innerHTML = '';
    
    replies.forEach(reply => {
        const btn = document.createElement('button');
        btn.className = 'quick-reply-btn';
        btn.textContent = reply;
        btn.onclick = () => selectReply(reply);
        container.appendChild(btn);
    });
}

// 选择快速回复
function selectReply(text) {
    addUserMessage(text);
    fiveWhyState.answers.push(text);
    fiveWhyState.currentRound++;
    
    // 隐藏快速回复
    document.getElementById('quick-replies').innerHTML = '';
    
    // 显示下一个问题或完成
    setTimeout(() => {
        if (fiveWhyState.currentRound < 4) {
            showDynamicQuestion();
        } else {
            completeDialog();
        }
    }, 600);
}

// 发送自定义消息
function sendMessage() {
    const input = document.getElementById('user-input');
    const text = input.value.trim();
    
    if (!text) return;
    
    addUserMessage(text);
    fiveWhyState.answers.push(text);
    fiveWhyState.currentRound++;
    input.value = '';
    
    setTimeout(() => {
        if (fiveWhyState.currentRound < 4) {
            showQuestion(fiveWhyState.currentRound);
        } else {
            completeDialog();
        }
    }, 600);
}

// 完成对话
function completeDialog() {
    fiveWhyState.isComplete = true;
    
    const { pattern, answers } = fiveWhyState;
    const insights = dynamic5Why.generateInsights(pattern, answers);
    
    // 添加总结消息
    const chatMessages = document.getElementById('chat-messages');
    const summaryBubble = document.createElement('div');
    summaryBubble.className = 'chat-bubble system highlight';
    summaryBubble.innerHTML = `
        <p>💡 <strong>原来是这样呢～</strong></p>
        <p>谢谢你愿意分享这些。从你的回答中，我感受到${insights.path.join(' → ')}这样的模式。</p>
    `;
    chatMessages.appendChild(summaryBubble);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // 隐藏输入区域
    document.getElementById('quick-replies').style.display = 'none';
    document.querySelector('.text-input-wrapper').style.display = 'none';
    
    // 显示发现路径
    const pathFlow = document.getElementById('path-flow');
    pathFlow.innerHTML = insights.path.map((item, index) => `
        <span class="path-item">${item}</span>
        ${index < insights.path.length - 1 ? '<span class="arrow">→</span>' : ''}
    `).join('');
    document.getElementById('discovery-section').style.display = 'block';
    
    // 显示影响
    const impactList = document.getElementById('impact-list');
    impactList.innerHTML = insights.impacts.map(impact => `<li>${impact}</li>`).join('');
    document.getElementById('impact-section').style.display = 'block';
    
    // 显示最终消息
    document.getElementById('final-message-1').textContent = insights.finalMessage[0];
    document.getElementById('final-message-2').innerHTML = `<strong>${insights.finalMessage[1]}</strong>`;
    document.getElementById('message-section').style.display = 'block';
    
    // 显示继续按钮
    document.getElementById('continue-btn').style.display = 'block';
}

// 监听回车键发送
function setupInputListener() {
    const input = document.getElementById('user-input');
    if (input) {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
}

// 全局存储计算结果
let currentResults = null;

// 绘制雷达图（根据实际答题结果）
function drawRadarChart() {
    const canvas = document.getElementById('radarChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 100;
    
    // 根据实际答题结果计算四个维度的分数
    const dimensionScores = calculateDimensionScores();
    
    const data = [
        { label: '战略思维', value: dimensionScores.strategic_thinking, color: '#60a5fa' },
        { label: '执行力', value: dimensionScores.execution, color: '#93c5fd' },
        { label: '影响力', value: dimensionScores.influence, color: '#bfdbfe' },
        { label: '关系建立', value: dimensionScores.relationship, color: '#dbeafe' }
    ];
    
    // 更新图例显示
    updateRadarLegend(data);
    
    const angles = data.map((_, i) => (Math.PI * 2 * i) / data.length - Math.PI / 2);
    
    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 绘制背景网格
    for (let i = 1; i <= 5; i++) {
        ctx.beginPath();
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1;
        const r = (radius * i) / 5;
        
        angles.forEach((angle, j) => {
            const x = centerX + r * Math.cos(angle);
            const y = centerY + r * Math.sin(angle);
            if (j === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.closePath();
        ctx.stroke();
    }
    
    // 绘制轴线
    angles.forEach(angle => {
        ctx.beginPath();
        ctx.strokeStyle = '#e2e8f0';
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle));
        ctx.stroke();
    });
    
    // 绘制数据区域
    ctx.beginPath();
    ctx.fillStyle = 'rgba(59, 130, 246, 0.2)';
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    
    data.forEach((d, i) => {
        const r = (radius * d.value) / 100;
        const x = centerX + r * Math.cos(angles[i]);
        const y = centerY + r * Math.sin(angles[i]);
        
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });
    
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    // 绘制数据点
    data.forEach((d, i) => {
        const r = (radius * d.value) / 100;
        const x = centerX + r * Math.cos(angles[i]);
        const y = centerY + r * Math.sin(angles[i]);
        
        ctx.beginPath();
        ctx.fillStyle = d.color;
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();
        
        // 白色边框
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
    });
    
    // 绘制标签
    ctx.font = '12px sans-serif';
    ctx.fillStyle = '#64748b';
    ctx.textAlign = 'center';
    
    data.forEach((d, i) => {
        const labelR = radius + 25;
        const x = centerX + labelR * Math.cos(angles[i]);
        const y = centerY + labelR * Math.sin(angles[i]);
        ctx.fillText(d.label, x, y + 4);
    });
}

// 计算四个维度的分数
function calculateDimensionScores() {
    const themeCounts = {};
    answers.forEach(a => {
        themeCounts[a.theme] = (themeCounts[a.theme] || 0) + 1;
    });
    
    // 战略思维 = 搜集 + 专注 + 分析
    const strategic_thinking = Math.min(100, Math.round(
        ((themeCounts['搜集'] || 0) + (themeCounts['专注'] || 0) + (themeCounts['分析'] || 0)) / 6 * 100
    ));
    
    // 执行力 = 系统 + 执行
    const execution = Math.min(100, Math.round(
        ((themeCounts['系统'] || 0) + (themeCounts['执行'] || 0)) / 4 * 100
    ));
    
    // 影响力 = 成就
    const influence = Math.min(100, Math.round(
        ((themeCounts['成就'] || 0)) / 2 * 100
    ));
    
    // 关系建立 = 共情 + 意义
    const relationship = Math.min(100, Math.round(
        ((themeCounts['共情'] || 0) + (themeCounts['意义'] || 0)) / 4 * 100
    ));
    
    return { strategic_thinking, execution, influence, relationship };
}

// 更新雷达图图例
function updateRadarLegend(data) {
    const legendItems = document.querySelectorAll('.radar-legend .legend-item span:last-child');
    data.forEach((d, i) => {
        if (legendItems[i]) {
            legendItems[i].textContent = `${d.label} ${d.value}分`;
        }
    });
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    goToPage('home');
});
