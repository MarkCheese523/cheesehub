export interface Character {
  id: string
  name: string
  image: string
  description: string
}

export interface SkillFile {
  path: string
  label: string
  size: string
  href: string
  isDir?: boolean
}

export const SKILL = {
  id: 'cheese-ink',
  name: 'cheese-ink',
  author: 'mark',
  version: 'v1.0.1',
  updated: '2026-07',
  description: '选择角色 + 描述场景/情绪/对话 → 生成 Q 版蜡笔手绘风格漫画插图',
  cardTags: ['生图', '插图', '笔记配图'],
  detailTags: ['image-generation', '插图', '笔记配图', 'crayon', 'gemini'],
  triggers: ['生图', '生成插图', '笔记配图', '芝士插图', '画一个', '帮我画'],
  zipUrl: 'skills/cheese-ink.zip',
  zipSize: '10.7 MB',
  installCommand: 'unzip cheese-ink.zip -d ~/.claude/skills/',
  // Agent 安装范式：把提示词发给 AI，AI 读取 install 文档自行完成安装
  installDocUrl: 'https://markcheese523.github.io/cheesehub/install/cheese-ink.md',
  installPrompt: '请根据 https://markcheese523.github.io/cheesehub/install/cheese-ink.md，安装 cheese-ink。',
} as const

export const CHARACTERS: Character[] = [
  {
    id: 'juanjuan',
    name: '卷卷',
    image: 'skills/cheese-ink/web/char-juanjuan.jpg',
    description: '短发年轻女生，肤色白皙，身穿白色衬衫配领带，圆脸，表情略带无奈',
  },
  {
    id: 'mark',
    name: 'Mark',
    image: 'skills/cheese-ink/web/char-mark.jpg',
    description: '短发男生，戴圆框眼镜，身穿蓝色连帽卫衣内搭白T恤，表情友好略带疲惫',
  },
  {
    id: 'bella',
    name: 'Bella',
    image: 'skills/cheese-ink/web/char-bella.jpg',
    description: '棕色长直发女生，肤色白皙，身穿米白色针织衫/开衫，表情温柔',
  },
]

export const SKILL_FILES: SkillFile[] = [
  {
    path: 'SKILL.md',
    label: 'SKILL.md',
    size: '4.3 KB',
    href: 'skills/cheese-ink/SKILL.md',
  },
  {
    path: 'characters.json',
    label: 'characters.json',
    size: '0.6 KB',
    href: 'skills/cheese-ink/characters.json',
  },
  {
    path: 'scripts/generate.py',
    label: 'scripts/generate.py',
    size: '4.6 KB',
    href: 'skills/cheese-ink/scripts/generate.py',
  },
  {
    path: 'characters/卷卷.png',
    label: 'characters/卷卷.png',
    size: '1.9 MB',
    href: 'skills/cheese-ink/characters/卷卷.png',
  },
  {
    path: 'characters/Mark.png',
    label: 'characters/Mark.png',
    size: '2.3 MB',
    href: 'skills/cheese-ink/characters/Mark.png',
  },
  {
    path: 'characters/Bella.png',
    label: 'characters/Bella.png',
    size: '6.5 MB',
    href: 'skills/cheese-ink/characters/Bella.png',
  },
  {
    path: 'README.md',
    label: 'README.md',
    size: '0.6 KB',
    href: 'skills/cheese-ink/README.md',
  },
]

export interface ChangelogEntry {
  version: string
  date: string
  summary: string
}

export const CHANGELOG: ChangelogEntry[] = [
  {
    version: 'v1.0.1',
    date: '2026-07-21',
    summary: '模型迁移：preview 模型过期，切换到稳定版 google/gemini-3-pro-image',
  },
  {
    version: 'v1.0.0',
    date: '2026-07-17',
    summary: '首个版本：三角色（卷卷 / Mark / Bella）、ZenMux Gemini 生图、固定 21:9 2K 输出',
  },
]

export const MARQUEE_TEXT =
  '....:: cheesehub/cheeseheart ::.... skills agents 生图 skill.md characters.json zenmux gemini Q版蜡笔 黑+荧光绿 鸟山明表情 >>> install draw publish @@ 卷卷 @@ Mark @@ Bella ---- ink illustrations notes prompts'

export const INSTALL_SNIPPET: { type: 'comment' | 'cmd' | 'plain'; text: string }[] = [
  { type: 'comment', text: '# 下载并解压到 Claude Code skills 目录' },
  { type: 'cmd', text: 'curl -LO ./skills/cheese-ink.zip' },
  { type: 'cmd', text: 'unzip cheese-ink.zip -d ~/.claude/skills/' },
  { type: 'cmd', text: '# 配置 API Key' },
  { type: 'cmd', text: 'cat > ~/.cheese-ink/config.json <<EOF' },
  { type: 'plain', text: '{ "api_key": "sk-...", "model": "google/gemini-3-pro-image" }' },
  { type: 'plain', text: 'EOF' },
]
