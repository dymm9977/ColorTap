import os
import sys
import base64
import mimetypes
import requests
from datetime import datetime
from pathlib import Path

from openai import OpenAI

# 与 backend 共用同一套提示词（需在项目根目录下运行本脚本）
_BACKEND = Path(__file__).resolve().parent / "backend"
if str(_BACKEND) not in sys.path:
    sys.path.insert(0, str(_BACKEND))
from style_prompts import STYLE_PROMPTS as _FULL_PROMPTS, STYLE_NAMES

API_KEY = "f6f12466-0724-4365-a43a-782e6513eaab"
MODEL_ENDPOINT_ID = "ep-20260313122248-2ds4p"

client = OpenAI(
    base_url="https://ark.cn-beijing.volces.com/api/v3",
    api_key=API_KEY,
)

# CLI 用：名称 + 完整 prompt（与 API 一致）
STYLE_PROMPTS = {
    k: {"name": STYLE_NAMES[k], "prompt": _FULL_PROMPTS[k]}
    for k in STYLE_NAMES
}


def image_to_base64_uri(file_path: str) -> str:
    """将本地图片读取为 Base64 Data URI"""
    mime_type = mimetypes.guess_type(file_path)[0] or 'image/png'
    with open(file_path, "rb") as f:
        encoded = base64.b64encode(f.read()).decode('utf-8')
    return f"data:{mime_type};base64,{encoded}"


def colorize_lineart(image_path: str, prompt: str) -> str:
    """调用豆包图生图大模型"""
    print(f"🚀 正在调用大模型 ({MODEL_ENDPOINT_ID}) 进行生成...")
    image_input = image_path if image_path.startswith("http") else image_to_base64_uri(image_path)

    response = client.images.generate(
        model=MODEL_ENDPOINT_ID,
        prompt=prompt,
        size="2K",
        response_format="url",
        extra_body={"image": image_input, "watermark": False}
    )
    return response.data[0].url if response.data else None


def download_image(img_url: str, output_dir="output"):
    """下载图片到本地并按时间戳命名"""
    os.makedirs(output_dir, exist_ok=True)
    filename = f"colorized_{datetime.now().strftime('%Y%m%d_%H%M%S')}.png"
    save_path = os.path.join(output_dir, filename)

    print("⬇️ 正在将图片下载到本地...")
    res = requests.get(img_url, timeout=15)
    res.raise_for_status()

    with open(save_path, 'wb') as f:
        f.write(res.content)
    print(f"✅ 下载成功！图片保存在: {os.path.abspath(save_path)}")


def main():
    # 你的本地线稿路径
    sample_lineart = "img/Snipaste_2026-03-13_10-35-38.png"

    # 构建交互式命令行界面
    print("========================================")
    print("      ✨ 画龙点睛：线稿自动上色助手 ✨      ")
    print("========================================")
    print("请选择您想要的上色风格：")
    for key, style in STYLE_PROMPTS.items():
        print(f"  [{key}] {style['name']}")
    print("========================================")

    choice = input("👉 请输入风格编号 (1/2/3): ").strip()

    if choice not in STYLE_PROMPTS:
        print("❌ 无效的输入，程序退出。")
        return

    selected_style = STYLE_PROMPTS[choice]
    print(f"\n✅ 您选择了: {selected_style['name']}")

    try:
        # 1. 生成图片链接
        url = colorize_lineart(sample_lineart, selected_style['prompt'])
        if url:
            print(f"🔗 临时生成链接 (1小时内有效): {url}")
            # 2. 自动下载到本地 output 目录
            download_image(url)
    except Exception as e:
        print(f"❌ 运行出错: {e}")


if __name__ == '__main__':
    main()