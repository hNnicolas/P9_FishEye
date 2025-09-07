"use client";

import { useEffect } from "react";
import Image from "next/image";

type Media = {
  id: number;
  title: string;
  image?: string;
  video?: string;
};

type Props = {
  medias: Media[]; // médias triés pour l'affichage dans la modale
  originalMedias: Media[]; // médias originaux pour gérer correctement les likes
  currentIndex: number;
  onClose: () => void;
  setCurrentIndex: (index: number) => void;
  likesState: number[];
  handleLike: (mediaId: number) => void;
};

export default function ModalCarousel({
  medias,
  originalMedias,
  currentIndex,
  onClose,
  setCurrentIndex,
  likesState,
  handleLike,
}: Props) {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      setCurrentIndex((currentIndex + 1) % medias.length);
    } else if (e.key === "ArrowLeft") {
      setCurrentIndex((currentIndex - 1 + medias.length) % medias.length);
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  const media = medias[currentIndex];

  return (
    <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-[85vw] max-h-[90vh] flex flex-col items-center p-4">
        {/* Bouton de fermeture */}
        <button
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

        {/* Média */}
        <div className="relative w-full flex items-center justify-center">
          {/* Flèche gauche */}
          <button
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
              className="rounded-[5px] object-contain max-h-[80vh] w-auto"
            />
          )}

          {/* Flèche droite */}
          <button
            onClick={() => setCurrentIndex((currentIndex + 1) % medias.length)}
            className="absolute right-[-50px] top-1/2 -translate-y-1/2 w-8 h-8 z-10"
          >
            <Image
              src="/icons/arrow-right.png"
              alt="Image suivante"
              width={32}
              height={32}
            />
          </button>
        </div>

        {/* Titre et bouton Like */}
        <div className="mt-4 flex flex-col items-center gap-2">
          <p className="text-lg font-semibold text-gray-800 text-center">
            {media.title}
          </p>

          <button
            className="flex items-center gap-1 cursor-pointer"
            onClick={() => handleLike(media.id)}
          >
            <span className="text-[var(--color-primary)] text-lg">
              {
                likesState[
                  originalMedias.findIndex((m: Media) => m.id === media.id)
                ]
              }
            </span>

            <Image src="/icons/likes.png" alt="like" width={20} height={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
