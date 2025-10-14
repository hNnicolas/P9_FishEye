import Image from "next/image";
import Link from "next/link";
import PhotographerList from "@/components/PhotographerList";
import { getAllPhotographers } from "@/lib/prisma-db";
import { Photographer } from "@/app/types/photographer";

export default async function HomePage() {
  // Récupération des photographes depuis Prisma
  const photographers = await getAllPhotographers();

  const order = [
    "Mimi Keel",
    "Ellie-Rose Wilkens",
    "Tracy Galindo",
    "Nabeel Bradford",
    "Rhode Dubois",
    "Marcel Nikolic",
  ];

  const sortedPhotographers = photographers.sort((a, b) => {
    const indexA = order.indexOf(a.name);
    const indexB = order.indexOf(b.name);
    // Si le nom n'est pas trouvé, placer à la fin
    return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
  });

  return (
    <main className="px-12 py-8">
      {/* Header */}
      <header className="flex items-center" role="banner">
        <div className="flex items-center gap-1">
          <Link
            href="/"
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded"
            aria-label="Retour à la page d’accueil"
          >
            <Image
              src="/logo.png"
              alt="Logo de Fisheye, retour à la page d’accueil"
              width={200}
              height={60}
              priority
              className="ml-40"
            />
          </Link>
        </div>

        <div className="flex items-center gap-2 ml-auto relative left-[-120px]">
          <h2
            className="text-[28px] text-[var(--color-primary)] mr-[45px]"
            tabIndex={0}
          >
            Nos photographes
          </h2>
        </div>
      </header>

      {/* Liste des photographes */}
      <PhotographerList photographers={sortedPhotographers as Photographer[]} />
    </main>
  );
}
