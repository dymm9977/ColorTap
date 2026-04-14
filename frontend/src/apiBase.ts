/**
 * 上色接口 URL。
 * - 默认使用同源相对路径 `/api/colorize`：开发时由 Vite 代理到本机 8000，生产可由 FastAPI 同端口提供页面+接口。
 * - 若前后端分离部署，可在 frontend/.env 中设置 `VITE_API_BASE=https://你的后端域名`（不要末尾斜杠）。
 */
export function getColorizeApiUrl(): string {
  const base = import.meta.env.VITE_API_BASE;
  if (base != null && String(base).trim() !== '') {
    return `${String(base).replace(/\/$/, '')}/api/colorize`;
  }
  return '/api/colorize';
}
