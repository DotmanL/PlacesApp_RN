import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import IconButton from "components/ui/IconButton";
import { AppNavigationParameterList } from "interfaces/AppNavigationParameterList";
import { ILocation } from "interfaces/IPlace";
import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { MapPressEvent, Marker } from "react-native-maps";

type Props = {
  navigation: NativeStackNavigationProp<AppNavigationParameterList, "Map">;
  route: RouteProp<AppNavigationParameterList, "Map">;
};

function MapScreen(props: Props) {
  const { navigation, route } = props;

  const initialLocation = route.params && {
    latitude: route.params.location.latitude,
    longitude: route.params.location.longitude,
    isEditable: route.params.isEditable
  };

  const [selectedLocation, setSelectedLocation] =
    useState<ILocation>(initialLocation);

  const region = {
    latitude: initialLocation ? initialLocation.latitude : 51.5007,
    longitude: initialLocation ? initialLocation.longitude : 0.1246,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };

  function handleSelectLocation(event: MapPressEvent) {
    if (!initialLocation.isEditable) {
      return;
    }
    const latitude = event.nativeEvent.coordinate.latitude;
    const longitude = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({ latitude: latitude, longitude: longitude });
  }

  const handleSavedPickedLocation = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        "No location picked",
        "You have to a pick a location by tapping on the map first!"
      );
      return;
    }

    navigation.navigate("AddPlace", {
      location: {
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude
      }
    });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    if (!initialLocation.isEditable) {
      return;
    }
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          iconName="save"
          size={24}
          color={tintColor}
          onPress={handleSavedPickedLocation}
        />
      )
    });
  }, [navigation, handleSavedPickedLocation, initialLocation]);

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={handleSelectLocation}
    >
      {selectedLocation && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectedLocation?.latitude,
            longitude: selectedLocation?.longitude
          }}
        />
      )}
    </MapView>
  );
}

export default MapScreen;

const styles = StyleSheet.create({
  map: {
    flex: 1
  }
});
