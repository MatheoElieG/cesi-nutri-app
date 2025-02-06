import { Food } from "./food";

export interface Meal {
  id: string;
  name: string;
  foods: Food[];
}
