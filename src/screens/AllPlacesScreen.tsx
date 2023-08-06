import { useIsFocused } from "@react-navigation/native";
import PlacesList from "components/places/PlacesList";
import { IPlace } from "interfaces/IPlace";
import { useEffect, useState } from "react";
import { fetchPlaces } from "util/database";

function AllPlacesScreen() {
  const [places, setPlaces] = useState<IPlace[]>([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadPlaces() {
      const fetchedPlaces = await fetchPlaces();
      setPlaces(fetchedPlaces);
    }
    if (isFocused) {
      loadPlaces();
    }
  }, [isFocused]);

  return <PlacesList places={places} />;
}

export default AllPlacesScreen;
