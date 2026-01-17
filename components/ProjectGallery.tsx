// components/ProjectGallery.tsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
  aspectRatio?: 'portrait' | 'landscape' | 'square';
}

interface ProjectGalleryProps {
  images: ProjectImage[];
  layout?: 'masonry' | 'grid' | 'carousel';
}

export default function ProjectGallery({
  images,
  layout = 'masonry',
}: ProjectGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  useEffect(() => {
    if (selectedImage === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedImage(null);
      }

      if (event.key === 'ArrowLeft') {
        setSelectedImage((prev) => (prev && prev > 0 ? prev - 1 : prev));
      }

      if (event.key === 'ArrowRight') {
        setSelectedImage((prev) =>
          prev !== null && prev < images.length - 1 ? prev + 1 : prev,
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [images.length, selectedImage]);

  const MasonryLayout = () => (
    <div className="columns-1 gap-3 space-y-3 sm:columns-2 md:columns-3">
      {images.map((img, idx) => (
        <button
          key={idx}
          type="button"
          className="group relative w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-50 text-left transition-all hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
          onClick={() => setSelectedImage(idx)}
        >
          <div className="relative">
            <Image
              src={img.src}
              alt={img.alt}
              width={800}
              height={600}
              className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100">
              <div className="absolute right-0 bottom-0 left-0 p-4">
                <p className="text-xs font-medium text-white">
                  {img.caption || img.alt}
                </p>
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );

  const GridLayout = () => (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
      {images.map((img, idx) => (
        <button
          key={idx}
          type="button"
          className="group relative aspect-square overflow-hidden rounded-lg border border-gray-200 bg-gray-50 text-left transition-all hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
          onClick={() => setSelectedImage(idx)}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
          />
        </button>
      ))}
    </div>
  );

  const CarouselLayout = () => (
    <div className="scrollbar-hide overflow-x-auto">
      <div className="flex gap-3">
        {images.map((img, idx) => (
          <button
            key={idx}
            type="button"
            className="group relative w-64 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 text-left transition-all hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
            onClick={() => setSelectedImage(idx)}
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 256px, 320px"
              />
            </div>
            {img.caption && (
              <div className="p-2">
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {img.caption}
                </p>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );

  const Lightbox = () => {
    if (selectedImage === null) return null;

    const img = images[selectedImage];

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
        <button
          type="button"
          aria-label="Close gallery"
          className="absolute inset-0 z-0 cursor-zoom-out bg-transparent"
          onClick={() => setSelectedImage(null)}
        />
        <button
          type="button"
          aria-label="Close gallery"
          className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          onClick={() => setSelectedImage(null)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {selectedImage > 0 && (
          <button
            type="button"
            aria-label="Previous image"
            className="absolute top-1/2 left-4 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            onClick={() => setSelectedImage(selectedImage - 1)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}

        {selectedImage < images.length - 1 && (
          <button
            type="button"
            aria-label="Next image"
            className="absolute top-1/2 right-4 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            onClick={() => setSelectedImage(selectedImage + 1)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}

        <div className="relative z-10 max-h-[90vh] max-w-5xl">
          <Image
            src={img.src}
            alt={img.alt}
            width={1200}
            height={900}
            className="h-auto max-h-[90vh] w-auto object-contain"
            priority
          />
          {img.caption && (
            <div className="mt-4 text-center">
              <p className="text-sm text-white">{img.caption}</p>
              <p className="mt-1 text-xs text-gray-400">
                {selectedImage + 1} / {images.length}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      {layout === 'masonry' && <MasonryLayout />}
      {layout === 'grid' && <GridLayout />}
      {layout === 'carousel' && <CarouselLayout />}
      <Lightbox />
    </>
  );
}
