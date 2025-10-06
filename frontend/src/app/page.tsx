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
      <header className="flex items-center">
        <div className="flex items-center gap-1">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Fisheye Homepage"
              width={200}
              height={60}
              priority
              className="ml-40"
            />
          </Link>
        </div>
        <div className="flex items-center gap-2 ml-auto relative left-[-120px]">
          <h2 className="text-[28px] text-[var(--color-primary)] mr-[45px]">
            Nos photographes
          </h2>
        </div>
      </header>

      {/* Liste des photographes */}
      <PhotographerList photographers={sortedPhotographers as Photographer[]} />
    </main>
  );
}
