import { Pressable, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "constants/colors";

type Props = {
  iconName: keyof typeof Ionicons.glyphMap;
  size?: number;
  color?: string;
  onPress: () => void;
  children: React.ReactNode;
};

function OutlinedButton(props: Props) {
  const {
    iconName,
    size = 18,
    color = Colors.primary500,
    onPress,
    children
  } = props;

  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Ionicons style={styles.icon} name={iconName} color={color} size={size} />
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

export default OutlinedButton;

const styles = StyleSheet.create({
  button: {
    margin: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.primary500
  },
  pressed: {
    opacity: 0.7
  },
  icon: {
    marginRight: 6
  },
  text: {
    color: Colors.primary500
  }
});
