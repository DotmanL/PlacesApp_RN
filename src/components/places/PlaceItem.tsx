import { Colors } from "constants/colors";
import { IPlace } from "interfaces/IPlace";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type PlaceItemData = {
  item: IPlace;
};

type Props = {
  placeItemData: PlaceItemData;
  onSelect: (placeId: string) => void;
};

function PlaceItem(props: Props) {
  const { placeItemData, onSelect } = props;
  const placeItem = placeItemData.item;

  return (
    <Pressable
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
      onPress={() => onSelect(placeItem.id!)}
    >
      <Image style={styles.image} source={{ uri: placeItem.imageUri }} />
      <View style={styles.info}>
        <Text style={styles.title}>{placeItem.title}</Text>
        <Text style={styles.address}>{placeItem.location.address}</Text>
      </View>
    </Pressable>
  );
}

export default PlaceItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 6,
    marginVertical: 12,
    backgroundColor: Colors.primary500,
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2
  },
  pressed: {
    opacity: 0.9
  },
  image: {
    flex: 1,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    height: 100
  },
  info: {
    flex: 2,
    padding: 12
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: Colors.gray700
  },
  address: {
    fontSize: 12,
    color: Colors.gray700
  }
});
