export interface ILocation {
  latitude: number;
  longitude: number;
  name?: string;
}

export interface IPlace {
  id: string;
  title: string;
  imageUrl: string;
  address: string;
  location: ILocation;
}
