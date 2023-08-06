import OutlinedButton from "components/ui/OutlinedButton";
import { Colors } from "constants/colors";
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  View
} from "react-native";
import {
  PermissionStatus,
  getCurrentPositionAsync,
  useForegroundPermissions
} from "expo-location";
import { useEffect, useState } from "react";
import { ILocation } from "interfaces/IPlace";
import { getAddress, getMapPreview } from "util/locationApi";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
  useIsFocused
} from "@react-navigation/native";
import { AppNavigationParameterList } from "interfaces/AppNavigationParameterList";

type Props = {
  onPickedLocation: (location: ILocation) => void;
};

function LocationPicker(props: Props) {
  const { onPickedLocation } = props;
  const [pickedLocation, setPickedLocation] = useState<ILocation>();
  const [isFetchingLocation, setIsFetchingLocation] = useState<boolean>(false);
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();
  const navigation =
    useNavigation<NavigationProp<AppNavigationParameterList, "AddPlace">>();
  const route = useRoute<RouteProp<AppNavigationParameterList, "AddPlace">>();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = {
        latitude: parseFloat(route.params.location.latitude.toFixed(6)),
        longitude: parseFloat(route.params.location.longitude.toFixed(6))
      };

      setPickedLocation(mapPickedLocation);
    }
  }, [route, isFocused]);

  useEffect(() => {
    async function getPickedAddress() {
      if (pickedLocation) {
        const address = await getAddress(
          pickedLocation.latitude,
          pickedLocation.longitude
        );
        onPickedLocation({ ...pickedLocation, address: address });
      }
    }
    getPickedAddress();
  }, [pickedLocation, onPickedLocation]);

  async function verifyPermissions() {
    if (
      locationPermissionInformation?.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (locationPermissionInformation?.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insuficient permissions!",
        "You need to grant location permissions to use this app"
      );
      return false;
    }

    return true;
  }

  async function handleGetLocation() {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    setIsFetchingLocation(true);
    const userLocation = await getCurrentPositionAsync();

    setIsFetchingLocation(false);
    setPickedLocation({
      latitude: parseFloat(userLocation.coords.latitude.toFixed(6)),
      longitude: parseFloat(userLocation.coords.longitude.toFixed(6))
    });
  }

  function handlePickOnMap() {
    //set it as intital region on map but set editable false also
    navigation.navigate("Map", {
      location: {
        latitude: 51.5007,
        longitude: 0.1246
      },
      isEditable: true
    });
  }

  return (
    <View>
      <View style={styles.mapPreview}>
        {pickedLocation ? (
          <Image
            style={styles.mapPreviewImage}
            source={{
              uri: getMapPreview(
                pickedLocation.latitude,
                pickedLocation.longitude
              )
            }}
          />
        ) : isFetchingLocation ? (
          <ActivityIndicator size="large" color="white" />
        ) : (
          <Text>No Picked Location yet</Text>
        )}
      </View>
      <View style={styles.actions}>
        <OutlinedButton iconName="location" onPress={handleGetLocation}>
          Locate the user
        </OutlinedButton>
        <OutlinedButton iconName="map" onPress={handlePickOnMap}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
}

export default LocationPicker;
const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden"
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  mapPreviewImage: {
    width: "100%",
    height: "100%"
  }
});
