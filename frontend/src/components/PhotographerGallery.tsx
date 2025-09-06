"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Dropdown from "./Drowdown";
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
};

export default function PhotographerGallery({
  medias,
  pricePerDay,
  totalLikes,
}: Props) {
  const [sortOption, setSortOption] = useState("Popularité");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [likesState, setLikesState] = useState(medias.map((m) => m.likes));
  const [totalLikesState, setTotalLikesState] = useState(totalLikes);

  // Tri des médias
  const sortedMedias = useMemo(() => {
    const sorted = [...medias];
    if (sortOption === "Popularité") sorted.sort((a, b) => b.likes - a.likes);
    else if (sortOption === "Date")
      sorted.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    else if (sortOption === "Titre")
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    return sorted;
  }, [sortOption, medias]);

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  async function handleLike(mediaId: number) {
    try {
      const res = await fetch(`/api/media/${mediaId}/like`, { method: "POST" });
      const data = await res.json(); // parse directement en JSON

      if (data.success) {
        // Trouve l’index dans le tableau original `medias`
        const mediaIndex = medias.findIndex((m) => m.id === mediaId);
        if (mediaIndex === -1) return;

        // Met à jour le tableau des likes
        const updatedLikes = [...likesState];
        updatedLikes[mediaIndex] = data.likes;
        setLikesState(updatedLikes);

        // Recalcule du total des likes
        const newTotal = updatedLikes.reduce((acc, val) => acc + val, 0);
        setTotalLikesState(newTotal);
      } else {
        console.error("API returned an error:", data.message);
      }
    } catch (error) {
      console.error("Erreur lors de l'incrémentation des likes", error);
    }
  }

  return (
    <div className="relative">
      <Dropdown onSelect={setSortOption} />

      <section className="grid grid-cols-2 md:grid-cols-3 gap-x-18 gap-y-4">
        {sortedMedias.map((media, index) => {
          // On récupère l’index du média dans le tableau original `medias`
          const originalIndex = medias.findIndex((m) => m.id === media.id);

          return (
            <div
              key={media.id}
              className="relative cursor-pointer"
              onClick={() => openModal(index)}
            >
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src="/icons/frame.png"
                  alt="Encadré photo"
                  fill
                  className="object-contain pointer-events-none"
                  priority
                />
                {media.image ? (
                  <Image
                    src={`/images/${media.image}`}
                    alt={media.title}
                    fill
                    className="absolute inset-6 object-cover rounded-lg"
                  />
                ) : (
                  <video
                    controls
                    src={`/videos/${media.video}`}
                    className="absolute top-0 left-0 right-0 bottom-6 w-full h-full object-cover rounded-lg"
                  />
                )}
              </div>

              <div className="p-2 flex justify-between items-center">
                <span className="text-[var(--color-primary)]">
                  {media.title}
                </span>
                <button
                  className="flex items-center gap-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLike(media.id);
                  }}
                >
                  <span className="text-[var(--color-primary)]">
                    {likesState[originalIndex]}{" "}
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
          );
        })}
      </section>

      {isModalOpen && (
        <ModalCarousel
          medias={sortedMedias}
          originalMedias={medias}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          onClose={() => setIsModalOpen(false)}
          likesState={likesState}
          handleLike={handleLike}
        />
      )}

      <div className="fixed bottom-4 right-4 flex items-center justify-between bg-[#DB8876] text-black px-4 py-3 rounded-lg shadow-lg z-50">
        <div className="flex items-center gap-2">
          <span className="text-lg">{totalLikesState}</span>
          <Image src="/icons/likes.png" alt="likes" width={16} height={16} />
        </div>
        <span className="text-lg">{pricePerDay}€/jour</span>
      </div>
    </div>
  );
}
