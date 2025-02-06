import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { forwardRef } from "react";

interface StyledButtonProps extends TouchableOpacityProps {
  textStyle?: TextStyle;
  loading?: boolean;
  title: string;
}

export const StyledButton = forwardRef<View, StyledButtonProps>(
  ({ textStyle, title, style, loading, ...props }, ref) => {
    return (
      <TouchableOpacity style={[styles.button, style]} {...props} ref={ref}>
        {loading && <ActivityIndicator color="white" />}
        {!loading && (
          <Text style={[styles.buttonText, textStyle]}>{title}</Text>
        )}
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  button: {
    padding: 16,
    borderRadius: 12,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});
