import { Alert, Image, StyleSheet, Text, View } from "react-native";
import {
  launchCameraAsync,
  launchImageLibraryAsync,
  useCameraPermissions,
  PermissionStatus,
  ImagePickerAsset
} from "expo-image-picker";
import { useState } from "react";
import { Colors } from "constants/colors";
import OutlinedButton from "components/ui/OutlinedButton";

type Props = {
  onImageTaken: (imageUri: string) => void;
};

function ImagePicker(props: Props) {
  const { onImageTaken } = props;
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
      // aspect: [15, 9], // this only works on android, on ios always a square and crop is broken, build camera with camera api
      quality: 1
    });

    if (!image.assets) {
      return;
    }

    setPickedImage(image.assets);
    onImageTaken(image.assets[0].uri);
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

    if (!image.assets) {
      return;
    }

    setPickedImage(image.assets);
    onImageTaken(image.assets[0].uri);
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
      <OutlinedButton iconName="camera" onPress={takeImageHandler}>
        Take Image
      </OutlinedButton>
      <OutlinedButton iconName="images-outline" onPress={pickImageHandler}>
        Pick an image from camera roll
      </OutlinedButton>
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
    borderRadius: 4,
    overflow: "hidden"
  },
  imageStyle: {
    width: "100%",
    height: "100%"
  }
});
