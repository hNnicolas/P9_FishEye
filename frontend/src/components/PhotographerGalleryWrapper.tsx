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

  // Fonction pour gérer le clic sur "like"
  const handleLike = async (id: number) => {
    try {
      const res = await fetch(`/api/media/${id}/like`, { method: "POST" });
      const data = await res.json();

      if (data.success) {
        // Met à jour le state local avec le nouveau nombre de likes
        setMediaState((prev) => {
          const newState = prev.map((m) =>
            m.id === id ? { ...m, likes: data.likes } : m
          );
          // Recalcule du total des likes
          const total = newState.reduce((sum, m) => sum + m.likes, 0);
          setTotalLikesUpdated(total);
          return newState;
        });
      } else {
        console.error(
          "Erreur lors de l'incrémentation des likes :",
          data.message
        );
      }
    } catch (err) {
      console.error("Erreur réseau lors de l'incrémentation des likes :", err);
    }
  };

  // Tri dynamique selon le critère choisi
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
        totalLikes={totalLikesUpdated}
        onLike={handleLike}
      />
    </div>
  );
}
