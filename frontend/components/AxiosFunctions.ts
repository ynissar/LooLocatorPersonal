import axios from "axios";
import { IWashroom } from "../types";
import { update } from "lodash";

const baseUrl = "http://10.0.0.163:8000/";

const axiosInstance = axios.create({ baseURL: baseUrl });

export const axiosTest = async () => {
  try {
    console.log("axios test");
    const response = await axiosInstance.get("test");
    return console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const fetchWashrooms = async () => {
  try {
    console.log("begin fetchWashrooms");
    const response = await axiosInstance.get("api");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchWashroom = async (id: string) => {
  try {
    const response = await axiosInstance.get(`api/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export interface createWashroomProps {
  name: string;
  rating: number;
  coordinates: {
    longitude: number;
    latitude: number;
  };
  street: string;
  accessibility: {
    genderless?: boolean;
    childFriendly?: boolean;
    disabilityFriendly?: boolean;
  };
}

export const createWashroom = async ({
  name,
  rating,
  accessibility: { childFriendly, disabilityFriendly, genderless },
  coordinates: { latitude, longitude },
  street,
}: createWashroomProps) => {
  try {
    const response = axiosInstance.post(`api`, {
      name: name,
      rating: rating,
      numberOfRaters: 1,
      coordinates: {
        latitude: latitude,
        longitude: longitude,
      },
      street: street,
      accessibility: {
        genderless: genderless,
        childFriendly: childFriendly,
        disabilityFriendly: disabilityFriendly,
      },

      comments: [],
    });
    console.log("success!");
    return;
  } catch (error) {
    console.log(error);
  }
};

export interface updateWashroomProps {
  id: string | string[] | undefined;
  newRating: number;
  comment?: string;
  name?: string;
}

export const reviewWashroom = async ({
  id,
  newRating,
  comment,
  name,
}: updateWashroomProps) => {
  try {
    const washroomResponse = await axiosInstance.get(`api/${id}`);
    const washroom: IWashroom = washroomResponse.data.washroom;
    let { numberOfRaters, rating, comments } = washroom;
    // console.log(washroom, id);
    console.log("inputs into func: " + newRating, comment, name);
    console.log("from get: " + numberOfRaters, rating);
    console.log(comments);

    const updatedRaters = numberOfRaters + 1;
    const updatedRating =
      (rating * numberOfRaters + Number(newRating)) / updatedRaters;
    if (comment && name) {
      comments.push({ username: name, comment });
    }

    console.log(
      "updated: " + updatedRaters,
      "old: " + rating,
      "updated Rating: " + updatedRating
    );

    const response = axiosInstance.put(`api/${id}`, {
      rating: updatedRating,
      numberOfRaters: updatedRaters,
      comments: comments,
    });
    console.log("success");
  } catch (error) {
    console.log(error);
  }
};
