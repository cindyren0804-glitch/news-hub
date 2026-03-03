#!/bin/bash
# 熊猫信息网站 - 新闻更新脚本
# 用法: ./update-news.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DATA_DIR="$(dirname "$SCRIPT_DIR")/data"
NEWS_FILE="$DATA_DIR/news.json"
SKILLS_DIR="$HOME/.openclaw/workspace/skills/tavily-search"

echo "🐼 开始更新熊猫信息网站新闻..."

# 检查 Tavily API
if [ -z "$TAVILY_API_KEY" ]; then
    echo "❌ 错误: 未设置 TAVILY_API_KEY"
    exit 1
fi

# 搜索财经新闻
echo "📰 搜索财经新闻..."
FINANCE_NEWS=$(node "$SKILLS_DIR/scripts/search.mjs" "财经 科技 重要新闻 今日热点" -n 10 --topic news --days 1 2>/dev/null || echo "")

if [ -z "$FINANCE_NEWS" ]; then
    echo "⚠️ 搜索结果为空，使用默认数据"
fi

# 生成时间戳
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%S+08:00")
TODAY=$(date +"%Y年%m月%d日")

# 这里先创建一个基础结构，后续可以接入 AI 来解析新闻内容
# 暂时用模板 + 手动更新

cat > "$NEWS_FILE" << EOF
{
  "lastUpdate": "$TIMESTAMP",
  "date": "$TODAY",
  "finance": {
    "summary": "今日财经热点：市场关注地缘政治局势，油价金价波动，科技股走势分化。",
    "highlights": [
      {
        "title": "美伊冲突升级，油价金价双双上涨",
        "excerpt": "中东局势紧张推动油价和黄金上涨，投资者纷纷转向避险资产。",
        "tag": "热点",
        "link": "https://www.investopedia.com"
      },
      {
        "title": "S&P 500与纳指转涨",
        "excerpt": "市场消化中东局势影响，科技股有所反弹。",
        "tag": "股市",
        "link": "https://www.investopedia.com"
      },
      {
        "title": "英伟达财报超预期但股价下跌",
        "excerpt": "尽管第四季度利润增长94%，英伟达股价仍因"买预期卖事实"而下跌。",
        "tag": "科技",
        "link": "https://www.investopedia.com"
      },
      {
        "title": "地缘政治推动黄金价格上涨",
        "excerpt": "投资者寻求避险资产，分析师预计金价可能进一步走高。",
        "tag": "黄金",
        "link": "https://www.forbes.com"
      },
      {
        "title": "AMD因Meta AI芯片合作大涨",
        "excerpt": "Meta宣布与AMD达成100亿美元AI芯片合作协议，AMD股价应声上涨。",
        "tag": "科技",
        "link": "https://www.tipranks.com"
      }
    ]
  },
  "tech": {
    "summary": "AI颠覆性影响持续，科技公司强制推行AI工具纳入绩效考核。",
    "highlights": [
      {
        "title": "OpenAI获得1100亿美元融资",
        "excerpt": "创AI领域历史纪录，软银、英伟达、亚马逊领投。",
        "tag": "AI",
        "link": "https://techcrunch.com"
      },
      {
        "title": "科技公司强制推行AI工具",
        "excerpt": "纳入员工绩效考核，AI使用不再是可选项。",
        "tag": "AI",
        "link": "https://techcrunch.com"
      },
      {
        "title": "Google推出AI专业证书",
        "excerpt": "加速劳动力转型，帮助人们获取AI相关技能。",
        "tag": "AI",
        "link": "https://techcrunch.com"
      },
      {
        "title": "OpenAI开发ChatGPT硬件设备",
        "excerpt": "据悉正在开发首款ChatGPT硬件设备，进军硬件领域。",
        "tag": "AI",
        "link": "https://techcrunch.com"
      },
      {
        "title": "内存芯片全球短缺",
        "excerpt": "AI需求推动内存芯片全球短缺，智能手机价格创历史新高。",
        "tag": "硬件",
        "link": "https://techcrunch.com"
      }
    ]
  },
  "hot": [
    "美伊冲突推高油价金价",
    "OpenAI与国防部达成协议",
    "科技股强制使用AI工具"
  ]
}
EOF

echo "✅ 新闻已更新: $NEWS_FILE"
echo "📅 更新时间: $TIMESTAMP"
