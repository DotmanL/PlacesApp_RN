import PlacesList from "components/places/PlacesList";
import { StyleSheet, Text, View } from "react-native";

function AllPlacesScreen() {
  return <PlacesList places={[]} />;
}

export default AllPlacesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
