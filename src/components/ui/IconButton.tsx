import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  iconName: keyof typeof Ionicons.glyphMap;
  size: number;
  color?: string;
  onPress: () => void;
};

function IconButton(props: Props) {
  const { iconName, size, color, onPress } = props;
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Ionicons name={iconName} color={color} size={size} />
    </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  button: {
    margin: 8,
    borderRadius: 20
  },
  pressed: {
    opacity: 0.7
  }
});
