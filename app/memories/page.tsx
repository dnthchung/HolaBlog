'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from '@/components/Image';
import memoriesData, { MemoryPhoto } from '@/data/memoriesData';

// Lightbox Component
function Lightbox({
  photo,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: {
  photo: MemoryPhoto;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}) {
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
      if (e.key === 'ArrowRight' && hasNext) onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Image Lightbox"
    >
      {/* Backdrop button to close on click outside */}
      <button
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default"
        aria-label="Close lightbox"
        tabIndex={-1}
      />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
        aria-label="Close lightbox"
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

      {/* Previous button */}
      {hasPrev && (
        <button
          onClick={onPrev}
          className="absolute left-4 z-10 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
          aria-label="Previous photo"
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

      {/* Next button */}
      {hasNext && (
        <button
          onClick={onNext}
          className="absolute right-4 z-10 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
          aria-label="Next photo"
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

      {/* Image container */}
      <div className="relative z-10 max-h-[90vh] max-w-[90vw]">
        <Image
          src={photo.src}
          alt={photo.alt}
          width={1200}
          height={800}
          className="max-h-[85vh] w-auto rounded-lg object-contain"
          priority
        />
        {/* Caption */}
        {(photo.caption || photo.date) && (
          <div className="absolute right-0 bottom-0 left-0 rounded-b-lg bg-gradient-to-t from-black/80 to-transparent p-4">
            {photo.caption && (
              <p className="text-center text-white">{photo.caption}</p>
            )}
            {photo.date && (
              <p className="text-center text-sm text-white/70">{photo.date}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Gallery Card Component
function GalleryCard({
  photo,
  onClick,
}: {
  photo: MemoryPhoto;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      role="button"
      tabIndex={0}
      className="group relative cursor-pointer overflow-hidden rounded-lg bg-gray-100 transition-all duration-300 hover:shadow-xl dark:bg-gray-800"
      aria-label={`View photo: ${photo.caption || 'Memory'}`}
    >
      <div className="aspect-[4/3] w-full">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>
      {/* Hover overlay with caption */}
      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="w-full p-3">
          {photo.caption && (
            <p className="text-sm font-medium text-white">{photo.caption}</p>
          )}
          {photo.date && <p className="text-xs text-white/80">{photo.date}</p>}
        </div>
      </div>
      {/* Tags badges */}
      {photo.tags && photo.tags.length > 0 && (
        <div className="absolute top-2 right-2 flex flex-wrap gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {photo.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/90 px-2 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-900/90 dark:text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// Empty State Component
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <svg
        className="h-24 w-24 text-gray-300 dark:text-gray-700"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
      <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">
        No memories yet
      </h3>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Photos will appear here once added to{' '}
        <code className="rounded bg-gray-100 px-1 py-0.5 text-xs dark:bg-gray-800">
          public/static/images/memories/
        </code>
      </p>
    </div>
  );
}

// Main Page Component
export default function MemoriesPage() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('all');

  // Collect all unique tags
  const allTags = [
    'all',
    ...new Set(memoriesData.flatMap((p) => p.tags || [])),
  ];

  const filteredPhotos =
    filter === 'all'
      ? memoriesData
      : memoriesData.filter((p) => p.tags?.includes(filter));

  const handlePrev = useCallback(() => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  }, [selectedIndex]);

  const handleNext = useCallback(() => {
    if (selectedIndex !== null && selectedIndex < filteredPhotos.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  }, [selectedIndex, filteredPhotos.length]);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col gap-2 pt-6 pb-8 md:pt-10">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl dark:text-gray-100">
          Memories
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Captured moments from my work journey.
        </p>
      </div>

      {/* Tag Filter */}
      {memoriesData.length > 0 && allTags.length > 1 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${filter === tag
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
            >
              {tag === 'all' ? 'All' : tag}
            </button>
          ))}
        </div>
      )}

      {/* Gallery Grid */}
      {filteredPhotos.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-2 gap-3 pb-10 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {filteredPhotos.map((photo, index) => (
            <GalleryCard
              key={photo.src}
              photo={photo}
              onClick={() => setSelectedIndex(index)}
            />
          ))}
        </div>
      )}

      {/* Lightbox */}
      {selectedIndex !== null && filteredPhotos[selectedIndex] && (
        <Lightbox
          photo={filteredPhotos[selectedIndex]}
          onClose={() => setSelectedIndex(null)}
          onPrev={handlePrev}
          onNext={handleNext}
          hasPrev={selectedIndex > 0}
          hasNext={selectedIndex < filteredPhotos.length - 1}
        />
      )}
    </div>
  );
}
