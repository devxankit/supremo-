export function resolveBackendUrl(url: string | undefined | null): string {
  if (!url) return "";
  if (typeof url !== "string") return url;
  
  if (url.includes("/uploads/")) {
    const match = url.match(/\/uploads\/(.+)$/);
    if (match) {
      return `/uploads/${match[1]}`;
    }
  }
  
  if (url.includes("localhost:5001")) {
    const apiBase = process.env.NEXT_PUBLIC_API_URL;
    if (!apiBase) return url;
    const apiHost = apiBase.replace(/\/api$/, "");
    return url.replace(/https?:\/\/localhost:5001/, apiHost);
  }
  return url;
}

export function getDirectDownloadUrl(url: string | undefined | null): string {
  if (!url) return "";
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";
  
  let absoluteUrl = url;
  if (url.startsWith("/")) {
    const backendBase = apiBase.replace(/\/api$/, "");
    absoluteUrl = `${backendBase}${url}`;
  }
  
  return `${apiBase}/media/download?url=${encodeURIComponent(absoluteUrl)}`;
}
