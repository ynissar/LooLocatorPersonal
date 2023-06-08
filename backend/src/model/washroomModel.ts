import { Schema, model } from "mongoose";

interface IWashroom {
  name: string;
  coordinates: {
    x: number;
    y: number;
  };
  street: string;
  accessibleWashroom: boolean;
  description: string;
}

const washroomSchema = new Schema<IWashroom>({
  name: { type: String, required: true },
  coordinates: {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
  },
  street: { type: String, required: true },
  accessibleWashroom: Boolean,
  description: { type: String, required: true },
});

const washroomModel = model<IWashroom>("washroomModel", washroomSchema);

export { washroomModel };
