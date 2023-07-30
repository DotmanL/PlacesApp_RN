import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppNavigationParameterList } from "interfaces/AppNavigationParameterList";
import AllPlacesScreen from "screens/AllPlacesScreen";
import AddPlaceScreen from "screens/AddPlaceScreen";
import IconButton from "components/ui/IconButton";
import { Colors } from "constants/colors";

const Stack = createNativeStackNavigator<AppNavigationParameterList>();

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: Colors.gray700,
            contentStyle: { backgroundColor: Colors.gray700 }
          }}
        >
          <Stack.Screen
            name="AllPlaces"
            component={AllPlacesScreen}
            options={({ navigation }) => ({
              title: "Your Favorite Places",
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
              presentation: "modal",
              title: "Add a New Place"
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
