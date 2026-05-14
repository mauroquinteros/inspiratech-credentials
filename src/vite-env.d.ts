/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ACCESS_CODE: string
  readonly VITE_WHATSAPP_NUMBER: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
