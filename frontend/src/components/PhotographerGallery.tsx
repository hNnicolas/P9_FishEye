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
      <section className="grid grid-cols-2 md:grid-cols-3 gap-x-18 gap-y-4">
        {medias.map((media, index) => (
          <div
            key={media.id}
            className="relative cursor-pointer"
            onClick={() => openModal(index)}
          >
            <div className="relative w-full aspect-[4/3]">
              {media.image ? (
                <Image
                  src={`/images/${media.image}`}
                  alt={media.title}
                  fill
                  className="absolute inset-0 object-cover rounded-lg"
                />
              ) : (
                <video
                  controls
                  src={`/videos/${media.video}`}
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                />
              )}
            </div>

            <div className="p-2 flex justify-between items-center">
              <span className="text-[var(--color-primary)]">{media.title}</span>
              <button
                className="flex items-center gap-1"
                onClick={(e) => {
                  e.stopPropagation();
                  onLike(media.id);
                }}
              >
                <span className="text-[var(--color-primary)]">
                  {media.likes}
                </span>
                <Image
                  src="/icons/likes.png"
                  alt="likes"
                  width={20}
                  height={20}
                />
              </button>
            </div>
          </div>
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

      <div className="fixed bottom-4 right-0 flex items-center justify-between bg-[#DB8876] text-black px-4 py-3 rounded-lg shadow-lg z-50">
        <div className="flex items-center gap-2">
          <span className="text-lg">{totalLikes}</span>
          <Image src="/icons/likes.png" alt="likes" width={16} height={16} />
        </div>
        <span className="text-lg">{pricePerDay}€/jour</span>
      </div>
    </div>
  );
}
