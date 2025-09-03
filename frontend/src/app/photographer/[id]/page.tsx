import { promises as fs } from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";
import Dropdown from "./../../../components/Drowdown";
import { Photographer } from "../../types/photographer";
import PhotographerGallery from "./../../../components/PhotographerGallery";

type Props = { params: { id: string } };

export default async function PhotographerPage({ params }: Props) {
  const id = parseInt(params.id, 10);

  // --- Récupération des photographes ---
  const photographerPath = path.join(
    process.cwd(),
    "src",
    "data",
    "photographer.json"
  );
  const photographersData = await fs.readFile(photographerPath, "utf-8");
  const photographers: Photographer[] = JSON.parse(photographersData);

  const photographer = photographers.find((p) => p.id === id);

  if (!photographer) {
    return <p className="text-center mt-10">Photographer not found</p>;
  }

  // --- Récupération des médias ---
  const mediaPath = path.join(process.cwd(), "src", "data", "media.json");
  const mediaData = await fs.readFile(mediaPath, "utf-8");
  const allMedias = JSON.parse(mediaData);

  // ✅ Filtre les médias qui appartiennent à ce photographe
  const medias = allMedias.filter((m: any) => m.photographerId === id);

  return (
    <main className="max-w-6xl mx-auto p-4">
      {/* --- Header avec logo --- */}
      <header className="flex items-center justify-between py-4 mb-8">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Fisheye Logo"
            width={150}
            height={50}
            priority
          />
        </Link>
      </header>

      {/* --- Infos du photographe --- */}
      <section className="flex flex-col md:flex-row items-center justify-between bg-[#FAFAFA] p-6 rounded-lg mb-8 h-[230px] md:h-auto">
        {/* Texte du photographe */}
        <div className="text-center md:text-left">
          <h1 className="text-5xl text-[var(--color-title)]">
            {photographer.name}
          </h1>
          <p className="text-[20px] text-[var(--color-primary)] mt-3">
            {photographer.city}, {photographer.country}
          </p>
          <p className="mt-4 text-gray-600">{photographer.tagline}</p>
        </div>

        {/* Bouton Contact */}
        <button className="my-6 md:my-0 md:mx-8">
          <Image
            src="/icons/contact.png"
            alt="Contactez-moi"
            width={160}
            height={48}
            className="object-contain"
          />
        </button>

        {/* Portrait */}
        <div className="relative w-36 h-36">
          <Image
            src={`/images/${photographer.portrait}`}
            alt={photographer.name}
            fill
            className="rounded-full object-cover -ml-[8px]"
            priority
          />
        </div>
      </section>

      <PhotographerGallery medias={medias} />
    </main>
  );
}
