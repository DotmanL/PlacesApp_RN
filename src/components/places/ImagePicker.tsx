import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import {
  launchCameraAsync,
  launchImageLibraryAsync,
  useCameraPermissions,
  PermissionStatus,
  ImagePickerAsset
} from "expo-image-picker";
import { useState } from "react";
import { Colors } from "constants/colors";

function ImagePicker() {
  //camera permission verification is required here for IOS
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();
  const [pickedImage, setPickedImage] = useState<ImagePickerAsset[] | null>();

  async function verifyPermissions() {
    if (cameraPermissionInformation?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (cameraPermissionInformation?.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insuficient permissions!",
        "You need to grant camera permissions to use this app"
      );
      return false;
    }

    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [15, 9],
      quality: 0.5
    });
    setPickedImage(image.assets);
  }

  async function pickImageHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [15, 9],
      quality: 0.5
    });
    setPickedImage(image.assets);
  }

  let imagePreview = <Text style={styles.previewText}>No image taken yet</Text>;

  if (pickedImage) {
    imagePreview = (
      <Image source={{ uri: pickedImage[0].uri }} style={styles.imageStyle} />
    );
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <Button title="Take Image" onPress={takeImageHandler} />
      <Button
        title="Pick an image from camera roll"
        onPress={pickImageHandler}
      />
    </View>
  );
}

export default ImagePicker;
const styles = StyleSheet.create({
  previewText: {
    color: "#592454"
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4
  },
  imageStyle: {
    width: "100%",
    height: "100%"
  }
});
