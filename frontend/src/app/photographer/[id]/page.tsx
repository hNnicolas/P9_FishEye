import { prisma } from "@/lib/prisma-db";
import Image from "next/image";
import Link from "next/link";
import { Media } from "../../types/media";
import PhotographerGalleryWrapper from "./../../../components/PhotographerGalleryWrapper";
import ContactModalWrapper from "./../../../components/ContactModalWrapper";

type Props = { params: Promise<{ id: string }> };

export default async function PhotographerPage({ params }: Props) {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id, 10);

  const photographer = await prisma.photographer.findUnique({ where: { id } });
  if (!photographer)
    return <p className="text-center mt-10">Photographer not found</p>;

  const medias = await prisma.media.findMany({ where: { photographerId: id } });
  const mediasForGallery: Media[] = medias.map((m) => ({
    id: m.id,
    photographerId: m.photographerId,
    title: m.title,
    image: m.image ?? undefined,
    video: m.video ?? undefined,
    likes: m.likes,
    date: m.date,
  }));

  const totalLikes = medias.reduce((sum, m) => sum + m.likes, 0);

  return (
    <main className="max-w-6xl mx-auto p-4">
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

      <section className="flex flex-col md:flex-row items-center justify-between bg-[#FAFAFA] p-6 rounded-lg mb-8 h-[230px] md:h-auto">
        <div className="text-center md:text-left">
          <h1 className="text-5xl text-[var(--color-title)]">
            {photographer.name}
          </h1>
          <p className="text-[20px] text-[var(--color-primary)] mt-3">
            {photographer.city}, {photographer.country}
          </p>
          <p className="mt-4 text-gray-600">{photographer.tagline}</p>
        </div>

        <ContactModalWrapper photographerName={photographer.name} />

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

      {/* 🔹 nouveau composant client */}
      <PhotographerGalleryWrapper
        medias={mediasForGallery}
        pricePerDay={photographer.price}
        totalLikes={totalLikes}
      />
    </main>
  );
}
