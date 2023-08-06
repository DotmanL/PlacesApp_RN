import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import PlaceForm from "components/places/PlaceForm";
import { AppNavigationParameterList } from "interfaces/AppNavigationParameterList";
import { IPlace } from "interfaces/IPlace";
import { insertPlace } from "util/database";

type Props = {
  navigation: NativeStackNavigationProp<AppNavigationParameterList, "AddPlace">;
};

function AddPlaceScreen(props: Props) {
  const { navigation } = props;
  async function createPlaceHandler(place: IPlace) {
    await insertPlace(place);
    navigation.navigate("AllPlaces");
  }
  return <PlaceForm onCreatePlace={createPlaceHandler} />;
}

export default AddPlaceScreen;
