import PhotographerList from "@/components/PhotographerList";
import { Photographer } from "../app/types/photographer";
import photographers from "../../../data/photographer.json";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="px-12 py-8">
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

      <PhotographerList photographers={photographers as Photographer[]} />
    </main>
  );
}
