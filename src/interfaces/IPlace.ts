export interface ILocation {
  latitude: number;
  longitude: number;
  address?: string;
}

export interface IPlace {
  id?: string;
  title: string;
  imageUri: string;
  location: ILocation;
}
