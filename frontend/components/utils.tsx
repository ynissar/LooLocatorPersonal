import { convertDistance } from "geolib";

export const shortenAddress = (address: string) => {
  const addressList = address.split(",");
  let newAddress = addressList[0] + "," + addressList[1];
  return newAddress;
};

export const shortenRating = (rating: number) => {
  const shortenedRating = rating.toFixed(1);
  return shortenedRating;
};

export const shortenDistance = (distanceFromUser: number) => {
  let distance = "";
  distanceFromUser > 1000
    ? (distance = convertDistance(distanceFromUser, "km").toFixed(2) + " KM")
    : (distance = distanceFromUser + " M");
  return distance;
};
