import { IPlace } from "interfaces/IPlace";
import { Image, Pressable, Text, View } from "react-native";

type PlaceItemData = {
  item: IPlace;
};

type Props = {
  placeItemData: PlaceItemData;
  onSelect?: () => void;
};

function PlaceItem(props: Props) {
  const { placeItemData, onSelect } = props;
  const placeItem = placeItemData.item;

  return (
    <Pressable onPress={onSelect}>
      <Image source={{ uri: placeItem.imageUrl }} />
      <View>
        <Text>{placeItem.title}</Text>
        <Text>{placeItem.address}</Text>
      </View>
    </Pressable>
  );
}

export default PlaceItem;
