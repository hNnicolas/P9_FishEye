import { Photographer } from "../app/types/photographer";
import CardPhotographer from "./CardPhotographer";

type Props = {
  photographers: Photographer[];
};

export default function PhotographerList({ photographers }: Props) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mt-12">
      {photographers.map((photographer, index) => (
        <CardPhotographer
          key={photographer.id}
          photographer={photographer}
          isFirst={index === 0}
        />
      ))}
    </section>
  );
}
