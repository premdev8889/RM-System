"use client";

import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";

type ScanAnimationProps = {
  lottieSrc?: string; // e.g. "/scanner.json" placed in /public
  imageSrc?: string; // e.g. "/qr-scan.svg" fallback image
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
  showOverlayScanLine?: boolean;
};

export default function ScanAnimation({
  lottieSrc,
  imageSrc,
  loop = true,
  autoplay = true,
  className,
  showOverlayScanLine = true,
}: ScanAnimationProps) {
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      if (!lottieSrc) return;
      try {
        const res = await fetch(lottieSrc);
        if (!res.ok) return;
        const json = await res.json();
        if (mounted) setAnimationData(json);
      } catch (e) {
        // ignore, fallback will render
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, [lottieSrc]);

  return (
    <div
      className={
        "mx-auto w-40 h-40 rounded-lg bg-gray-200 relative overflow-hidden shadow-inner " +
        (className ?? "")
      }
    >
      {/* Content area */}
      <div className="absolute inset-3 rounded-md bg-gray-900 flex items-center justify-center">
        {animationData ? (
          <Lottie
            animationData={animationData}
            loop={loop}
            autoplay={autoplay}
            style={{ width: "100%", height: "100%" }}
          />
        ) : imageSrc ? (
          <img
            src={imageSrc}
            alt="QR scan animation"
            className="max-w-full max-h-full object-contain"
          />
        ) : null}
      </div>

      {/* Optional overlay scanning line */}
      {showOverlayScanLine && <div className="scan-line" />}

      {/* Decorative corners */}
      <div className="absolute top-2 left-2 w-5 h-5 border-t-4 border-l-4 border-white/90 rounded-tl-md" />
      <div className="absolute top-2 right-2 w-5 h-5 border-t-4 border-r-4 border-white/90 rounded-tr-md" />
      <div className="absolute bottom-2 left-2 w-5 h-5 border-b-4 border-l-4 border-white/90 rounded-bl-md" />
      <div className="absolute bottom-2 right-2 w-5 h-5 border-b-4 border-r-4 border-white/90 rounded-br-md" />
    </div>
  );
}