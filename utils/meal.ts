import { Meal } from "../types/meal";
import { Nutrients } from "../types/food";

export const calculateTotalNutrients = (meal: Meal) =>
  meal.foods.reduce(
    (nutrients, food) => {
      Object.entries(food.nutrients).forEach(([key, value]) => {
        if (key in nutrients) {
          nutrients[key as keyof Nutrients] += value;
        }
      });
      return nutrients;
    },
    {
      ENERC_KCAL: 0,
      PROCNT: 0,
      CHOCDF: 0,
      FAT: 0,
      FIBTG: 0,
    } as Nutrients,
  );
