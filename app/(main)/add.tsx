import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useAddFood } from "../../providers/add-food-provider";
import { FoodSearchBar } from "../../components/FoodSearchBar";
import { InputStyle } from "../../styles/input";
import { FoodList } from "../../components/FoodList";
import { Stack, useRouter } from "expo-router";
import { AddMealButton } from "../../components/AddMealButton";
import { Meal } from "../../types/meal";
import uuid from "react-native-uuid";
import { useMeal } from "../../providers/meal-provider";
import { ScreenStyle } from "../../styles/screen";

const AddScreen = () => {
  const router = useRouter();
  const { addMeal } = useMeal();
  const { foods, mealName, setMealName } = useAddFood();

  const submitMeal = () => {
    const meal: Meal = {
      id: uuid.v4(),
      name: mealName === "" ? "Repas" : mealName,
      foods: foods,
    };

    addMeal(meal);

    router.back();
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => <AddMealButton onPress={submitMeal} />,
        }}
      />
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 20}
      >
        <View style={ScreenStyle.screen}>
          <Text style={InputStyle.label}>Nom du repas</Text>
          <View style={[InputStyle.inputContainer, { marginBottom: 12 }]}>
            <TextInput
              value={mealName}
              onChangeText={setMealName}
              style={InputStyle.input}
              placeholder="Mon super repas"
              placeholderTextColor="#999"
            />
          </View>

          {/* The search bar */}
          <FoodSearchBar />

          {/* The food list */}
          <FoodList foods={foods} />
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default AddScreen;

const styles = StyleSheet.create({
  keyboardAvoid: {
    flex: 1,
  },
});
