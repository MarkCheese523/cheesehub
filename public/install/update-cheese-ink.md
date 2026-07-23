# cheese-ink 更新指南（Agent 专用）

## 概述

将用户已安装的 cheese-ink 更新到最新版（当前 v1.0.1）。

**核心原则：只更新 skill 逻辑文件，完整保留用户数据。** 用户安装后可能添加了自己的角色、生成过图片，这些绝不能被更新覆盖。

## 一、定位已安装的 skill

在常见 skills 目录中找到包含 `cheese-ink/SKILL.md` 的位置：

- Claude Code: `~/.claude/skills/`
- Kimi Code: `~/.kimi/skills/` 或 Agent 配置的技能目录
- Cursor: `~/.cursor/skills/`
- Windsurf: `~/.codeium/windsurf/skills/` 或项目下 `.windsurf/skills/`
- Codex: `~/.codex/skills/` 或项目下 `.agents/skills/`
- Gemini CLI: `~/.gemini/skills/`

如果各处都没有 `cheese-ink/SKILL.md`，说明用户还没安装过——停止更新流程，改为引导安装（读取 https://markcheese523.github.io/cheesehub/install/cheese-ink.md 执行安装）。

## 二、检查当前版本

读取 `<SKILLS_DIR>/cheese-ink/SKILL.md` frontmatter 中的 `version`。

- 已是 `1.0.1` → 告知用户「已是最新版」，结束，不要做其他操作。
- 低于 `1.0.1` → 继续下面的更新步骤。

## 三、下载新版到临时目录

```bash
curl -fsSL -o /tmp/cheese-ink-update.zip https://markcheese523.github.io/cheesehub/skills/cheese-ink.zip
rm -rf /tmp/cheese-ink-new && mkdir -p /tmp/cheese-ink-new
unzip -q -o /tmp/cheese-ink-update.zip -d /tmp/cheese-ink-new/
```

若 URL 不可达，向用户索要新版 zip 的本地路径。

## 四、执行更新（保护用户数据）

按以下规则同步，**不要整个目录覆盖**：

1. **逻辑文件直接覆盖**（这些不含用户数据）：
   - `SKILL.md`、`README.md`、`CLAUDE.md`、`scripts/generate.py`
2. **characters.json 合并**（用户可能加过角色）：
   - 以用户现有 `characters.json` 为基础
   - 确保三个默认角色（卷卷 / Mark / Bella）的条目存在，缺失才从新版补入
   - 用户自己新增的角色条目一律保留，不删不改
3. **characters/ 参考图**：仅当新版包里的默认角色图（卷卷.png / Mark.png / Bella.png）在用户目录中缺失时才复制，已存在的一律不覆盖；用户自己添加的参考图不动
4. **output/ 目录**：完全不动（用户生成的图片都在这里）

## 五、配置迁移（v1.0.0 → v1.0.1 必做）

旧版默认模型 `google/gemini-3-pro-image-preview` 已过期。检查 `~/.cheese-ink/config.json`：

- 若 `model` 字段为 `google/gemini-3-pro-image-preview` → 改为 `google/gemini-3-pro-image`
- 若没有 `model` 字段 → 不用动（新版脚本默认值已是稳定版）
- **绝不修改 `api_key` 字段**

## 六、验证与收尾

```bash
grep '^version' <SKILLS_DIR>/cheese-ink/SKILL.md   # 应显示 1.0.1
rm -rf /tmp/cheese-ink-update.zip /tmp/cheese-ink-new
```

确认版本号后告知用户：更新完成，**重启 Agent 会话后生效**；用户自建角色和已生成图片均已保留。
