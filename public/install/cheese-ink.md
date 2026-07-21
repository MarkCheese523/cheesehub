# cheese-ink 安装指南（Agent 专用）

## 概述

cheese-ink 是「芝士青年笔记插图生成器」Skill：选择角色 + 描述场景/情绪/对话 → 生成 Q 版蜡笔手绘风格漫画插图（黑+荧光绿双色、鸟山明表情，调 ZenMux Gemini 生图）。Agent 读取本文档后，按以下步骤为用户完成安装。

## 一、下载并解压到当前 Agent 的 skills 目录

⚠️ 必须解压到**当前 Agent 实际识别的 skills 目录**，否则不会被加载。常见路径：

- Claude Code: `~/.claude/skills/`
- Kimi Code: `~/.kimi/skills/` 或 Agent 配置的技能目录
- Cursor: `~/.cursor/skills/`
- Windsurf: `~/.codeium/windsurf/skills/` 或项目下 `.windsurf/skills/`
- Codex: `~/.codex/skills/` 或项目下 `.agents/skills/`
- Gemini CLI: `~/.gemini/skills/`

执行（把 `<SKILLS_DIR>` 替换为上面确定的目录）：

```bash
mkdir -p <SKILLS_DIR>
curl -fsSL -o /tmp/cheese-ink.zip https://markcheese523.github.io/cheesehub/skills/cheese-ink.zip
unzip -o /tmp/cheese-ink.zip -d <SKILLS_DIR>/
```

解压后应存在 `<SKILLS_DIR>/cheese-ink/SKILL.md`。若上述 URL 不可达，请向用户索要 `cheese-ink.zip` 的本地文件路径，改用本地文件解压。

## 二、配置 API Key

cheese-ink 通过 ZenMux API 调用 `google/gemini-3-pro-image` 生图，需要 API Key：

```bash
mkdir -p ~/.cheese-ink
cat > ~/.cheese-ink/config.json <<'EOF'
{
  "api_key": "sk-...",
  "model": "google/gemini-3-pro-image"
}
EOF
```

如果用户还没有 ZenMux API Key，提醒用户先去申请，并把 `sk-...` 替换为真实 Key。不要编造 Key。

## 三、验证

```bash
ls <SKILLS_DIR>/cheese-ink/SKILL.md <SKILLS_DIR>/cheese-ink/characters.json <SKILLS_DIR>/cheese-ink/scripts/generate.py
```

三个文件都在即安装成功。提醒用户：**重启 Agent 会话后 Skill 才会被加载**。

## 四、使用方式

安装后，用户对 Agent 说以下任意触发词即可生图：

「生图」「生成插图」「笔记配图」「芝士插图」「画一个」「帮我画」

首次使用会让用户选角色（卷卷 / Mark / Bella），再收集场景、对话、情绪三个变量，生成图片保存在 skill 目录的 `output/` 下。
