import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Meal } from "../types/meal";
import { useMemo } from "react";
import { NutrientsInformation } from "./NutrientsInformation";
import { calculateTotalNutrients } from "../utils/meal";
import { Link } from "expo-router";

export const MealCard = ({ meal }: { meal: Meal }) => {
  const totalNutrients = useMemo(() => {
    return calculateTotalNutrients(meal);
  }, [meal]);

  return (
    <Link href={`/meal/${meal.id}`} asChild>
      <TouchableOpacity style={styles.foodItemContainer}>
        <View style={styles.foodItem}>
          <View style={styles.foodItemTop}>
            <View style={styles.foodInfo}>
              <Text
                style={styles.foodLabel}
                numberOfLines={1}
                lineBreakMode={"tail"}
              >
                {meal.name || "Repas"}
              </Text>
            </View>
          </View>
          <NutrientsInformation nutrients={totalNutrients} />
        </View>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  foodItemContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  foodItem: {
    padding: 16,
  },
  foodItemTop: {
    flexDirection: "row",
  },
  foodImageContainer: {
    marginRight: 16,
  },
  foodImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  foodImagePlaceholder: {
    backgroundColor: "#F2F2F7",
    alignItems: "center",
    justifyContent: "center",
  },
  foodInfo: {
    flex: 1,
    justifyContent: "center",
  },
  foodLabel: {
    fontSize: 17,
    color: "#000000",
    fontWeight: "500",
  },
  foodCategory: {
    fontSize: 14,
    color: "#666666",
    marginTop: 4,
  },
});
