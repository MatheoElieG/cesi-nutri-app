export type Nutrients = {
  ENERC_KCAL: number;
  PROCNT: number;
  FAT: number;
  CHOCDF: number;
  FIBTG?: number;
};

export type Food = {
  foodId: string;
  label: string;
  knownAs: string;
  nutrients: Nutrients;
  category: string;
  categoryLabel: string;
  image?: string;
};

type Measure = {
  uri: string;
  label: string;
  weight: number;
  qualified?: {
    qualifiers: { uri: string; label: string }[];
    weight: number;
  }[];
};

type ParsedItem = {
  food: Food;
};

type Hint = {
  food: Food;
  measures: Measure[];
};

export type FoodResponse = {
  text: string;
  count: number;
  parsed: ParsedItem[];
  hints: Hint[];
};
