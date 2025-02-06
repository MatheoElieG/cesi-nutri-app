import { Alert, Button } from "react-native";
import { useMeal } from "../providers/meal-provider";
import { useRouter } from "expo-router";

export const DeleteMealButton = ({ id }: { id: string }) => {
  const router = useRouter();
  const { removeMeal } = useMeal();

  const deleteMeal = async () => {
    const result = await new Promise<string>((resolve) =>
      Alert.alert(
        "Suppression d'un repas",
        "Êtes-vous sûr de vouloir supprimer ce repas ? Cette action est irréversible.",
        [
          { text: "Annuler", onPress: () => resolve("") },
          {
            text: "Supprimer",
            style: "destructive",
            onPress: () => resolve("delete"),
          },
        ],
        { cancelable: false },
      ),
    );

    if (result === "delete") {
      removeMeal(id);
      router.back();
    }
  };

  return <Button color="red" title="Supprimer" onPress={deleteMeal} />;
};
