from pathlib import Path

from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import base64
import mimetypes
from openai import OpenAI

from style_prompts import STYLE_PROMPTS

# ==========================================
# 1. 基础配置
# ==========================================
API_KEY = "f6f12466-0724-4365-a43a-782e6513eaab"  # 请替换为你的真实 Key
MODEL_ENDPOINT_ID = "ep-20260313122248-2ds4p"

client = OpenAI(
    base_url="https://ark.cn-beijing.volces.com/api/v3",
    api_key=API_KEY,
)

app = FastAPI(title="画龙点睛 API", version="1.0")

# 极其重要：配置 CORS 跨域，允许前端 (比如 localhost:3000 或 Vite 端口) 访问
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================================
# 2. 文化风格 Prompt：见 style_prompts.py（两步任务 + 约束 + 各风格美学）
# ==========================================

# ==========================================
# 3. 核心 API 接口
# ==========================================
@app.post("/api/colorize")
async def colorize_endpoint(
        file: UploadFile = File(...),
        style_id: str = Form(...)
):
    try:
        # 1. 校验风格是否存在
        if style_id not in STYLE_PROMPTS:
            raise HTTPException(status_code=400, detail="未知的风格 ID")

        prompt = STYLE_PROMPTS[style_id]
        print(f"[{file.filename}] 请求上色，风格ID: {style_id}")

        # 2. 读取图片到内存并转为 Base64 (纯内存操作，极速)
        file_bytes = await file.read()
        mime_type = mimetypes.guess_type(file.filename)[0] or 'image/png'
        encoded_string = base64.b64encode(file_bytes).decode('utf-8')
        image_input = f"data:{mime_type};base64,{encoded_string}"

        # 3. 调用豆包大模型
        print("正在调用豆包大模型进行渲染...")
        response = client.images.generate(
            model=MODEL_ENDPOINT_ID,
            prompt=prompt,
            size="2K",
            response_format="url",
            extra_body={"image": image_input, "watermark": False}
        )

        # 4. 提取并返回结果
        if response.data and len(response.data) > 0:
            result_url = response.data[0].url
            print("✅ 渲染成功！")
            return {"status": "success", "url": result_url}
        else:
            raise HTTPException(status_code=500, detail="大模型未返回有效图片")

    except Exception as e:
        print(f"❌ 接口报错: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


# 若已执行 npm run build，则同端口托管前端静态资源，外网只需开放一个端口（如 8000）
_FRONTEND_DIST = Path(__file__).resolve().parent.parent / "frontend" / "dist"
if _FRONTEND_DIST.is_dir():
    app.mount(
        "/",
        StaticFiles(directory=str(_FRONTEND_DIST), html=True),
        name="spa",
    )


if __name__ == '__main__':
    # 仅用于本地测试运行，正式环境建议在终端用 uvicorn main:app --reload 启动
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)