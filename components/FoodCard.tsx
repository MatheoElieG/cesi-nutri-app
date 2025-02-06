import { Food } from "../types/food";
import { Image, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NutrientsInformation } from "./NutrientsInformation";

export const FoodCard = ({ food }: { food: Food }) => {
  return (
    <View style={styles.foodItemContainer}>
      <View style={styles.foodItem}>
        <View style={styles.foodItemTop}>
          <View style={styles.foodImageContainer}>
            {food.image ? (
              <Image
                source={{ uri: food.image }}
                style={styles.foodImage}
                resizeMode="cover"
              />
            ) : (
              <View style={[styles.foodImage, styles.foodImagePlaceholder]}>
                <Ionicons name="nutrition-outline" size={24} color="#999" />
              </View>
            )}
          </View>
          <View style={styles.foodInfo}>
            <Text
              style={styles.foodLabel}
              numberOfLines={2}
              lineBreakMode={"tail"}
            >
              {food.label}
            </Text>
            <Text style={styles.foodCategory}>{food.categoryLabel}</Text>
          </View>
        </View>
        <NutrientsInformation nutrients={food.nutrients} />
      </View>
    </View>
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
