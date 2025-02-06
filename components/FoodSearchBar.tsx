import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAddFood } from "../providers/add-food-provider";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { fetch } from "expo/fetch";
import { FoodResponse } from "../types/food";
import { InputStyle } from "../styles/input";

const appId = process.env.EXPO_PUBLIC_EDANAM_APP_ID;
const appKey = process.env.EXPO_PUBLIC_EDANAM_APP_KEY;
const limit = 10;

export const FoodSearchBar = () => {
  const { addFood } = useAddFood();
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showAutocomplete, setShowAutocomplete] = useState(true);
  const [autoCompleteFood, setAutoCompleteFood] = useState<string[]>([]);

  const searchForFood = useDebouncedCallback(async (query: string) => {
    if (query === "") {
      setIsLoading(false);
      setShowAutocomplete(false);
      setAutoCompleteFood([]);
      return;
    }

    setIsLoading(true);
    setShowAutocomplete(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await fetch(
        `https://api.edamam.com/auto-complete?app_id=${appId}&app_key=${appKey}&q=${query}&limit=${limit}`,
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const json = (await response.json()) as string[];
      setAutoCompleteFood(json);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, 500);

  const addSpecificFood = async (query: string) => {
    setIsLoading(true);
    setShowAutocomplete(false);

    const response = await fetch(
      `https://api.edamam.com/api/food-database/v2/parser?app_id=${appId}&app_key=${appKey}&ingr=${query}`,
    );

    const json = (await response.json()) as FoodResponse;

    if (!response.ok || json.parsed.length === 0) {
      await new Promise((resolve) => {
        Alert.alert(
          "Produit non trouvé",
          "Ce produit est introuvable.",
          [{ text: "Compris", onPress: () => resolve("") }],
          { cancelable: false },
        );
      });
    } else {
      addFood(json.parsed[0].food);
    }

    setIsLoading(false);
    setShowAutocomplete(false);
  };

  return (
    <View style={styles.searchSection}>
      <Text style={InputStyle.label}>Aliments</Text>
      <View style={InputStyle.inputContainer}>
        <TextInput
          style={InputStyle.input}
          onChangeText={(query) => {
            setSearchText(query);
            searchForFood(query);
          }}
          placeholder="Rechercher un aliment..."
          placeholderTextColor="#999"
          value={searchText}
        />
        <Link href={"/camera"} asChild>
          <Pressable style={styles.barCodeButton}>
            <Ionicons name="barcode-outline" size={24} color={"#000"} />
          </Pressable>
        </Link>
        {isLoading && (
          <ActivityIndicator style={styles.loadingIndicator} color="#007AFF" />
        )}
      </View>

      {showAutocomplete && autoCompleteFood.length > 0 && (
        <View style={styles.autoCompleteContainer}>
          <FlatList
            data={autoCompleteFood}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <Pressable
                style={({ pressed }) => [
                  styles.autoComplete,
                  pressed && styles.autoCompletePressed,
                ]}
                onPress={() => {
                  setSearchText("");
                  void addSpecificFood(item);
                  setAutoCompleteFood([]);
                  setShowAutocomplete(false);
                }}
              >
                <Text style={styles.autoCompleteText}>{item}</Text>
              </Pressable>
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchSection: {
    position: "relative",
  },
  barCodeButton: {
    position: "absolute",
    right: 10,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  loadingIndicator: {
    position: "absolute",
    right: 54,
  },
  autoCompleteContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 1,
    top: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginTop: 8,
    maxHeight: 300,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  autoComplete: {
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  autoCompletePressed: {
    backgroundColor: "#F2F2F7",
  },
  autoCompleteText: {
    fontSize: 17,
    color: "#000000",
  },
  separator: {
    height: 1,
    backgroundColor: "#E5E5EA",
    marginLeft: 15,
  },
});
