import { Meal } from "../types/meal";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface MealContextType {
  meals: Meal[];
  addMeal: (meal: Meal) => void;
  removeMeal: (id: string) => void;
}

const MealContext = createContext<MealContextType>({} as MealContextType);

export const useMeal = () => useContext(MealContext);

export const MealProvider = ({ children }: { children: ReactNode }) => {
  const [meals, setMeals] = useState<Meal[]>([]);

  useEffect(() => {
    const getStorageMeals = async () => {
      const storageValue = await AsyncStorage.getItem("meals");
      if (storageValue) return JSON.parse(storageValue) as Meal[];
      return [];
    };

    getStorageMeals().then((storageMeals) => setMeals(storageMeals));
  }, []);

  useEffect(() => {
    const updateMealStorage = async () => {
      const storageValue = await AsyncStorage.getItem("meals");

      if (storageValue !== JSON.stringify(meals)) {
        await AsyncStorage.setItem("meals", JSON.stringify(meals));
      }
    };

    void updateMealStorage();
  }, [meals]);

  const addMeal = (meal: Meal) => {
    setMeals((prevMeals) => [meal, ...prevMeals]);
  };

  const removeMeal = (id: string) => {
    setMeals((prevMeals) => prevMeals.filter((meal) => meal.id !== id));
  };

  return (
    <MealContext.Provider value={{ meals, addMeal, removeMeal }}>
      {children}
    </MealContext.Provider>
  );
};
