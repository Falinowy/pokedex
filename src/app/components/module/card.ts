import { Ability } from "./ability";
import { AncientTrait } from "./ancient-trait";
import { Attack } from "./attack";
import { Cardmarket } from "./cardmarket";
import { Image } from "./image";
import { ILegality } from "./legality";
import { Resistance } from "./resistance";
import { Set } from "./set";
import { TCGPlayer } from "./tcgplayer";
import { Weakness } from "./weakness";

export interface Card {
  id: string;
  name: string;
  supertype: string;
  subtypes: string[];
  hp?: string;
  types?: string[];
  evolesFrom?: string;
  evolvesTo?: string[];
  rules?: string[];
  ancientTrait?: AncientTrait;
  abilities?: Ability[];
  attacks?: Attack[];
  weaknesses?: Weakness[];
  resistances?: Resistance[];
  retreatCost?: string[];
  convertedRetreatCost?: number;
  set: Set;
  number: string;
  artist?: string;
  rarity: string;
  flavorText?: string;
  nationalPokedexNumbers?: number[];
  legalities: ILegality;
  regulationMark?: string;
  images: Image;
  tcgplayer?: TCGPlayer;
  cardmarket?: Cardmarket;
}