import { ActivityIndicator, Alert, Text, View } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { StyleSheet } from "react-native";
import { useRef } from "react";
import { fetch } from "expo/fetch";
import { FoodResponse } from "../../types/food";
import { useAddFood } from "../../providers/add-food-provider";

const appId = process.env.EXPO_PUBLIC_EDANAM_APP_ID;
const appKey = process.env.EXPO_PUBLIC_EDANAM_APP_KEY;

const CameraScreen = () => {
  const router = useRouter();
  const { addFood } = useAddFood();
  const isLoading = useRef(false);
  const [permission, requestPermission] = useCameraPermissions();

  useFocusEffect(() => {
    // On page show, request permission
    void requestPermission();
  });

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Nous n'avons pas les permissions pour afficher la caméra. Rendez-vous
          dans les paramètres pour autoriser l'application à l'utiliser.
        </Text>
      </View>
    );
  }

  const onBarcodeScan = async (result: BarcodeScanningResult) => {
    if (isLoading.current) {
      return;
    }

    isLoading.current = true;

    const response = await fetch(
      `https://api.edamam.com/api/food-database/v2/parser?app_id=${appId}&app_key=${appKey}&upc=${result.data}`,
    );

    const json = (await response.json()) as FoodResponse;

    if (!response.ok || json.hints.length === 0) {
      await new Promise((resolve) => {
        Alert.alert(
          "Produit non trouvé",
          "Nous n'avons pas trouvé le code barre que vous nous avez fourni.",
          [{ text: "Compris", onPress: () => resolve("") }],
          { cancelable: false },
        );
      });
    } else {
      router.back();
      addFood(json.hints[0].food);
    }

    isLoading.current = false;
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={"back"}
        onBarcodeScanned={onBarcodeScan}
      >
        {isLoading.current && (
          <View
            style={{
              flex: 1,
              opacity: 0.5,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#000",
            }}
          >
            <ActivityIndicator />
          </View>
        )}
      </CameraView>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
    paddingHorizontal: 16,
  },
  camera: {
    flex: 1,
  },
});
