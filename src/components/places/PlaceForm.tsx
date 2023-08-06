import { Colors } from "constants/colors";
import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "components/ui/Button";
import { ILocation, IPlace } from "interfaces/IPlace";

type Props = {
  onCreatePlace: (place: IPlace) => void;
};

function PlaceForm(props: Props) {
  const { onCreatePlace } = props;
  const [enteredTitle, setEnteredTitle] = useState<string>("");
  const [pickedLocation, setPickedLocation] = useState<ILocation>();
  const [selectedImage, setSelectedImage] = useState<string>("");

  function onChangeTitleHandler(enteredText: string) {
    setEnteredTitle(enteredText);
  }

  function handleImageTaken(imageUri: string) {
    setSelectedImage(imageUri);
  }

  const handlePickedLocation = useCallback((location: ILocation) => {
    setPickedLocation(location);
  }, []);

  function handleSavePlace() {
    if (!pickedLocation) {
      return;
    }
    const placeData: IPlace = {
      title: enteredTitle,
      imageUri: selectedImage,
      location: pickedLocation,
      id: new Date().toString() + Math.random().toString()
    };
    onCreatePlace(placeData);
  }

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeTitleHandler}
          value={enteredTitle}
        />
      </View>
      <ImagePicker onImageTaken={handleImageTaken} />
      <LocationPicker onPickedLocation={handlePickedLocation} />
      <Button onPress={handleSavePlace}>Add Place</Button>
    </ScrollView>
  );
}

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100
  }
});
