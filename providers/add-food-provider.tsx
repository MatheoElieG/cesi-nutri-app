import { Food } from "../types/food";
import { createContext, ReactNode, useContext, useState } from "react";

interface AddFoodContextType {
  foods: Food[];
  addFood: (food: Food) => void;
  removeFood: (food: Food) => void;
  resetAddFoods: () => void;
  mealName: string;
  setMealName: (mealName: string) => void;
}

const AddFoodContext = createContext<AddFoodContextType>(
  {} as AddFoodContextType,
);

export const useAddFood = () => useContext(AddFoodContext);

export const AddFoodProvider = ({ children }: { children: ReactNode }) => {
  const [mealName, setMealName] = useState("");
  const [foods, setFoods] = useState<Food[]>([]);

  const addFood = (food: Food) => {
    setFoods((prev) =>
      prev.find((f) => f.foodId === food.foodId) ? prev : [...prev, food],
    );
  };

  const removeFood = (food: Food) => {
    setFoods((prev) => prev.filter((f) => f.foodId !== food.foodId));
  };

  const resetAddFoods = () => {
    setMealName("");
    setFoods([]);
  };

  return (
    <AddFoodContext.Provider
      value={{
        foods,
        addFood,
        removeFood,
        resetAddFoods,
        mealName,
        setMealName,
      }}
    >
      {children}
    </AddFoodContext.Provider>
  );
};
