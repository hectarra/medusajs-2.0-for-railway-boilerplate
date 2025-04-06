"use client";
import * as React from "react";
import Image from "next/image";
import { clx } from "@medusajs/ui";

interface PhotoDisplayProps {
  /**
   * The source URL of the image
   */
  src: string;
  /**
   * Alternative text for the image
   */
  alt: string;
  /**
   * Optional className to override default styles
   */
  className?: string;
  /**
   * Optional aspect ratio for desktop, defaults to 2.16
   */
  desktopAspectRatio?: number;
  /**
   * Optional aspect ratio for mobile, defaults to 1.2
   */
  mobileAspectRatio?: number;
  /**
   * Whether this image should be loaded with priority
   * Set to true for above-the-fold images
   */
  priority?: boolean;
  /**
   * Optional quality of the image (1-100)
   */
  quality?: number;
}

/**
 * A responsive component for displaying full-width photos with specific aspect ratios
 * for different device sizes
 */
const PhotoDisplay: React.FC<PhotoDisplayProps> = ({
  src,
  alt,
  className = "",
  desktopAspectRatio = 2.16,
  mobileAspectRatio = 1.2,
  priority = false,
  quality = 80,
}) => {
  return (
    <div
      className={clx("relative w-full overflow-hidden", className)}
      style={{
        // Default mobile aspect ratio
        aspectRatio: mobileAspectRatio,
      }}
    >
      {/* Desktop aspect ratio */}
      <style jsx>{`
        @media (min-width: 768px) {
          div {
            aspect-ratio: ${desktopAspectRatio};
          }
        }
      `}</style>

      <Image
        alt={alt}
        src={src}
        fill
        priority={priority}
        quality={quality}
        className="object-cover w-full h-full"
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
        loading={priority ? "eager" : "lazy"}
      />
    </div>
  );
};

export default PhotoDisplay;
