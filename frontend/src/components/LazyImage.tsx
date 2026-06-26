"use client";

import React, { useState, useEffect, useRef } from "react";

export function optimizeCloudinaryUrl(url: string): string {
  if (!url || typeof url !== "string") return url;
  if (url.includes("res.cloudinary.com") && url.includes("/upload/")) {
    if (url.includes("f_auto") || url.includes("q_auto")) {
      return url;
    }
    return url.replace("/upload/", "/upload/f_auto,q_auto/");
  }
  return url;
}

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  priority?: boolean;
}

export function LazyImage({ src, alt, priority = false, className = "", style, ...props }: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const optimizedSrc = optimizeCloudinaryUrl(src);

  useEffect(() => {
    // If the image is already cached and loaded before React hydration, trigger immediately
    if (imgRef.current?.complete) {
      setLoaded(true);
    }
  }, [optimizedSrc]);

  return (
    <img
      ref={imgRef}
      src={optimizedSrc}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onLoad={() => setLoaded(true)}
      className={`${className} lazy-img-fade ${loaded ? "is-loaded" : ""}`}
      style={style}
      {...props}
    />
  );
}
