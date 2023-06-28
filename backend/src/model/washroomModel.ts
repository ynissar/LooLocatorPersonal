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
  traitRatings: {
    clean?: number;
    safe?: number;
    privacy?: number;
    wellSupplied?: number;
  };
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
  traitRatings: {
    clean: Number,
    safe: Number,
    private: Number,
    wellSupplied: Number,
  },
});

const washroomModel = model<IWashroom>("washroomModel", washroomSchema);

export { washroomModel };
