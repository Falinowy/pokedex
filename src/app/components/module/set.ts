import { Image } from "./image";
import { Legality } from "./legality";

export interface Set {
  id: string;
  images: Image;
  legalities: Legality;
  name:  string;
  printedTotal: number;
  ptcgoCode: string;
  releaseDate: string;
  series:  string;
  total: number;
  updatedAt: string;
}
