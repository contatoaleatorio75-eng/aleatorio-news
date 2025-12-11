/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_ADSENSE_CLIENT_ID: string;
    // Add other env variables here as needed
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
