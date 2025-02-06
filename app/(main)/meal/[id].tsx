import { Redirect, Stack, useLocalSearchParams } from "expo-router";
import { useMeal } from "../../../providers/meal-provider";
import { useMemo } from "react";
import { Text, View } from "react-native";
import { MealCard } from "../../../components/MealCard";
import { FoodList } from "../../../components/FoodList";
import { InputStyle } from "../../../styles/input";
import { DeleteMealButton } from "../../../components/DeleteMealButton";

const MealDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const { meals } = useMeal();

  const meal = useMemo(() => {
    return meals.find((meal) => meal.id === id);
  }, [meals, id]);

  if (!meal || typeof id !== "string") {
    return <Redirect href={`/`} />;
  }

  return (
    <>
      <Stack.Screen
        name="meal/[id]"
        options={{
          headerRight: () => <DeleteMealButton id={id} />, // Passage de l'ID au bouton
        }}
      />
      <View style={{ flex: 1, padding: 16, gap: 32 }}>
        <View>
          {/* Meal recap */}
          <Text style={InputStyle.label}>Repas</Text>
          <MealCard meal={meal} />
        </View>

        <View>
          {/* The food list */}
          <Text style={InputStyle.label}>Aliments</Text>
          <FoodList foods={meal.foods} />
        </View>
      </View>
    </>
  );
};

export default MealDetailScreen;
