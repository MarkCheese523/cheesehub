#!/usr/bin/env python3
"""Cheese Ink — 调 ZenMux API (Gemini) 生成笔记插图。

用法:
  python3 generate.py \
    --character-image characters/卷卷.png \
    --scene "每天都在改图" \
    --dialogue "怎么又来图了！" \
    --emotion "烦躁、崩溃" \
    --output output/ink_20260717_143052.png
"""

import argparse
import json
import sys
from pathlib import Path

PROMPT_TEMPLATE = (
    "创作一幅仅包含chibi头像的单色q版蜡笔简笔手绘风格漫画，"
    "画笔颜色为黑色和荧光绿色两个颜色。\n\n"
    "人物：参考参考图形象。\n"
    "场景：{scene}\n"
    "情绪：{emotion}，人物表情模仿鸟山明风格。\n"
    '对话气泡：人物说："{dialogue}"\n'
    "画面中散布着工作内容的气泡标签，仅保留关键词简写。"
)


def load_config() -> dict:
    """读取 ~/.cheese-ink/config.json 获取 API key 和模型名."""
    config_path = Path.home() / ".cheese-ink" / "config.json"
    if not config_path.exists():
        print(f"❌ 配置文件不存在: {config_path}", file=sys.stderr)
        print("   请创建该文件，内容格式:", file=sys.stderr)
        print('   {"api_key": "sk-...", "model": "google/gemini-3-pro-image"}', file=sys.stderr)
        sys.exit(1)

    with open(config_path) as f:
        config = json.load(f)

    api_key = config.get("api_key", "")
    if not api_key:
        print("❌ config.json 中缺少 api_key", file=sys.stderr)
        sys.exit(1)

    return config


def main():
    parser = argparse.ArgumentParser(description="Cheese Ink — 生成笔记插图")
    parser.add_argument("--character-image", required=True,
                        help="角色参考图路径 (e.g. characters/卷卷.png)")
    parser.add_argument("--scene", required=True, help="场景描述")
    parser.add_argument("--dialogue", required=True, help="对话气泡内容")
    parser.add_argument("--emotion", required=True, help="情绪描述")
    parser.add_argument("--output", required=True, help="输出图片路径")
    args = parser.parse_args()

    # 1. 读取配置
    config = load_config()
    api_key = config["api_key"]
    model = config.get("model", "google/gemini-3-pro-image")

    # 2. 渲染 prompt
    prompt = PROMPT_TEMPLATE.format(
        scene=args.scene,
        dialogue=args.dialogue,
        emotion=args.emotion,
    )
    print(f"📝 Prompt ({len(prompt)} chars):")
    print(f"   {prompt[:300]}...")
    print()

    # 3. 读取参考图
    image_path = Path(args.character_image)
    if not image_path.exists():
        print(f"❌ 参考图不存在: {args.character_image}", file=sys.stderr)
        sys.exit(1)

    print(f"🖼️  读取参考图: {args.character_image} ({image_path.stat().st_size} bytes)")
    from PIL import Image
    img = Image.open(image_path)

    # 4. 调用 ZenMux API (Vertex AI 协议)
    print(f"🎨 调用 ZenMux API (model: {model})...")
    try:
        from google import genai
        from google.genai import types
    except ImportError:
        print("❌ 请先安装 google-genai: pip install google-genai", file=sys.stderr)
        sys.exit(1)

    client = genai.Client(
        api_key=api_key,
        vertexai=True,
        http_options=types.HttpOptions(
            api_version="v1",
            base_url="https://zenmux.ai/api/vertex-ai",
        ),
    )

    response = client.models.generate_content(
        model=model,
        contents=[prompt, img],
        config=types.GenerateContentConfig(
            response_modalities=["TEXT", "IMAGE"],
            image_config=types.ImageConfig(
                aspect_ratio="21:9",
                image_size="2K",
            ),
        ),
    )

    # 5. 提取并保存图片
    print("   ✓ API 响应成功，提取图片...")
    image_saved = False
    for i, part in enumerate(response.parts):
        if part.text is not None:
            print(f"   📝 文本响应: {part.text[:200]}...")
        elif part.inline_data is not None:
            image = part.as_image()
            output_path = Path(args.output)
            output_path.parent.mkdir(parents=True, exist_ok=True)
            image.save(str(output_path))
            file_size = output_path.stat().st_size
            print(f"✅ 图片已保存: {output_path} ({file_size} bytes)")
            image_saved = True

    if not image_saved:
        print("❌ 响应中没有图片数据", file=sys.stderr)
        print("   响应 parts:", [type(p).__name__ for p in response.parts], file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
