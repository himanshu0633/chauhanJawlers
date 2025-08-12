// const API_URL = import.meta.env.VITE_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL;
// const API_URL = 'https://fvvcbrpm-4000.inc1.devtunnels.ms/'

import API_URL from "../../config";


export const publicUrl = (p) =>
    new URL(
        String(p || "")
            .replace(/\\/g, "/")    // Windows → web slashes
            .replace(/^\/+/, ""),   // Remove leading slashes
        API_URL                     // Works with/without trailing slash
    ).toString();
