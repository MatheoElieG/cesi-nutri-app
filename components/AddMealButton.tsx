import { Button } from "react-native";

export const AddMealButton = ({ onPress }: { onPress: () => void }) => {
  return <Button title="Ajouter" onPress={onPress} />;
};
