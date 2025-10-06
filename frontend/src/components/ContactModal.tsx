"use client";
import { useEffect, useState } from "react";

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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Fermer la modale avec la touche "Escape"
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Empêche le rechargement de la page
    console.log("Prénom:", firstName);
    console.log("Nom:", lastName);
    console.log("Email:", email);
    console.log("Message:", message);

    // Réinitialise le formulaire
    setFirstName("");
    setLastName("");
    setEmail("");
    setMessage("");

    // Ferme la modale
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      <div className="relative bg-[#D38A78] p-6 rounded-lg shadow-lg max-w-md w-full z-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <h2 id="contact-modal-title" className="text-3xl leading-tight">
            Contactez-moi <br /> {photographerName}
          </h2>
          <button
            onClick={onClose}
            className="hover:scale-110 transition"
            aria-label="Fermer la modale"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Formulaire */}
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <label htmlFor="first-name" className="flex flex-col text-lg">
            Prénom
          </label>
          <input
            id="first-name"
            type="text"
            className="p-2 rounded-md bg-gray-100"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <label htmlFor="last-name" className="flex flex-col text-lg">
            Nom
          </label>
          <input
            id="last-name"
            type="text"
            className="p-2 rounded-md bg-gray-100"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <label htmlFor="email" className="flex flex-col text-lg">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="p-2 rounded-md bg-gray-100"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="message" className="flex flex-col text-lg">
            Votre message
          </label>
          <textarea
            id="message"
            className="p-2 rounded-md bg-gray-100 h-32 resize-none"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

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
