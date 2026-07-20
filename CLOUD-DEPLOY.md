# CheeseHub — 云端部署说明（给云端 Agent 看）

这是一个完整的 Vite + React + TS + Tailwind 静态网站项目（个人 Skill 目录站「CheeseHub」），请在云端完成部署：

## 部署步骤

1. `npm install`（所有依赖均为公开 npm 包，包括 `kimi-plugin-inspect-react`）
2. `npm run build`（tsc + vite build，产物在 `dist/`，纯静态）
3. 将 `dist/` 部署为公开静态网站。项目 `vite.config.ts` 已设 `base: './'`，支持任意子路径
4. **部署拿到公网域名后，必须做 URL 替换再重新构建部署一次**：
   - `src/lib/skill-data.ts` 中的 `installDocUrl` 和 `installPrompt`（当前是 `http://localhost:7100/...`）
   - `public/install/cheese-ink.md` 中所有 `http://localhost:7100`
   - 把 `http://localhost:7100` 全部替换为最终公网 origin（如 `https://xxx.kimi.link`），重新 `npm run build` 并更新部署

## 站点结构

- `src/pages/HomePage.tsx` — 首页（Hero / marquee / skill 卡片 / 安装区 / 页脚）
- `src/pages/SkillDetailPage.tsx` — cheese-ink 详情页（SKILL.md 渲染 / 角色 / 示例 / 文件）
- `src/lib/skill-data.ts` — 所有 skill 元数据（新增 skill 只需在这里加条目 + public 下加资产）
- `public/skills/cheese-ink.zip` — 可下载的 skill 安装包
- `public/install/cheese-ink.md` — Agent 安装文档（用户把提示词发给自己的 AI 完成安装）

## 验收标准

- 首页和详情页（点击卡片进入）均能打开，暗色主题、荧光绿强调色
- `/install/cheese-ink.md` 可通过公网 URL 直接访问（这是给 AI 读的安装文档）
- `/skills/cheese-ink.zip` 可下载（约 11MB）
- 页面上的「复制安装提示词」按钮复制的内容中，URL 已是公网域名而非 localhost
