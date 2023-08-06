import { useEffect, useState } from "react";
import { ScrollView, Image, View, Text, StyleSheet } from "react-native";
import { Colors } from "constants/colors";
import OutlinedButton from "components/ui/OutlinedButton";
import { IPlace } from "interfaces/IPlace";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppNavigationParameterList } from "interfaces/AppNavigationParameterList";
import { RouteProp } from "@react-navigation/native";
import { fetchPlaceDetails } from "util/database";

type Props = {
  navigation: NativeStackNavigationProp<
    AppNavigationParameterList,
    "PlaceDetails"
  >;
  route: RouteProp<AppNavigationParameterList, "PlaceDetails">;
};

function PlaceDetails(props: Props) {
  const { route, navigation } = props;
  const [fetchedPlace, setFetchedPlace] = useState<IPlace>();

  function handleShowOnMap() {
    if (!fetchedPlace) {
      return;
    }
    navigation.navigate("Map", {
      location: {
        latitude: fetchedPlace.location.latitude,
        longitude: fetchedPlace.location.longitude
      },
      isEditable: false
    });
  }

  const selectedPlaceId = route.params.placeId;

  useEffect(() => {
    async function loadPlaceData() {
      const place = await fetchPlaceDetails(selectedPlaceId);
      setFetchedPlace(place);
      navigation.setOptions({
        title: place.title
      });
    }

    loadPlaceData();
  }, [selectedPlaceId]);

  if (!fetchedPlace) {
    return (
      <View style={styles.fallback}>
        <Text>Loading place data...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: fetchedPlace.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{fetchedPlace.location.address}</Text>
        </View>
        <OutlinedButton iconName="map" onPress={handleShowOnMap}>
          View on Map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
}

export default PlaceDetails;

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    height: "35%",
    marginTop: 10,
    minHeight: 300,
    width: "100%"
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  addressContainer: {
    padding: 20
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16
  }
});
