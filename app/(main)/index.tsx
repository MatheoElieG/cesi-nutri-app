import { FlatList, StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import { useAddFood } from "../../providers/add-food-provider";
import { useMeal } from "../../providers/meal-provider";
import { MealCard } from "../../components/MealCard";
import { StyledButton } from "../../components/StyledButton";
import { ScreenStyle } from "../../styles/screen";

const HomeScreen = () => {
  const { meals } = useMeal();
  const { resetAddFoods } = useAddFood();

  return (
    <View style={[ScreenStyle.screen]}>
      <Link href={"/add"} asChild>
        <StyledButton
          title={"Ajouter un repas"}
          style={styles.addMealButton}
          onPress={resetAddFoods}
        />
      </Link>
      <FlatList
        data={meals}
        contentContainerStyle={styles.mealList}
        ItemSeparatorComponent={() => <View style={styles.mealSeparator} />}
        renderItem={({ item }) => <MealCard meal={item} />}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Aucun repas ajouté</Text>
          </View>
        )}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  addMealButton: {
    backgroundColor: "#32a852",
  },
  mealList: {
    paddingVertical: 16,
  },
  mealSeparator: {
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
