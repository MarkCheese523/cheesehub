---
name: cheese-ink
description: 芝士青年笔记插图生成器。选择角色 + 描述场景/情绪/对话 → 生成 Q 版蜡笔手绘风格漫画插图。TRIGGER — 当用户说"生图"、"生成插图"、"笔记配图"、"cheese-ink"、"芝士插图"、"画一个"、"帮我画"等与生成笔记插图相关的表达时，自动执行下方工作流。
version: 1.0.1
allowed-tools: Bash Read Write
---

# Cheese Ink 🖋️ — 芝士青年笔记插图生成器

> Q版蜡笔简笔手绘风格 | 黑+荧光绿双色 | 鸟山明表情 | ZenMux Gemini 生图

## 工作流

当用户请求生图时，按以下步骤执行：

### Step 1 — 确定角色

读取 `characters.json`，向用户展示可选角色列表。如果用户已经说了角色名，直接匹配。

展示格式：
```
🎭 可选角色：
  1. 小芝 — 主角，戴眼镜的芝士青年
  2. 老青 — 配角，胡子大叔
  3. ...
```

如果用户还没指定角色，问一句"用哪个角色？"。

如果 `characters.json` 为空，告诉用户还没添加角色，需要先添加角色参考图。

### Step 2 — 收集变量

从用户输入中提取三个变量。缺哪个就问哪个：

| 变量 | 说明 | 示例 |
|------|------|------|
| `scene` | 场景/上下文，角色面对什么 | "做一条从剧本到成片的短剧工程链路，涉及很多模型..." |
| `dialogue` | 对话气泡内容 | "又更新了？？？？" |
| `emotion` | 情绪 | "头很大、很烦躁" |

**原则**：用户一句话里可能包含了全部三个（"老青面对一堆bug，很烦躁地说'又崩了'"），能自动提取的就不要再问。实在缺的才追问。

### Step 3 — 渲染 Prompt

把变量填入下方模板，得到一个完整的中文 prompt：

```
创作一幅仅包含chibi头像的单色q版蜡笔简笔手绘风格漫画，画笔颜色为黑色和荧光绿色两个颜色。

人物：参考参考图形象。
场景：{scene}
情绪：{emotion}，人物表情模仿鸟山明风格。
对话气泡：人物说："{dialogue}"
画面中散布着工作内容的气泡标签，仅保留关键词简写。
```

把渲染后的 prompt 展示给用户确认（可选，如果用户说"直接生成"就跳过确认）。

### Step 4 — 调用 API 生图

执行：
```bash
python3 scripts/generate.py \
  --character-image characters/<角色图片文件名> \
  --scene "<场景文本>" \
  --dialogue "<对话文本>" \
  --emotion "<情绪文本>" \
  --output output/ink_$(date +%Y%m%d_%H%M%S).png
```

脚本会：
- 读取 `~/.cheese-ink/config.json` 获取 API Key
- 把参考图和 prompt 传入 Gemini 模型生成图片（固定 21:9 比例，2K 分辨率）
- 调用 ZenMux API（模型：`google/gemini-3-pro-image`，Vertex AI 协议）

### Step 5 — 告知结果

生成成功后告知用户：
```
✅ 插图已生成：output/ink_20260717_143052.png
```

如果失败，显示错误信息并建议排查方向（API key 是否正确、网络是否可达）。

---

## 角色管理

用户可以通过对话管理角色，Agent 直接读写 `characters.json`。

### 添加角色

用户说"添加角色"时，收集：
- 角色名字
- 参考图路径（把图片放到 `characters/` 目录）
- 备注（可选）

然后更新 `characters.json`：
```json
{
  "characters": [
    ...existing,
    {
      "name": "<名字>",
      "image": "characters/<文件名>",
      "note": "<备注>"
    }
  ]
}
```

### 查看角色

用户说"查看角色"时，读取 `characters.json` 展示列表。

### 删除角色

用户说"删除角色 <名字>"时，从 `characters.json` 中移除对应条目（不删参考图文件）。

---

## 配置

API Key 存放在 `~/.cheese-ink/config.json`：

```json
{
  "api_key": "sk-...",
  "model": "google/gemini-3-pro-image"
}
```

---

## 注意事项

- 生成的图片保存在项目的 `output/` 目录，不会被 git 追踪
- 角色参考图放在 `characters/` 目录，会被 git 追踪
- Prompt 中的"参考图形象"会被替换为实际传入的图片（base64），不需要在文字中描述角色外观
- 每次生图耗时取决于 ZenMux API 响应速度，通常 5-20 秒
- 如果用户连续生图，复用已确认的角色和 prompt 模式，减少重复询问
