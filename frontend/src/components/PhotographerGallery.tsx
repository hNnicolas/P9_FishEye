"use client";

import { useState } from "react";
import Image from "next/image";
import ModalCarousel from "./ModalCarousel";

type Media = {
  id: number;
  photographerId: number;
  title: string;
  likes: number;
  date: string;
  image?: string;
  video?: string;
};

type Props = {
  medias: Media[];
  pricePerDay: number;
  totalLikes: number;
  onLike: (id: number) => void;
};

export default function PhotographerGallery({
  medias,
  pricePerDay,
  totalLikes,
  onLike,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  return (
    <div className="relative">
      <section
        className="grid grid-cols-2 md:grid-cols-3 gap-x-18 gap-y-4"
        role="region"
        aria-label="Galerie des médias du photographe"
      >
        {medias.map((media, index) => (
          <article
            key={media.id}
            role="group"
            aria-label={`Média intitulé ${media.title}`}
            tabIndex={0}
            className="relative cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded-lg"
            onClick={() => openModal(index)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openModal(index);
              }
            }}
          >
            <div className="relative w-full aspect-[4/3]">
              {media.image ? (
                <Image
                  src={`/images/${media.image}`}
                  alt={`Photographie intitulée ${media.title}`}
                  fill
                  className="absolute inset-0 object-cover rounded-lg"
                />
              ) : (
                <video
                  controls
                  src={`/videos/${media.video}`}
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                  aria-label={`Vidéo intitulée ${media.title}`}
                />
              )}
            </div>

            <div className="p-2 flex justify-between items-center">
              <span className="text-[var(--color-primary)]" tabIndex={0}>
                {media.title}
              </span>

              {/* Bouton de like accessible */}
              <button
                type="button"
                className="flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded"
                aria-label={`Aimer ${media.title}, ${media.likes} likes`}
                onClick={(e) => {
                  e.stopPropagation();
                  onLike(media.id);
                }}
              >
                <span
                  aria-live="polite"
                  className="text-[var(--color-primary)]"
                >
                  {media.likes}
                </span>
                <Image
                  src="/icons/likes.png"
                  alt=""
                  width={20}
                  height={20}
                  aria-hidden="true"
                />
              </button>
            </div>
          </article>
        ))}
      </section>

      {isModalOpen && (
        <ModalCarousel
          medias={medias}
          originalMedias={medias}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          onClose={() => setIsModalOpen(false)}
          likesState={medias.map((m) => m.likes)}
          handleLike={onLike}
        />
      )}

      {!isModalOpen && (
        <div className="fixed bottom-4 right-0 flex items-center bg-[#DB8876] text-black px-4 py-3 rounded-lg shadow-lg z-50">
          {/* Bloc likes + icône */}
          <div className="flex items-center gap-0">
            <span className="text-lg">{totalLikes}</span>
            <Image
              src="/icons/likes.png"
              alt="likes"
              width={16}
              height={16}
              className="invert-[0] brightness-0"
            />
          </div>

          {/* Espacement avant le prix */}
          <span className="ml-16 text-lg">{pricePerDay}€/jour</span>
        </div>
      )}
    </div>
  );
}
