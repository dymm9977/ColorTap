/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** 可选：后端 API 根地址（无则走同源 /api，由 Vite 代理或 FastAPI 同站提供） */
  readonly VITE_API_BASE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
