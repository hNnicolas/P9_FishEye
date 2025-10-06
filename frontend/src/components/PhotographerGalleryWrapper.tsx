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

  // Fonction pour gérer le clic sur "like" d'un média
  const handleLike = async (id: number) => {
    try {
      // Appel à l'API pour incrémenter le like
      const res = await fetch(`/api/media/${id}/like`, { method: "POST" });
      const data = await res.json();

      if (data.success) {
        // Mise à jour du state local du média
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

  // Effet pour trier les médias selon le critère sélectionné
  useEffect(() => {
    let sorted = [...mediaState];

    if (sortCriteria === "Popularité") {
      sorted.sort((a, b) => b.likes - a.likes); // Tri par likes décroissants
    } else if (sortCriteria === "Date") {
      sorted.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      ); // Tri par date décroissante
    } else if (sortCriteria === "Titre") {
      sorted.sort((a, b) => a.title.localeCompare(b.title)); // Tri alphabétique
    }

    setSortedMedias(sorted); // Mise à jour des médias triés
  }, [mediaState, sortCriteria]);

  return (
    <div>
      {/* Dropdown pour sélectionner le critère de tri */}
      <Dropdown onSelect={(criteria) => setSortCriteria(criteria)} />

      {/* Galerie affichant les médias triés et gestion du like */}
      <PhotographerGallery
        medias={sortedMedias}
        pricePerDay={pricePerDay}
        totalLikes={totalLikesUpdated}
        onLike={handleLike}
      />
    </div>
  );
}
