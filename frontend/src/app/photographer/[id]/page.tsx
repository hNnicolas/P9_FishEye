import Image from "next/image";
import Link from "next/link";
import { Media } from "../../types/media";
import PhotographerGalleryWrapper from "../../../components/PhotographerGalleryWrapper";
import ContactModalWrapper from "../../../components/ContactModalWrapper";
import { getPhotographerWithMedias } from "@/actions/photographer-actions";

type Props = { params: Promise<{ id: string }> };

export default async function PhotographerPage({ params }: Props) {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id, 10);

  const data = await getPhotographerWithMedias(id);

  if (!data?.photographer)
    return <p className="text-center mt-10">Photographer not found</p>;

  const { photographer, medias } = data;

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
      <header
        className="flex items-center justify-between py-4 mb-8"
        role="banner"
      >
        <Link
          href="/"
          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded"
          aria-label="Retour à la page d’accueil"
        >
          <Image
            src="/logo.png"
            alt="Fisheye Homepage"
            width={150}
            height={50}
            priority
          />
        </Link>
      </header>

      <section
        className="flex flex-col md:flex-row items-center justify-between bg-[#FAFAFA] p-6 rounded-lg mb-8 h-[230px] md:h-auto"
        role="region"
        aria-labelledby={`photographer-${photographer.id}-title`}
        tabIndex={0}
      >
        <div
          className="text-center md:text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded p-2"
          role="group"
          aria-labelledby={`photographer-${photographer.id}-title`}
          tabIndex={0}
        >
          <h1
            id={`photographer-${photographer.id}-title`}
            className="text-5xl text-[var(--color-title)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded"
            tabIndex={0}
          >
            {photographer.name}
          </h1>

          <p
            className="text-[20px] text-[var(--color-primary)] mt-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded"
            tabIndex={0}
          >
            {photographer.city}, {photographer.country}
          </p>

          <p
            className="mt-4 text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded"
            tabIndex={0}
          >
            {photographer.tagline}
          </p>
        </div>

        <ContactModalWrapper photographerName={photographer.name} />

        <div
          className="relative w-36 h-36 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded-full"
          tabIndex={0}
          aria-label={`Portrait de ${photographer.name}`}
        >
          <Image
            src={`/images/${photographer.portrait}`}
            alt={`Portrait de ${photographer.name}`}
            fill
            className="rounded-full object-cover -ml-[8px]"
            priority
          />
        </div>
      </section>

      <PhotographerGalleryWrapper
        medias={mediasForGallery}
        pricePerDay={photographer.price}
        totalLikes={totalLikes}
      />
    </main>
  );
}
