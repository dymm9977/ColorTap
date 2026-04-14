# 画龙点睛（Line Color）

基于 **火山方舟（豆包）图生图能力** 的传统文化线稿上色演示：上传白描线稿，选择一种国风配色意图，由大模型生成上色后的图片。适用于课程中体现 **中华传统色彩 / 非物质文化遗产** 与数字传播的结合。前端为 **React + Vite + Tailwind**，后端为 **FastAPI**，通过 OpenAI 兼容接口调用云端模型。

## 功能概览

| 模块 | 说明 |
|------|------|
| 前端 `frontend/` | 上传线稿、选择风格、**画卷展示**（竖幅画幅对比原稿与生成图）、**传统色卡**（每主题三种矿物/工艺色、**翻转卡片**展示来源与文史）、上色等待时仅在 **「点睛之作」画框内** 呈现水墨晕染与**与色卡绑定的宋词名句**轮播；可选 **背景音乐**（页内开关与版权署名）；支持局域网访问 |
| 后端 `backend/` | 接收 `multipart/form-data`，将线稿转 Base64 后调用 `images.generate`（图生图）；`style_prompts.py` 中风格 Prompt 与各主题三色意象对齐 |
| 脚本 `test_qwen.py` | 不启动 Web，在命令行里用固定本地图片测试调用与下载结果 |

**三种风格（与界面、接口 `style_id` 一致）**

- `1` — 青绿山水（石青、石绿、赭石等矿物设色意象）
- `2` — 敦煌壁画（青金石蓝、石青、丹红等壁画矿物色意象）
- `3` — 景泰蓝（天青、锡锑黄、金红胭脂等珐琅意象）

风格对应的英文 Prompt 写在后端 `style_prompts.py` → `STYLE_PROMPTS` 中，用于约束生成画风。

### 前端数据与主要文件（便于二次修改）

| 路径 | 作用 |
|------|------|
| `frontend/src/data/culturalPalettes.ts` | 各主题三色卡文案、**施彩等待词句**（`loadingCues`，与色卡下标一一对应） |
| `frontend/src/components/InkBloomPanel.tsx` | 「点睛之作」框内水墨动效与词句展示（非全屏） |
| `frontend/src/components/FlipColorCard.tsx` / `ThemeSection.tsx` | 色卡翻转与主题区 |
| `frontend/src/config/audio.ts` | 背景音乐 URL 与页脚署名信息 |

## 先确认你在哪个目录（避免「找不到 frontend / 无法导入 main」）

本仓库的**项目根**是包含 `backend/`、`frontend/`、`test_qwen.py` 的那一层，例如：

`/media/da/dym/Inclass/culture/line_color-master/`

若你的工作区是 **`Inclass` 根目录**（例如 `~/Inclass`），里面**没有**直接的 `frontend` 文件夹，需要先进入项目再操作：

```bash
cd culture/line_color-master
```

之后再按下文 `cd backend` / `cd frontend` 执行。**`uvicorn main:app` 必须在 `backend` 目录下运行**（该目录里有 `main.py`）；在 `Inclass` 或其它没有 `main.py` 的目录运行会报错：`Could not import module "main"`。

也可一条命令从任意位置启动后端（把路径换成你机器上的实际路径）：

```bash
cd /media/da/dym/Inclass/culture/line_color-master/backend && uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

依赖可以像你这样在任意目录安装（你已执行过）：

```bash
pip install -r /media/da/dym/Inclass/culture/line_color-master/backend/requirements.txt
```

只要 Python 环境一致即可；**启动 uvicorn 时仍要 `cd` 到 `backend`**。

## 环境要求

- **Python** 3.10+（建议 3.11）
- **Node.js** **18+** 即可运行当前前端（依赖已锁定 **Vite 5**；已在 Node 18.19 下验证 `npm run build` / `npm run dev`）。若你自行把 Vite 升到 8.x，则需要 **Node 20.19+**。
- **火山方舟** 账号：已开通与项目匹配的 **API Key** 与 **推理端点 ID**（图生图/图像生成类模型，需与 `main.py` 里调用方式一致）

## 0. 一条命令启动（在 `~/Inclass` 根目录）

若你平时终端停在 **`Inclass` 根目录**（例如 `~/Inclass`），不必先 `cd culture/...`，可直接：

```bash
cd ~/Inclass   # 或你的 Inclass 实际路径
chmod +x line_color_start.sh   # 仅首次
./line_color_start.sh
```

该脚本会调用 `culture/line_color-master/dev.sh`：**后台**启动后端（8000），再**前台**启动前端（Vite）；**Ctrl+C** 会结束前端并清理后端进程。若尚未执行过 `npm install`，脚本会在首次运行时自动在 `frontend/` 下安装依赖。

若已在 `backend/` 创建过 `.venv`，脚本会自动 `source` 该虚拟环境再启动 `uvicorn`。

**等价写法**（人在项目目录时）：

```bash
cd culture/line_color-master
chmod +x dev.sh   # 仅首次
./dev.sh
```

## 1. 配置密钥与端点（必做）

打开 `backend/main.py`，将其中 **`API_KEY`**、**`MODEL_ENDPOINT_ID`** 替换为你在 [火山方舟](https://console.volcengine.com/ark) 控制台里自己的密钥与端点。

> **安全提示**：不要把真实 Key 提交到公开仓库。若仓库里曾出现过示例 Key，请在控制台**轮换/作废**后改用新 Key。

可选：用环境变量管理（需自行改代码读取 `os.environ`），避免明文写在文件里。

## 2. 安装并启动后端

**先进入项目根**（含 `backend/` 的那一层），再进入 `backend`：

```bash
cd culture/line_color-master   # 若你当前在 Inclass 根目录
cd backend
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

**不想每次 cd**：在项目根目录执行（已提供脚本，需先 `chmod +x` 一次）：

```bash
chmod +x run_backend.sh run_frontend.sh   # 仅首次
./run_backend.sh
```

- 本机访问 API 文档：<http://127.0.0.1:8000/docs>
- 上色接口：`POST /api/colorize`，表单字段：`file`（图片文件）、`style_id`（字符串 `"1"` / `"2"` / `"3"`）

## 3. 安装并启动前端

新开一个终端，**先进入项目根**，再进入 `frontend`：

```bash
cd culture/line_color-master   # 若你当前在 Inclass 根目录
cd frontend
npm install
npm run dev
```

或使用脚本（依赖已 `npm install` 过）：

```bash
./run_frontend.sh
```

默认 Vite 开发服务器一般为 **<http://127.0.0.1:5173>**（以终端输出为准）。`package.json` 里已配置 `vite --host`，便于手机或其它设备通过局域网 IP 访问。

前端默认请求 **同源** 路径 **`/api/colorize`**（见 `src/apiBase.ts`）。开发时 Vite 会把 `/api` **代理**到本机 `127.0.0.1:8000`，因此别人只需访问 **一个链接**（页面所在端口，一般是 **5173**），**不必**再在浏览器里直连 `:8000`。

- 本机需同时运行：后端监听 **8000**，前端 **5173**（或 `dev.sh` / `line_color_start.sh` 一键起）。
- **局域网**：把 `http://你的电脑IP:5173` 发给同一 Wi‑Fi 下的设备即可；防火墙放行 **5173**（若仍走旧方式直连 8000，再额外放行 8000）。
- **外网临时演示**：可用 [ngrok](https://ngrok.com/) / [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/) 等，只穿透 **5173** 即可（后端仍只监听本机 127.0.0.1，由 Vite 代理转发）。
- **生产单端口**：先 `npm run build`，再只启动 FastAPI（见下文「单端口部署」），别人访问 **`http://服务器IP:8000/`** 即可。

## 4. 使用方式（Web）

1. 先启动后端，再启动前端。
2. 上传线稿（建议清晰的白描/线稿图）；在 **「二 · 择色定调」** 中选择风格。
3. 可在 **「三 · 传统色卡」** 中查看本主题三种传统色，**点击色卡翻面**阅读颜料来源与文史说明（上色过程中仍可浏览该区块）。
4. 点击 **「画龙点睛」** 开始生成；等待时 **「点睛之作」** 画框内会呈现水墨晕染动画，并轮播与当前**主题及色卡**对应的词句，不遮挡整页。
5. 生成成功后，右侧 **画卷展示** 中对比原稿与成图；将鼠标悬停在成图上可使用 **「保存画卷」** 在新标签打开临时 URL（链接通常有时效，请及时保存）。
6. 需要时可打开右下角 **琴音** 开关（背景音乐见页脚版权说明）。

若提示网络错误，请确认本机 **8000** 已运行 FastAPI（开发时由 Vite 代理 `/api`，用户浏览器地址栏里**不需要**出现 `:8000`）。

## 5. 命令行测试（`test_qwen.py`）

用于快速验证密钥、端点与模型是否可用，不依赖 Web。

1. 将脚本里的 `sample_lineart` 改为你本机的一张线稿路径（或使用项目内已有 `img/` 路径）。
2. 同样需保证 `API_KEY` 与 `MODEL_ENDPOINT_ID` 有效（脚本内与后端独立维护了一份配置，修改时请两处一致或抽成公共配置）。

```bash
cd culture/line_color-master   # 若你当前在 Inclass 根目录
# 建议在已安装依赖的虚拟环境中执行
python test_qwen.py
```

按提示输入 `1` / `2` / `3`，成功后会打印临时图片 URL，并尝试下载到 `output/` 目录。

## 6. 生产构建与单端口部署（可选）

```bash
cd culture/line_color-master/frontend
npm run build
cd ../backend
uvicorn main:app --host 0.0.0.0 --port 8000
```

构建完成后，`main.py` 会在存在 `frontend/dist` 时**挂载静态站点**，接口仍在 **`/api/colorize`**。访问 **`http://<服务器IP>:8000/`** 即可同时打开页面与调用 API，**只需对外暴露一个端口**。

`npm run preview` 也可配合已启动的后端使用（`vite.config` 已配置与 dev 相同的 `/api` 代理）。

生产环境仍需自行配置 HTTPS、限流与密钥管理；本仓库为课程/演示结构，未包含完整运维方案。

### 前后端分离（可选）

若前端与后端域名不同，在 `frontend/.env` 中设置 `VITE_API_BASE=https://你的后端域名`（不要末尾斜杠），再重新 `npm run build`。参考 `frontend/.env.example`。

## 7. 目录结构

```
line_color-master/
├── backend/
│   ├── main.py             # FastAPI 应用与 /api/colorize
│   ├── style_prompts.py    # 各风格英文 Prompt（含与三色卡呼应的 palette 提示）
│   └── requirements.txt    # Python 依赖
├── frontend/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── data/
│   │   │   └── culturalPalettes.ts   # 主题、三色卡、施彩词句 loadingCues
│   │   ├── components/               # InkBloomPanel、ThemeSection、FlipColorCard、MusicToggle 等
│   │   └── config/audio.ts           # 背景音乐配置与署名
│   ├── index.html
│   └── package.json
├── dev.sh                  # 可选：单终端一键起后端+前端
├── run_backend.sh          # 可选：从任意 cwd 仅启动后端
├── run_frontend.sh         # 可选：从任意 cwd 仅启动前端
├── test_qwen.py            # 命令行调用示例
└── README.md               # 本说明
```

## 常见问题

- **跨域**：后端已配置 `CORSMiddleware` 允许浏览器跨域；若仍失败，检查是否访问错端口或后端未启动。
- **生成失败**：核对方舟侧模型是否支持当前 `images.generate` 与 `extra_body`（图 + prompt）的调用方式；端点 ID 是否与模型一致。
- **手机连不上**：确认 `npm run dev` 带 `--host`，电脑与手机同一 Wi‑Fi，且本机防火墙放行对应端口。

## 8. 命令速查：首次安装与日常启动

### 首次在新环境安装依赖（仅此一次）

```bash
# Python 后端（任选其一：系统 Python / conda / venv）
pip install -r /media/da/dym/Inclass/culture/line_color-master/backend/requirements.txt

# 前端（需 Node 18+）
cd /media/da/dym/Inclass/culture/line_color-master/frontend && npm install
```

若你的路径是 `~/Inclass`，把上面绝对路径里的 `/media/da/dym/Inclass` 换成 `~/Inclass` 即可。

### 以后每次跑起来

**方式 A（推荐）**：在 **Inclass 根目录** 一条命令起后端 + 前端（单终端，`Ctrl+C` 会停掉两边）：

```bash
cd ~/Inclass
./line_color_start.sh
```

**方式 B**：两个终端分别启动（便于分别看日志）：

```bash
# 终端 1 — 后端（8000）
/media/da/dym/Inclass/culture/line_color-master/run_backend.sh

# 终端 2 — 前端（一般为 5173）
/media/da/dym/Inclass/culture/line_color-master/run_frontend.sh
```

打开浏览器访问前端：**<http://127.0.0.1:5173/>**；API 文档：**<http://127.0.0.1:8000/docs>**。

---

如有课程/演示用的固定依赖版本需求，可将 `requirements.txt` / `package-lock.json` 锁版本后纳入版本管理。
