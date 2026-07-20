# Cheese Ink 🖋️

芝士青年笔记插图生成器 — Claude Code Skill。

选择角色 + 描述场景/情绪/对话 → 自动生成 Q 版蜡笔手绘风格漫画插图。

## 使用

在 Claude Code 中对话式触发（通过 `/cheese-ink` skill），无需 CLI。

## 结构

```
cheese-ink/
├── SKILL.md           # Skill 指令（Agent 入口）
├── characters.json    # 角色注册表
├── characters/        # 角色参考图
├── scripts/
│   └── generate.py    # 调 ZenMux API 生图
└── output/            # 生成的插图
```
