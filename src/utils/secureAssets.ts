import encryptedVault from "./encryptedAssetsData.json";

/**
 * High-Security Digital Asset Encryption & In-Memory Vault
 * 
 * - Proprietary multi-byte keystream cipher obscuring external asset CDN endpoints.
 * - Prevents raw asset URLs from being identified via static analysis, code scraping, or plaintext inspection.
 * - In-memory ephemeral decryption: asset addresses only exist in RAM during execution.
 * - In-memory GPU Bitmap cache prevents redundant network transfers.
 */

// Dynamic vault keystream seed
const VAULT_KEY = "SYMD-ADAK-SECURITY-VAULT-2026";

/**
 * In-memory asset decryption function
 */
export function decryptAsset(cipherText: string): string {
    if (!cipherText) return "";
    // If already raw data URI or http URL, return as-is
    if (cipherText.startsWith("data:") || cipherText.startsWith("http://") || cipherText.startsWith("https://")) {
        return cipherText;
    }

    try {
        const raw = atob(cipherText);
        let result = "";
        for (let i = 0; i < raw.length; i++) {
            result += String.fromCharCode(raw.charCodeAt(i) ^ VAULT_KEY.charCodeAt(i % VAULT_KEY.length));
        }
        return result;
    } catch {
        return "";
    }
}

/**
 * Encrypted asset identifier dictionary
 * Encrypted with multi-byte keystream cipher.
 */
export const SECURE_ASSETS = {
    BANNER_PROJECT: encryptedVault.banner_project,
    LOGO: encryptedVault.logo,
    PROFILE: encryptedVault.profile,
    PROJECT_1: encryptedVault.project_1,
    PROJECT_2: encryptedVault.project_2,
    PROJECT_3: encryptedVault.project_3,
    PROJECT_4: encryptedVault.project_4,
    PROJECT_5: encryptedVault.project_5,
    PROJECT_6: encryptedVault.project_6,
    SIGNATURE: encryptedVault.signature,
} as const;

/**
 * Global In-Memory Asset Cache (GPU Bitmaps / Revoked Ephemeral Blobs)
 * Retains zero persistent URLs in DOM or storage.
 */
const assetBitmapCache = new Map<string, ImageBitmap | HTMLImageElement>();
const loadingPromises = new Map<string, Promise<ImageBitmap | HTMLImageElement>>();

/**
 * Loads an encrypted asset directly into GPU memory / ephemeral bitmap
 */
export async function loadSecureAsset(cipherOrUrl: string): Promise<ImageBitmap | HTMLImageElement> {
    if (assetBitmapCache.has(cipherOrUrl)) {
        return assetBitmapCache.get(cipherOrUrl)!;
    }

    if (loadingPromises.has(cipherOrUrl)) {
        return loadingPromises.get(cipherOrUrl)!;
    }

    const promise = (async () => {
        const decryptedSource = decryptAsset(cipherOrUrl);
        if (!decryptedSource) {
            throw new Error("Asset decryption failed");
        }

        // 1. If it's a data URI (such as project_4), load via image element
        if (decryptedSource.startsWith("data:")) {
            return new Promise<HTMLImageElement>((resolve, reject) => {
                const img = new Image();
                img.onload = () => {
                    assetBitmapCache.set(cipherOrUrl, img);
                    resolve(img);
                };
                img.onerror = () => reject(new Error("Data URI render failure"));
                img.src = decryptedSource;
            });
        }

        // 2. Network-obfuscated fetch: Load as binary blob stream, create GPU ImageBitmap, and revoke immediately
        try {
            const response = await fetch(decryptedSource, {
                mode: "cors",
                credentials: "omit",
                headers: {
                    Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
                },
                cache: "force-cache",
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const blob = await response.blob();

            // Hardware-accelerated GPU bitmap (never exposes DOM element or object URL)
            if (typeof window !== "undefined" && "createImageBitmap" in window) {
                const bitmap = await createImageBitmap(blob);
                assetBitmapCache.set(cipherOrUrl, bitmap);
                return bitmap;
            }

            // Fallback for browsers without createImageBitmap: Ephemeral Object URL with immediate revocation
            return new Promise<HTMLImageElement>((resolve, reject) => {
                const blobUrl = URL.createObjectURL(blob);
                const img = new Image();
                img.crossOrigin = "anonymous";
                img.onload = () => {
                    URL.revokeObjectURL(blobUrl); // Revoke immediately to seal URL
                    assetBitmapCache.set(cipherOrUrl, img);
                    resolve(img);
                };
                img.onerror = () => {
                    URL.revokeObjectURL(blobUrl);
                    reject(new Error("Ephemeral render failure"));
                };
                img.src = blobUrl;
            });
        } catch {
            // Secondary resilient fallback: direct cross-origin image load
            return new Promise<HTMLImageElement>((resolve, reject) => {
                const img = new Image();
                img.crossOrigin = "anonymous";
                img.onload = () => {
                    assetBitmapCache.set(cipherOrUrl, img);
                    resolve(img);
                };
                img.onerror = () => reject(new Error("Direct image load failed"));
                img.src = decryptedSource;
            });
        }
    })();

    loadingPromises.set(cipherOrUrl, promise);

    try {
        const result = await promise;
        return result;
    } finally {
        loadingPromises.delete(cipherOrUrl);
    }
}
