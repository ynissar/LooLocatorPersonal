interface IWashroom {
  name: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  street: string;
  accessibleWashroom: boolean;
  description: string;
}

const dummyData: IWashroom[] = [
  {
    name: "Tim Horton's washroom",
    coordinates: {
      latitude: 43.68,
      longitude: -79.75,
    },
    accessibleWashroom: true,
    description: "Washroom at Tim Hortons",
    street: "Example street 1",
  },
  {
    name: "Starbucks's washroom",
    coordinates: {
      latitude: 44.23,
      longitude: -80,
    },
    accessibleWashroom: true,
    description: "Washroom at Starbucks",
    street: "Example street 2",
  },
  {
    name: "Canadian Tire's washroom",
    coordinates: {
      latitude: 42.23,
      longitude: -78.5,
    },
    accessibleWashroom: true,
    description: "Washroom at Canadian Tire",
    street: "Example street 3",
  },
];

export default dummyData;
