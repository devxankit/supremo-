export function resolveBackendUrl(url: string | undefined | null): string {
  if (!url) return "";
  if (typeof url !== "string") return url;
  
  if (url.includes("localhost:5001")) {
    const apiBase = process.env.NEXT_PUBLIC_API_URL;
    if (!apiBase) return url;
    const apiHost = apiBase.replace(/\/api$/, "");
    return url.replace(/https?:\/\/localhost:5001/, apiHost);
  }
  return url;
}
