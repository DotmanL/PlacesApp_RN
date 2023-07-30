import { FlatList, StyleSheet, Text, View } from "react-native";
import PlaceItem from "./PlaceItem";
import { IPlace } from "interfaces/IPlace";
import { Colors } from "constants/colors";
// import { v4 as uuidv4 } from 'uuid';

type Props = {
  places: IPlace[];
};

function PlacesList(props: Props) {
  const { places } = props;

  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No Places Added yet, - start adding some
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={(item) => <PlaceItem placeItemData={item} />}
    />
  );
}

export default PlacesList;

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200
  }
});
