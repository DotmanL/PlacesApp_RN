import { Camera, CameraCapturedPicture, CameraType } from "expo-camera";
import { useRef, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  setCameraVisible: (cameraVisible: boolean) => void;
  setPhoto: React.Dispatch<
    React.SetStateAction<CameraCapturedPicture | undefined>
  >;
};

export default function CustomCamera(props: Props) {
  const { setCameraVisible, setPhoto } = props;
  const cameraRef = useRef<Camera>(null);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  async function takePicture() {
    if (cameraRef.current) {
      try {
        const photoData = await cameraRef.current.takePictureAsync();
        setPhoto(photoData);
        setCameraVisible(false); // Close the camera after taking a picture
      } catch (error) {
        console.log("Error taking picture:", error);
      }
    }
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
            <Text
              style={{
                marginTop: 2,
                marginBottom: 3,
                fontSize: 24,
                fontWeight: "bold",
                color: "white"
              }}
              onPress={takePicture}
            >
              Take Pickture
            </Text>
            <Text style={styles.text} onPress={() => setCameraVisible(false)}>
              Close Camera
            </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  camera: {
    flex: 1
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center"
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white"
  }
});
