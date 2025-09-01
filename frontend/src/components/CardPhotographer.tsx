import { Photographer } from "../app/types/photographer";
import Image from "next/image";

type Props = {
  photographer: Photographer;
};

export default function CardPhotographer({ photographer }: Props) {
  return (
    <article className="text-center mx-2 sm:mx-4 md:mx-6">
      {/* Portrait */}
      <div className="relative mx-auto mb-4 w-48 h-48">
        <Image
          src={`/images/${photographer.portrait}`}
          alt={photographer.name}
          width={192}
          height={192}
          className="rounded-full object-cover w-48 h-48 relative z-20"
          priority
        />
      </div>

      {/* Nom */}
      <h2 className="text-2xl text-[var(--color-title)]">
        {photographer.name}
      </h2>

      {/* Ville / Pays */}
      <p className="text-[var(--color-primary)]">
        {photographer.city}, {photographer.country}
      </p>

      {/* Tagline */}
      <div className="relative inline-block w-full">
        <p className="relative z-20 px-4 py-2 mt-[-8px] ml-[-8px] sm:mt-[-6px] sm:ml-[-6px]">
          {photographer.tagline}
        </p>
      </div>

      {/* Prix */}
      <p className="text-[var(--color-gray)] mt-[-10px]">
        {photographer.price}€/jour
      </p>
    </article>
  );
}
