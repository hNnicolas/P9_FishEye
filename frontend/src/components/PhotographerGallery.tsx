"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Dropdown from "./Drowdown";

type Media = {
  id: number;
  photographerId: number;
  title: string;
  likes: number;
  date: string;
  image?: string;
  video?: string;
};

type Props = { medias: Media[] };

export default function PhotographerGallery({ medias }: Props) {
  const [sortOption, setSortOption] = useState("Popularité");

  const sortedMedias = useMemo(() => {
    let sorted = [...medias];
    if (sortOption === "Popularité") {
      sorted.sort((a, b) => b.likes - a.likes);
    } else if (sortOption === "Date") {
      sorted.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    } else if (sortOption === "Titre") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    }
    return sorted;
  }, [sortOption, medias]);

  return (
    <div>
      <Dropdown onSelect={setSortOption} />

      <section className="grid grid-cols-2 md:grid-cols-3 gap-x-18 gap-y-4">
        {sortedMedias.map((media: any, index: number) => (
          <div key={index} className="relative">
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
              <span className="text-[var(--color-primary)]">{media.title}</span>
              <div className="flex items-center gap-2">
                <span className="text-[var(--color-primary)]">
                  {media.likes}
                </span>
                <Image
                  src="/icons/likes.png"
                  alt="likes"
                  width={20}
                  height={20}
                />
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
