#!/usr/bin/env bash
# 从任意工作目录启动 Vite 前端（自动进入 frontend/）
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT/frontend"
exec npm run dev
