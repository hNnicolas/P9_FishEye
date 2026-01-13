"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";

type Media = {
  id: number;
  title: string;
  image?: string;
  video?: string;
};

type Props = {
  medias: Media[];
  originalMedias: Media[];
  currentIndex: number;
  onClose: () => void;
  setCurrentIndex: (index: number) => void;
  likesState: number[];
  handleLike: (mediaId: number) => void;
};

export default function ModalCarousel({
  medias,
  currentIndex,
  onClose,
  setCurrentIndex,
}: Props) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setCurrentIndex((currentIndex + 1) % medias.length);
      } else if (e.key === "ArrowLeft") {
        setCurrentIndex((currentIndex - 1 + medias.length) % medias.length);
      } else if (e.key === "Escape") {
        onClose();
      }
    },
    [currentIndex, medias.length, onClose, setCurrentIndex]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const media = medias[currentIndex];

  return (
    <div
      role="dialog"
      aria-label="image closeup view"
      aria-modal="true"
      className="fixed inset-0 bg-white bg-opacity-50 flex items-start justify-center z-50 p-4 pt-20"
    >
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-[85vw] max-h-[90vh] flex flex-col items-center p-4">
        <button
          role="button"
          aria-label="Close dialog"
          onClick={onClose}
          className="absolute top-2 right-2 w-8 h-8 z-50"
        >
          <Image
            src="/icons/close_modal.png"
            alt="Fermer la modale"
            width={32}
            height={32}
          />
        </button>

        <div className="flex flex-col items-center w-full">
          <div className="relative inline-block">
            <button
              role="link"
              aria-label="Previous image"
              onClick={() =>
                setCurrentIndex(
                  (currentIndex - 1 + medias.length) % medias.length
                )
              }
              className="absolute left-[-50px] top-1/2 -translate-y-1/2 w-8 h-8 z-10"
            >
              <Image
                src="/icons/arrow-left.png"
                alt="Image précédente"
                width={32}
                height={32}
              />
            </button>

            {media.image ? (
              <Image
                src={`/images/${media.image}`}
                alt={media.title}
                width={1050}
                height={900}
                className="rounded-[5px] object-contain max-h-[80vh] w-auto"
              />
            ) : (
              <video
                controls
                src={`/videos/${media.video}`}
                aria-label={media.title}
                className="rounded-[5px] object-contain max-h-[80vh] w-auto"
              />
            )}

            <button
              role="link"
              aria-label="Next image"
              onClick={() =>
                setCurrentIndex((currentIndex + 1) % medias.length)
              }
              className="absolute right-[-50px] top-1/2 -translate-y-1/2 w-8 h-8 z-10"
            >
              <Image
                src="/icons/arrow-right.png"
                alt="Image suivante"
                width={32}
                height={32}
              />
            </button>

            <p className="mt-2 text-lg text-[var(--color-primary)] text-left">
              {media.title}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
