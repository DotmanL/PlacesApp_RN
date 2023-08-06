import * as SQLite from "expo-sqlite";
import { SQLResultSet } from "expo-sqlite";
import { IPlace } from "interfaces/IPlace";

const database = SQLite.openDatabase("places.db");

export function init() {
  const promise = new Promise<void>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places(
                id INTEGER PRIMARY KEY NOT NULL,
                title TEXT NOT NULL,
                imageUri TEXT NOT NULL,
                address TEXT NOT NULL,
                latitude REAL NOT NULL,
                longitude REAL NOT NULL
            )`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
  return promise;
}

export function insertPlace(place: IPlace) {
  const { title, imageUri, location } = place;
  if (!location.address) {
    return;
  }

  const promise = new Promise<SQLResultSet>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO places
      (title, imageUri, address, latitude, longitude)
      VALUES(?, ?, ?, ?, ?)`,
        [
          title,
          imageUri,
          location.address!,
          location.latitude,
          location.longitude
        ],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });

  return promise;
}

export function fetchPlaces() {
  const promise = new Promise<IPlace[]>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places`,
        [],
        (_, result) => {
          const newPlaces: IPlace[] = result.rows._array.map((res) => ({
            id: res.id,
            title: res.title,
            imageUri: res.imageUri,
            location: {
              latitude: res.latitude,
              longitude: res.longitude,
              address: res.address
            }
          }));
          resolve(newPlaces);
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
  return promise;
}

export function fetchPlaceDetails(id: string) {
  const promise = new Promise<IPlace>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places WHERE id= ?`,
        [id],
        (_, result) => {
          const newPlace = result.rows._array[0];
          const place: IPlace = {
            id: newPlace.id,
            title: newPlace.title,
            imageUri: newPlace.imageUri,
            location: {
              latitude: newPlace.latitude,
              longitude: newPlace.longitude,
              address: newPlace.address
            }
          };
          resolve(place);
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
  return promise;
}
