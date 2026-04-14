#!/usr/bin/env bash
# 从任意工作目录启动 FastAPI 后端（自动进入 backend/，避免 Could not import module "main"）
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT/backend"
exec uvicorn main:app --host 0.0.0.0 --port 8000 --reload
