import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppNavigationParameterList } from "interfaces/AppNavigationParameterList";
import AllPlacesScreen from "screens/AllPlacesScreen";
import AddPlaceScreen from "screens/AddPlaceScreen";
import IconButton from "components/ui/IconButton";
import { Colors } from "constants/colors";
import MapScreen from "screens/MapScreen";
import { useCallback, useEffect, useState } from "react";
import { init } from "util/database";
import * as SplashScreen from "expo-splash-screen";
import { Text, View } from "react-native";
import PlaceDetails from "screens/PlaceDetails";

const Stack = createNativeStackNavigator<AppNavigationParameterList>();

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        init();
      } catch (e) {
        console.warn(e);
      } finally {
        setDbInitialized(true);
      }
    };
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (dbInitialized) {
      await SplashScreen.hideAsync();
    }
  }, [dbInitialized]);

  if (!dbInitialized)
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: Colors.primary500,
          justifyContent: "center"
        }}
        onLayout={onLayoutRootView}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%"
          }}
        >
          <Text>Loading, wait a sec...</Text>
        </View>
      </View>
    );

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer onReady={onLayoutRootView}>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: Colors.gray700,
            contentStyle: { backgroundColor: Colors.gray700 },
            headerBackTitleVisible: false
          }}
        >
          <Stack.Screen
            name="AllPlaces"
            component={AllPlacesScreen}
            options={({ navigation }) => ({
              title: "Favorite Places",
              headerRight: ({ tintColor }) => (
                <IconButton
                  iconName="add"
                  size={24}
                  color={tintColor}
                  onPress={() => navigation.navigate("AddPlace")}
                />
              )
            })}
          />
          <Stack.Screen
            name="AddPlace"
            component={AddPlaceScreen}
            options={{
              headerShown: true,
              // presentation: "modal",
              title: "Add a New Place"
            }}
          />
          <Stack.Screen
            name="Map"
            component={MapScreen}
            options={{
              headerShown: true,
              // presentation: "modal",
              title: "Map"
            }}
          />
          <Stack.Screen
            name="PlaceDetails"
            component={PlaceDetails}
            options={{
              headerShown: true,
              title: "Loading Place..."
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
