"use client";

import { useState, useEffect, useTransition } from "react";
import Dropdown from "./Drowdown";
import PhotographerGallery from "./PhotographerGallery";
import { Media } from "../app/types/media";
import { incrementMediaLike } from "@/actions/media-actions";

type Props = {
  medias: Media[];
  pricePerDay: number;
  totalLikes: number;
};

export default function PhotographerGalleryWrapper({
  medias,
  pricePerDay,
  totalLikes,
}: Props) {
  const [mediaState, setMediaState] = useState<Media[]>([...medias]);
  const [sortedMedias, setSortedMedias] = useState<Media[]>([...medias]);
  const [sortCriteria, setSortCriteria] = useState<string>("Popularité");
  const [totalLikesUpdated, setTotalLikesUpdated] = useState(totalLikes);
  const [, startTransition] = useTransition();

  const handleLike = (id: number) => {
    startTransition(async () => {
      try {
        const newLikes = await incrementMediaLike(id);

        setMediaState((prev) => {
          const newState = prev.map((m) =>
            m.id === id ? { ...m, likes: newLikes } : m
          );
          const total = newState.reduce((sum, m) => sum + m.likes, 0);
          setTotalLikesUpdated(total);
          return newState;
        });
      } catch (err) {
        console.error("Erreur lors de l'incrémentation du like :", err);
      }
    });
  };

  useEffect(() => {
    const sorted = [...mediaState];

    if (sortCriteria === "Popularité") {
      sorted.sort((a, b) => b.likes - a.likes);
    } else if (sortCriteria === "Date") {
      sorted.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    } else if (sortCriteria === "Titre") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    }

    setSortedMedias(sorted);
  }, [mediaState, sortCriteria]);

  return (
    <div>
      <Dropdown onSelect={(criteria) => setSortCriteria(criteria)} />

      <PhotographerGallery
        medias={sortedMedias}
        pricePerDay={pricePerDay}
        totalLikes={totalLikesUpdated}
        onLike={handleLike}
      />
    </div>
  );
}
