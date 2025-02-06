import { Food } from "../types/food";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { FoodCard } from "./FoodCard";

export const FoodList = ({ foods }: { foods: Food[] }) => {
  return (
    <FlatList
      data={foods}
      renderItem={({ item }) => <FoodCard food={item} />}
      keyExtractor={(item) => item.foodId}
      contentContainerStyle={styles.foodList}
      ItemSeparatorComponent={() => <View style={styles.foodSeparator} />}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={() => (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Aucun aliment ajouté</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  foodList: {
    paddingVertical: 16,
  },
  foodSeparator: {
    height: 12,
  },
  emptyContainer: {
    padding: 8,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#666666",
  },
});
