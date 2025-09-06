"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  onSelect: (value: string) => void;
};

export default function Dropdown({ onSelect }: Props) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Popularité");

  const options = ["Popularité", "Date", "Titre"];

  const handleSelect = (option: string) => {
    setSelected(option);
    setOpen(false);
    onSelect(option); // 🔹 envoie la valeur sélectionnée pour trier
  };

  // On retire l’option déjà sélectionnée du menu
  const filteredOptions = options.filter((opt) => opt !== selected);

  return (
    <div className="relative inline-flex items-center gap-4 w-60 text-white">
      {/* Label "Trier par :" */}
      <span className="text-[var(--color-text)] font-semibold whitespace-nowrap">
        Trier par :
      </span>

      {/* Bloc sélection */}
      <div className="flex items-center justify-between border border-white rounded-t-md px-4 py-2 bg-[var(--color-primary)] flex-1 mb-[30px]">
        <span>{selected}</span>
        {/* Bouton image → ouvre/ferme le menu */}
        <button
          type="button"
          className="ml-2"
          onClick={() => setOpen((prev) => !prev)}
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          <Image
            src="/icons/select.png"
            alt="Ouvrir la sélection"
            width={20}
            height={20}
            className={`transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {/* Menu déroulant */}
      {open && (
        <ul
          role="listbox"
          className="absolute bg-[var(--color-primary)] rounded-b-md shadow-lg z-10"
          style={{
            marginBottom: "-90px",
            marginLeft: "91px",
            width: "148px",
            border: "none",
          }}
        >
          {filteredOptions.map((option, index) => (
            <li
              key={option}
              role="option"
              aria-selected={selected === option}
              onClick={() => handleSelect(option)}
              className={`
    px-4 py-2 cursor-pointer text-white hover:bg-[#901C1C]
    border-t-[1px] border-white mx-2
    ${index !== filteredOptions.length - 1 ? "border-b-[0px]" : ""}
  `}
            >
              <span
                style={
                  option === "Popularité" ||
                  option === "Date" ||
                  option === "Titre"
                    ? { marginLeft: "-10px" }
                    : {}
                }
              >
                {option}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
