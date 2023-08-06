import { FlatList, StyleSheet, Text, View } from "react-native";
import PlaceItem from "./PlaceItem";
import { IPlace } from "interfaces/IPlace";
import { Colors } from "constants/colors";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AppNavigationParameterList } from "interfaces/AppNavigationParameterList";

type Props = {
  places: IPlace[];
};

function PlacesList(props: Props) {
  const { places } = props;
  const navigation =
    useNavigation<NavigationProp<AppNavigationParameterList, "PlaceDetails">>();

  function handleSelectPlace(placeId: string) {
    navigation.navigate("PlaceDetails", { placeId: placeId });
  }

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
      style={styles.list}
      data={places}
      keyExtractor={(item) => item.id!}
      renderItem={(item) => (
        <PlaceItem placeItemData={item} onSelect={handleSelectPlace} />
      )}
    />
  );
}

export default PlacesList;

const styles = StyleSheet.create({
  list: {
    margin: 24
  },
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
