import { ILocation } from "./IPlace";

export type AppNavigationParameterList = {
  AllPlaces: undefined;
  AddPlace: { location: ILocation };
  PlaceDetails: { placeId: string };
  Map: { location: ILocation; isEditable: boolean };
};
