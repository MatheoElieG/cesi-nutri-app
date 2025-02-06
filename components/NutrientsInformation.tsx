import { StyleSheet, Text, View } from "react-native";
import { Nutrients } from "../types/food";

export const NutrientsInformation = ({
  nutrients,
}: {
  nutrients: Nutrients;
}) => {
  return (
    <View style={styles.nutrientsContainer}>
      <View style={styles.nutrientItem}>
        <Text style={styles.nutrientValue}>
          {Math.round(nutrients.ENERC_KCAL)}
        </Text>
        <Text style={styles.nutrientLabel}>kcal</Text>
      </View>
      <View style={styles.nutrientDivider} />
      <View style={styles.nutrientItem}>
        <Text style={styles.nutrientValue}>
          {Math.round(nutrients.PROCNT)}g
        </Text>
        <Text style={styles.nutrientLabel}>Protéines</Text>
      </View>
      <View style={styles.nutrientDivider} />
      <View style={styles.nutrientItem}>
        <Text style={styles.nutrientValue}>{Math.round(nutrients.FAT)}g</Text>
        <Text style={styles.nutrientLabel}>Lipides</Text>
      </View>
      <View style={styles.nutrientDivider} />
      <View style={styles.nutrientItem}>
        <Text style={styles.nutrientValue}>
          {Math.round(nutrients.CHOCDF)}g
        </Text>
        <Text style={styles.nutrientLabel}>Glucides</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  nutrientsContainer: {
    flexDirection: "row",
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#E5E5EA",
  },
  nutrientItem: {
    flex: 1,
    alignItems: "center",
  },
  nutrientValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
  },
  nutrientLabel: {
    fontSize: 12,
    color: "#666666",
    marginTop: 2,
  },
  nutrientDivider: {
    width: 1,
    height: "100%",
    backgroundColor: "#E5E5EA",
  },
});
