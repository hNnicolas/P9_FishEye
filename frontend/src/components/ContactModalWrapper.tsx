"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ContactModal from "./ContactModal";

type Props = {
  photographerName: string;
};

export default function ContactModalWrapper({ photographerName }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  // 🔹 Modifier le background et bloquer le scroll quand la modale est ouverte
  useEffect(() => {
    if (isOpen) {
      document.body.style.backgroundColor = "#E4E4E4";
      document.body.style.overflow = "hidden"; // empêche le scroll
    } else {
      document.body.style.backgroundColor = "";
      document.body.style.overflow = "";
    }

    // nettoyage si le composant est démonté
    return () => {
      document.body.style.backgroundColor = "";
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Bouton Contact */}
      <button
        onClick={() => setIsOpen(true)}
        className="my-6 md:my-0 md:mx-8 relative group w-[160px] h-[48px]"
      >
        <Image
          src="/icons/contact.png"
          alt="Contactez-moi"
          width={160}
          height={48}
          className="object-contain transition-opacity duration-200 group-hover:opacity-0 group-focus:opacity-0 -mt-[25px] md:mt-0"
        />
        <Image
          src="/icons/contact-hover.png"
          alt="Contactez-moi hover"
          width={160}
          height={48}
          className="absolute top-0 left-0 object-contain opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus:opacity-100 -mt-[25px] md:mt-0"
        />
      </button>

      {/* Modale */}
      <ContactModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        photographerName={photographerName}
      />
    </>
  );
}
