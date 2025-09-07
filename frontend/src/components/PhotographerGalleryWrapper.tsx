"use client";

import { useState, useEffect } from "react";
import Dropdown from "./Drowdown";
import PhotographerGallery from "./PhotographerGallery";
import { Media } from "../app/types/media";

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

  const handleLike = (id: number) => {
    setMediaState((prev) => {
      const newState = prev.map((m) =>
        m.id === id ? { ...m, likes: m.likes + 1 } : m
      );
      // Recalcule du total des likes
      const total = newState.reduce((sum, m) => sum + m.likes, 0);
      setTotalLikesUpdated(total);
      return newState;
    });
  };

  useEffect(() => {
    let sorted = [...mediaState];

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
      {/* Dropdown pour choisir le critère de tri */}
      <Dropdown onSelect={(criteria) => setSortCriteria(criteria)} />

      <PhotographerGallery
        medias={sortedMedias}
        pricePerDay={pricePerDay}
        totalLikes={totalLikesUpdated} // 🔹 totalLikes dynamique
        onLike={handleLike} // 🔹 incrémente les likes
      />
    </div>
  );
}
