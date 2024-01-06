export interface IWashroom {
  _id: string;
  name: string;
  rating: number;
  numberOfRaters: number;
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
  comments: [
    {
      username: String;
      comment: String;
    }
  ];
}

export interface ILocation {
  latitude: number;
  longitude: number;
}
