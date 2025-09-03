export type Photographer = {
  id: number;
  name: string;
  city: string;
  country: string;
  tagline: string;
  price: number;
  portrait: string;
};

export type Photo = {
  id: number;
  url: string;
  title?: string;
};

export type PhotographerWithPhotos = Photographer & {
  photos: Photo[];
};
