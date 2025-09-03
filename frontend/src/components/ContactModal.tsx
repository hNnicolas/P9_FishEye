"use client";
import { useEffect } from "react";

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
  photographerName: string;
};

export default function ContactModal({
  isOpen,
  onClose,
  photographerName,
}: ContactModalProps) {
  // Fermer la modale avec la touche "Escape"
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Contenu de la modale */}
      <div className="relative bg-[#D38A78] p-6 rounded-lg shadow-lg max-w-md w-full z-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-3xl leading-tight">
            Contactez-moi <br /> {photographerName}
          </h2>
          <button
            onClick={onClose}
            className="text-white text-3xl font-bold hover:scale-110 transition"
            aria-label="Fermer la modale"
          >
            ✕
          </button>
        </div>

        {/* Formulaire */}
        <form className="flex flex-col space-y-4">
          <label className="flex flex-col text-lg">
            Prénom
            <input
              type="text"
              className="p-2 rounded-md bg-gray-100"
              required
            />
          </label>

          <label className="flex flex-col text-lg">
            Nom
            <input
              type="text"
              className="p-2 rounded-md bg-gray-100"
              required
            />
          </label>

          <label className="flex flex-col text-lg">
            Email
            <input
              type="email"
              className="p-2 rounded-md bg-gray-100"
              required
            />
          </label>

          <label className="flex flex-col text-lg">
            Votre message
            <textarea
              className="p-2 rounded-md bg-gray-100 h-32 resize-none"
              required
            />
          </label>

          <button
            type="submit"
            className="bg-[#8B1E1E] text-white py-2 px-4 rounded-md w-32 hover:bg-red-900"
          >
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
}
