import { Schema, model } from "mongoose";

interface IWashroom {
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
      username?: string;
      comment?: string;
    }
  ];
}

const washroomSchema = new Schema<IWashroom>({
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  numberOfRaters: { type: Number, required: true },
  coordinates: {
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true },
  },
  street: { type: String, required: true },
  accessibility: {
    genderless: Boolean,
    childFriendly: Boolean,
    disabilityFriendly: Boolean,
  },
  comments: [
    {
      username: String,
      comment: String,
    },
  ],
});

const washroomModel = model<IWashroom>("washroomModel", washroomSchema);

export { washroomModel };
