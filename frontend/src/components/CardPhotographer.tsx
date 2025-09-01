import { Photographer } from "../app/types/photographer";
import Image from "next/image";

type Props = {
  photographer: Photographer;
  isFirst?: boolean; // pour le premier photographe
};

export default function CardPhotographer({
  photographer,
  isFirst = false,
}: Props) {
  return (
    <article className="text-center">
      <div
        className={`relative mx-auto mb-4 ${
          isFirst ? "w-[230px] h-[245px]" : "w-48 h-48"
        }`}
      >
        {isFirst && (
          <>
            {/* Encadrement uniquement sur le premier photographe */}
            <Image
              src="/icons/rectangle_mimi_profile.png"
              alt="Encadrement portrait"
              fill
              className="absolute top-0 left-0 z-0"
              style={{ marginLeft: "-12px", marginTop: "-6px" }}
            />

            {/* Icône en haut à gauche uniquement sur le premier photographe */}
            <Image
              src="/icons/circle-3.png"
              alt="Icone cercle 3"
              width={30}
              height={30}
              className="absolute z-10 -ml-[33px] mt-[-2px]"
            />
          </>
        )}

        {/* Portrait */}
        <img
          src={`/images/${photographer.portrait}`}
          alt={photographer.name}
          className="rounded-full w-48 h-48 object-cover relative z-20"
        />

        {/* Nom dans l'encadrement uniquement pour le premier */}
        {isFirst && (
          <h2 className="text-2xl text-[var(--color-title)] mt-2 relative z-20">
            {photographer.name}
          </h2>
        )}
      </div>

      {/* Nom pour les autres photographes */}
      {!isFirst && (
        <h2 className="text-2xl text-[var(--color-title)]">
          {photographer.name}
        </h2>
      )}

      <p
        className={`text-[var(--color-primary)] ${isFirst ? "mt-[-26px]" : ""}`}
      >
        {photographer.city}, {photographer.country}
      </p>

      {/* Tagline avec encadrement et icône uniquement pour le premier */}
      <div className="relative inline-block">
        {isFirst && (
          <>
            <Image
              src="/icons/rectangle_subtitle.png"
              alt="Encadrement tagline"
              width={230}
              height={40}
              className="absolute top-0 left-0 z-0 mt-[-12px] ml-[-10px]"
            />
            <Image
              src="/icons/circle-4.png"
              alt="Icone cercle 4"
              width={36}
              height={28}
              className="absolute top-0 left-0 z-10 -ml-[35px] -mt-[14px]"
            />
          </>
        )}

        <p
          className={`relative z-20 ${
            isFirst ? "px-4 py-2 mt-[-8px] ml-[-8px]" : ""
          }`}
        >
          {photographer.tagline}
        </p>
      </div>

      <p className={`text-[var(--color-gray)] ${isFirst ? "mt-[-10px]" : ""}`}>
        {photographer.price}€/jour
      </p>
    </article>
  );
}
