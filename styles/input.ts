import { StyleSheet } from "react-native";

export const InputStyle = StyleSheet.create({
  label: {
    marginBottom: 12,
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  input: {
    flex: 1,
    height: 42,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    paddingLeft: 16,
    fontSize: 16,
    color: "#000000",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
});
