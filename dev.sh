#!/usr/bin/env bash
# 一键启动：FastAPI 后端（后台）+ Vite 前端（前台）
# 按 Ctrl+C 会结束前端并清理后端进程
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
UVICORN_PID=""

cleanup() {
  if [[ -n "${UVICORN_PID}" ]]; then
    kill "${UVICORN_PID}" 2>/dev/null || true
    wait "${UVICORN_PID}" 2>/dev/null || true
  fi
}
trap cleanup EXIT INT TERM

# 首次运行：若无 node_modules 则自动 npm install
if [[ ! -d "${ROOT}/frontend/node_modules" ]]; then
  echo "[画龙点睛] 检测到未安装前端依赖，正在执行 npm install ..."
  (cd "${ROOT}/frontend" && npm install)
fi

cd "${ROOT}/backend"
if [[ -f .venv/bin/activate ]]; then
  # shellcheck disable=SC1091
  source .venv/bin/activate
fi

echo "[画龙点睛] 启动后端 http://0.0.0.0:8000 ..."
uvicorn main:app --host 0.0.0.0 --port 8000 --reload &
UVICORN_PID=$!

sleep 1

cd "${ROOT}/frontend"
echo "[画龙点睛] 启动前端开发服务器（Vite）..."
npm run dev
