import { Colors } from "constants/colors";
import { Pressable, StyleSheet, Text } from "react-native";

type Props = {
  onPress: () => void;
  children: React.ReactNode;
};

function Button(props: Props) {
  const { onPress, children } = props;
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

export default Button;
const styles = StyleSheet.create({
  button: {
    margin: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
    borderRadius: 4,
    backgroundColor: Colors.primary800
  },
  pressed: {
    opacity: 0.7
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    color: Colors.primary50
  }
});
